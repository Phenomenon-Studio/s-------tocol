import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@hooks';
import { checkWebPSupport } from '@utils';
import {
    FORMAT_PNG,
    FORMAT_WEBP,
    CUSTOM_PROP_ITEM_TEXT_CONTENT_TRANSLATE_Y,
    CUSTOM_PROP_ITEM_TEXT_CONTENT_OPACITY,
    MAX_OPACITY_ANIMATE,
    START_IN_OPACITY_ANIMATE,
    START_OUT_OPACITY_ANIMATE,
    START_TRANSLATE_Y_ANIMATE,
} from '@constants';

const sizes = {
    retina: [1248, 1040],
    default: [624, 520],
};

const getCurrentFrame = (index, format, isRetina) => {
    const count = index.toString().padStart(3, '0');

    return isRetina ? `/images/sequence@2x/frame${count}.${format}` : `/images/sequence/frame${count}.${format}`;
};

const resetCssProperties = list => {
    for (const item of list) {
        const $item = item.current;

        $item.style.setProperty(CUSTOM_PROP_ITEM_TEXT_CONTENT_OPACITY, 0);
    }
};

export const useSequence = (wrapRef, canvasRef, animateListRef) => {
    const [webpSupport, setWebpSupport] = useState();
    const [initSequence, setInitSequence] = useState();
    const isRetina = useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)');
    const htmlRef = useRef(null);
    const contextRef = useRef(null);
    const frameCountRef = useRef(300);

    useEffect(() => {
        const startToCheckWebPSupport = async () => {
            const supportWebp = await checkWebPSupport();

            setWebpSupport(supportWebp);
        };

        startToCheckWebPSupport();
    }, []);

    useEffect(() => {
        const typeBoolean = typeof webpSupport === 'boolean';

        if (!typeBoolean || !canvasRef.current || !wrapRef.current || !animateListRef.current) {
            return;
        }

        if (!htmlRef.current) {
            htmlRef.current = document.documentElement;
        }

        if (canvasRef.current && !contextRef.current) {
            contextRef.current = canvasRef.current.getContext('2d');
        }

        const $wrap = wrapRef.current;
        const $canvas = canvasRef.current;
        const animateList = animateListRef.current;
        const context = contextRef.current;
        const frameCount = frameCountRef.current;
        const animateListLength = animateList.length;
        const images = [];
        let isLastItem;

        const startAnimatingItem = (index, styles) => {
            const filteredList = animateList.filter((_, i) => i !== index);

            !isLastItem && resetCssProperties(filteredList);

            const $animateItem = animateList[index].current;

            $animateItem.style.setProperty(CUSTOM_PROP_ITEM_TEXT_CONTENT_TRANSLATE_Y, `${styles.translateY}px`);

            if (isLastItem) {
                return;
            }

            $animateItem.style.setProperty(CUSTOM_PROP_ITEM_TEXT_CONTENT_OPACITY, styles.opacity);
        };

        const preloadImages = format => {
            for (let i = 0; i <= frameCount; i++) {
                const img = new Image();

                img.src = getCurrentFrame(i, format, isRetina);

                images.push(img);
            }
        };

        const createImage = () => {
            const drawImage = () => {
                const img = images[0];
                $canvas.width = isRetina ? sizes.retina[0] : sizes.default[0];
                $canvas.height = isRetina ? sizes.retina[1] : sizes.default[1];

                img.onload = () => {
                    context.drawImage(img, 0, 0);
                };
            };

            const updateImage = index => {
                resetImage();
                context.drawImage(images[index], 0, 0);
            };

            const resetImage = () => {
                context.clearRect(0, 0, $canvas.width, $canvas.height);
            };

            return {
                drawImage,
                updateImage,
                resetImage,
            };
        };

        const { drawImage, updateImage, resetImage } = createImage();

        const scrollHandler = () => {
            const scrollTop = -$wrap.getBoundingClientRect().top;
            const maxScrollTop = $wrap.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(frameCount, Math.ceil(scrollFraction * frameCount));

            if (frameIndex < 0 || frameIndex > frameCountRef.current || scrollTop > maxScrollTop) {
                !isLastItem && resetCssProperties(animateList);
                return;
            }

            requestAnimationFrame(() => updateImage(Math.abs(frameIndex)));

            if (scrollTop <= 0) {
                return;
            }

            const currentSectionIndex = Math.min(animateListLength, Math.ceil(scrollFraction * animateListLength)) - 1;
            const maxScrollEachSections = maxScrollTop / animateListLength;
            const scrollValue = scrollTop / maxScrollEachSections - currentSectionIndex;
            const percentScrollValue = scrollValue * 100;
            const translateY = Number((START_TRANSLATE_Y_ANIMATE - percentScrollValue).toFixed(1));
            let opacity = 0;
            isLastItem = currentSectionIndex + 1 === animateListLength && translateY < 0;

            if (scrollValue > START_IN_OPACITY_ANIMATE && scrollValue < START_OUT_OPACITY_ANIMATE) {
                opacity = MAX_OPACITY_ANIMATE;
            } else if (scrollValue <= START_IN_OPACITY_ANIMATE) {
                opacity = Number((scrollValue / START_IN_OPACITY_ANIMATE).toFixed(2));
            } else if (!isLastItem && scrollValue >= START_OUT_OPACITY_ANIMATE) {
                const diff = MAX_OPACITY_ANIMATE - scrollValue;
                opacity = Number((diff / START_IN_OPACITY_ANIMATE).toFixed(2));
            }

            requestAnimationFrame(() => startAnimatingItem(currentSectionIndex, { opacity, translateY }));
        };

        setInitSequence(() => () => {
            if (webpSupport) {
                preloadImages(FORMAT_WEBP);
            } else {
                preloadImages(FORMAT_PNG);
            }

            drawImage();
            window.addEventListener('scroll', scrollHandler, { passive: true });
        });

        return () => {
            resetImage();
            window.removeEventListener('scroll', scrollHandler, { passive: true });
        };
    }, [webpSupport, canvasRef, wrapRef, animateListRef, isRetina]);

    return initSequence;
};

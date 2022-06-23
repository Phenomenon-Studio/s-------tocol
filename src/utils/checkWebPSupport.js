import webpImage from '../../public/images/checker.webp';

export const checkWebPSupport = () => {
    return new Promise(resolve => {
        const img = new Image();
        const loadHandler = () => {
            resolve(true);
            img.removeEventListener('error', errorHandler);
        };
        const errorHandler = () => {
            resolve(false);
            img.removeEventListener('load', loadHandler);
        };

        img.addEventListener('load', loadHandler);
        img.addEventListener('error', errorHandler);
        img.src = webpImage.src;
    });
};

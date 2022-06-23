import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useInViewport } from '@hooks';
import Title from '@components/ui/Title';
import Container from '@components/layout/Container';
import Item from './Item';
import Sequence from './Sequence';
import classes from './SectionFive.module.css';

const SectionFive = ({ data }) => {
    const canUseSequence = useMediaQuery('(min-width: 768px)');
    const boxRef = useRef(null);
    const { isInViewport } = useInViewport(boxRef);
    const itemTextContentFirstRef = useRef(null);
    const itemTextContentSecondRef = useRef(null);
    const itemTextContentThirdRef = useRef(null);
    const itemTextContentFourthRef = useRef(null);
    const itemTextContentFifthRef = useRef(null);
    const itemTextContentSixthRef = useRef(null);
    const itemsTextContentRefs = useRef([
        itemTextContentFirstRef,
        itemTextContentSecondRef,
        itemTextContentThirdRef,
        itemTextContentFourthRef,
        itemTextContentFifthRef,
        itemTextContentSixthRef,
    ]);

    return (
        <section className={classes.root}>
            <Container>
                <div className={classes.inner}>
                    <Title additionalClasses={classes.title} gradient size="primary">
                        {data.title}
                    </Title>
                    <div className={classes.box} ref={boxRef}>
                        <ul className={classes.list}>
                            {data.list.map((item, i) => (
                                <Item
                                    key={item.id}
                                    ref={itemsTextContentRefs.current[i]}
                                    canUseImage={!canUseSequence}
                                    title={item.title}
                                    description={item.description}
                                    imageUrl={item.image}
                                    additionalClasses={isInViewport && canUseSequence ? 'will-change' : ''}
                                />
                            ))}
                        </ul>
                        {canUseSequence && (
                            <Sequence
                                itemsTextContentRefs={itemsTextContentRefs}
                                boxRef={boxRef}
                                isInViewport={isInViewport}
                            />
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};

SectionFive.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SectionFive;

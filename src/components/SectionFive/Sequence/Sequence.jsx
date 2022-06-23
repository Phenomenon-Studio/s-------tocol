import { useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useSequence } from '@hooks';
import classes from './Sequence.module.css';

const Sequence = props => {
    const { itemsTextContentRefs, boxRef, isInViewport } = props;
    const canvasRef = useRef(null);
    const loadedRef = useRef(false);
    const initSequence = useSequence(boxRef, canvasRef, itemsTextContentRefs);

    useEffect(() => {
        if (isInViewport && !loadedRef.current && initSequence) {
            loadedRef.current = true;
            initSequence();
        }
    }, [initSequence, isInViewport]);

    return (
        <div className={classes.sequence}>
            <div className={classes.sequenceInner}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

Sequence.propTypes = {
    itemsTextContentRefs: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object.isRequired).isRequired).isRequired,
    boxRef: PropTypes.oneOfType([PropTypes.object.isRequired]).isRequired,
    isInViewport: PropTypes.bool.isRequired,
};

export default memo(Sequence);

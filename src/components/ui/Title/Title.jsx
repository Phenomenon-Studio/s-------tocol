import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Title.module.css';

const Title = props => {
    const { children, tagName = 'h3', gradient, size = 'secondary', additionalClasses = '', ...rest } = props;
    const TagName = tagName;
    const classNames = clsx(classes.title, classes[size], gradient && classes.gradient, additionalClasses);

    return (
        <TagName className={classNames} {...rest}>
            {children}
        </TagName>
    );
};

Title.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    tagName: PropTypes.string,
    gradient: PropTypes.bool,
    additionalClasses: PropTypes.string,
    size: PropTypes.oneOf(['primary', 'secondary']),
};

export default memo(Title);

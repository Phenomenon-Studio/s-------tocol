import { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Button.module.css';

const Button = forwardRef((props, ref) => {
    const {
        children,
        size,
        tagName = 'a',
        color = 'primary',
        variant = 'contained',
        additionalClasses,
        ...rest
    } = props;
    const withRef = tagName === 'a' ? { ref } : null;
    const Tag = tagName;
    let modifiers = '';

    if (color === 'primary') {
        modifiers = classes.btnPrimary;
    } else if (color === 'secondary') {
        modifiers = classes.btnSecondary;
    }

    const classNames = clsx(
        classes.btn,
        modifiers && modifiers,
        size && classes[size],
        classes[variant],
        additionalClasses
    );

    return (
        <Tag className={classNames} {...withRef} {...rest}>
            {children}
        </Tag>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    tagName: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOf(['medium']),
    variant: PropTypes.oneOf(['contained', 'text']),
    additionalClasses: PropTypes.string,
};

export default memo(Button);

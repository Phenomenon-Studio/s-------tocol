import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './SectionDescription.module.css';

const SectionDescription = props => {
    const { children, tagName = 'p', size, additionalClasses = '', ...rest } = props;
    const TagName = tagName;
    const classNames = clsx(classes.description, classes[size], additionalClasses);

    return (
        <TagName className={classNames} {...rest}>
            {children}
        </TagName>
    );
};

SectionDescription.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    size: PropTypes.string,
    tagName: PropTypes.string,
    additionalClasses: PropTypes.string,
};

export default memo(SectionDescription);

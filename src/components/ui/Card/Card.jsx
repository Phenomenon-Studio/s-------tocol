import { memo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import classes from './Card.module.css';

const Card = props => {
    const { icon, title, direction = 'column', description, date, additionalClasses, TagName = 'div', ...rest } = props;
    return (
        <TagName className={clsx(classes.root, additionalClasses)} {...rest}>
            <div className={classes.imageWrap}>
                <Image
                    src={icon}
                    alt={title}
                    width={64}
                    height={64}
                />
            </div>
            <div className={clsx({ [classes.content]: direction === 'column' })}>
                {
                    date && <p className={classes.date}>{date}</p>
                }
                <div className={classes.title}>
                    {title}
                </div>
                {
                    description && <p className={classes.description}>{description}</p>
                }
            </div>
        </TagName>
    );
};

Card.propTypes = {
    icon: PropTypes.string.isRequired,
    date: PropTypes.string,
    title: PropTypes.string,
    TagName: PropTypes.string,
    direction: PropTypes.string,
    description: PropTypes.string,
    additionalClasses: PropTypes.string,
};

export default memo(Card);

import { memo, forwardRef } from 'react';
import Image from 'next/image';
import PropsTypes from 'prop-types';
import clsx from 'clsx';
import { createSvgShimmer } from '@utils';
import Title from '@components/ui/Title';
import SectionDescription from '@components/ui/SectionDescription';
import classes from './Item.module.css';

const Item = forwardRef((props, ref) => {
    const { title, description, imageUrl, canUseImage, additionalClasses } = props;

    return (
        <li className={classes.item}>
            {canUseImage && (
                <Image
                    src={imageUrl}
                    alt={title}
                    width={624}
                    height={520}
                    blurDataURL={createSvgShimmer(624, 520)}
                    placeholder="blur"
                    objectFit="contain"
                />
            )}
            <div className={clsx(classes.itemTextContent, additionalClasses)} ref={ref}>
                <Title additionalClasses={classes.itemTitle} size="secondary">
                    {title}
                </Title>
                <SectionDescription additionalClasses={classes.itemDescription}>{description}</SectionDescription>
            </div>
        </li>
    );
});

Item.displayName = 'Item';

Item.propTypes = {
    title: PropsTypes.string.isRequired,
    description: PropsTypes.string.isRequired,
    imageUrl: PropsTypes.string.isRequired,
    canUseImage: PropsTypes.bool.isRequired,
    additionalClasses: PropsTypes.string.isRequired,
};

export default memo(Item);

import PropTypes from 'prop-types';
import classes from './Container.module.css';

const Container = props => {
    const { children } = props;

    return <div className={classes.container}>{children}</div>;
};

Container.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default Container;

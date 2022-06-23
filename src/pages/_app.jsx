import { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
import AppContext from '@context/AppContext';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
    const [isLaunchAppOpen, setIsLaunchAppOpen] = useState(false);
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return (
        <AppContext.Provider value={{ state: {isLaunchAppOpen}, setIsLaunchAppOpen }}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>s</title>
            </Head>
            <Component {...pageProps} />
        </AppContext.Provider>
    );
};

App.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;

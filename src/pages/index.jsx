import PropTypes from 'prop-types';
import { getMainPageAPIData } from '@utils';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import SectionOne from '@components/SectionOne';
import SectionTwo from '@components/SectionTwo';
import SectionThree from '@components/SectionThree';
// import SectionFour from '@components/SectionFour';
import SectionFive from '@components/SectionFive';
import SectionSix from '@components/SectionSix';
import SectionSeven from '@components/SectionSeven';
import SectionEight from '@components/SectionEight';
import SectionNine from '@components/SectionNine';
import SectionTen from '@components/SectionTen';
import SectionEleven from '@components/SectionEleven';
import LaunchAppModal from '@components/LaunchAppModal';
import GradientOrangeLeft from '@components/GradientOraggeLeft';

const Home = props => {
    const {
        logo,
        headerData,
        section_1,
        section_2,
        section_3,
        // section_4,
        section_5,
        section_6,
        section_7,
        section_8,
        section_9,
        section_10,
        section_11,
    } = props;

    return (
        <>
            <Header data={headerData} logo={logo} />
            <div className="relative overflow-hidden">
                <GradientOrangeLeft />
                <SectionOne data={section_1} />
                <SectionTwo data={section_2} />
                <SectionThree data={section_3} />
            </div>
            {/* <SectionFour data={section_4} /> */}
            <SectionFive data={section_5} />
            <SectionSix data={section_6} />
            <SectionSeven data={section_7} />
            <SectionEight data={section_8} />
            <SectionNine data={section_9} />
            <SectionTen data={section_10} />
            <SectionEleven data={section_11} />
            <Footer data={headerData} logo={logo} />
            <LaunchAppModal />
        </>
    );
};

Home.propTypes = {
    logo: PropTypes.object.isRequired,
    headerData: PropTypes.object.isRequired,
    section_1: PropTypes.object.isRequired,
    section_2: PropTypes.object.isRequired,
    section_3: PropTypes.object.isRequired,
    // section_4: PropTypes.object.isRequired,
    section_5: PropTypes.object.isRequired,
    section_6: PropTypes.object.isRequired,
    section_7: PropTypes.object.isRequired,
    section_8: PropTypes.object.isRequired,
    section_9: PropTypes.object.isRequired,
    section_10: PropTypes.object.isRequired,
    section_11: PropTypes.object.isRequired,
};

export const getStaticProps = async () => {
    const data = await getMainPageAPIData();

    return {
        revalidate: 60,
        props: data,
    };
};

export default Home;

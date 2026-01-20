import React from 'react'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLatter from '../components/NewsLatter'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <> 
            <Hero />
            <FeatureSection />
            <Banner />
            <Testimonial />
            <NewsLatter />
        </>
    )
}

export default Home

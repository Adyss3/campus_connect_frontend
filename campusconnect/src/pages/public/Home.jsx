import React from 'react'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Promo from '../../components/Promo'
import Features from '../../components/Features'
import Trending from '../../components/Trending'
import WhyChooseUs from '../../components/WhyChooseUs'
import Testimonials from '../../components/Testimonials'
import CallToAction from '../../components/CallToAction'
import Footer from '../../components/Footer'

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Promo />
      <Trending />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  )
}

export default Home

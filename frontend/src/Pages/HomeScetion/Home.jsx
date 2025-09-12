import React from 'react'
import Hero from './Hero'
import Categories from './Categories'
import NewArrivel from './NewArrivel'
import HotSelling from './HotSelling'
import Features from './Features'
import TestimonialSection from './Testimonial'

const Home = () => {
  return (
    <>
   <Hero/>
   <Categories/>
    <HotSelling/>
   <NewArrivel/>
  <TestimonialSection/>
   <Features/>
    </>
  )
}

export default Home

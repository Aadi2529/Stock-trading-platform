import React from 'react'
import Hero from './Hero'
import Awards from './Awards'
import Education from './Education'
import Pricing from './Pricing'
import Stats from './Stats'
import OpenAccount from '../OpenAccount'
import Navbar from '../Navbar'
import Footer from '../Footer'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </div>
  )
}

export default HomePage

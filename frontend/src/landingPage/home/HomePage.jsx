import React from 'react'
import Hero from './Hero'
import Awards from './Awards'
import Education from './Education'
import Pricing from './Pricing'
import Stats from './Stats'
import ProfitCalculator from './ProfitCalculator'
import HowItWorks from './HowItWorks'
// import OpenAccount from '../OpenAccount'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Awards />
      <ProfitCalculator />
      <Stats />
      <HowItWorks />
      <Pricing />
      <Education />
      {/* <OpenAccount /> */}
    </div>
  )
}

export default HomePage

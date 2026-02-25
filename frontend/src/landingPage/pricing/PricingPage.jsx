import React from 'react'
import Hero from './PricingHero'
import './pricing.css'
import Brokerage from './Brokerage'
import PricingTabs from './PricingTabs'

const PricingPage = () => {
  return (
    <div>
      <Hero />
      <PricingTabs />
      <Brokerage />
    </div>
  )
}

export default PricingPage

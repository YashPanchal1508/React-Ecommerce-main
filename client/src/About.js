import React from 'react'
import HeroSection from './components/HeroSection'

const About = ({ myData }) => {
  const data = {
    name: "Yash E-commerce"
  }
  return (
    <>
      <HeroSection myData={data} />
    </>
  )
}

export default About
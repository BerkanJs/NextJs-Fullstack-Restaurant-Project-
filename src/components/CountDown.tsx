"use client"
import React from 'react'
import Countdown from 'react-countdown'

const endingData=new Date("2024-12-30")
const CountDown = () => {
  return (
    <Countdown className='font-bold text-5xl text-yellow-400'  date={endingData}    />
  )
}

export default CountDown
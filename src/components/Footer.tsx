import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:p-20 xl:p-40 text-blue-700 flex items-center justify-between'>
      <Link className='font-bold text-xl' href="/">PizzaHot</Link>
      <p> ALL RIGHTS RESERVED || BERKAN ÖZÇELİK</p>
    </div>
  )
}

export default Footer
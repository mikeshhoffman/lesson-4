import React from 'react'

import './Header.css'

const Header = (props) => {
  return (
    <header>
      <h1>
        <span className='car-word'>Pauline's</span>
        <span className='cdr-word'>Perfect Patisserie</span>
      </h1>
	  <a href="/orders">Order Page</a>
    </header>
  )
}

export default Header

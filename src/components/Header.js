
import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const Header = (props) => {
  return (
    <header>
      <h1>
        <span className='car-word'>Pauline's</span>
       <li><Link to={'/'}><span className='car-word'>Perfect Patisserie</span></Link></li>
      </h1>
	  <ul>
		<li><Link to={'/Order'}> Basket </Link></li>
	  </ul>
    </header>
  )
}
export default Header
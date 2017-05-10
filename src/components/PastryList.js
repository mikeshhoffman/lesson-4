import React from 'react'
import { Link } from 'react-router-dom'

import './PastryList.css'

class PastryList extends React.Component {
  render () {
    const { pastries } = this.props
    return (
      <ul className='pastry-list'>
        {Object.keys(pastries).map(key => {
          const pastry = pastries[key]
          return <li key={key}>
            <Link to={`/${pastry.name}`}>{pastry.name}</Link>
          </li>
        })}
      </ul>
    )
  }
}

export default PastryList

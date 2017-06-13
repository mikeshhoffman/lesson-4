import React from 'react'
import PropTypes from 'prop-types'

function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

class BasketPage extends React.Component {
  render () {
    const { order } = this.props	
	const totalPrice = Object.keys(order)
		.map(key => order[key])
		.reduce((acc,pastry) =>{
			return acc + (pastry.quantity * pastry.price)
		}, 0)
	
    return (
      <div className='basket-page'>
        <table>
			<tr>
				<td >Name</td>
				<td >Price</td>
				<td >Quantity</td>
            </tr>
			{Object.keys(order).map(key => {
				const item = order[key]
				return (
					<tr key={key}>
						<td>{item.name.toUpperCase()}</td>
						<td>{formatPrice(item.price)}</td>
						<td>{item.quantity}</td>
					</tr>
						)
					})}
			<tr>
			</tr>
			<tr>
				<td> SubTotal: {formatPrice(totalPrice)}</td>
			</tr>
		</table>
      </div>
    )
  }
}

BasketPage.propTypes ={
	order: PropTypes.object.isRequired
}

export default BasketPage
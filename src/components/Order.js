import React from 'react'
import { Link } from 'react-router-dom'


function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

class Order extends React.Component {
  render () {
    const { order } = this.props
    const totalPrice = Object.keys(order)
      .map(key => order[key])
      .reduce((acc, pastry) => {
        return acc + (pastry.quantity * pastry.price)
      })

    return (
      <div className="basket">
        <table>
          <thead>
            <h2>Shopping Basket</h2>
          </thead>
        <tbody>
          {order.items.map(item => {
            return (
            <tr>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
            )
          })}
          <tr>
            <td colSpan='3'>Subtotal = formatPrice({Order.price}) </td>
          </tr>
        </tbody>
        </table>
      </div>

    )
  }
}



export default Order
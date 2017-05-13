import React from 'react'
import { Link } from 'react-router-dom'

import './OrderList.css'

function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

// This is being returned and displayed as text instead of HTML for some reason
class OrderList extends React.Component {
  render () {
    const { order } = this.props
	var htmlBody
	const orders = Object.keys(order).map(key => order[key])
	for (var i=0; i < orders.length; i++){
		htmlBody = htmlBody + "<tr><td>" + orders[i].name + "</td><td>" + formatPrice(orders[i].price) + "</td><td>Quantity:" + orders[i].quantity + "</td><td><form method=post action=/orders/pastries/" + orders[i].name + "><input type=submit value=Remove /></form></td></tr>"
    }
	htmlBody = htmlBody + "<tr><td></td><td></td><td></td><td>Subtotal: </td></tr>"
    return (<tbody>{htmlBody}</tbody>)
  }
}

export default OrderList

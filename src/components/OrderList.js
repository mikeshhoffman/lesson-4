import React from 'react'
import { Link } from 'react-router-dom'

import './OrderList.css'

function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

// This is being returned and displayed as text instead of HTML for some reason
/*
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
*/

/*
class OrderList extends React.Component {
render () {
	const { order } = this.props
	const { items } = order
    return (
      <tbody>
        {items.map(item => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{formatPrice(item.price)}</td>
              <td>Quantity: {item.quantity}</td>
              <td>
                <form method='POST' action={`/orders/pastries/${item.name}`}>
                  <button type='submit'>Remove</button>
                </form>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
	}
}
*/
 class OrderList extends React.Component { 
   render () { 
     const { order } = this.props 
 
 
     const totalPrice = Object.keys(order) 
       .map(key => order[key]) 
       .reduce((acc, pastry) => { 
         return acc + (pastry.quantity * pastry.price) 
       }, 0) 
 
 
     return ( 
       <div> 
         <table className='order'> 
           <tbody> 
             {Object.keys(order).map(key => { 
               const item = order[key] 
               return ( 
                 <tr key={key}> 
                   <td><Link to={`/${item.name}`}>{item.name}</Link></td> 
                   <td>{formatPrice(item.price)}</td> 
                   <td>{item.quantity}</td> 
                 </tr> 
               ) 
             })} 
             <tr> 
               <td colSpan='3'>Subtotal: {formatPrice(totalPrice)}</td> 
             </tr> 
           </tbody> 
         </table> 
       </div> 
     ) 
   } 
} 

export default OrderList

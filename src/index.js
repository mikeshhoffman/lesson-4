import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Switch
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import OrderList from './components/OrderList'
import NotFound from './components/NotFound'

function getTotalPrice (pastries, totalPrice = 0){
	return pastries.reduce((acc, p) => {
		return acc + p.price
	}, totalPrice)
}
class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      pastries,
	  order: {
		items: [],
		price: 0
	  }
    }
	this.addToOrder = this.addToOrder.bind(this)
  }

  /*
  addToOrder (e) {
    e.preventDefault()
	const input = e.target.querySelector('input')
	const value = input.value
	
	const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
	const pastry = pastries.find(p => p.name === value)
	
	const order = Object.assign({}, this.state.order)
	
	order.items.push(pastry)
	order.price = getTotalPrice(order.items, order.price)
	
	this.setState({
		order
	})
	console.log('added to order!')
  }
*/

/*
addToOrder (pastryName) {
    const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastries.find(p => p.name === pastryName)
    if (!pastry) return

    const order = Object.assign({}, this.state.order)
    const orderPastry = Object.assign({}, order[pastry.name])

    if (orderPastry.name) {
      orderPastry.quantity++
      order[pastry.name] = orderPastry
    } else {
      order[pastry.name] = Object.assign({}, pastry, {
        quantity: 1
      })
    }

    this.setState({
      order
    })
}
*/

addToOrder (pastryName) { 
     const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key]) 
     const pastry = pastries.find(p => p.name === pastryName) 
     if (!pastry) return 
 
 
     const order = Object.assign({}, this.state.order) 
     const orderPastry = Object.assign({}, order[pastry.name]) 
 
 
     if (orderPastry.name) { 
       orderPastry.quantity++ 
       order[pastry.name] = orderPastry 
     } else { 
       order[pastry.name] = Object.assign({}, pastry, { 
         quantity: 1 
       }) 
     } 
 
 
     this.setState({ 
       order 
     }) 
   } 

  render () {
    return (
      <Router history={hashHistory}>
        <App>
          <Switch>
            <Route exact path='/' render={props => (
              <PastryList pastries={this.state.pastries} />
            )} />
		
		// The state does not seem to be persisting when visiting this page after item to order
			<Route exact path='/orders' render={props => (
				<div>
				<a href={"/"}>Back to Pastries</a><br /><br />
				<table cellPadding="5" cellSpacing="5">

				<OrderList order={this.state.order} />

				
				</table>
				</div>
            )} />
				
            <Route path='/:pastry' render={props => {
              const pastryName = props.match.params.pastry
              const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
              const pastry = pastries.find(p => p.name === pastryName)
              if (pastry) {
                return (
                  <PastryPage pastry={pastry} addToOrder={this.addToOrder} />
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }
            }} />
          </Switch>
        </App>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

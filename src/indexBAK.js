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
import Order from './components/Order'
import NotFound from './components/NotFound'

function getTotalPrice (pastries, totalPrice = 0) {
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

//added code from in-class files
  addToOrder (event) {
    event.preventDefault()
    console.log({target: event.target})
    const input = event.target.querySelector('input')
    const value = input.value

    const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastries.find(p => p.name === value)
    if (!pastry) return

    const order = Object.assign({}, this.state.order)
    const orderPastry = Object.assign({}, order[pastry.name])

    if (orderPastry.name) {
      orderPastry.quantity = orderPastry.quantity + 1
      order[pastry.name] = orderPastry
    } else {
      orderPastry.quantity = 1
      order[pastry.name] = pastry
    }
    order.items.push(pastry)
    order.price = getTotalPrice(order.items, order.price)

    this.setState({
      order
    })

    console.log({event})
    console.log({type: event.type})
    console.log('added to order!')
  }

  loadPastries(){
    this.setState({
      pastries
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
            <Route path='/Order' render={props => {
              const pastryName = props.match.params.pastry
              const order = Object.keys(this.state.order).map(key =>
                this.state.order[key])
              if (order) {
                return (
                  <Order order={order} addToOrder={this.addToOrder} />
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
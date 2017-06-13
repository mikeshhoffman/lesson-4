import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Switch,
Redirect
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import NotFound from './components/NotFound'
import Order from './components/Order'





class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      pastries,
      order : {
        items: [],
        cartPrice: 0
      },
      addToOrderRedirect: false
    }
    this.addToOrder = this.addToOrder.bind(this)
  }

  addToOrder (e) {
    e.preventDefault()
    console.log('added to order!')
    const value = e.target.querySelector('input').value
    //select item from pastryPage.js
    const pastries = Object.keys(this.state.pastries).map((key)=> { return this.state.pastries[key]})
    //copy this.state.pastries
    const pastry = pastries.find(p => p.name === value)
    //returns array of objects only where p.name === value
    if (!pastry) return


    const order = Object.assign({}, this.state.order)
    const orderPastry = order.items.find(p=> p.name === value)
    console.log(pastry)

    if (!orderPastry){
        pastry.quantity = 1
        order.items.push(pastry)
      } else {
        orderPastry.quantity++
        const newOrderItems = order.items.map(p => p.name === value ? orderPastry : pastry)
        order.items = newOrderItems
      console.log(JSON.stringify(newOrderItems))
    }
    //pushes pastry with quantity to items array.

    order.cartPrice = order.items.reduce((acc, p) => {return acc + (p.price * p.quantity)}, 0)

    console.log('order output after if statement:'+ JSON.stringify(order))
    //Method 2
    /*order.cartPrice = 0
    for (var i in order.items){
      order.cartPrice += (order.items[i].quantity * order.items[i].price)
    }*/

    console.log('cart price:' + order.cartPrice)
    //resets cartPrice, then adds all item prices
    this.setState({order})
    //replaces this.state.order object with new order object
    this.setState({addToOrderRedirect:true})


    console.log('Data from this.state.order' + JSON.stringify(this.state.order))
  }
  componentWillUpdate(nextProps, nextState){
    console.log('willUpdate nextProps:' + JSON.stringify(nextProps.order))
    console.log('willUpdate nextState:' + JSON.stringify(nextState.order))
  }
  render () {
    return (
      <Router history={hashHistory}>
        <App>
          <Switch>
            <Route exact path='/' render={props => (
              <PastryList pastries={this.state.pastries} />
            )} />
            <Route exact path="/order" render={props => (
              <Order order={this.state.order}/>
            )} />
            <Route path='/:pastry' render={props => {


              const pastryName = props.match.params.pastry
              const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
              const pastry = pastries.find(p => p.name === pastryName)

              if (this.state.addToOrderRedirect){
              this.setState({addToOrderRedirect:false})
              return (
                <Redirect to="/order"/>
              )
              } else if (pastry) {
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
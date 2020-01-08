import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/navigationbar';
import ShoppingList from './components/shoppinglist';
import InputModal from './components/inputmodal';
import Chart from './components/chart';
import {Provider} from 'react-redux';
import store from './store';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <NavigationBar/>
        <div className="container">
            <Chart />
        </div>
        <hr />  
          <div>
            <InputModal /> 
            <ShoppingList />
          </div>  
        </div>
      </Provider>  
    );
  }
}

export default App;
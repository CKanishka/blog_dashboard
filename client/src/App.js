import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/navigationbar';
import ShoppingList from './components/shoppinglist';
import InputModal from './components/inputmodal';

import {Provider} from 'react-redux';
import store from './store';

// Step 1 - Including react

// Step 2 - Including the react-fusioncharts component
import ReactFC from 'react-fusioncharts';
// Step 3 - Including the fusioncharts library
import FusionCharts from 'fusioncharts';
// Step 4 - Including the chart type
import Column2D from 'fusioncharts/fusioncharts.charts';
// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// Step 7 - Creating the JSON object to store the chart configurations
const chartConfigs = {
    type: 'column2d',// The chart type
    width: '550', // Width of the chart
    height: '350', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: { 
        // Chart Configuration 
        "chart": {
            "caption": "Top Writers",
            "subCaption": "(for the month of October)",
            "xAxisName": "User",
            "yAxisName": "No. of Articles",
            "numberSuffix": "",
            "theme": "fusion",
        },
        // Chart Data
        "data": [{
            "label": "User3",
            "value": "23"
        }, {
            "label": "User8",
            "value": "17"
        }, {
            "label": "User1",
            "value": "15"
        }, {
          "label": "User5",
          "value": "14"
        }, {
          "label": "User7",
          "value": "12"
        }
      ]
    }
};

const chartConfigs2 = {
  type: 'doughnut3d',// The chart type
  width: '550', // Width of the chart
  height: '350', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: { 
      // Chart Configuration 
      "chart": {
        "caption": "Top Genres",
        "subCaption": "(for the month of October)",
        "startingAngle": "310",
        "defaultCenterLabel": "Top Genres",
        "showTooltip": "0",
        "decimals": "0",
        "theme": "fusion"
      },
      // Chart Data
      "data": [{
        "label": "Thriller",
        "value": "35"
      },
      {
        "label": "Fiction",
        "value": "27"
      },
      {
        "label": "Comedy",
        "value": "19"
      },
      {
        "label": "Romance",
        "value": "17"
      },
      {
        "label": "Mystery",
        "value": "2"
      },
    ]
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <NavigationBar/>
        <div className="container">
          <div className="row card__box">
          <ReactFC
        {...chartConfigs}/>
          <ReactFC
        {...chartConfigs2}/>
          </div>  
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

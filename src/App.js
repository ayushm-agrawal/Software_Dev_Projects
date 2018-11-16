import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="one">
          <header className="App-header">
            <img src={require('./images/gfx-foodwaste.png')} id="headerImg"/>
            <h1>Food Waste</h1>
          </header>
          <div className="IntroPara">
            <p align="left" className="intro">According to the United States Department of Agriculture, food waste is estimated at between 30-40 percent of the food supply. This estimate, based on estimates from USDA’s Economic Research Service of 31 percent food loss at the retail and consumer levels, corresponded to approximately 133 billion pounds and $161 billion worth of food in 2010. This amount of waste has far-reaching impacts on food security, resource conservation and climate change</p>
            <Chart/>
          </div>
        </div>
        <div className="two">
          <h1 align="left" id="methane">Food Waste in Landfills Generates Methane Gas!!!</h1>
          <p align="left" className="intro">Methane is a greenhouse gas. In 2016, methane accounted for 10% of all U.S. greenhouse gas emissions from human activities. </p>
        </div>
      </div>
    );
  }
}

export default App;

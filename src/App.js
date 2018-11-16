import React, { Component } from 'react';
import './App.css';
import Chart from './Chart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="one">
          <header className="App-header">
            <img src={require('./images/gfx-food-waste.png')} id="headerImg" alt="recycle"/>
            <h1>Food Waste</h1>
            <img src={require('./images/foodwaste_about.png')} id="headerImg1" alt="foodwaste"/>
          </header>
          <div className="IntroPara">
            <p align="left" className="intro1">According to the United States Department of Agriculture, food waste is estimated at between <strong>30-40 percent</strong> of the food supply. This estimate, based on estimates from USDA’s Economic Research Service of <strong>31 percent</strong> food loss at the retail and consumer levels, corresponded to approximately <strong>133 billion pounds and $161 billion</strong> worth of food in 2010. This amount of waste has far-reaching impacts on food security, resource conservation and climate change</p>
            <Chart/>
          </div>
        </div>
        <div className="two">
          <h1 align="left" id="methane">Food Waste in Landfills Generates Methane Gas!!!</h1>
          <p align="left" className="intro">Methane is a greenhouse gas. In 2016, methane accounted for <strong>10%</strong> of all U.S. greenhouse gas emissions from human activities. As shown in the image below, a monthly peak of <strong>1887.65 ppb</strong> was reached in November 2017.
           </p>
          <img src={require('./images/methaneEmissions.png')} id="methaneImg" alt="methane emissions"/>
          <img src={require('./images/landfill-methane.jpg')} id="landfillImage" alt="landfills"/>
          <p align="left" className="intro">Methane is a gas with 25 fold more potent global warming potential than carbon di-oxide which would have been the primary end product had the food been eaten and metabolized by humans. </p>
          <p align="left" className="intro"> <strong>For more information:</strong> <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0007940" className="hyperlink">The Progressive Increase of Food Waste in America and Its Environmental Impact</a></p>
        </div>
        <div className="three">

        </div>
      </div>
    );
  }
}

export default App;

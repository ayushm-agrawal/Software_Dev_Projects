import React, { Component } from 'react';
import './App.css';
import Chart from './Chart'
import VideoPlayer from './VideoPlayer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul id="ul">
          <li><a href="#food-waste">Introduction</a></li>
          <li><a href="#methane-gas">Methane Gas</a></li>
          <li><a href="#hunger-in-america">Hunger</a></li>
          <li><a href="#reducing-food-waste">Reduction</a></li>
          <li><a href="#references">References</a></li>
        </ul>
        <div id="container">
          <div className="one" id="food-waste">
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
          <div className="two" id="methane-gas">
            <h1 align="left" id="methane">Food Waste in Landfills Generates Methane Gas!!!</h1>
            <p align="left" className="intro">Methane is a greenhouse gas. In 2016, methane accounted for <strong>10%</strong> of all U.S. greenhouse gas emissions from human activities. As shown in the image below, a monthly peak of <strong>1887.65 ppb</strong> was reached in November 2017.
            </p>
            <img src={require('./images/methaneEmissions.png')} id="methaneImg" alt="methane emissions"/>
            <img src={require('./images/landfill-methane.jpg')} id="landfillImage" alt="landfills"/>
            <p align="left" className="intro">Methane is a gas with 25 fold more potent global warming potential than carbon di-oxide which would have been the primary end product had the food been eaten and metabolized by humans. </p>
            <p align="left" className="intro"> <strong>For more information:</strong> <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0007940" className="hyperlink">The Progressive Increase of Food Waste in America and Its Environmental Impact</a></p>
          </div>
          <div className="three" id="hunger-in-america">
            <h1 align="left" id="methane">1 in 6 people in America face hunger!</h1>
            <p align="left" className="intro">Even in the world’s greatest food-producing nation, children and adults face poverty and hunger in every county across America. In 2017:</p>
            <ul className="list">
              <li>40 million people struggle with hunger in the United States, including more than 12 million children.</li><br/>
              <li>A household that is food insecure has limited or uncertain access to enough food to support a healthy life.</li><br/>
              <li>Households with children were more likely to be food insecure than those without children</li><br/>
            </ul>
            <img src={require('./images/nebraska-hunger.PNG')} alt="nebraska-hunger" className="hungerNebraska"/>
          </div>
          <div className="two"  id="reducing-food-waste">
            <h1 align="left" id="methane">How can we reduce Food Waste? <img src={require('./images/adults.png')} alt="people" align="middle" className="lastSection"/> </h1>
            <br/>
            <p align="left" className="intro"> The reduction of food waste starts at home. If you start keeping track of what you put in your body and
              make sure that least amount of food is wasted, you will reduce the amount of food that is sent to landfill.</p>
            <p align="left" className="intro">If you follow the steps below everyday, you can reduce the amount of methane gas emission which is one of
              the reasons of global temperature increase</p>
            <img src={require('./images/Reduce-Food-Waste.png')} alt="reduceFoodWaste" className="reduceFoodWaste"/>
            <p align="left" className="intro">This video explains how much food is wasted every day in America and also explains
              the steps that people are taking to solve this major issue in our society. </p>
            <div className="video">
              <VideoPlayer/>
            </div>
          </div>
          <div className="last" id="references">
            <h1 align="left" id="methane">References</h1>
            <br/>
            <p align="left" className="intro">United States Department of Agrilculture, www.usda.gov/oce/foodwaste/faqs.htm.</p>
            <br/>
            <p align="left" className="intro">“Facts About Hunger and Poverty in America.” Feeding America, Feeding America, www.feedingamerica.org/hunger-in-america/facts.</p>
            <br/>
            <p align="left" className="intro">“Nebraska.” Feeding America, Feeding America, www.feedingamerica.org/hunger-in-america/nebraska.</p>
            <br/>
            <p align="left" className="intro">Hall KD, Guo J, Dore M, Chow CC (2009) The Progressive Increase of Food Waste in America and Its Environmental Impact. PLOS ONE 4(11): e7940. https://doi.org/10.1371/journal.pone.0007940</p>
            <br/>
            <p align="left" className="intro">“Overview of Greenhouse Gases.” EPA, Environmental Protection Agency, 31 Oct. 2018, www.epa.gov/ghgemissions/overview-greenhouse-gases.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

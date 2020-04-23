import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props){
    super();
    this.state = {
      chartData: {
        labels: ['Consumer and Retail Food Waste', 'Other Food Waste', 'Used Food'],
        datasets:[
          {
            label: 'Food Waste',
            data: [
              31,
              9,
              60
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206 , 86, 0.6)',
            ]
          }
        ]
      }
    }
  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          width={600}
          height={350}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}

export default Chart;
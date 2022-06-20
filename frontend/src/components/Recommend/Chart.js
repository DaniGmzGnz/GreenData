import React, { Component } from "react";
import Chart from "react-apexcharts";

class RecommendChart extends Component {
  constructor(props) {
    console.log("si", props)
    super(props);

    const elec = props.param.elec;
    const fuel = props.param.fuel;
    const gas = props.param.gas;

    this.state = {
        series: [{
          name: "Consumo Electricidad",
          data: elec
        },{
          name: 'Consumo de Combustible',
          data: fuel
        },{
          name: 'Consumo de Gas',
          data: gas
        }],
        options: {
          chart: {
          type: 'bar',
          toolbar: {
            show: false
          },
          height: 350,
          stacked: true,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1500,
            animateGradually: {
                enabled: true,
                delay: 250
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: "",
          align: 'center',
          floating: false,
          margin: 30,
          style: {
              fontSize:  '25px',
              fontWeight: 'bold',
          },
          
        },
        xaxis: {
          categories: ['', '', '', '', ''],
          title:{
            text: 'toneladas C02',
            style: {
              color: 'white',
              fontSize: '20px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            }
          }
        },
        yaxis: {
          title:{
            text: 'Escenarios',
            style: {
              color: 'white',
              fontSize: '20px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            }
          },
          labels: {
            labels: {
              colors: '#fff'
            },
            markers: {
              strokeColor: '#fff',
            }
          }
        },
        tooltip: {
          enabled: true,
        },
        fill: {
          opacity: 1
        
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 100,
          style:{
            colors:['#fff']
          }
        }
        }
      
      
      };
  }

  render() {
    return (
      <div className="area-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              stacked="true"
              width="900"
              height="350"
            />
      </div>
    );
  }
}

export default RecommendChart;

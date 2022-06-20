import React, { Component } from "react";
import Chart from "react-apexcharts";

class PieChart extends Component {
  constructor(props) {
    super(props);

    const cv_fuel = this.props.result.total_cv_fuel[0];
    const elect = this.props.result.total_elect[0];
    const garbage = this.props.result.total_garbage[0];
    const leak_gas = this.props.result.total_leak_gas[0];
    const ic_sc1 = this.props.result.total_ic_fuel_sc1[0];
    const ic_sc3 = this.props.result.total_ic_fuel_sc3[0];
    const kg_sc12 = this.props.result.kgCO2_sc_1_2[0];
    const kg_sc3 = this.props.result.kgCO2_sc_3[0];
    const total = this.props.result.kgCO2_total[0];

    this.state = {
        series: [Math.round((cv_fuel + ic_sc1 + leak_gas) / total), 
                 Math.round(elect / total),  
                 Math.round(kg_sc3 / total)],
        options: {
          title: {
            text: "Segmentación Alcances",
            align: 'center',
            margin: 30,
            style: {
                fontSize:  '25px',
                fontWeight: 'bold',
            }
          },
          plotOptions: {
            pie: {
              expandOnClick: false
            }
          },
          chart: {
            width: 380,
            type: 'pie',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 2200,
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
          labels: ['Alcance 1', 'Alcance 2', 'Alcance 3'],
          legend:  {
            position: 'bottom'
          },
          colors: ['#24b28a','#7cc397','#c1e29b'],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 0,
              opacityFrom: 0.6,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
            },
          dataLabels: {
              enabled: true,
              textAnchor: 'middle',
              style: {
                color: 'white',
                fontSize: '9px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: '300',
                dropShadow: {
                  enabled: true,
              }
            },
            },
          tooltip: {
            enabled: true,
            y: {
              show: true,
              formatter: (a) => a+'%',
          }
          }
          
        },
      
      
      };
  }

  render() {
    return (
      <div className="pie-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="donut"
              width="350"
              height="350"
            />
      </div>
    );
  }
}

export default PieChart;

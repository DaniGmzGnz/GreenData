import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);

    const cv_fuel = this.props.result.total_cv_fuel[0] * 0.001;
    const elect = this.props.result.total_elect[0] * 0.001;
    const garbage = this.props.result.total_garbage[0] * 0.001;
    const leak_gas = this.props.result.total_leak_gas[0] * 0.001;
    const ic_sc1 = this.props.result.total_ic_fuel_sc1[0] * 0.001;
    const ic_sc3 = this.props.result.total_ic_fuel_sc3[0] * 0.001;
    const kg_sc12 = this.props.result.kgCO2_sc_1_2[0] * 0.001;
    const kg_sc3 = this.props.result.kgCO2_sc_3[0] * 0.001;

    this.state = {
        series: [{
          name: "Valor",
          data: [
            {
              x: '',
              y: ic_sc1,
              goals: [
                {
                  name: 'Media',
                  value: 5,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '',
              y: cv_fuel,
              goals: [
                {
                  name: 'Media',
                  value: 4,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '',
              y: ic_sc3,
              goals: [
                {
                  name: 'Media',
                  value: 3,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '',
              y: elect,
              goals: [
                {
                  name: 'Media',
                  value: 2,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '',
              y: leak_gas,
              goals: [
                {
                  name: 'Media',
                  value: 6,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '',
              y: garbage,
              goals: [
                {
                  name: 'Media',
                  value: 4,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: '#775DD0'
                }
              ]
            }
          ]
        }],
        options: {
          title: {
            text: "Consumo de Huella de Carbono",
            align: 'center',
            style: {
                fontSize:  '25px',
                fontWeight: 'bold'
            }
          },
          chart: {
            type: 'bar',
            height: 350,
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
          plotOptions: {
            bar: {
              borderRadius: 10,
              horizontal: true,
            }
            
          },
          dataLabels: {
            enabled: true,
          },
          fill: {
            colors: ['#24b28a','#7cc397','#d1e29b', '#24b28a','#7cc397','#d1e29b'],
            type: "gradient",
            gradient: {
              shadeIntensity: 0,
              opacityFrom: 0.4,
              opacityTo: 0.9,
              stops: [0, 40, 100]
            },
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
            },
          xaxis: {
            categories: ['Comb. Empresa', 'Gas Natural', 'Comb. Empleados', 'Electricidad', 
            'Fugas de Gas', 'Basura'],
            title: {
              text: 'Toneladas CO2 (tCO2)'
            }
          },
          yaxis: {
            tooltip: {
                enabled: true,
                offsetX: 0,
            },
              labels: {
                  style: {
                    colors: [],
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                  }
              }
          }
          
        },
      
      
      };
  }

  render() {
    return (
      <div className="bar-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="900"
              height="350"
            />
      </div>
    );
  }
}

export default BarChart;

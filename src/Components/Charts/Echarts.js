import React,{Component} from 'react';//Component is used for creating class based react component
import EChartsReact from 'echarts-for-react';
import { populationDataMale } from './DataMale';
import { populationDataFemale } from './DataFemale';
class App extends Component {
  getOption = () => {
    let districts = [];
    let years = [];

    Object.entries(populationDataFemale).forEach(entry => {
      years = [...years, entry[0]];
      entry[1].forEach(e => {
        districts = [...new Set([...districts, e.name])];
      });
    });

    let options = years.map(year => {
      let obj = {};

      obj["series"] = [
        {
          stack: "group",// different series to be stacked on top of each other within the same category,
          data: populationDataFemale[year]
        },
        {
          stack: "group",
          data: populationDataMale[year]
        }
      ];

      obj["title"] = {
        text: `Population of Singapore by District, ${year}`
      };

      return obj;
    });

    return {
      baseOption: {
        timeline: {//The timeline is a control feature in ECharts that allows users to play through different time points.
          autoPlay: true,//automatically play the timeline animation
          axisType: "category",//categorical data is displayed
          bottom: 20,
          data: years,
          height: null,
          inverse: true,
          left: null,
          orient: "vertical",
          playInterval: 1000,
          right: 0,
          top: 20,
          width: 55,
          label: {
            normal: {
              textStyle: {
                color: "#aaa"
              }
            },
            emphasis: {//hovered over or highlighted
              textStyle: {
                color: "#333"
              }
            }
          },
          symbol: "none",
          lineStyle: {
            color: "#aaa"
          },
          checkpointStyle: {
            color: "#354EF6",
            borderColor: "transparent",
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            normal: {
              color: "#354EF6",
              borderColor: "#354EF6"
            },
            emphasis: {
              color: "#5d71f7",
              borderColor: "#5d71f7"
            }
          }
        },
        color: ["#e91e63", "#354EF6"],
        title: {
          subtext: "Data from the Singapore Department of Statistics",
          textAlign: "left",
          left: "5%"
        },
        tooltip: { backgroundColor: "#555", borderWidth: 0, padding: 10 },
        legend: {
          data: ["Female", "Male"],
          itemGap: 35,
          itemHeight: 18,
          right: "11%",
          top: 20
        },
        calculable: true,
        grid: {
          top: 100,
          bottom: 150,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                formatter: function(params) {
                  return params.value.replace("\n", "");
                }
              }
            }
          }
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              rotate: 55,
              textStyle: {
                baseline: "top",
                color: "#333",
                fontSize: 10,
                fontWeight: "bold"
              }
            },
            axisLine: { lineStyle: { color: "#aaa" }, show: true },
            axisTick: { show: false },
            data: districts,
            splitLine: { show: false },
            type: "category"
          }
        ],
        yAxis: [
          {
            axisLabel: {
              textStyle: { fontSize: 10 }
            },
            axisLine: { show: false },
            axisTick: { show: false },
            name: "Population",
            splitLine: {
              lineStyle: {
                type: "dotted"
              }
            },
            type: "value"
          }
        ],
        series: [{ name: "Female", type: "bar" }, { name: "Male", type: "bar" }]
      },
      options: options
    };
  };
  render(){
    return(
      <EChartsReact
      // option={{
      //   xAxis:{
      //     type:"category",
      //     data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
      //   },
      //   yAxis:{
      //     type:"value"
      //   },
      //   series: [{ 
      //     data: [820, 932, 901, 934, 1290, 1330, 1320],
      //     type: "line"
      //   }]
      // }}
      option={this.getOption()}
      style={{height:"80vh",left:50,top:50,width:"90vw"}}
      opts={{renderer:"svg"}}
      />
    )
  }
}
export default App;
import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

function drawChart(data, chartContainerRef) {
  //chartContainerRef is the reference to the DOM element where a DOM element has to be mounted
  const myChart = echarts.init(chartContainerRef.current); //Initialized e charts  passing chartContainerRef.current as reference

  const option = {
    responsive: true, // chart will resize and reposition its elements for different kind of devices
    maintainAspectRatio: false, //allow to adjust its size based on the container resize.MAINTAINS SAME WIDTH TO HEIGHT RATIO WHEN RESIZED,if it is false means it can resize freely in the container
    title: {
      text: "Service Costs",
      left: "center", //In echarts it is used to horizontally align a component
      top: "20px",
      textStyle: {
        //for title Styling
        fontSize: 30,
        fontWeight: "bold",
        color: "#58A399",
      },
    },
    grid: {//grid is used for customizing position of charts
      left: "15%",
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.service),
      axisLabel: {
        //for xaxis styling
        rotate: 45,
        fontSize: 12,
        fontWeight: "bold",
        color: "black",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: "black",
      },
    },
    tooltip: {
      trigger: "item", //Trigger for item in this case bars
      formatter: (params) => {
        //params contain information about the bar when hovered over
        const { name, value } = params;
        return `${name}: $${value}`;
      },
    },
    series: [
      {
        data: data.map((item) => item.cost),
        type: "bar",
        label: {
          show: true,
          position: "top", //vertical alignment of the label Cost(USD)
          fontSize: 12,
          fontWeight: "bold",
        },
        itemStyle: {
          //Applying styles for individual data items
          color: {
            type: "linear", //linear gradient
            x: 0,
            y: 0,
            x2: 1,
            y2: 0, //gradient starts from top left corner and ends in top right corner
            colorStops: [
              {
                offset: 0,
                color: "#47F3D0", // color at 0% position
              },
              {
                offset: 0.52,
                color: "#278EF1", // color at 52% position
              },
              {
                offset: 1,
                color: "#CB5EDC", // color at 100% position
              },
            ],
            global: false,
          },
          borderColor: "black",
          borderWidth: 0.5,
        },
      },
    ],
  };
  myChart.setOption(option);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
}

function App() {
  const [loading, setLoading] = useState(false);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://mocki.io/v1/6f82167d-b7cb-42ad-924e-f74ea8c9ac4b")
      .then((response) => response.json())
      .then((data) => {
        drawChart(data.data, chartContainerRef);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          ref={chartContainerRef}
          style={{ width: "100%", height: "80%" }}
        ></div>
      )}
    </div>
  );
}

export default App;

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getItems,
  getArticleCount,
  getGenreCount,
} from "../actions/itemActions";
// Step 2 - Including the react-fusioncharts component
import ReactFC from "react-fusioncharts";
// Step 3 - Including the fusioncharts library
import FusionCharts from "fusioncharts";
// Step 4 - Including the chart type
import Column2D from "fusioncharts/fusioncharts.charts";
// Step 5 - Including the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// Step 7 - Creating the JSON object to store the chart configurations
const chartConfig1 = {
  type: "column2d", // The chart type
  width: "550", // Width of the chart
  height: "350", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption: "Top Writers",
      xAxisName: "User",
      yAxisName: "No. of Articles",
      numberSuffix: "",
      theme: "fusion",
    },
    // Chart Data
    data: [
      {
        label: "User3",
        value: "23",
      },
      {
        label: "User8",
        value: "17",
      },
      {
        label: "User1",
        value: "15",
      },
      {
        label: "User5",
        value: "14",
      },
      {
        label: "User7",
        value: "12",
      },
    ],
  },
};

const chartConfig2 = {
  type: "doughnut3d", // The chart type
  width: "550", // Width of the chart
  height: "350", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption: "Top Genres",
      startingAngle: "310",
      defaultCenterLabel: "Top Genres",
      showTooltip: "0",
      decimals: "0",
      theme: "fusion",
    },
    // Chart Data
    data: [
      {
        label: "Thriller",
        value: "35",
      },
      {
        label: "Fiction",
        value: "27",
      },
      {
        label: "Comedy",
        value: "19",
      },
      {
        label: "Romance",
        value: "17",
      },
      {
        label: "Mystery",
        value: "2",
      },
    ],
  },
};

let chart1_data = [];
let chart2_data = [];
class ChartContainer extends Component {
  render() {
    const { articlecount, genrecount } = this.props.item;
    if (articlecount && genrecount) {
      chart1_data = [];
      chart2_data = [];
      articlecount
        .map(({ _id, count }) =>
          chart1_data.push({ label: _id, value: count })
        );
      genrecount.map(({ _id, count }) =>
        chart2_data.push({ label: _id, value: count })
      );
    }
    let data = {
      ...chartConfig1,
      dataSource: {
        chart: {
          caption: "Top Writers",
          startingAngle: "310",
          defaultCenterLabel: "Top Writers",
          showTooltip: "0",
          decimals: "0",
          theme: "fusion",
        },
        data: chart1_data,
      },
    };

    let data2 = {
      ...chartConfig2,
      dataSource: {
        // Chart Configuration
        chart: {
          caption: "Top Genres",
          startingAngle: "310",
          defaultCenterLabel: "Top Genres",
          showTooltip: "0",
          decimals: "0",
          theme: "fusion",
        },
        data: chart2_data,
      },
    };

    return (
      <div className="row card__box">
        <ReactFC {...data}/>
        <ReactFC {...data2} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item, //from reducer
});

export default connect(mapStateToProps, {
  getItems,
  getArticleCount,
  getGenreCount,
})(ChartContainer);

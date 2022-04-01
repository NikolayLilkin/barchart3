import React, {Component} from "react";
import * as d3 from 'd3';
import './BarChart.css';

class BarChart extends Component{
    constructor(props){
      super(props);
      this.drawBarChart = this.drawBarChart.bind(this);
    }
    componentDidMount(){
      this.drawBarChart();
    }
    drawBarChart(){
      let url="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
      fetch(url).then(respone => respone.json()).then(data => {
        const result = data.data;
        const mapedData=result.map( x => {
      //1947-01-01
        let year = x[0].substring(0,4);
        let quarter = "";
        switch (x[0].substring(5,7)) {
          case "01":
              quarter=" Q1";
              break;
          case "04":
              quarter=" Q2";
              break;
          case "07":
              quarter=" Q3";
              break;
          case "10":
              quarter=" Q4";
              break;
          default:
              break;
          } 
      return [year,quarter,x[1]]});
      var margin = {top: 10, right: 30, bottom: 90, left: 40},
      width = 900 - margin.left - margin.right,
      height = 560 - margin.top - margin.bottom;  
      var svg = d3.select(this.refs.canvas)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("border", "1px solid black")
      .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");
      var x = d3.scaleLinear();
      x.range([ 0, width])
      x.domain([1947,2016]);
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
      var y = d3.scaleLinear();
      y.domain([0, 18064.7])
      y.range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
      const tooltip = d3.select("body")
        .append("div")
        .attr("class","d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "#fff")
        .text("a simple tooltip");    
      svg.selectAll("mybar")
        .data(mapedData)
        .enter()
        .append("rect")
          .attr("x",(d,i) => i*3.01)
          .attr("width", 2)
          .attr("fill", "#69b3a2")
          .attr("class","bar")
          .attr("height", (d,i) => height - y(d[2])) // always equal to 0
          .attr("y", (d,i) => {
            return y(d[2]);  
          })
          .on("mouseover", function(d, i) {
            tooltip.html(`Data: ${i[0] + " "+ i[1]+" $"+i[2]+" Billion" }`).style("visibility", "visible");
          })
          .on("mousemove", function(event){
            tooltip
              .style("top", (event.pageY-10)+"px")
              .style("left",(event.pageX+10)+"px");
          })
          .on("mouseout", function() {
            tooltip.html(``).style("visibility", "hidden");
            d3.select(this).attr("fill", "#69b3a2");
          });
          svg.append("text")      
          .attr("x", 420 )
          .attr("y", 40 )
          .style("text-anchor", "middle")
          .style("fill","white")
          .style("font-size","36")
          .text("United States GDP");
          svg.append("text")      
          .attr("x", 640 )
          .attr("y", 520 )
          .style("text-anchor", "middle")
          .style("font-size","14")
          .style("fill","white")
          .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf");
          svg.append("text")      
          .attr("x", -200)
          .attr("y", 35 )
          .attr("transform","rotate(-90)")
          .style("text-anchor", "middle")
          .style("font-size","22")
          .style("fill","white")
          .text("Gross Domestic Product");
      });
    }
    render(){
      return (<div ref="canvas">
      </div>);
    }
}
export default BarChart;
/** COMPONENT CHART - 1.0.0 ****************************************************/
var chart_html = '';

var chart_css = '';
chart_css += '<style>';
chart_css += 'chart-component { display: hidden; position: relative; background-color: red !important; }';
chart_css += '</style>';

function ChartComponentCtrl() {
  var chartCtrl = this;
  chartCtrl.$onInit = function() {
    //set element
    var elem = document.getElementsByName(chartCtrl.elem)[0];
    elem.setAttribute("id", chartCtrl.elem);

    //get master width of li
    var charts = document.getElementsByClassName("canvasjs-chart");
    var width = charts.item(0).clientWidth;

    //config canvasjs
    chartCtrl.config.height = width;
    chartCtrl.config.width = (chartCtrl.config.height * 0.8);

    //set height of li containers
    for(i = 0; i < charts.length; i++) document.getElementsByClassName("canvasjs-chart")[i].style.height = (width * 1.25) + "px";

    //render chart
    var chart = new CanvasJS.Chart(chartCtrl.elem, chartCtrl.config);
    chart.render();
  }
}
const chartComponent = {
  controller: ChartComponentCtrl,
  controllerAs: 'chartCtrl',
  bindings: {
    config: '<',
    elem: '<'
  },
  template: chart_css + chart_html
};
angular.module('app').component('chartComponent', chartComponent);

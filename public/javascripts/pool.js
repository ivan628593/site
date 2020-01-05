var id = ["#dashboard_on", "#blocks_on", "#miners_on", "#howto_on"];

function hide_all() {
  id.forEach(function(item, i, id) {
    $(item).hide();
  })
}

hide_all();
$("#dashboard_on").show();

$("#dashboard").on("click", function() {
  hide_all();
  $("#dashboard_on").show();
});
$("#blocks").on("click", function() {
  hide_all();
  $("#blocks_on").show();
});
$("#miners").on("click", function() {
  hide_all();
  $("#miners_on").show();
});
$("#howto").on("click", function() {
  hide_all();
  $("#howto_on").show();
});

var port = document.location.pathname;
port = port.split("/");
port = port[port.length-1];

document.addEventListener('DOMContentLoaded', function () {
var options = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: '',

            }]
        }


    $.ajax({
        url: '/graphic/'+port+'/period/0',
        success: function(data) {
            options.series[0].type= "spline";
            options.series[0].data = data;
            Highcharts.chart('container', options);
          }
    });
  });

// window.onload = function() {
//
// var dataPoints = [];
//
// var options =  {
// 	animationEnabled: true,
// 	theme: "light2",
// 	title: {
// 		text: "Daily Sales Data"
// 	},
// 	axisX: {
// 		valueFormatString: "DD MM YYYY",
// 	},
// 	axisY: {
// 		title: "??",
// 		titleFontSize: 24,
// 		includeZero: false
// 	},
// 	data: [{
// 		type: "spline",
// 		yValueFormatString: "$#",
// 		dataPoints: dataPoints
// 	}]
// };
//
// function addData(data) {
// 	for (var i = 0; i < data.length; i++) {
// 		dataPoints.push({
// 			x: new Date(data[i][0]*1000),
// 			y: data[i][1]
// 		});
// 	}
// 	$("#container").CanvasJSChart(options);
//
// }
// $.getJSON("/graphic/"+port+"/period/1", addData);
//
// }

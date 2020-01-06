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
port = port[port.length - 1];

document.addEventListener('DOMContentLoaded', function() {
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

  let k = 0;

  update(k);
  $(".time").on('click',function(){
    var id= $(this).attr("id");
    k=id;
    update(k);

  });

  function update(a) {

    $.ajax({
      url: '/graphic/' + port + '/period/' + a,
      success: function(data) {
        options.series[0].type = "spline";
        options.series[0].data = data;
        Highcharts.chart('container', options);
      }
    })
  }

    setInterval(function(){update(k);},300000);
})

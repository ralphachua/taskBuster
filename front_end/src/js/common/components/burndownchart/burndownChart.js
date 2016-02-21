define(['jquery',
        'vue',
        'vue-resource',
        'highcharts',
        'text!./burndownChart.html'],
        'common/global_config'
function ($, Vue, Resource, highcharts, Template, config) {

  var renderBurndownChart = function(options) {
    var title = options.title || {
      text: '',
      x: -20
    };
    var subtitle = options.subtitle || {
      text: 'Sprint 1',
      x: -20
    };
    var colors = options.colors || ['blue', 'red'];

    var plotOptions = options.plotOptions || {
      line: {lineWidth: 3},
      tooltip: {hideDelay: 200}
    };

    if (options.xAxis) {
      options.xAxis.labels = {
        style: {"color": "#FFF"}
      };
    }
    var xAxis = options.xAxis || {
      title: {
        text: 'Days'
      },
      categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
        'Day 7', 'Day 8', 'Day 9', 'Day 10'],
        labels: {
          style: {"color": "#FFF"}
        }
    };

    if (options.yAxis) {
      options.yAxis.plotLines = [{
        value: 0,
        width: 1
      }];

      options.yAxis.labels = {
        style: {"color": "#FFF"}
      };
    }
    var yAxis = options.yAxis || {
      title: {
        text: 'Points'
      },
      plotLines: [{
        value: 0,
        width: 1
      }],
      labels: {
        style: {"color": "#FFF"}
      }
    };

    var tooltip = options.tooltip || {
      valueSuffix: ' pts',
      crosshairs: true,
      shared: true
    };

    var legend = options.legend || {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
      itemStyle: {"color": "#FFF"}
    };

    if (options.idealBurn) {
      options.idealBurn = {
        name: 'Ideal Burn',
        color: '#E747A8',
        lineWidth: 2,
        data: options.idealBurn
      };
    }
    var idealBurn = options.idealBurn || {
      name: 'Ideal Burn',
      color: '#E747A8',
      lineWidth: 2,
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
    };

    if (options.actualBurn) {
      options.actualBurn = {
        name: 'Actual Burn',
        color: '#72DFFF',
        marker: {radius: 6},
        data: options.actualBurn
      };
    }
    var actualBurn = options.actualBurn || {
      name: 'Actual Burn',
      color: '#72DFFF',
      marker: {radius: 6},
      data: [100, 110, 85, 60, 60, 30, 32, 23, 9, 2]
    };

    var highchartsOptions = {
      title: title,
      subtitle: subtitle,
      colors: colors,
      plotOptions: plotOptions,
      xAxis: xAxis,
      yAxis: yAxis,
      tooltip: tooltip,
      legend: legend,
      series: [idealBurn, actualBurn],
      chart: {
        backgroundColor: '#212F3E'
      }
    };

    $('#burndown-chart').highcharts(highchartsOptions);
  };


  var requestBurndown = function(vueComponent, projectId, done) {
    var xhr = {
      url: config.API_HOST +'projects/' + projectId + '/burndown',
      method: 'GET'
    };

    vueComponent.$http(xhr).then(
      function onSuccess(response) {
        return done(null, response);
      },

      function onError(response) {
        return done(response);
      }
    );
  };


  return Vue.extend({
    template: Template,
    props: {
      title: {
        type: String,
        required: false
      }
    },
    data: function() {
      return {
        burndownData: {}
      };
    },
    compiled: function() {

    },
    ready: function() {
      var self = this;
      var projectId = this.$route.query.projectId;

      requestBurndown(self, projectId, function(err, response) {
        if (err) {
          console.log('err: ', err);
          return;
        }

        renderBurndownChart(response.data.data);
      });
    }
  });

});

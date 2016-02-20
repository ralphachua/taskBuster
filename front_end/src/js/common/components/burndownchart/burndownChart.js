define(['jquery',
        'vue',
        'vue-resource',
        'highcharts',
        'text!./burndownChart.html'],
function ($, Vue, Resource, highcharts, Template) {

  var renderBurndownChart = function(options, done) {
    console.group('@burndownChart');
    console.log('renderBurndownChart');

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

    var idealBurn = options.idealBurn || {
      name: 'Ideal Burn',
      color: '#E747A8',
      lineWidth: 2,
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
    };

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

    console.log(highchartsOptions);

    $('#burndown-chart').highcharts(highchartsOptions);

    console.groupEnd();
  };


  var requestBurndown = function(vueComponent, xhr, done) {
    vueComponent.$http(xhr).then(function onSuccess(response) {
      return done(response);
    }, function onError(response) {
      return done(response);
    });
  };


  return Vue.extend({
    template: Template,
    props: {
      title: {
        type: String,
        required: false
      },
      data: {
        type: Object,
        required: false,
        twoWay: true
      }
    },
    methods: {
      requestBurndown: function() {
        console.group('@burndownChart');
        console.log('requestBurndown');

        var projectId = "123-2016-1-000000001";
        var xhr = {
          url: 'http://localhost:1337/loans/' + projectId + '/overview',
          method: 'GET'
        };

        renderBurndownChart({});

        console.groupEnd();
      }
    },
    compiled: function() {
      console.group('@burndownChart');
      console.log('compiled');

      var projectId = "123-2016-1-000000001";
      var xhr = {
        url: 'http://localhost:1337/loans/' + projectId + '/overview',
        method: 'GET'
      };

      this.requestBurndown();

      console.groupEnd();
    },
    ready: function() {
      console.group('@burndownChart');
      console.log('ready');

      renderBurndownChart({});

      console.groupEnd();
    }
  });

});

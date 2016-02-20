define(['jquery', 'vue', 'vue-resource', 'highcharts', 'text!./burndownChart.html'], function ($, Vue, Resource, highcharts, Template) {
  Vue.use(Resource);

  var renderBurndownChart = function(options, done) {
    console.group('@burndownChart');
    console.log('renderBurndownChart');

    var title = options.title || {
      text: 'Burndown Chart',
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
        'Day 7', 'Day 8', 'Day 9', 'Day 10']
    };

    var yAxis = options.yAxis || {
      title: {
        text: 'Points'
      },
      plotLines: [{
        value: 0,
        width: 1
      }]
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
      borderWidth: 0
    };

    var idealBurn = options.idealBurn || {
      name: 'Ideal Burn',
      color: 'rgba(255,0,0,0.25)',
      lineWidth: 2,
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
    };

    var actualBurn = options.actualBurn || {
      name: 'Actual Burn',
      color: 'rgba(0, 120, 200, 0.75)',
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
      series: [idealBurn, actualBurn]
    };

    console.log(highchartsOptions);

    $('#burndown-chart').highcharts(highchartsOptions);

    console.groupEnd();
  };


  var requestBurndown = function(vueComponent, xhr, done) {
    console.group('@burndownChart');
    console.log(vueComponent);
    console.log(xhr);
    vueComponent.$http(xhr).then(function onSuccess(response) {
      console.log("onSuccess");
      console.groupEnd();
      return done(response);
    }, function onError(response) {
      console.log("onError");
      console.groupEnd();
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

        //requestBurndown(this, xhr, function onRequestBurndown(response) {
        //  console.log(response);
        //});

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

      //requestBurndown(this, xhr, function onRequestBurndown(response) {
      //  console.log(response);
      //});

      //renderBurndownChart({});

      console.groupEnd();
    },
    ready: function() {
      console.group('@burndownChart');
      console.log('ready');

      renderBurndownChart({});

      console.groupEnd();
    }
  });

  /*
  var burndown = Vue.extend({
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
        console.group('@burndown');
          console.log('requestBurndown');
          var args = {
            projectId: "123-2016-1-000000001"
          };
          this.$dispatch('requestBurndown', args);
          console.log("dispatched: ", args);
        console.groupEnd();
      }
    },
    compiled: function() {

    }
  });

  return {
    burndownComponent: burndown
  };
  */
});

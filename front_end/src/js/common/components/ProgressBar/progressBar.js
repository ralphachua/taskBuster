define(['vue', 'text!./progressBar.html'], function (Vue, Template){
  return Vue.extend({
    template: Template,
    props: {
      text: {
        type: String,
      },
      progress:{
        type: Number,
        required: true
      },
      min:{
        type: Number,
        required: true
      },
      max:{
        type: Number,
        required: true
      }
    },
    computed: {
      percentage: function () {
        return (this.progress/this.max)*100;
      }
    }
  });
});

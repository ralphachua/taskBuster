define(['vue', 'text!./projectentry.html'],function(Vue, Template){
  return Vue.extend({
    template: Template,
    props: {
      name:{
        type: String,
        required: true,
        twoWay: true
      },
      due:{
        type: String,
        required: true,
        twoWay: true
      },
      id:{
        type: String,
        required: true,
        twoWay: true
      }
    }});
});
define(['vue', 'text!./ProjectItem.html'],function(Vue, Template){
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
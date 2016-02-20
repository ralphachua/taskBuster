define([
  'jquery',
  'vue',
  'vue-resource',
  'text!test.html'
],
function ($, Vue, Resource, test) {
  Vue.use(Resource);
  console.log(test);
});

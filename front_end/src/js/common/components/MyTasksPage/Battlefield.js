define(['vue',
        'text!./Battlefield.html',
        'phaser'
], function (Vue, Template, Phaser) {
  return Vue.extend({
    template: Template
  });
});

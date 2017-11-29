/*global define*/

define([
  'underscore',
  'backbone',
  'models/Home'
], function (_, Backbone, HomeModel) {
  'use strict';

  var HomeCollection = Backbone.Collection.extend({
    model: HomeModel
  });

  return HomeCollection;
});

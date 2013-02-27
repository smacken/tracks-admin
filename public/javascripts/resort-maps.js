var Resort = function(resort){
  var self = this;
  this.name = ko.observable(resort.name || '');
  this.country = ko.observable(resort.country || '');
  this.region = ko.observable(resort.region || '');

  this.title = ko.computed(function(){
    return self.name() + ' - ' + self.region() + ', ' + self.country();
  }, self);
};

var Map = function(map){
  var self = this;
  this.name = ko.observable(map.name || '');
  this.url = ko.observable(map.url || '');
};

var MapViewModel = (function(){
  function MapViewModel(){
    this.resort = ko.observable();
    this.maps = ko.observableArray();
    this.newMap = ko.observable();
  }

  return MapViewModel;
})();

MapViewModel.prototype = {
  getResort: function(id){
    var self = this;
    var request = {
      url: '/api/resort/' + id,
      type: 'GET',
      data: { id: id}
    };
    $.ajax(request)
     .then(function(response){
      self.resort(new Resort(response));
     })
     .fail(function(error){
      console.log(error);
     });
  },
  save: function(){
    var self = this;

  },
  addMap: function(){
    var self = this;

    var request = {
      url: '/api/',
      type: 'POST',
      data: self.newMap.toJSON()
    };
    $.ajax(request)
     .then(function(response){
      console.log(response);
     })
     .fail(function(error){
      console.log(error);
     });
  }
};

$(document).ready(function(){
  var map = new MapViewModel();

  //get the querystring
  var resort = $('h1#title').data('id');
  map.getResort(resort);

  ko.applyBindings(map);
});
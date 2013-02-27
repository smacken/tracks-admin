
var Resort = function(resort){
  var self = this;
  self.id = ko.observable(resort._id || '0');
  self.name = ko.observable(resort.name || '');
  self.country = ko.observable(resort.country || '');
  self.region = ko.observable(resort.region || '');
  self.mapUrl = ko.computed(function(){
    return '/resort-map/' + self.id();
  });
  self.detailUrl = ko.computed(function(){
    return '/resort-detail/' + self.id();
  });
};

var ResortView = (function(){

  /**
   * ResortView Constructor
   */
  function ResortView(){
    this.resorts = ko.observableArray();
    this.addResort = new Resort({id: '0', name: '', country: '', region: ''});
    this.countries = "[\"Canada\", \"U.S.A\", \"New Zealand\", \"France\"]";
  }

  ResortView.prototype = {
    /**
     * Get the list of resorts
     * @return {[Resort]}
     */
    getResorts: function(){
      var self = this;
      var resortRequest = {
        url: '/api/resorts/',
        type: 'GET',
        dataType: 'json'
      };
      $.ajax(resortRequest)
       .then(function(resorts) {
        $.each(resorts, function(idx, resort){
          self.resorts.push(new Resort(resort));
        });
       }, 
        function(error){
          $(document).trigger('note.error', { message: error });
        });
    },
    add: function(){
      var self = this;
      var request = {
        url: '/api/resort',
        type: 'POST',
        data: self.addResort
      };
      self.resorts.push(self.addResort);
      $.ajax(request)
       .then(function(response){
          console.log(response);
       })
       .fail(function(error){
        console.log(error);
        $(document).trigger('note.error', {message: error});
       });
    },
    delete: function(){

    }
  };

  return ResortView;
})();


$(document).ready(function(){
  var resortView = new ResortView();
  resortView.getResorts();

  ko.applyBindings(resortView);
});
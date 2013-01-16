
var ResortView = (function(){

  /**
   * ResortView Constructor
   */
  function ResortView(){

  }

  ResortView.prototype = {
    /**
     * Get the list of resorts
     * @return {[Resort]}
     */
    getResorts: function(){

      var resortRequest = {
        url: '/api/resorts/',
        type: 'GET'
      };
      $.ajax(resortRequest)
       .then(function(resorts){
        // bind the resorts using knockout to the template
       }, 
        function(error){

          // display the error notification
        });
    }
  };

  return ResortView;
})();


$(document).ready(function(){
  var resortView = new ResortView();
});
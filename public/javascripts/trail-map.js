// require modernizr

var TrailMapViewModel = (function(){
  function TrailMapViewModel(){
    console.log('ctor');
    var self = this;

    this.stage = new Kinetic.Stage({
      container: 'trail-map',
      
      // will come from the resolution of the image(map)
      width: 800,
      height: 600
    });

    this.mapLayer = new Kinetic.Layer({});

    var trailImage = new Image();
    trailImage.onload = function(){
      console.log('trail map loaded');
      self.map = new Kinetic.Image({
        
        image: trailImage,
        width: 800,
        height: 600
      });

      self.mapLayer.add(self.map);
      self.stage.add(self.mapLayer);
      self.mapLayer.moveToBottom();
    };
    trailImage.src = 'http://cypressmountain.com/sites/default/files/Black%20Mountain%20Trail%20Map.jpg';
    

    this.trackStage = new Kinetic.Stage({
      container: 'tracks',
      width: 200,
      height: 400
    });

    this.trackLayer = new Kinetic.Layer();

    // foreach track
    // 
    var trackGroup = new Kinetic.Group({
      x: 455,
      y: 195,
      draggable: true,
      id: 'panorama'
    });
    var box = new Kinetic.Rect({
      //x: 455,
      //y: 195,
      width: 15,
      height: 15,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 1,
      //draggable: true,
      id: 'track1'
    });

    // add cursor styling
    box.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    box.on('mouseout', function() {
      document.body.style.cursor = 'default';
    });
    trackGroup.on('dragend', function(elem){
      console.log(trackGroup.attrs.id);
      var trail = self.stage.get('#' + box.attrs.id)[0];
      if(trail){
        console.log(trackGroup.getPosition().x);
        console.log(trackGroup.getPosition().y);  
        //trackGroup.setPosition()
      }
      trackGroup.moveToTop();

      console.log(trackGroup.parent);
      trackGroup.parent.draw();
    });

    var trackLabel = new Kinetic.Text({
      x: 20,
      y: 0,
      text: 'Panorama',
      fill: 'black',
      fontSize: 14,
      fontFamily: 'Calibri'
    });

    trackGroup.add(box);
    trackGroup.add(trackLabel);
    this.trackLayer.add(trackGroup);
    //this.trackStage.add(this.trackLayer);
    this.stage.add(this.trackLayer);
    this.trackLayer.moveUp();
    box.moveToTop();
    this.trackLayer.draw();

    var selectLayer = new Kinetic.Layer({});

    var selectionGrid = new Kinetic.Rect({
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      fill: 'white',
      opacity: 0.7,
      stroke: 'black',
      strokeWidth: 2
    });

    var selectionTitle = new Kinetic.Text({
      x: 10,
      y: 5,
      text: 'Tracks',
      fontSize: 14,
      fill: 'black'
    });

    selectLayer.add(selectionGrid);
    selectLayer.add(selectionTitle);
    //selectionGrid.moveUp();
    //selectLayer.draw();

    this.stage.add(selectLayer);

    //configureTrailPreview();
    //
    $(this.stage.get('#track1')[0]).popover({
      placement: 'top',
      content: 'test',
      html: false,
      title: 'Fort Knox'
    });
  }

  function configureTrailPreview(){
    console.log('configuring popover');
    $(this.stage.get('#track1')[0]).popover({
      placement: 'top',
      content: 'test',
      html: false,
      title: 'Fort Knox'
    });
  }

  return TrailMapViewModel;
})();

$(document).ready(function(){
    //loadKinetic();
    var trailMap = new TrailMapViewModel();
    document.trailMap = trailMap;
});

function loadKinetic(){
  yepnope([{
    load: '/components/kinetic/kinetic.min.js',
    complete: function(){
      //var trailMap = new TrailMapViewModel();
      console.log('kinect loaded');
    }
  }]);
}

/**
 * Helper function for passing arrays of promises to $.when
 */
jQuery.whenArray = function ( array ) {
  return jQuery.when.apply( this, array );
};


/**
 * Accepts a single image src or an array of image srcs.
 * @return Promise that resolves once images have loaded.
 */
function preloadImages (srcs) {
  var dfd = $.Deferred(),
    promises = [],
    img,
    l,
    p;
  
  if (!$.isArray(srcs)) {
    srcs = [srcs];
  }
  
  l = srcs.length;

  for (var i = 0; i < l; i++) {
    p = $.Deferred();
    img = $("<img />");
    
    img.load(p.resolve);
    img.error(p.resolve);
    
    promises.push(p);

    img.get(0).src = srcs[i];
  }

  $.whenArray(promises).done(dfd.resolve);
  return dfd.promise();
}

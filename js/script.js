  // var basemapUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
  // var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});




  var manhattan = [40.748818,-73.983650];
  var brooklyn = [40.624376,-73.952065];
  var bronx = [40.841606, -73.874817];
  var queens = [40.731389, -73.859024];
  var statenisland = [40.581106, -74.148788];

  var myZoom = 12;
  //now the fun stuff:  leaflet!
  var map3 = L.map('map3').setView( [40.743615, -73.925285], 11);
    map3.addLayer(layer)
  // //Let's add a marker
  // var marker = L.marker([40.768058,-73.981891]).addTo(map);
  // marker.bindPopup("<b>Hello world!</b><br>I am a popup.")
  //Now let's use our custom-made array to make many markers

  var panOptions = {
    animate: true,
    duration: 2
  }

      $(".myButton").click(function() {
      if($(this).attr('id') == 'one' ) {
        $(this).css('background-color','#453056');
        map3.panTo(manhattan, panOptions);
      } 
      
      else 
        if 

      ($(this).attr('id') == 'two' ) {
        $(this).css('background-color','#453056');
        map3.panTo(brooklyn, panOptions);
      } 

      else 
        if 

      ($(this).attr('id') == 'three' ) {
        $(this).css('background-color','#453056');
        map3.panTo(bronx, panOptions);
      } 

      else 
        if 

      ($(this).attr('id') == 'four' ) {
        $(this).css('background-color','#453056');
        map3.panTo(queens, panOptions);
      } 


      else {

   
        $(this).css('background-color','#453056');
        map3.panTo(statenisland, panOptions);
      }
    });


  //CartoDB Basemap
  // L.tileLayer(basemapUrl,{
  //   attribution: attribution
  // }).addTo(map3);


  var geojson;

  //this function takes a value and returns a color based on which bucket the value falls between
  function getColor(burden) {
      return burden > 40 ? '#67000d' :
             burden > 35  ? '#cb181d' :
             burden > 30  ? '#ef3b2c' :
             burden > 25   ? '#fb6a4a' :
             burden > 20   ? '#fc9272' :
             burden > 15   ? '#fcbba1' :
                        '#fee5d9';
  }

  //this function returns a style object, but dynamically sets fillColor based on the data
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.rbpercent),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.7
    };
  }

  //this function is set to run when a user mouses over any polygon
  function mouseoverFunction(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#fff',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    //update the text in the infowindow with whatever was in the data
    console.log(layer.feature.properties.rbLocation);
    $('#infoWindow').text(layer.feature.properties.rbLocation); 

    console.log(layer.feature.properties.rbpercent);
    $('#infoWind').text(layer.feature.properties.rbpercent);

  }

  //this runs on mouseout
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  //this is executed once for each feature in the data, and adds listeners
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }


  //all of the helper functions are defined and ready to go, so let's get some data and render it!

  //be sure to specify style and onEachFeature options when calling L.geoJson().
  $.getJSON('data/rb.geojson', function(state_data) {
    geojson = L.geoJson(state_data,{
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map3);
  });

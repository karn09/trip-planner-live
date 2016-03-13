var map;
function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);

}

// GOOGLE MAPS 

function createMarker(obj) {
  var mapLatLng = new google.maps.LatLng(obj.place.location[0], obj.place.location[1]);
  var marker = new google.maps.Marker({
    position: mapLatLng,
    map: map,
    title: obj.name
  });
  var infowindow = new google.maps.InfoWindow({
    content: createInfoContent(obj)
  });

  var markerById = {
    id: obj._id,
    marker: marker
  };
  days[currentDay].addMarker(markerById);
  //  markers.push(markerById);

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  // marker.setMap(map);
  map.setCenter(mapLatLng);
}

$(document).ready(function() {
    initialize_gmaps();
});

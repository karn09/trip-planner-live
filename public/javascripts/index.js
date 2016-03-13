var markers = [],
    winState = {
      1: {
        markers: [],
        items: []
      }
    }

function winStateDay() {

}
function newItem(foundObj) {
  var newItem = `<li class='clearfix'>
    <span>` + foundObj.name + `</span>
    <button id=` + foundObj._id  +` class="btn btn-warning btn-xs pull-right">X</button>
  </li>`;
  return newItem;
}

function categoryAddItem (category, item) {
  $('.' + category).append(item);
}

function findByid (id, category) {
  category = category.toLowerCase();
  return window[category].find(function(val) {
    if (val._id === id) {
      return val;
    }
  });
}

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
    id : obj._id,
    marker: marker
  };
  markers.push(markerById);

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  // marker.setMap(map);
  map.setCenter(mapLatLng);
}

function removeMarker(id) {
  markers.find(function(marker, index) {
    if (marker.id === id) {
      marker.marker.setMap(null);
      markers.splice(index,1);
      return;
    }
  });
}

function createInfoContent (obj) {
  return '<h5>' + obj.name + '</h5>'
        + '<p>' + obj.place.address +  '</p>'
        + '<p>' + obj.place.city + ', '+ obj.place.state +'</p>'
        + '<p>' + obj.place.phone + '</p>'
}

function createActivityList () {
  var daysLength = $('.days-display').find('li').length;
  var daysTemplate = "<li class=''><a href='/'>" + daysLength + "</a></li>"
  var activityDayTemplate = "<label>My Hotel</label><ul class='Hotels list-unstyled clearfix'></ul><label>My Restaurants</label><ul class='Restaurants list-unstyled clearfix'></ul><label>My Activities</label><ul class='Activities list-unstyled clearfix'></ul></div>"

  $('.createday').parent().before(daysTemplate);
  $('.activitylist').html(activityDayTemplate);
}

$(document).ready(function() {

  $('.days-display').on('click', '.createday', function(e) {
    e.preventDefault();
    createActivityList();
  });
  $('.selector').on('click', '.addButton', function(e) {
    var selected = $(this).parents('.selector');
    var selectedItem = selected.find('option:selected');
    var category = selected.find('label').html();
    var foundItem = findByid(selectedItem.val(), category);
    categoryAddItem(category, newItem(foundItem));
    createMarker(foundItem);
  });

  $('.panel-body').on('click', '.btn-warning', function(e) {
    var currentId = $(this).attr('id')
    $(this).parent()[0].remove();
    removeMarker(currentId);
  });


});

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
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  // marker.setMap(map);
  map.setCenter(mapLatLng);
}

function createInfoContent (obj) {
  return '<h5>' + obj.name + '</h5>'
        + '<p>' + obj.place.address +  '</p>'
        + '<p>' + obj.place.city + ', '+ obj.place.state +'</p>'
        + '<p>' + obj.place.phone + '</p>'
}

$(document).ready(function() {
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
  });


});

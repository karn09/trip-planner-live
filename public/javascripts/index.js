var markers = [];
var days = [];
var currentDay = 0;

function init() {
  var defState = new WindowState(1);
  defState.makeCopy();
  days.push(defState);
}


function WindowState(day) {
  this.day = day;
  this.markers = [];
  this.items = [];
  this.copy = null;
}


WindowState.prototype.addMarker = function(marker) {
  this.markers.push(marker);
};

WindowState.prototype.addItem = function(type, item) {
  this.items.push({
    type: type,
    item: item
  });
};

WindowState.prototype.removeMarker = function(id) {
  var self = this;

  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i].id === id) {
      this.markers[i].marker.setMap(null);
      this.markers.splice(i, 1);
      console.log(this.markers);
      return;
    }
  }
};

WindowState.prototype.removeItem = function(id) {
  var self = this;
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].item._id === id) {
      this.items.splice(i, 1);
      console.log(this.items);
      return;
    }
  }
};

WindowState.prototype.makeCopy = function() {
  this.copy = $('.dayAgenda-cont').clone(true);
  console.log('make copy ran: ', this.copy);
};

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

function updateMarkers(dayObj) {
  for (var i = 0; i < dayObj.markers.length; i++) {
    dayObj.markers[i].marker.setMap(map);
  }
}

function clearMarkers(day) {

  for (var i = 0; i < day.markers.length; i++) {
      day.markers[i].marker.setMap(null);
  }
  console.log(day.markers);
  // map.setMapOnAll(null);
}
// TEMPLATING AND UX ACTIONS HERE

function newItem(foundObj) {
  var newItem = `<li class='clearfix'>
    <span>` + foundObj.name + `</span>
    <button id=` + foundObj._id + ` class="btn btn-warning btn-xs pull-right">X</button>
  </li>`;
  return newItem;
}

function categoryAddItem(category, item) {
  $('.' + category).append(item);
}

function findByid(id, category) {
  category = category.toLowerCase();
  return window[category].find(function(val) {
    if (val._id === id) {
      return val;
    }
  });
}

function createInfoContent(obj) {
  return '<h5>' + obj.name + '</h5>' + '<p>' + obj.place.address + '</p>' + '<p>' + obj.place.city + ', ' + obj.place.state + '</p>' + '<p>' + obj.place.phone + '</p>';
}

function createActivityList() {
  var daysLength = $('.days-display').find('li').length;
  $('.days-display').find('li').removeClass('active');
  var daysTemplate = "<li class='active'><a href='/'>" + daysLength + "</a></li>";
  var activityDayTemplate = "<label>My Hotel</label><ul class='Hotels list-unstyled clearfix'></ul><label>My Restaurants</label><ul class='Restaurants list-unstyled clearfix'></ul><label>My Activities</label><ul class='Activities list-unstyled clearfix'></ul></div>";

  currentDay = days.length;
  days.push(new WindowState(currentDay + 1));
  console.log(currentDay);

  $('.createday').parent().before(daysTemplate);
  $('.activitylist').html(activityDayTemplate);
}

function daySwitcher(day) {
  currentDay = Number(day) - 1; // off by one error.
  // $('.dayAgenda-cont').children().remove();
  $('.dayAgenda-cont').replaceWith(days[currentDay].copy);
}


// EVENT HANDLERS
$(document).ready(function() {

  $('#day-container').on('click', 'a', function(e) {
    e.preventDefault();
    if ($(this).hasClass('createday')) return;
    clearMarkers(days[currentDay]);
    daySwitcher($(this).html());
    updateMarkers(days[currentDay]);
    days[currentDay].makeCopy();
  });

  $('.days-display').on('click', '.createday', function(e) {
    e.preventDefault();
    clearMarkers(days[currentDay]);
    createActivityList();
    days[currentDay].makeCopy();
  });

  $('.selector').on('click', '.addButton', function(e) {
    var selected = $(this).parents('.selector');
    var selectedItem = selected.find('option:selected');
    var category = selected.find('label').html();
    var foundItem = findByid(selectedItem.val(), category);
    categoryAddItem(category, newItem(foundItem));
    days[currentDay].addItem(category, foundItem);
    createMarker(foundItem);
    days[currentDay].makeCopy();
  });

  $('.panel-body').on('click', '.btn-warning', function(e) {
    var currentId = $(this).attr('id');
    $(this).parent()[0].remove();
    console.log('remove button current day is : ', currentDay);
    days[currentDay].removeMarker(currentId);
    days[currentDay].removeItem(currentId);
    days[currentDay].makeCopy();
  });

  init();


});

var map;

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

var url = window.location.search.replace('?url=', '')

// http://stackoverflow.com/a/18222306
var urlregex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

if (urlregex.test(url)) {
  layer = L.tileLayer.iiif(url, {}).addTo(map);
}

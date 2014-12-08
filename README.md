## Leaflet-IIIF

A Leaflet plugin for viewing IIIF images.

Requires [Leaflet.js](http://leafletjs.com/) and [jQuery](http://jquery.com/)

Quick and easy to get going.

```
var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

L.tileLayer.iiif('http://example.com/iiifimage.jp2/info.json').addTo(map);
```
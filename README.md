## Leaflet-IIIF

A Leaflet plugin for viewing IIIF images. [See the demo](http://mejackreed.github.io/Leaflet-IIIF/examples/example.html)

Requires [Leaflet.js](http://leafletjs.com/) and [jQuery](http://jquery.com/)

#### Install with Bower

```
$ bower install leaflet-iiif
```

#### Quick and easy to get going.

```
var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

L.tileLayer.iiif('http://example.com/iiifimage.jp2/info.json').addTo(map);
```

Thanks to [klokantech/iiifviewer](https://github.com/klokantech/iiifviewer) and [turban/Leaflet.Zoomify](https://github.com/turban/Leaflet.Zoomify) who have similar plugins which were used in development of Leaflet-IIIF.
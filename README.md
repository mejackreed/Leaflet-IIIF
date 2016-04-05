## Leaflet-IIIF

A Leaflet plugin for viewing IIIF images. [See the demo](http://mejackreed.github.io/Leaflet-IIIF/examples/example.html)

Requires [Leaflet.js](http://leafletjs.com/) and [jQuery](http://jquery.com/)

### Examples

 - [Demo using the IIIF Image API](http://mejackreed.github.io/Leaflet-IIIF/examples/example.html)
 - [Demo parsing a IIIF manifest](http://mejackreed.github.io/Leaflet-IIIF/examples/manifest.html)

### Install with Bower

```
$ bower install leaflet-iiif
```

### Quick and easy to get going.

```
var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

L.tileLayer.iiif('http://example.com/iiifimage.jp2/info.json').addTo(map);
```

Thanks to [klokantech/iiifviewer](https://github.com/klokantech/iiifviewer) and [turban/Leaflet.Zoomify](https://github.com/turban/Leaflet.Zoomify) who have similar plugins which were used in development of Leaflet-IIIF.

### Options

Leaflet-IIIF extends [L.TileLayer](http://leafletjs.com/reference.html#tilelayer) and so many options available to L.TileLayer can be used with Leaflet-IIIF.

Option | Type | Default | Description
------ | ---- | ------- | -----------
`tileFormat` | `String` | `'jpg'` | The [format](http://iiif.io/api/image/2.0/#format) of the returned image.
`tileSize` | Number | 256 | Tile size (width and height in pixels, assuming tiles are square).
`fitBounds` | Boolean | true | Automatically center and fit the maps bounds to the added IIIF layer

### Development

Clone the repository

```
$ git clone https://github.com/mejackreed/Leaflet-IIIF.git
```

Install the dependencies

```
$ npm install
```

Run the server

```
$ npm start
```

Access the examples at http://127.0.0.1:8080/examples/example.html

### Leaflet-IIIF in the wild

Princeton Libraries used Leaflet-IIIF for its ["Plan of Versailles"](Plan of Versailles) map. This implementation uses GeoJSON annotation to annotate the map being served out by a IIIF server.

[http://rbsc.princeton.edu/versailles/map](http://rbsc.princeton.edu/versailles/map)
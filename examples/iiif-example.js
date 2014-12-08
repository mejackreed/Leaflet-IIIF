var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});
// http://iiif.klokantech.com/demo.jp2
// http://libimages.princeton.edu/loris2/pudl0076%2Fmap_pownall%2F00000001.jp2
L.tileLayer.iiif('http://libimages.princeton.edu/loris2/pudl0076%2Fmap_pownall%2F00000001.jp2/info.json', {
  continuousWorld: true
}).addTo(map);

var map, stanfordMlk, klokanDemo, princetonMap, iiifLayers;

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

stanfordMlk = L.tileLayer.iiif('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json', {
  attribution: '<a href="http://searchworks.stanford.edu/view/hg676jb4964">Martin Luther King Jr. & Joan Baez march to integrate schools, Grenada, MS, 1966</a>'
}).addTo(map);

princetonMap = L.tileLayer.iiif('http://libimages.princeton.edu/loris2/pudl0076%2Fmap_pownall%2F00000001.jp2/info.json');

klokanDemo = L.tileLayer.iiif('http://iiif.klokantech.com/demo.jp2/info.json');

iiifLayers = {
  'Martin Luther King Jr. & Joan Baez ...': stanfordMlk,
  'Princeton Map': princetonMap,
  'Klokan Tech Demo': klokanDemo
};

L.control.layers(iiifLayers).addTo(map);

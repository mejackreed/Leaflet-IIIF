var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});
// Other IIIF endpoints to try
// http://iiif.klokantech.com/demo.jp2
// http://libimages.princeton.edu/loris2/pudl0076%2Fmap_pownall%2F00000001.jp2
// https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json
L.tileLayer.iiif('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json', {
  attribution: '<a href="http://searchworks.stanford.edu/view/hg676jb4964">Martin Luther King Jr. & Joan Baez march to integrate schools, Grenada, MS, 1966</a>'
}).addTo(map);

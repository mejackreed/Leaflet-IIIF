var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});
// http://iiif.klokantech.com/demo.jp2
// http://libimages.princeton.edu/loris2/pudl0076%2Fmap_pownall%2F00000001.jp2
// https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json
L.tileLayer.iiif('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json').addTo(map);

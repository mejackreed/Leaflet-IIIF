var map, stanfordMlk, apostle, princetonMap, iiifLayers;

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

// stanfordMlk = L.tileLayer.iiif('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json', {
//   attribution: '<a href="http://searchworks.stanford.edu/view/hg676jb4964">Martin Luther King Jr. & Joan Baez march to integrate schools, Grenada, MS, 1966</a>'
// }).addTo(map);

princetonMap = L.tileLayer.iiif('http://libimages.princeton.edu/loris2/pudl0076%2Fmap_pownall%2F00000001.jp2/info.json', {
  attribution: '<a href="http://arks.princeton.edu/ark:/88435/02870w62c">The provinces of New York and New Jersey, with part of Pensilvania, and the Province of Quebec : drawn by Major Holland, Surveyor General, of the Northern District in America. Corrected and improved, from the original materials, by Governr. Pownall, Member of Parliament, 1776</a>'
}).addTo(map);

apostle = L.tileLayer.iiif('http://ids.lib.harvard.edu/ids/iiif/25286610/info.json', {
  attribution: '<a href="http://via.lib.harvard.edu/via/deliver/deepcontentItem?recordId=olvwork576793%2CVIT.BB%3A4906794">Apostle: Anonymous sculptor of Florence, 15th century (1401-1500)</a>'
});

iiifLayers = {
  // 'Martin Luther King Jr. & Joan Baez ...': stanfordMlk,
  'The provinces of New York and N...': princetonMap,
  'Apostle: Anonymous sculptor of Fl...': apostle
};

L.control.layers(iiifLayers).addTo(map);

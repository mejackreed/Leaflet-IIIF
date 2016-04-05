describe('L.TileLayer.Iiif', function() {
  var div;
  var map;

  beforeEach(function() {
    div = document.createElement('div');
    div.style.width = '800px';
    div.style.height = '600px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    map = L.map(div);
  });

  afterEach(function() {
    document.body.removeChild(div);
  });

  function iiifLayerFactory(options) {
    return L.tileLayer.iiif('http://localhost:9876/base/fixtures/mlk_info.json', options || {});
  }

  it('initializes the map', function(){
    expect(typeof (map)).toEqual('object');
  });

  describe('fitBounds', function() {
    var iiifLayer;

    beforeEach(function() {
      iiifLayer = iiifLayerFactory();
    });

    it('by default is on', function() {
      expect(iiifLayer.options.fitBounds).toBe(true);
      map.addLayer(iiifLayer);
    });
  });
});

describe('L.TileLayer.Iiif', function() {
  var div;
  var map;

  beforeEach(function() {
    div = document.createElement('div');
    div.style.width = '800px';
    div.style.height = '600px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    map = L.map(div, {
      center: [0, 0],
      crs: L.CRS.Simple,
      zoom: 0
    });
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

    it('by default is on', function(done) {
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.fitBounds).toBe(true);
        expect(map.getBounds().getSouthWest().toString()).toBe('LatLng(-539, -60)');
        expect(map.getBounds().getNorthEast().toString()).toBe('LatLng(61, 740)');
        done();
      });
    });

    it('can be configured not to be on', function(done) {
      var iiifLayerNoFitBounds = iiifLayerFactory({ fitBounds: false });
      map.addLayer(iiifLayerNoFitBounds);
      iiifLayerNoFitBounds.on('load', function() {
        expect(iiifLayerNoFitBounds.options.fitBounds).toBe(false);
        expect(map.getBounds().getSouthWest().toString()).toBe('LatLng(-300, -400)');
        expect(map.getBounds().getNorthEast().toString()).toBe('LatLng(300, 400)');
        done();
      });
    });
  });

  describe('quality', function() {
    var iiifLayer;

    it('by default is on', function(done) {
      iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/acrobat_info.json');
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.quality).toBe('default');
        done();
      });
    });

    it('can be specified', function(done) {
      iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/acrobat_info.json', {
        quality: 'gray'
      });
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.quality).toBe('gray');
        done();
      });
    });

    it('for a 1.1 compliance', function() {
      iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/statue_info.json');
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.quality).toBe('native');
        done();
      });
    });
  });
});

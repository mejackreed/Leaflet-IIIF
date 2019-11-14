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
    return L.tileLayer.iiif('http://localhost:9876/base/fixtures/mlk/info.json', options || {});
  }

  it('initializes the map', function(){
    expect(typeof (map)).toEqual('object');
  });

  describe('onAdd', function() {
    beforeEach(function() {
      iiifLayer = iiifLayerFactory();
    });

    afterEach(function() {
      iiifLayer.off('load');
    });
    
    it('with a fitable tileSize', function(done) {
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.minZoom).toBe(0);
        expect(iiifLayer.options.minNativeZoom).toBe(0);
        done();
      });
    });

    it('with a large tileSize tries to best fit size by setting minNativeZoom and minZoom', function(done) {
      var largeTileSize = L.tileLayer.iiif('http://localhost:9876/base/fixtures/cantaloupe/info.json');
      map.addLayer(largeTileSize);
      largeTileSize.on('load', function() {
        expect(largeTileSize.options.minZoom).toBe(-2);
        expect(largeTileSize.options.minNativeZoom).toBe(-2);
        expect(largeTileSize._prev_map_layersMinZoom).toBe(0)
        done();
      });
    });

  });
  
  describe('generated tile urls', function() {
    var iiifLayer;
    
    beforeEach(function() {
      iiifLayer = iiifLayerFactory();
    });

    // Cribbed from Leaflet https://github.com/Leaflet/Leaflet/blob/master/spec/suites/layer/tile/TileLayerSpec.js#L302-L309
    function eachImg(layer, callback) {
      var imgtags = layer._container.children[0].children;
      for (var i in imgtags) {
        if (imgtags[i].tagName === 'IMG') {
          callback(imgtags[i]);
        }
      }
    }

    // http://iiif.io/api/image/2.1/#canonical-uri-syntax
    it('generates a canonical url', function(done) {
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        var i = 0;
        eachImg(iiifLayer, function (img) {
          expect(img.src).toBe('http://localhost:9876/base/fixtures/mlk/0,0,5426,3820/679,/0/default.jpg')
          i++;
        });
        done();
      })
    });

    it('generates a v3 canonical url', function(done) {
      var v3Image = L.tileLayer.iiif('http://localhost:9876/base/fixtures/v3/info.json');
      map.addLayer(v3Image);
      v3Image.on('load', function() {
        var i = 0;
        eachImg(v3Image, function (img) {
          expect(img.src).toBe('http://localhost:9876/base/fixtures/v3/0,0,2000,1271/500,318/0/default.jpg')
          i++;
        });
        done();
      })
    });
    
  });

  describe('fitBounds', function() {
    var iiifLayer;

    beforeEach(function() {
      iiifLayer = iiifLayerFactory();
    });

    afterEach(function() {
      iiifLayer.off('load');
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

    it('with a large tile size', function(done) {
      var largeTileSize = L.tileLayer.iiif('http://localhost:9876/base/fixtures/cantaloupe/info.json');
      map.addLayer(largeTileSize);
      largeTileSize.on('load', function() {
        expect(largeTileSize.options.fitBounds).toBe(true);
        expect(map.getBounds().getSouthWest().toString()).toBe('LatLng(-1956, -592)');
        expect(map.getBounds().getNorthEast().toString()).toBe('LatLng(444, 2608)');
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
    
    afterEach(function() {
      iiifLayer.off('load');
    });

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

    it('for a 1.1 compliance', function(done) {
      iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/statue_info.json');
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.quality).toBe('native');
        done();
      });
    });

    it('when a profile object is given', function(done) {
      iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/profile_object/info.json');
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.quality).toBe('default');
        done();
      });
    });
  });

  describe('tileSize', function() {
    var iiifLayer;
    
    afterEach(function() {
      iiifLayer.off('load');
    });
    
    describe('when not specified', function() {
      it('uses the tileSize from info.json v2', function(done) {
        iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/mlk/info.json');
        map.addLayer(iiifLayer);
        iiifLayer.on('load', function() {
          expect(iiifLayer.options.tileSize).toBe(1024);
          done();
        });
      });
      it('uses the tileSize from info.json v1', function(done) {
        iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/statue_info.json');
        map.addLayer(iiifLayer);
        iiifLayer.on('load', function() {
          expect(iiifLayer.options.tileSize).toBe(1024);
          done();
        });
      });
      it('uses default tileSize (not specified in info.json)', function(done) {
        iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/edge_case/info.json');
        map.addLayer(iiifLayer);
        iiifLayer.on('load', function() {
          expect(iiifLayer.options.tileSize).toBe(256);
          done();
        });
      });
    });
    describe('when specified', function() {
      it('uses the explicitly defined one', function(done) {
        iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/mlk/info.json', {
          tileSize: 512 
        });
        map.addLayer(iiifLayer);
        iiifLayer.on('load', function() {
          expect(iiifLayer.options.tileSize).toBe(512);
          done();
        });
      });
    });
    
  });

  describe('negativeMinZoom', function() {

    var iiifLayer;

    beforeEach(function() {

      iiifLayer = L.tileLayer.iiif('http://localhost:9876/base/fixtures/cantaloupe/info.json');
      map.setMinZoom(-1);

      iiifLayer.addTo(map)
      
    });

    afterEach(function() {
      iiifLayer.off('load');
    });

    it('with a large tileSize and negative minZoom, ensure that the layer does not persist zoom changes', function(done) {
      
      Promise.all([iiifLayer._infoPromise]).then(function() {
        map.removeLayer(iiifLayer);
        map.addLayer(iiifLayer);
      });

        iiifLayer.on('load', function() {
          expect(iiifLayer.options.minZoom).toBe(-2);
          expect(iiifLayer.options.minNativeZoom).toBe(-2);
          done();
        });
      
    });
  });

  describe('setMaxBounds', function() {
    var iiifLayer;

    beforeEach(function() {
      iiifLayer = iiifLayerFactory();
    });

    afterEach(function() {
      iiifLayer.off('load');
    });

    it('by default is off', function(done) {
      map.addLayer(iiifLayer);
      iiifLayer.on('load', function() {
        expect(iiifLayer.options.setMaxBounds).toBe(false);
        expect(map.options.maxBounds).toBe(undefined); // documentation says default should be null? 
        done();
      });
    });
    
    it('can be configured to be on', function(done) {
      var iiifLayerSetMaxBounds = iiifLayerFactory({ setMaxBounds: true });
      map.addLayer(iiifLayerSetMaxBounds);
      iiifLayerSetMaxBounds.on('load', function() {
        expect(iiifLayerSetMaxBounds.options.setMaxBounds).toBe(true);
        expect(map.options.maxBounds.getSouthWest().toString()).toBe('LatLng(-478, 0)');
        expect(map.options.maxBounds.getNorthEast().toString()).toBe('LatLng(0, 679)');
        done();
      });
    });
  });

});

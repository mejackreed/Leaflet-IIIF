/*
 * Leaflet-IIIF 0.0.1
 * IIIF Viewer for Leaflet
 * by Jack Reed, @mejackreed
 */

L.TileLayer.Iiif = L.TileLayer.extend({
  options: {
    tileSize: 256
  },

  initialize: function(url, options) {
    options = L.setOptions(this, options);
    this._infoDeferred = new $.Deferred();
    this._infoUrl = url;
    this._baseUrl = this._templateUrl();
    this._getInfo();
  },
  getTileUrl: function(coords) {
    var _this = this,
      x = coords.x,
      y = (coords.y),
      scale = Math.pow(2, _this.maxZoom - coords.z),
      tileBaseSize = _this.options.tileSize * scale,
      minx = (x * tileBaseSize),
      miny = (y * tileBaseSize),
      maxx = Math.min(minx + tileBaseSize, _this.x),
      maxy = Math.min(miny + tileBaseSize, _this.y);

    return L.Util.template(this._baseUrl, L.extend({
      format: 'jpg',
      quality: _this.quality,
      region: [minx, miny, (maxx - minx), (maxy - miny)].join(','),
      rotation: 0,
      size: 'pct:' + (100 / scale)
    }, this.options));
  },
  onAdd: function(map) {
    var _this = this;
    $.when(_this._infoDeferred).done(function() {
      map.setView([-128, 64], 1);
      L.TileLayer.prototype.onAdd.call(_this, map);
    });
  },
  _getInfo: function() {
    var _this = this;
    $.getJSON(_this._infoUrl)
      .done(function(data) {
        _this.y = data.height;
        _this.x = data.width;

        // Set quality based off of IIIF version
        var profile;
        if (data.profile instanceof Array) {
          profile = data.profile[0];
        }else {
          profile = data.profile;
        }
        switch (profile) {
          case 'http://library.stanford.edu/iiif/image-api/compliance.html#level1':
            _this.quality = 100;
            break;
          case 'http://iiif.io/api/image/2/level2.json':
            _this.quality = 'default';
            break;
        }

        ceilLog2 = function(x) {
          return Math.ceil(Math.log(x) / Math.LN2);
        };

        // Calculates maxZoom for the layer
        _this.maxZoom = Math.max(ceilLog2(_this.x / _this.options.tileSize),
          ceilLog2(_this.y / _this.options.tileSize));

        // Resolved Deferred to initiate tilelayer load
        _this._infoDeferred.resolve();
      });
  },
  _infoToBaseUrl: function() {
    return this._infoUrl.replace('info.json', '');
  },
  _templateUrl: function() {
    return this._infoToBaseUrl() + '{region}/{size}/{rotation}/{quality}.{format}';
  }
});

L.tileLayer.iiif = function(url, options) {
  return new L.TileLayer.Iiif(url, options);
};

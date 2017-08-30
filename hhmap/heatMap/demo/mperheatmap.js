// /**
//  * MapbarApiPlugin-MHeatMap
//  * version: 1.1.0
//  * description: Mapbar map api plugin
//  * time:Wed Oct 28 2015 14:36:38 GMT+0800 (涓浗鏍囧噯鏃堕棿)
//  */

// function MHeatMap(a) { this._data = { data: [], min: 0, max: 1 }, this._opts = { autoRender: !0 }, this.setOptions(a, !1), this._visibility = !0, this._needRef = !1, this.type = null }

// function _initHeatMapPlgin(a) {
//     var b = a;
//     b.prototype.enableHeatmap = function(a, b) {
//         var c = "undefined" != typeof MCanvas ? "pc" : "h5";
//         if (!this.heatmapLayer)
//             if ("pc" === c) {
//                 if (!Maplet.supportCanvas()) throw new Error("The current browser does not support canvas element");
//                 this.heatmapLayer = new MCanvas("heatmapLayer", 0, 0, this.width, this.height, !0, 4, "", this.mapContainer).div
//             } else "h5" === c && (this.heatmapLayer = document.createElement("div"), this.heatmapLayer.style.position = "absolute", this.heatmapLayer.style.zIndex = 3, document.getElementById("mapContainer").appendChild(this.heatmapLayer));
//         return this._heatmap || (this._heatmap = new MHeatMap(a).setMap(this), this.heatmapLayer.appendChild(this._heatmap.getContainer()), b && this._heatmap.setData(b)), this._heatmap
//     }, b.prototype.disableHeatmap = function() { return this._heatmap && (this.heatmapLayer && this.heatmapLayer.removeChild(this._heatmap.getContainer()), this._heatmap.finalize(), this._heatmap = null), this }, b.prototype.showHeatmap = function() { return this._heatmap && this._heatmap.show(), this }, b.prototype.hideHeatmap = function() { return this._heatmap && this._heatmap.hide(), this }, b.prototype.getHeatmap = function() { return this._heatmap }
// }
// MHeatMap.prototype = {
//         constructor: MHeatMap,
//         setOptions: function(a) { var b, c, d = this._opts; if ("object" == typeof a) { b = Object.prototype.hasOwnProperty; for (var e in a) b.call(a, e) && "dataMax" != e && "dataMin" != e && (d[e] = a[e]); return "number" == typeof a.dataMin && (d.dataMin = this._data.min = a.dataMin), "number" == typeof a.dataMax && (d.dataMax = this._data.max = a.dataMax), "function" != typeof d.onExtremaChange && delete d.onExtremaChange, this._updateZoomLevelRange(), (c = this._heatmap) && (c.updateStoreConfig(d), d.autoRender && c.configure(d)), this } },
//         setMap: function(a) { return this._map = a || this._map, this.type = "undefined" != typeof Maplet && this._map instanceof Maplet ? "pc" : "h5", this._updateZoomLevelRange(), this._update(!0), this._listenEvent(), "pc" === this.type && this._visible(!0) && this._refresh(), this },
//         update: function() { return this._refresh(), this },
//         setData: function(a) {
//             var b = Number.MAX_VALUE,
//                 c = Number.MIN_VALUE,
//                 d = this._opts,
//                 e = d.valueField;
//             return a instanceof Array && (!a[0].hasOwnProperty(e) || d.dataMin || d.dataMax ? (b = d.dataMin || 0, c = d.dataMax || 5) : a.forEach(function(a) { b = Math.min(a[e], b), c = Math.max(a[e], c) }), this._data = { data: a, min: b, max: c }, this._opts.autoRender && this._refresh()), this
//         },
//         addData: function(a) {
//             var b = this,
//                 c = this._map;
//             if (a instanceof Array) a.forEach(function(a) { b.addData(a) });
//             else if (this._data.data.push(a), c) {
//                 if ("pc" === this.type) {
//                     var d = c.toScreenCoordinate(a.lon + "," + a.lat);
//                     a.x = d[0], a.y = d[1]
//                 } else a.x = a.lon, a.y = a.lat;
//                 this._heatmap.addData(a)
//             }
//             return this
//         },
//         getDataAt: function(a, b) { var c = this._heatmap; return c ? c.getValueAt({ x: a, y: b }) : null },
//         getData: function() { var a, b = null; return (a = this._heatmap) && (b = a.getData()), b },
//         getDataURL: function() { var a, b = null; return (a = this._heatmap) && (b = a.getDataURL()), b },
//         setDataMax: function(a) { return this._heatmap.setDataMax(this._data.max = a), this },
//         setDataMin: function(a) { return this._heatmap.setDataMin(this._data.min = a), this },
//         hide: function() { return this._visibility && (this._visibility = !1, this._visible()), this },
//         show: function() { return this._visibility || (this._visibility = !0, this._visible(!0) && this._needRef && (this._needRef = !1, this._refresh())), this },
//         isVisible: function() { return this._visibility },
//         getContainer: function() { var a = this._heatmap; return a ? a.getCanvas() : null },
//         finalize: function() { var a; for (a in this) this.hasOwnProperty(a) && (this[a] = null, delete this[a]) },
//         _refresh: function() {
//             var a = this._heatmap,
//                 b = this._data;
//             a && b && this._visibility ? a.setData(this._convert(b)) : this._visibility || (this._needRef = !0), this._setCanvasPosition(), this._showCanvas()
//         },
//         _updateZoomLevelRange: function() {
//             var a, b, c, d = this._map;
//             d && ("pc" === this.type ? (a = d.getMinZoomLevel(), b = d.getMaxZoomLevel(), c = this._opts) : (a = d.getMinZoom(), b = d.getMaxZoom(), c = this._opts), c.minZoomLevel = "number" == typeof c.minZoomLevel ? Math.max(c.minZoomLevel, a) : a, c.maxZoomLevel = "number" == typeof c.maxZoomLevel ? Math.min(c.maxZoomLevel, b) : b)
//         },
//         _convert: function(a) {
//             var b = this._map;
//             if (b) {
//                 var c = a.data,
//                     d = this.type;
//                 return c.forEach(function(a) {
//                     if ("pc" === d) {
//                         var c = b.toScreenCoordinate(a.lon + "," + a.lat);
//                         a.x = c[0], a.y = c[1]
//                     } else {
//                         var e = b.toPixel(a.lon, a.lat);
//                         a.x = e.x, a.y = e.y
//                     }
//                 }), a
//             }
//         },
//         _showCanvas: function() { this._heatmap.getCanvas().style.display = "block" },
//         _hideCanvas: function() { this._heatmap.getCanvas().style.display = "none" },
//         _setCanvasPosition: function(a, b) {
//             var c = this._heatmap.getCanvas().style;
//             a = a || 0, b = b || 0, c.left = a + "px", c.top = b + "px"
//         },
//         _listenEvent: function() {
//             var a = this._map,
//                 b = this;
//             "pc" === this.type ? (MEvent.addListener(a, "zoom", function() { b._hideCanvas(), b._opts.autoRender && b._onZoom.apply(b, arguments) }), MEvent.addListener(a, "pan", function() { b._setCanvasPosition(a.moveX - a.downX, a.moveY - a.downY), b._opts.autoRender && b._onPan.apply(b, arguments) })) : (MEvent.bind(a, "zoom_changed", function() { b._heatmap.hideCanvas(), b._opts.autoRender && b._onZoom.apply(b, arguments) }), MEvent.bind(a, "dragend", function() { b._opts.autoRender && b._onPan.apply(b, arguments) })), MEvent.bind(a, "resize", function() { b._onResize.apply(b, arguments) })
//         },
//         _onZoom: function(a) { this._visible(!0, a) && this._update() },
//         _visible: function(a, b) {
//             var c = !1,
//                 d = this._map,
//                 e = this._heatmap,
//                 f = this._opts;
//             return d && ("number" != typeof b && (b = "pc" === this.type ? this._map.getZoomLevel() : this._map.zoom()), a && this._visibility && b >= f.minZoomLevel && b <= f.maxZoomLevel ? (e.getCanvas().style.display = "block", c = !0) : (e.getCanvas().style.display = "none", c = !1)), c
//         },
//         _onPan: function() { this._update() },
//         _onResize: function() { this._update() },
//         _update: function(a) {
//             var b = this._map;
//             if (b) {
//                 var c = "pc" === this.type ? b.width : b.dom.offsetWidth,
//                     d = "pc" === this.type ? b.height : b.dom.offsetHeight,
//                     e = "pc" === this.type ? Maplet.h337 : Map.h337;
//                 this._heatmap || (this._opts.width = c, this._opts.height = d, this._heatmap = e.create(this._opts)), !0 !== a && this._refresh()
//             }
//         }
//     },
//     function(a, b, c) { b[a] = c(), "undefined" != typeof window.Maplet ? window.Maplet && Maplet.define && Maplet.define("MHeatMap", function() { _initHeatMapPlgin(b) }) : MPlugin.define && MPlugin.define("MHeatMap", function() { _initHeatMapPlgin(b) }) }("h337", "undefined" != typeof MMap ? MMap : Maplet, function() {
//         // var a = { defaultRadius: 40, defaultRenderer: "canvas2d", defaultGradient: { .25: "rgb(0,0,255)", .55: "rgb(0,255,0)", .85: "yellow", 1: "rgb(255,0,0)" }, defaultMaxOpacity: 1, defaultMinOpacity: 0, defaultBlur: .85, defaultXField: "x", defaultYField: "y", defaultValueField: "value", defaultWidth: 300, defaultHeight: 300, plugins: {} },
//         //改动
//         var a = { defaultRadius: 40, defaultRenderer: "canvas2d", defaultGradient: { .25: "rgb(0,0,255)", .55: "rgb(0,0,255)", .85: "rgb(0,0,255)", 1: "rgb(0,0,255)" }, defaultMaxOpacity: 1, defaultMinOpacity: .85, defaultBlur: .85, defaultXField: "x", defaultYField: "y", defaultValueField: "value", defaultWidth: 300, defaultHeight: 300, plugins: {} },
//             b = function() {
//                 var b = function(a) { this._coordinator = {}, this._data = [], this._radi = [], this._min = 0, this._max = 1, this._xField = a.xField || a.defaultXField, this._yField = a.yField || a.defaultYField, this._valueField = a.valueField || a.defaultValueField, a.radius && (this._cfgRadius = a.radius) },
//                     c = a.defaultRadius;
//                 return b.prototype = {
//                     _organiseData: function(a, b) {
//                         var d = a[this._xField],
//                             e = a[this._yField],
//                             f = this._radi,
//                             g = this._data,
//                             h = this._max,
//                             i = this._min,
//                             j = a[this._valueField] || 1,
//                             k = a.radius || this._cfgRadius || c;
//                         return g[d] || (g[d] = [], f[d] = []), g[d][e] ? g[d][e] += j : (g[d][e] = j, f[d][e] = k), g[d][e] > h ? (b ? this.setDataMax(g[d][e]) : this._max = g[d][e], !1) : { x: d, y: e, value: j, radius: k, min: i, max: h }
//                     },
//                     _updateRadius: function() {
//                         var a, b, c, d, e = this._radi,
//                             f = Object.keys(e),
//                             g = f.length,
//                             h = this._cfgRadius;
//                         if (!(0 > h) && this.radiusChanged) {
//                             for (; g--;)
//                                 for (a = f[g], c = Object.keys(e[a]), d = c.length; d--;) b = c[d], e[a][b] = h;
//                             return this.radiusChanged = !1, this
//                         }
//                     },
//                     setOptions: function(a) {
//                         if ("object" == typeof a) {
//                             var b = a.xField,
//                                 c = this;
//                             b && (c._xField = b), b = a.yField, b && (c._yField = b), b = a.valueField, b && (c._valueField = b), b = a.radius;
//                             var d = c._cfgRadius;
//                             b > 0 && (c._cfgRadius = b), b !== d && (c.radiusChanged = !0), b = a.dataMax, "number" == typeof b && (c._max = b), b = a.dataMin, "number" == typeof b && (c._min = b)
//                         }
//                     },
//                     _unOrganizeData: function() {
//                         var a = [],
//                             b = this._data,
//                             c = this._radi;
//                         for (var d in b)
//                             for (var e in b[d]) a.push({ x: d, y: e, radius: c[d][e], value: b[d][e] });
//                         return { min: this._min, max: this._max, data: a }
//                     },
//                     _onExtremaChange: function() { this._coordinator.emit("extremachange", { min: this._min, max: this._max }) },
//                     addData: function() {
//                         if (arguments[0].length > 0)
//                             for (var a = arguments[0], b = a.length; b--;) this.addData.call(this, a[b]);
//                         else {
//                             var c = this._organiseData(arguments[0], !0);
//                             c && this._coordinator.emit("renderpartial", { min: this._min, max: this._max, data: [c] })
//                         }
//                         return this
//                     },
//                     setData: function(a) {
//                         var b = a.data,
//                             c = b.length;
//                         this._data = [], this._radi = [];
//                         for (var d = 0; c > d; d++) this._organiseData(b[d], !1);
//                         return this._max = a.max, this._min = a.min || 0, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this
//                     },
//                     removeData: function() {},
//                     setDataMax: function(a) { return this._max = a, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this },
//                     setDataMin: function(a) { return this._min = a, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this },
//                     setCoordinator: function(a) { this._coordinator = a },
//                     _getInternalData: function() { return this._updateRadius(), { max: this._max, min: this._min, data: this._data, radi: this._radi } },
//                     getData: function() { return this._unOrganizeData() }
//                 }, b
//             }(),
//             c = function() {
//                 function a(a) {
//                     var c = a.container,
//                         d = this.shadowCanvas = document.createElement("canvas"),
//                         e = this.canvas = a.canvas || document.createElement("canvas"),
//                         f = (this._renderBoundaries = [1e4, 1e4, 0, 0], c ? getComputedStyle(c) : { width: (a.width || a.defaultWidth) + "px", height: (a.height || a.defaultHeight) + "px" });
//                     e.className = "heatmap-canvas", this._width = e.width = d.width = +f.width.replace(/px/, ""), this._height = e.height = d.height = +f.height.replace(/px/, ""), this.shadowCtx = d.getContext("2d"), this.ctx = e.getContext("2d"), e.style.cssText = d.style.cssText = "position:absolute;left:0;top:0;", c && (c.style.position = "relative"), c && c.appendChild(e), this._palette = b(a), this._templates = {}, this._setStyles(a)
//                 }
//                 var b = function(a) {
//                         var b = a.gradient || a.defaultGradient,
//                             c = document.createElement("canvas"),
//                             d = c.getContext("2d");
//                         c.width = 256, c.height = 1;
//                         var e = d.createLinearGradient(0, 0, 256, 1);
//                         for (var f in b) e.addColorStop(f, b[f]);
//                         return d.fillStyle = e, d.fillRect(0, 0, 256, 1), d.getImageData(0, 0, 256, 1).data;
//                         // return d.fillStyle = e, d.fillRect(0, 0, 256, 1), d.getImageData(0, 0, 256, 1).data, d.lineWidth = 10, d.strokeStyle = "#00f", d.strokeRect(50, 50, 100, 100), d.fillStyle = "green";

//                     },
//                     c = function(a, b) {
//                         var c = document.createElement("canvas"),
//                             d = c.getContext("2d"),
//                             e = a,
//                             f = a;
//                         if (c.width = c.height = 2 * a, 1 == b) {
//                             // d.beginPath(), d.arc(e, f, a, 0, 2 * Math.PI, !1), d.fillStyle = "rgba(0,0,0,1)", d.fill();
//                         } else {
//                             // var g = d.createRadialGradient(e, f, a * b, e, f, a);
//                             // g.addColorStop(0, "rgba(0,0,0,1)"), g.addColorStop(1, "rgba(0,0,0,0)"), d.fillStyle = g, d.fillRect(0, 0, 2 * a, 2 * a)
//                             //改动
//                             // g.addColorStop(1, "rgba(0,0,0,1)"), g.addColorStop(1, "rgba(0,0,0,0)"), d.lineWidth = 50, d.strokeStyle = "red", d.fillStyle = g, d.fillRect(0, 0, a, a), d.strokeRect(0, 0, a, a)
//                             //     d.lineWidth = 50,
//                             //     d.strokeStyle = "red",
//                             // d.fillStyle = "wihte",

//                             d.lineWidth = 1,
//                                 d.strokeStyle = "green",
//                                 d.strokeRect(0, 0, a, a)
//                                 // d.fillRect(0, 0, a, a);
//                         }
//                         return c
//                     },
//                     d = function(a) {
//                         var b = [],
//                             c = a.min,
//                             d = a.max,
//                             e = a.radi;
//                         a = a.data;
//                         for (var f = Object.keys(a), g = f.length; g--;)
//                             for (var h = f[g], i = Object.keys(a[h]), j = i.length; j--;) {
//                                 var k = i[j],
//                                     l = a[h][k],
//                                     m = e[h][k];
//                                 b.push({ x: h, y: k, value: l, radius: m })
//                             }
//                         return { min: c, max: d, data: b }
//                     };
//                 return a.prototype = {
//                     setSize: function(a, b) {
//                         var c = this.canvas,
//                             d = this.shadowCanvas;
//                         this._width = c.width = d.width = a, this._height = c.height = d.height = b
//                     },
//                     getCanvas: function() { return this.canvas },
//                     renderPartial: function(a) { this._drawAlpha(a), this._colorize() },
//                     renderAll: function(a) { this._clear(), this._drawAlpha(d(a)), this._colorize() },
//                     _updateGradient: function(a) { this._palette = b(a) },
//                     updateConfig: function(a) { a.gradient && this._updateGradient(a), this._setStyles(a) },
//                     setDimensions: function(a, b) { this._width = a, this._height = b, this.canvas.width = this.shadowCanvas.width = a, this.canvas.height = this.shadowCanvas.height = b },
//                     _clear: function() { this.shadowCtx.clearRect(0, 0, this._width, this._height), this.ctx.clearRect(0, 0, this._width, this._height) },
//                     _setStyles: function(a) { this._blur = 0 == a.blur ? 0 : a.blur || a.defaultBlur, a.backgroundColor && (this.canvas.style.backgroundColor = a.backgroundColor), this._opacity = 255 * (a.opacity || 0), this._maxOpacity = 255 * (a.maxOpacity || a.defaultMaxOpacity), this._minOpacity = 255 * (a.minOpacity || a.defaultMinOpacity), this._useGradientOpacity = !!a.useGradientOpacity },
//                     _drawAlpha: function(a) {
//                         var b = this._min = a.min,
//                             d = this._max = a.max;
//                         a = a.data || [];
//                         for (var e = a.length, f = 1 - this._blur; e--;) {
//                             var g, h = a[e],
//                                 i = h.x,
//                                 j = h.y,
//                                 k = h.radius,
//                                 l = Math.min(h.value, d),
//                                 m = i - k,
//                                 n = j - k,
//                                 o = this.shadowCtx,
//                                 p = k + "_" + f.toFixed(2);
//                             this._templates[p] ? g = this._templates[p] : this._templates[p] = g = c(k, f), o.globalAlpha = (l - b) / (d - b), o.drawImage(g, m, n), m < this._renderBoundaries[0] && (this._renderBoundaries[0] = m), n < this._renderBoundaries[1] && (this._renderBoundaries[1] = n), m + 2 * k > this._renderBoundaries[2] && (this._renderBoundaries[2] = m + 2 * k), n + 2 * k > this._renderBoundaries[3] && (this._renderBoundaries[3] = n + 2 * k)
//                         }
//                     },
//                     _colorize: function() {
//                         var a = this._renderBoundaries[0],
//                             b = this._renderBoundaries[1],
//                             c = this._renderBoundaries[2] - a,
//                             d = this._renderBoundaries[3] - b,
//                             e = this._width,
//                             f = this._height,
//                             g = this._opacity,
//                             h = this._maxOpacity,
//                             i = this._minOpacity,
//                             j = this._useGradientOpacity;
//                         0 > a && (a = 0), 0 > b && (b = 0), a + c > e && (c = e - a), b + d > f && (d = f - b);
//                         for (var k = this.shadowCtx.getImageData(a, b, c, d), l = k.data, m = l.length, n = this._palette, o = 3; m > o; o += 4) {
//                             var p = l[o],
//                                 q = 4 * p;
//                             if (q) {
//                                 var r;
//                                 r = g > 0 ? g : h > p ? i > p ? i : p : h, l[o - 3] = n[q], l[o - 2] = n[q + 1], l[o - 1] = n[q + 2], l[o] = j ? n[q + 3] : r
//                             }
//                         }
//                         k.data = l, this.ctx.putImageData(k, a, b), this._renderBoundaries = [1e3, 1e3, 0, 0]
//                     },
//                     getValueAt: function(a) {
//                         var b, c = this.shadowCtx,
//                             d = c.getImageData(a.x, a.y, 1, 1),
//                             e = d.data[3],
//                             f = this._max,
//                             g = this._min;
//                         return b = Math.abs(f - g) * (e / 255) >> 0
//                     },
//                     getDataURL: function() { return this.canvas.toDataURL() }
//                 }, a
//             }(),
//             d = function() { var b = !1; return "canvas2d" === a.defaultRenderer && (b = c), b }(),
//             e = { merge: function() { for (var a = {}, b = arguments.length, c = 0; b > c; c++) { var d = arguments[c]; for (var e in d) a[e] = d[e] } return a } },
//             f = function() {
//                 function c() {
//                     var c = this._config = e.merge(a, arguments[0] || {});
//                     if (this._coordinator = new f, c.plugin) {
//                         var h = c.plugin;
//                         if (!a.plugins[h]) throw new Error("Plugin '" + h + "' not found. Maybe it was not registered.");
//                         var i = a.plugins[h];
//                         this._renderer = new i.renderer(c), this._store = new i.store(c)
//                     } else this._renderer = new d(c), this._store = new b(c);
//                     g(this)
//                 }
//                 var f = function() {
//                         function a() { this.cStore = {} }
//                         return a.prototype = {
//                             on: function(a, b, c) {
//                                 var d = this.cStore;
//                                 d[a] || (d[a] = []), d[a].push(function(a) { return b.call(c, a) })
//                             },
//                             emit: function(a, b) {
//                                 var c = this.cStore;
//                                 if (c[a])
//                                     for (var d = c[a].length, e = 0; d > e; e++) {
//                                         var f = c[a][e];
//                                         f(b)
//                                     }
//                             }
//                         }, a
//                     }(),
//                     g = function(a) {
//                         var b = a._renderer,
//                             c = a._coordinator,
//                             d = a._store;
//                         c.on("renderpartial", b.renderPartial, b), c.on("renderall", b.renderAll, b), c.on("extremachange", function(b) { a._config.onExtremaChange && a._config.onExtremaChange({ min: b.min, max: b.max, gradient: a._config.gradient || a._config.defaultGradient }) }), d.setCoordinator(c)
//                     };
//                 return c.prototype = { getCanvas: function() { return this._renderer.getCanvas() }, setSize: function(a, b) { this._renderer.setSize(a, b) }, addData: function() { return this._store.addData.apply(this._store, arguments), this }, removeData: function() { return this._store.removeData && this._store.removeData.apply(this._store, arguments), this }, setData: function() { return this._store.setData.apply(this._store, arguments), this }, setDataMax: function() { return this._store.setDataMax.apply(this._store, arguments), this }, setDataMin: function() { return this._store.setDataMin.apply(this._store, arguments), this }, updateStoreConfig: function(a) { this._store && this._store.setOptions(a) }, configure: function(a) { return this._config = e.merge(this._config, a), this._renderer.updateConfig(this._config), this._coordinator.emit("renderall", this._store._getInternalData()), this }, repaint: function() { return this._coordinator.emit("renderall", this._store._getInternalData()), this }, getData: function() { return this._store.getData() }, getDataURL: function() { return this._renderer.getDataURL() }, getValueAt: function(a) { return this._store.getValueAt ? this._store.getValueAt(a) : this._renderer.getValueAt ? this._renderer.getValueAt(a) : null } }, c
//             }(),
//             g = { create: function(a) { return new f(a) }, register: function(b, c) { a.plugins[b] = c } };
//         return g
//     });
/**
 * MapbarApiPlugin-MHeatMap
 * version: 1.1.0
 * description: Mapbar map api plugin
 * time:Wed Oct 28 2015 14:36:38 GMT+0800 (涓浗鏍囧噯鏃堕棿)
 */

function MHeatMap(a) { this._data = { data: [], min: 0, max: 1 }, this._opts = { autoRender: !0 }, this.setOptions(a, !1), this._visibility = !0, this._needRef = !1, this.type = null }

function _initHeatMapPlgin(a) {
    var b = a;
    b.prototype.enableHeatmap = function(a, b) {
        var c = "undefined" != typeof MCanvas ? "pc" : "h5";
        if (!this.heatmapLayer)
            if ("pc" === c) {
                if (!Maplet.supportCanvas()) throw new Error("The current browser does not support canvas element");
                this.heatmapLayer = new MCanvas("heatmapLayer", 0, 0, this.width, this.height, !0, 4, "", this.mapContainer).div
            } else "h5" === c && (this.heatmapLayer = document.createElement("div"), this.heatmapLayer.style.position = "absolute", this.heatmapLayer.style.zIndex = 3, document.getElementById("mapContainer").appendChild(this.heatmapLayer));
        return this._heatmap || (this._heatmap = new MHeatMap(a).setMap(this), this.heatmapLayer.appendChild(this._heatmap.getContainer()), b && this._heatmap.setData(b)), this._heatmap
    }, b.prototype.disableHeatmap = function() { return this._heatmap && (this.heatmapLayer && this.heatmapLayer.removeChild(this._heatmap.getContainer()), this._heatmap.finalize(), this._heatmap = null), this }, b.prototype.showHeatmap = function() { return this._heatmap && this._heatmap.show(), this }, b.prototype.hideHeatmap = function() { return this._heatmap && this._heatmap.hide(), this }, b.prototype.getHeatmap = function() { return this._heatmap }
}
MHeatMap.prototype = {
        constructor: MHeatMap,
        setOptions: function(a) { var b, c, d = this._opts; if ("object" == typeof a) { b = Object.prototype.hasOwnProperty; for (var e in a) b.call(a, e) && "dataMax" != e && "dataMin" != e && (d[e] = a[e]); return "number" == typeof a.dataMin && (d.dataMin = this._data.min = a.dataMin), "number" == typeof a.dataMax && (d.dataMax = this._data.max = a.dataMax), "function" != typeof d.onExtremaChange && delete d.onExtremaChange, this._updateZoomLevelRange(), (c = this._heatmap) && (c.updateStoreConfig(d), d.autoRender && c.configure(d)), this } },
        setMap: function(a) { return this._map = a || this._map, this.type = "undefined" != typeof Maplet && this._map instanceof Maplet ? "pc" : "h5", this._updateZoomLevelRange(), this._update(!0), this._listenEvent(), "pc" === this.type && this._visible(!0) && this._refresh(), this },
        update: function() { return this._refresh(), this },
        setData: function(a) {
            var b = Number.MAX_VALUE,
                c = Number.MIN_VALUE,
                d = this._opts,
                e = d.valueField;
            return a instanceof Array && (!a[0].hasOwnProperty(e) || d.dataMin || d.dataMax ? (b = d.dataMin || 0, c = d.dataMax || 5) : a.forEach(function(a) { b = Math.min(a[e], b), c = Math.max(a[e], c) }), this._data = { data: a, min: b, max: c }, this._opts.autoRender && this._refresh()), this
        },
        addData: function(a) {
            var b = this,
                c = this._map;
            if (a instanceof Array) a.forEach(function(a) { b.addData(a) });
            else if (this._data.data.push(a), c) {
                if ("pc" === this.type) {
                    var d = c.toScreenCoordinate(a.lon + "," + a.lat);
                    a.x = d[0], a.y = d[1]
                } else a.x = a.lon, a.y = a.lat;
                this._heatmap.addData(a)
            }
            return this
        },
        getDataAt: function(a, b) { var c = this._heatmap; return c ? c.getValueAt({ x: a, y: b }) : null },
        getData: function() { var a, b = null; return (a = this._heatmap) && (b = a.getData()), b },
        getDataURL: function() { var a, b = null; return (a = this._heatmap) && (b = a.getDataURL()), b },
        setDataMax: function(a) { return this._heatmap.setDataMax(this._data.max = a), this },
        setDataMin: function(a) { return this._heatmap.setDataMin(this._data.min = a), this },
        hide: function() { return this._visibility && (this._visibility = !1, this._visible()), this },
        show: function() { return this._visibility || (this._visibility = !0, this._visible(!0) && this._needRef && (this._needRef = !1, this._refresh())), this },
        isVisible: function() { return this._visibility },
        getContainer: function() { var a = this._heatmap; return a ? a.getCanvas() : null },
        finalize: function() { var a; for (a in this) this.hasOwnProperty(a) && (this[a] = null, delete this[a]) },
        _refresh: function() {
            var a = this._heatmap,
                b = this._data;
            a && b && this._visibility ? a.setData(this._convert(b)) : this._visibility || (this._needRef = !0), this._setCanvasPosition(), this._showCanvas()
        },
        _updateZoomLevelRange: function() {
            var a, b, c, d = this._map;
            d && ("pc" === this.type ? (a = d.getMinZoomLevel(), b = d.getMaxZoomLevel(), c = this._opts) : (a = d.getMinZoom(), b = d.getMaxZoom(), c = this._opts), c.minZoomLevel = "number" == typeof c.minZoomLevel ? Math.max(c.minZoomLevel, a) : a, c.maxZoomLevel = "number" == typeof c.maxZoomLevel ? Math.min(c.maxZoomLevel, b) : b)
        },
        _convert: function(a) {
            var b = this._map;
            if (b) {
                var c = a.data,
                    d = this.type;
                return c.forEach(function(a) {
                    if ("pc" === d) {
                        var c = b.toScreenCoordinate(a.lon + "," + a.lat);
                        a.x = c[0], a.y = c[1]
                    } else {
                        var e = b.toPixel(a.lon, a.lat);
                        a.x = e.x, a.y = e.y
                    }
                }), a
            }
        },
        _showCanvas: function() { this._heatmap.getCanvas().style.display = "block" },
        _hideCanvas: function() { this._heatmap.getCanvas().style.display = "none" },
        _setCanvasPosition: function(a, b) {
            var c = this._heatmap.getCanvas().style;
            a = a || 0, b = b || 0, c.left = a + "px", c.top = b + "px"
        },
        _listenEvent: function() {
            var a = this._map,
                b = this;
            "pc" === this.type ? (MEvent.addListener(a, "zoom", function() { b._hideCanvas(), b._opts.autoRender && b._onZoom.apply(b, arguments) }), MEvent.addListener(a, "pan", function() { b._setCanvasPosition(a.moveX - a.downX, a.moveY - a.downY), b._opts.autoRender && b._onPan.apply(b, arguments) })) : (MEvent.bind(a, "zoom_changed", function() { b._heatmap.hideCanvas(), b._opts.autoRender && b._onZoom.apply(b, arguments) }), MEvent.bind(a, "dragend", function() { b._opts.autoRender && b._onPan.apply(b, arguments) })), MEvent.bind(a, "resize", function() { b._onResize.apply(b, arguments) })
        },
        _onZoom: function(a) { this._visible(!0, a) && this._update() },
        _visible: function(a, b) {
            var c = !1,
                d = this._map,
                e = this._heatmap,
                f = this._opts;
            return d && ("number" != typeof b && (b = "pc" === this.type ? this._map.getZoomLevel() : this._map.zoom()), a && this._visibility && b >= f.minZoomLevel && b <= f.maxZoomLevel ? (e.getCanvas().style.display = "block", c = !0) : (e.getCanvas().style.display = "none", c = !1)), c
        },
        _onPan: function() { this._update() },
        _onResize: function() { this._update() },
        _update: function(a) {
            var b = this._map;
            if (b) {
                var c = "pc" === this.type ? b.width : b.dom.offsetWidth,
                    d = "pc" === this.type ? b.height : b.dom.offsetHeight,
                    e = "pc" === this.type ? Maplet.h337 : Map.h337;
                this._heatmap || (this._opts.width = c, this._opts.height = d, this._heatmap = e.create(this._opts)), !0 !== a && this._refresh()
            }
        }
    },
    function(a, b, c) { b[a] = c(), "undefined" != typeof window.Maplet ? window.Maplet && Maplet.define && Maplet.define("MHeatMap", function() { _initHeatMapPlgin(b) }) : MPlugin.define && MPlugin.define("MHeatMap", function() { _initHeatMapPlgin(b) }) }("h337", "undefined" != typeof MMap ? MMap : Maplet, function() {
        var a = { defaultRadius: 40, defaultRenderer: "canvas2d", defaultGradient: { .25: "rgb(0,0,255)", .55: "rgb(0,255,0)", .85: "yellow", 1: "rgb(255,0,0)" }, defaultMaxOpacity: 1, defaultMinOpacity: 0, defaultBlur: .85, defaultXField: "x", defaultYField: "y", defaultValueField: "value", defaultWidth: 300, defaultHeight: 300, plugins: {} },
            b = function() {
                var b = function(a) { this._coordinator = {}, this._data = [], this._radi = [], this._min = 0, this._max = 1, this._xField = a.xField || a.defaultXField, this._yField = a.yField || a.defaultYField, this._valueField = a.valueField || a.defaultValueField, a.radius && (this._cfgRadius = a.radius) },
                    c = a.defaultRadius;
                return b.prototype = {
                    _organiseData: function(a, b) {
                        var d = a[this._xField],
                            e = a[this._yField],
                            f = this._radi,
                            g = this._data,
                            h = this._max,
                            i = this._min,
                            j = a[this._valueField] || 1,
                            k = a.radius || this._cfgRadius || c;
                        return g[d] || (g[d] = [], f[d] = []), g[d][e] ? g[d][e] += j : (g[d][e] = j, f[d][e] = k), g[d][e] > h ? (b ? this.setDataMax(g[d][e]) : this._max = g[d][e], !1) : { x: d, y: e, value: j, radius: k, min: i, max: h }
                    },
                    _updateRadius: function() {
                        var a, b, c, d, e = this._radi,
                            f = Object.keys(e),
                            g = f.length,
                            h = this._cfgRadius;
                        if (!(0 > h) && this.radiusChanged) {
                            for (; g--;)
                                for (a = f[g], c = Object.keys(e[a]), d = c.length; d--;) b = c[d], e[a][b] = h;
                            return this.radiusChanged = !1, this
                        }
                    },
                    setOptions: function(a) {
                        if ("object" == typeof a) {
                            var b = a.xField,
                                c = this;
                            b && (c._xField = b), b = a.yField, b && (c._yField = b), b = a.valueField, b && (c._valueField = b), b = a.radius;
                            var d = c._cfgRadius;
                            b > 0 && (c._cfgRadius = b), b !== d && (c.radiusChanged = !0), b = a.dataMax, "number" == typeof b && (c._max = b), b = a.dataMin, "number" == typeof b && (c._min = b)
                        }
                    },
                    _unOrganizeData: function() {
                        var a = [],
                            b = this._data,
                            c = this._radi;
                        for (var d in b)
                            for (var e in b[d]) a.push({ x: d, y: e, radius: c[d][e], value: b[d][e] });
                        return { min: this._min, max: this._max, data: a }
                    },
                    _onExtremaChange: function() { this._coordinator.emit("extremachange", { min: this._min, max: this._max }) },
                    addData: function() {
                        if (arguments[0].length > 0)
                            for (var a = arguments[0], b = a.length; b--;) this.addData.call(this, a[b]);
                        else {
                            var c = this._organiseData(arguments[0], !0);
                            c && this._coordinator.emit("renderpartial", { min: this._min, max: this._max, data: [c] })
                        }
                        return this
                    },
                    setData: function(a) {
                        var b = a.data,
                            c = b.length;
                        this._data = [], this._radi = [];
                        for (var d = 0; c > d; d++) this._organiseData(b[d], !1);
                        return this._max = a.max, this._min = a.min || 0, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this
                    },
                    removeData: function() {},
                    setDataMax: function(a) { return this._max = a, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this },
                    setDataMin: function(a) { return this._min = a, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this },
                    setCoordinator: function(a) { this._coordinator = a },
                    _getInternalData: function() { return this._updateRadius(), { max: this._max, min: this._min, data: this._data, radi: this._radi } },
                    getData: function() { return this._unOrganizeData() }
                }, b
            }(),
            c = function() {
                function a(a) {
                    var c = a.container,
                        d = this.shadowCanvas = document.createElement("canvas"),
                        e = this.canvas = a.canvas || document.createElement("canvas"),
                        f = (this._renderBoundaries = [1e4, 1e4, 0, 0], c ? getComputedStyle(c) : { width: (a.width || a.defaultWidth) + "px", height: (a.height || a.defaultHeight) + "px" });
                    e.className = "heatmap-canvas", this._width = e.width = d.width = +f.width.replace(/px/, ""), this._height = e.height = d.height = +f.height.replace(/px/, ""), this.shadowCtx = d.getContext("2d"), this.ctx = e.getContext("2d"), e.style.cssText = d.style.cssText = "position:absolute;left:0;top:0;", c && (c.style.position = "relative"), c && c.appendChild(e), this._palette = b(a), this._templates = {}, this._setStyles(a)
                }
                var b = function(a) {
                        var b = a.gradient || a.defaultGradient,
                            c = document.createElement("canvas"),
                            d = c.getContext("2d");
                        c.width = 256, c.height = 1;
                        var e = d.createLinearGradient(0, 0, 256, 1);
                        for (var f in b) e.addColorStop(f, b[f]);
                        return d.fillStyle = e, d.fillRect(0, 0, 256, 1), d.getImageData(0, 0, 256, 1).data
                    },
                    c = function(a, b) {
                        var c = document.createElement("canvas"),
                            d = c.getContext("2d"),
                            e = a,
                            f = a;
                        if (c.width = c.height = 2 * a, 1 == b) d.beginPath(), d.arc(e, f, a, 0, 2 * Math.PI, !1), d.fillStyle = "rgba(0,0,0,1)", d.fill();
                        else {
                            var g = d.createRadialGradient(e, f, a * b, e, f, a);
                            g.addColorStop(0, "rgba(0,0,0,1)"), g.addColorStop(1, "rgba(0,0,0,0)"), d.fillStyle = g, d.fillRect(0, 0, 2 * a, 2 * a)
                        }
                        return c
                    },
                    d = function(a) {
                        var b = [],
                            c = a.min,
                            d = a.max,
                            e = a.radi;
                        a = a.data;
                        for (var f = Object.keys(a), g = f.length; g--;)
                            for (var h = f[g], i = Object.keys(a[h]), j = i.length; j--;) {
                                var k = i[j],
                                    l = a[h][k],
                                    m = e[h][k];
                                b.push({ x: h, y: k, value: l, radius: m })
                            }
                        return { min: c, max: d, data: b }
                    };
                return a.prototype = {
                    setSize: function(a, b) {
                        var c = this.canvas,
                            d = this.shadowCanvas;
                        this._width = c.width = d.width = a, this._height = c.height = d.height = b
                    },
                    getCanvas: function() { return this.canvas },
                    renderPartial: function(a) { this._drawAlpha(a), this._colorize() },
                    renderAll: function(a) { this._clear(), this._drawAlpha(d(a)), this._colorize() },
                    _updateGradient: function(a) { this._palette = b(a) },
                    updateConfig: function(a) { a.gradient && this._updateGradient(a), this._setStyles(a) },
                    setDimensions: function(a, b) { this._width = a, this._height = b, this.canvas.width = this.shadowCanvas.width = a, this.canvas.height = this.shadowCanvas.height = b },
                    _clear: function() { this.shadowCtx.clearRect(0, 0, this._width, this._height), this.ctx.clearRect(0, 0, this._width, this._height) },
                    _setStyles: function(a) { this._blur = 0 == a.blur ? 0 : a.blur || a.defaultBlur, a.backgroundColor && (this.canvas.style.backgroundColor = a.backgroundColor), this._opacity = 255 * (a.opacity || 0), this._maxOpacity = 255 * (a.maxOpacity || a.defaultMaxOpacity), this._minOpacity = 255 * (a.minOpacity || a.defaultMinOpacity), this._useGradientOpacity = !!a.useGradientOpacity },
                    _drawAlpha: function(a) {
                        var b = this._min = a.min,
                            d = this._max = a.max;
                        a = a.data || [];
                        for (var e = a.length, f = 1 - this._blur; e--;) {
                            var g, h = a[e],
                                i = h.x,
                                j = h.y,
                                k = h.radius,
                                l = Math.min(h.value, d),
                                m = i - k,
                                n = j - k,
                                o = this.shadowCtx,
                                p = k + "_" + f.toFixed(2);
                            this._templates[p] ? g = this._templates[p] : this._templates[p] = g = c(k, f), o.globalAlpha = (l - b) / (d - b), o.drawImage(g, m, n), m < this._renderBoundaries[0] && (this._renderBoundaries[0] = m), n < this._renderBoundaries[1] && (this._renderBoundaries[1] = n), m + 2 * k > this._renderBoundaries[2] && (this._renderBoundaries[2] = m + 2 * k), n + 2 * k > this._renderBoundaries[3] && (this._renderBoundaries[3] = n + 2 * k)
                        }
                    },
                    _colorize: function() {
                        var a = this._renderBoundaries[0],
                            b = this._renderBoundaries[1],
                            c = this._renderBoundaries[2] - a,
                            d = this._renderBoundaries[3] - b,
                            e = this._width,
                            f = this._height,
                            g = this._opacity,
                            h = this._maxOpacity,
                            i = this._minOpacity,
                            j = this._useGradientOpacity;
                        0 > a && (a = 0), 0 > b && (b = 0), a + c > e && (c = e - a), b + d > f && (d = f - b);
                        for (var k = this.shadowCtx.getImageData(a, b, c, d), l = k.data, m = l.length, n = this._palette, o = 3; m > o; o += 4) {
                            var p = l[o],
                                q = 4 * p;
                            if (q) {
                                var r;
                                r = g > 0 ? g : h > p ? i > p ? i : p : h, l[o - 3] = n[q], l[o - 2] = n[q + 1], l[o - 1] = n[q + 2], l[o] = j ? n[q + 3] : r
                            }
                        }
                        k.data = l, this.ctx.putImageData(k, a, b), this._renderBoundaries = [1e3, 1e3, 0, 0]
                    },
                    getValueAt: function(a) {
                        var b, c = this.shadowCtx,
                            d = c.getImageData(a.x, a.y, 1, 1),
                            e = d.data[3],
                            f = this._max,
                            g = this._min;
                        return b = Math.abs(f - g) * (e / 255) >> 0
                    },
                    getDataURL: function() { return this.canvas.toDataURL() }
                }, a
            }(),
            d = function() { var b = !1; return "canvas2d" === a.defaultRenderer && (b = c), b }(),
            e = { merge: function() { for (var a = {}, b = arguments.length, c = 0; b > c; c++) { var d = arguments[c]; for (var e in d) a[e] = d[e] } return a } },
            f = function() {
                function c() {
                    var c = this._config = e.merge(a, arguments[0] || {});
                    if (this._coordinator = new f, c.plugin) {
                        var h = c.plugin;
                        if (!a.plugins[h]) throw new Error("Plugin '" + h + "' not found. Maybe it was not registered.");
                        var i = a.plugins[h];
                        this._renderer = new i.renderer(c), this._store = new i.store(c)
                    } else this._renderer = new d(c), this._store = new b(c);
                    g(this)
                }
                var f = function() {
                        function a() { this.cStore = {} }
                        return a.prototype = {
                            on: function(a, b, c) {
                                var d = this.cStore;
                                d[a] || (d[a] = []), d[a].push(function(a) { return b.call(c, a) })
                            },
                            emit: function(a, b) {
                                var c = this.cStore;
                                if (c[a])
                                    for (var d = c[a].length, e = 0; d > e; e++) {
                                        var f = c[a][e];
                                        f(b)
                                    }
                            }
                        }, a
                    }(),
                    g = function(a) {
                        var b = a._renderer,
                            c = a._coordinator,
                            d = a._store;
                        c.on("renderpartial", b.renderPartial, b), c.on("renderall", b.renderAll, b), c.on("extremachange", function(b) { a._config.onExtremaChange && a._config.onExtremaChange({ min: b.min, max: b.max, gradient: a._config.gradient || a._config.defaultGradient }) }), d.setCoordinator(c)
                    };
                return c.prototype = { getCanvas: function() { return this._renderer.getCanvas() }, setSize: function(a, b) { this._renderer.setSize(a, b) }, addData: function() { return this._store.addData.apply(this._store, arguments), this }, removeData: function() { return this._store.removeData && this._store.removeData.apply(this._store, arguments), this }, setData: function() { return this._store.setData.apply(this._store, arguments), this }, setDataMax: function() { return this._store.setDataMax.apply(this._store, arguments), this }, setDataMin: function() { return this._store.setDataMin.apply(this._store, arguments), this }, updateStoreConfig: function(a) { this._store && this._store.setOptions(a) }, configure: function(a) { return this._config = e.merge(this._config, a), this._renderer.updateConfig(this._config), this._coordinator.emit("renderall", this._store._getInternalData()), this }, repaint: function() { return this._coordinator.emit("renderall", this._store._getInternalData()), this }, getData: function() { return this._store.getData() }, getDataURL: function() { return this._renderer.getDataURL() }, getValueAt: function(a) { return this._store.getValueAt ? this._store.getValueAt(a) : this._renderer.getValueAt ? this._renderer.getValueAt(a) : null } }, c
            }(),
            g = { create: function(a) { return new f(a) }, register: function(b, c) { a.plugins[b] = c } };
        return g
    });
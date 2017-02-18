/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs/BehaviorSubject'), require('rxjs/Subject'), require('rxjs/observable/from'), require('rxjs/observable/of'), require('rxjs/operator/concatMap'), require('rxjs/operator/every'), require('rxjs/operator/first'), require('rxjs/operator/map'), require('rxjs/operator/mergeMap'), require('rxjs/operator/reduce'), require('rxjs/Observable'), require('rxjs/operator/catch'), require('rxjs/operator/concatAll'), require('rxjs/util/EmptyError'), require('rxjs/observable/fromPromise'), require('rxjs/operator/last'), require('rxjs/operator/mergeAll'), require('@angular/platform-browser'), require('rxjs/operator/filter')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', 'rxjs/BehaviorSubject', 'rxjs/Subject', 'rxjs/observable/from', 'rxjs/observable/of', 'rxjs/operator/concatMap', 'rxjs/operator/every', 'rxjs/operator/first', 'rxjs/operator/map', 'rxjs/operator/mergeMap', 'rxjs/operator/reduce', 'rxjs/Observable', 'rxjs/operator/catch', 'rxjs/operator/concatAll', 'rxjs/util/EmptyError', 'rxjs/observable/fromPromise', 'rxjs/operator/last', 'rxjs/operator/mergeAll', '@angular/platform-browser', 'rxjs/operator/filter'], factory) : (factory((global.ng = global.ng || {}, global.ng.router = global.ng.router || {}), global.ng.common, global.ng.core, global.Rx, global.Rx, global.Rx.Observable, global.Rx.Observable, global.Rx.Observable.prototype, global.Rx.Observable.prototype, global.Rx.Observable.prototype, global.Rx.Observable.prototype, global.Rx.Observable.prototype, global.Rx.Observable.prototype, global.Rx, global.Rx.Observable.prototype, global.Rx.Observable.prototype, global.Rx, global.Rx.Observable, global.Rx.Observable.prototype, global.Rx.Observable.prototype, global.ng.platformBrowser, global.Rx.Observable.prototype));
  }(this, function(exports, _angular_common, _angular_core, rxjs_BehaviorSubject, rxjs_Subject, rxjs_observable_from, rxjs_observable_of, rxjs_operator_concatMap, rxjs_operator_every, rxjs_operator_first, rxjs_operator_map, rxjs_operator_mergeMap, rxjs_operator_reduce, rxjs_Observable, rxjs_operator_catch, rxjs_operator_concatAll, rxjs_util_EmptyError, rxjs_observable_fromPromise, l, rxjs_operator_mergeAll, _angular_platformBrowser, rxjs_operator_filter) {
    'use strict';
    var isPromise = _angular_core.__core_private__.isPromise;
    var isObservable = _angular_core.__core_private__.isObservable;
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var PRIMARY_OUTLET = 'primary';
    var NavigationCancelingError = (function(_super) {
      __extends(NavigationCancelingError, _super);
      function NavigationCancelingError(message) {
        _super.call(this, message);
        this.message = message;
        this.stack = (new Error(message)).stack;
      }
      NavigationCancelingError.prototype.toString = function() {
        return this.message;
      };
      return NavigationCancelingError;
    }(Error));
    function defaultUrlMatcher(segments, segmentGroup, route) {
      var path = route.path;
      var parts = path.split('/');
      var posParams = {};
      var consumed = [];
      var currentIndex = 0;
      for (var i = 0; i < parts.length; ++i) {
        if (currentIndex >= segments.length)
          return null;
        var current = segments[currentIndex];
        var p = parts[i];
        var isPosParam = p.startsWith(':');
        if (!isPosParam && p !== current.path)
          return null;
        if (isPosParam) {
          posParams[p.substring(1)] = current;
        }
        consumed.push(current);
        currentIndex++;
      }
      if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || currentIndex < segments.length)) {
        return null;
      } else {
        return {
          consumed: consumed,
          posParams: posParams
        };
      }
    }
    function shallowEqualArrays(a, b) {
      if (a.length !== b.length)
        return false;
      for (var i = 0; i < a.length; ++i) {
        if (!shallowEqual(a[i], b[i]))
          return false;
      }
      return true;
    }
    function shallowEqual(a, b) {
      var k1 = Object.keys(a);
      var k2 = Object.keys(b);
      if (k1.length != k2.length) {
        return false;
      }
      var key;
      for (var i = 0; i < k1.length; i++) {
        key = k1[i];
        if (a[key] !== b[key]) {
          return false;
        }
      }
      return true;
    }
    function flatten(a) {
      var target = [];
      for (var i = 0; i < a.length; ++i) {
        for (var j = 0; j < a[i].length; ++j) {
          target.push(a[i][j]);
        }
      }
      return target;
    }
    function last(a) {
      return a.length > 0 ? a[a.length - 1] : null;
    }
    function merge(m1, m2) {
      var m = {};
      for (var attr in m1) {
        if (m1.hasOwnProperty(attr)) {
          m[attr] = m1[attr];
        }
      }
      for (var attr in m2) {
        if (m2.hasOwnProperty(attr)) {
          m[attr] = m2[attr];
        }
      }
      return m;
    }
    function forEach(map, callback) {
      for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
          callback(map[prop], prop);
        }
      }
    }
    function waitForMap(obj, fn) {
      var waitFor = [];
      var res = {};
      forEach(obj, function(a, k) {
        if (k === PRIMARY_OUTLET) {
          waitFor.push(rxjs_operator_map.map.call(fn(k, a), function(_) {
            res[k] = _;
            return _;
          }));
        }
      });
      forEach(obj, function(a, k) {
        if (k !== PRIMARY_OUTLET) {
          waitFor.push(rxjs_operator_map.map.call(fn(k, a), function(_) {
            res[k] = _;
            return _;
          }));
        }
      });
      if (waitFor.length > 0) {
        var concatted$ = rxjs_operator_concatAll.concatAll.call(rxjs_observable_of.of.apply(void 0, waitFor));
        var last$ = l.last.call(concatted$);
        return rxjs_operator_map.map.call(last$, function() {
          return res;
        });
      }
      return rxjs_observable_of.of(res);
    }
    function andObservables(observables) {
      var merged$ = rxjs_operator_mergeAll.mergeAll.call(observables);
      return rxjs_operator_every.every.call(merged$, function(result) {
        return result === true;
      });
    }
    function wrapIntoObservable(value) {
      if (isObservable(value)) {
        return value;
      }
      if (isPromise(value)) {
        return rxjs_observable_fromPromise.fromPromise(value);
      }
      return rxjs_observable_of.of(value);
    }
    var ROUTES = new _angular_core.OpaqueToken('ROUTES');
    var LoadedRouterConfig = (function() {
      function LoadedRouterConfig(routes, injector, factoryResolver, injectorFactory) {
        this.routes = routes;
        this.injector = injector;
        this.factoryResolver = factoryResolver;
        this.injectorFactory = injectorFactory;
      }
      return LoadedRouterConfig;
    }());
    var RouterConfigLoader = (function() {
      function RouterConfigLoader(loader, compiler) {
        this.loader = loader;
        this.compiler = compiler;
      }
      RouterConfigLoader.prototype.load = function(parentInjector, loadChildren) {
        return rxjs_operator_map.map.call(this.loadModuleFactory(loadChildren), function(r) {
          var ref = r.create(parentInjector);
          var injectorFactory = function(parent) {
            return r.create(parent).injector;
          };
          return new LoadedRouterConfig(flatten(ref.injector.get(ROUTES)), ref.injector, ref.componentFactoryResolver, injectorFactory);
        });
      };
      RouterConfigLoader.prototype.loadModuleFactory = function(loadChildren) {
        var _this = this;
        if (typeof loadChildren === 'string') {
          return rxjs_observable_fromPromise.fromPromise(this.loader.load(loadChildren));
        } else {
          var offlineMode_1 = this.compiler instanceof _angular_core.Compiler;
          return rxjs_operator_mergeMap.mergeMap.call(wrapIntoObservable(loadChildren()), function(t) {
            return offlineMode_1 ? rxjs_observable_of.of((t)) : rxjs_observable_fromPromise.fromPromise(_this.compiler.compileModuleAsync(t));
          });
        }
      };
      return RouterConfigLoader;
    }());
    function createEmptyUrlTree() {
      return new UrlTree(new UrlSegmentGroup([], {}), {}, null);
    }
    function containsTree(container, containee, exact) {
      if (exact) {
        return equalQueryParams(container.queryParams, containee.queryParams) && equalSegmentGroups(container.root, containee.root);
      }
      return containsQueryParams(container.queryParams, containee.queryParams) && containsSegmentGroup(container.root, containee.root);
    }
    function equalQueryParams(container, containee) {
      return shallowEqual(container, containee);
    }
    function equalSegmentGroups(container, containee) {
      if (!equalPath(container.segments, containee.segments))
        return false;
      if (container.numberOfChildren !== containee.numberOfChildren)
        return false;
      for (var c in containee.children) {
        if (!container.children[c])
          return false;
        if (!equalSegmentGroups(container.children[c], containee.children[c]))
          return false;
      }
      return true;
    }
    function containsQueryParams(container, containee) {
      return Object.keys(containee).length <= Object.keys(container).length && Object.keys(containee).every(function(key) {
        return containee[key] === container[key];
      });
    }
    function containsSegmentGroup(container, containee) {
      return containsSegmentGroupHelper(container, containee, containee.segments);
    }
    function containsSegmentGroupHelper(container, containee, containeePaths) {
      if (container.segments.length > containeePaths.length) {
        var current = container.segments.slice(0, containeePaths.length);
        if (!equalPath(current, containeePaths))
          return false;
        if (containee.hasChildren())
          return false;
        return true;
      } else if (container.segments.length === containeePaths.length) {
        if (!equalPath(container.segments, containeePaths))
          return false;
        for (var c in containee.children) {
          if (!container.children[c])
            return false;
          if (!containsSegmentGroup(container.children[c], containee.children[c]))
            return false;
        }
        return true;
      } else {
        var current = containeePaths.slice(0, container.segments.length);
        var next = containeePaths.slice(container.segments.length);
        if (!equalPath(container.segments, current))
          return false;
        if (!container.children[PRIMARY_OUTLET])
          return false;
        return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next);
      }
    }
    var UrlTree = (function() {
      function UrlTree(root, queryParams, fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
      }
      UrlTree.prototype.toString = function() {
        return new DefaultUrlSerializer().serialize(this);
      };
      return UrlTree;
    }());
    var UrlSegmentGroup = (function() {
      function UrlSegmentGroup(segments, children) {
        var _this = this;
        this.segments = segments;
        this.children = children;
        this.parent = null;
        forEach(children, function(v, k) {
          return v.parent = _this;
        });
      }
      UrlSegmentGroup.prototype.hasChildren = function() {
        return this.numberOfChildren > 0;
      };
      Object.defineProperty(UrlSegmentGroup.prototype, "numberOfChildren", {
        get: function() {
          return Object.keys(this.children).length;
        },
        enumerable: true,
        configurable: true
      });
      UrlSegmentGroup.prototype.toString = function() {
        return serializePaths(this);
      };
      return UrlSegmentGroup;
    }());
    var UrlSegment = (function() {
      function UrlSegment(path, parameters) {
        this.path = path;
        this.parameters = parameters;
      }
      UrlSegment.prototype.toString = function() {
        return serializePath(this);
      };
      return UrlSegment;
    }());
    function equalSegments(a, b) {
      if (a.length !== b.length)
        return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
          return false;
        if (!shallowEqual(a[i].parameters, b[i].parameters))
          return false;
      }
      return true;
    }
    function equalPath(a, b) {
      if (a.length !== b.length)
        return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
          return false;
      }
      return true;
    }
    function mapChildrenIntoArray(segment, fn) {
      var res = [];
      forEach(segment.children, function(child, childOutlet) {
        if (childOutlet === PRIMARY_OUTLET) {
          res = res.concat(fn(child, childOutlet));
        }
      });
      forEach(segment.children, function(child, childOutlet) {
        if (childOutlet !== PRIMARY_OUTLET) {
          res = res.concat(fn(child, childOutlet));
        }
      });
      return res;
    }
    var UrlSerializer = (function() {
      function UrlSerializer() {}
      UrlSerializer.prototype.parse = function(url) {};
      UrlSerializer.prototype.serialize = function(tree) {};
      return UrlSerializer;
    }());
    var DefaultUrlSerializer = (function() {
      function DefaultUrlSerializer() {}
      DefaultUrlSerializer.prototype.parse = function(url) {
        var p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
      };
      DefaultUrlSerializer.prototype.serialize = function(tree) {
        var segment = "/" + serializeSegment(tree.root, true);
        var query = serializeQueryParams(tree.queryParams);
        var fragment = tree.fragment !== null && tree.fragment !== undefined ? "#" + encodeURI(tree.fragment) : '';
        return "" + segment + query + fragment;
      };
      return DefaultUrlSerializer;
    }());
    function serializePaths(segment) {
      return segment.segments.map(function(p) {
        return serializePath(p);
      }).join('/');
    }
    function serializeSegment(segment, root) {
      if (segment.hasChildren() && root) {
        var primary = segment.children[PRIMARY_OUTLET] ? serializeSegment(segment.children[PRIMARY_OUTLET], false) : '';
        var children_1 = [];
        forEach(segment.children, function(v, k) {
          if (k !== PRIMARY_OUTLET) {
            children_1.push(k + ":" + serializeSegment(v, false));
          }
        });
        if (children_1.length > 0) {
          return primary + "(" + children_1.join('//') + ")";
        } else {
          return "" + primary;
        }
      } else if (segment.hasChildren() && !root) {
        var children = mapChildrenIntoArray(segment, function(v, k) {
          if (k === PRIMARY_OUTLET) {
            return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
          } else {
            return [(k + ":" + serializeSegment(v, false))];
          }
        });
        return serializePaths(segment) + "/(" + children.join('//') + ")";
      } else {
        return serializePaths(segment);
      }
    }
    function encode(s) {
      return encodeURIComponent(s);
    }
    function decode(s) {
      return decodeURIComponent(s);
    }
    function serializePath(path) {
      return "" + encode(path.path) + serializeParams(path.parameters);
    }
    function serializeParams(params) {
      return pairs(params).map(function(p) {
        return (";" + encode(p.first) + "=" + encode(p.second));
      }).join('');
    }
    function serializeQueryParams(params) {
      var strParams = Object.keys(params).map(function(name) {
        var value = params[name];
        return Array.isArray(value) ? value.map(function(v) {
          return (encode(name) + "=" + encode(v));
        }).join('&') : encode(name) + "=" + encode(value);
      });
      return strParams.length ? "?" + strParams.join("&") : '';
    }
    var Pair = (function() {
      function Pair(first, second) {
        this.first = first;
        this.second = second;
      }
      return Pair;
    }());
    function pairs(obj) {
      var res = [];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          res.push(new Pair(prop, obj[prop]));
        }
      }
      return res;
    }
    var SEGMENT_RE = /^[^\/()?;=&#]+/;
    function matchSegments(str) {
      SEGMENT_RE.lastIndex = 0;
      var match = str.match(SEGMENT_RE);
      return match ? match[0] : '';
    }
    var QUERY_PARAM_RE = /^[^=?&#]+/;
    function matchQueryParams(str) {
      QUERY_PARAM_RE.lastIndex = 0;
      var match = str.match(SEGMENT_RE);
      return match ? match[0] : '';
    }
    var QUERY_PARAM_VALUE_RE = /^[^?&#]+/;
    function matchUrlQueryParamValue(str) {
      QUERY_PARAM_VALUE_RE.lastIndex = 0;
      var match = str.match(QUERY_PARAM_VALUE_RE);
      return match ? match[0] : '';
    }
    var UrlParser = (function() {
      function UrlParser(url) {
        this.url = url;
        this.remaining = url;
      }
      UrlParser.prototype.peekStartsWith = function(str) {
        return this.remaining.startsWith(str);
      };
      UrlParser.prototype.capture = function(str) {
        if (!this.remaining.startsWith(str)) {
          throw new Error("Expected \"" + str + "\".");
        }
        this.remaining = this.remaining.substring(str.length);
      };
      UrlParser.prototype.parseRootSegment = function() {
        if (this.remaining.startsWith('/')) {
          this.capture('/');
        }
        if (this.remaining === '' || this.remaining.startsWith('?') || this.remaining.startsWith('#')) {
          return new UrlSegmentGroup([], {});
        }
        return new UrlSegmentGroup([], this.parseChildren());
      };
      UrlParser.prototype.parseChildren = function() {
        if (this.remaining.length == 0) {
          return {};
        }
        if (this.peekStartsWith('/')) {
          this.capture('/');
        }
        var paths = [];
        if (!this.peekStartsWith('(')) {
          paths.push(this.parseSegments());
        }
        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
          this.capture('/');
          paths.push(this.parseSegments());
        }
        var children = {};
        if (this.peekStartsWith('/(')) {
          this.capture('/');
          children = this.parseParens(true);
        }
        var res = {};
        if (this.peekStartsWith('(')) {
          res = this.parseParens(false);
        }
        if (paths.length > 0 || Object.keys(children).length > 0) {
          res[PRIMARY_OUTLET] = new UrlSegmentGroup(paths, children);
        }
        return res;
      };
      UrlParser.prototype.parseSegments = function() {
        var path = matchSegments(this.remaining);
        if (path === '' && this.peekStartsWith(';')) {
          throw new Error("Empty path url segment cannot have parameters: '" + this.remaining + "'.");
        }
        this.capture(path);
        var matrixParams = {};
        if (this.peekStartsWith(';')) {
          matrixParams = this.parseMatrixParams();
        }
        return new UrlSegment(decode(path), matrixParams);
      };
      UrlParser.prototype.parseQueryParams = function() {
        var params = {};
        if (this.peekStartsWith('?')) {
          this.capture('?');
          this.parseQueryParam(params);
          while (this.remaining.length > 0 && this.peekStartsWith('&')) {
            this.capture('&');
            this.parseQueryParam(params);
          }
        }
        return params;
      };
      UrlParser.prototype.parseFragment = function() {
        if (this.peekStartsWith('#')) {
          return decodeURI(this.remaining.substring(1));
        }
        return null;
      };
      UrlParser.prototype.parseMatrixParams = function() {
        var params = {};
        while (this.remaining.length > 0 && this.peekStartsWith(';')) {
          this.capture(';');
          this.parseParam(params);
        }
        return params;
      };
      UrlParser.prototype.parseParam = function(params) {
        var key = matchSegments(this.remaining);
        if (!key) {
          return;
        }
        this.capture(key);
        var value = '';
        if (this.peekStartsWith('=')) {
          this.capture('=');
          var valueMatch = matchSegments(this.remaining);
          if (valueMatch) {
            value = valueMatch;
            this.capture(value);
          }
        }
        params[decode(key)] = decode(value);
      };
      UrlParser.prototype.parseQueryParam = function(params) {
        var key = matchQueryParams(this.remaining);
        if (!key) {
          return;
        }
        this.capture(key);
        var value = '';
        if (this.peekStartsWith('=')) {
          this.capture('=');
          var valueMatch = matchUrlQueryParamValue(this.remaining);
          if (valueMatch) {
            value = valueMatch;
            this.capture(value);
          }
        }
        var decodedKey = decode(key);
        var decodedVal = decode(value);
        if (params.hasOwnProperty(decodedKey)) {
          var currentVal = params[decodedKey];
          if (!Array.isArray(currentVal)) {
            currentVal = [currentVal];
            params[decodedKey] = currentVal;
          }
          currentVal.push(decodedVal);
        } else {
          params[decodedKey] = decodedVal;
        }
      };
      UrlParser.prototype.parseParens = function(allowPrimary) {
        var segments = {};
        this.capture('(');
        while (!this.peekStartsWith(')') && this.remaining.length > 0) {
          var path = matchSegments(this.remaining);
          var next = this.remaining[path.length];
          if (next !== '/' && next !== ')' && next !== ';') {
            throw new Error("Cannot parse url '" + this.url + "'");
          }
          var outletName = void 0;
          if (path.indexOf(':') > -1) {
            outletName = path.substr(0, path.indexOf(':'));
            this.capture(outletName);
            this.capture(':');
          } else if (allowPrimary) {
            outletName = PRIMARY_OUTLET;
          }
          var children = this.parseChildren();
          segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] : new UrlSegmentGroup([], children);
          if (this.peekStartsWith('//')) {
            this.capture('//');
          }
        }
        this.capture(')');
        return segments;
      };
      return UrlParser;
    }());
    var NoMatch = (function() {
      function NoMatch(segmentGroup) {
        if (segmentGroup === void 0) {
          segmentGroup = null;
        }
        this.segmentGroup = segmentGroup;
      }
      return NoMatch;
    }());
    var AbsoluteRedirect = (function() {
      function AbsoluteRedirect(urlTree) {
        this.urlTree = urlTree;
      }
      return AbsoluteRedirect;
    }());
    function noMatch(segmentGroup) {
      return new rxjs_Observable.Observable(function(obs) {
        return obs.error(new NoMatch(segmentGroup));
      });
    }
    function absoluteRedirect(newTree) {
      return new rxjs_Observable.Observable(function(obs) {
        return obs.error(new AbsoluteRedirect(newTree));
      });
    }
    function namedOutletsRedirect(redirectTo) {
      return new rxjs_Observable.Observable(function(obs) {
        return obs.error(new Error("Only absolute redirects can have named outlets. redirectTo: '" + redirectTo + "'"));
      });
    }
    function canLoadFails(route) {
      return new rxjs_Observable.Observable(function(obs) {
        return obs.error(new NavigationCancelingError("Cannot load children because the guard of the route \"path: '" + route.path + "'\" returned false"));
      });
    }
    function applyRedirects(injector, configLoader, urlSerializer, urlTree, config) {
      return new ApplyRedirects(injector, configLoader, urlSerializer, urlTree, config).apply();
    }
    var ApplyRedirects = (function() {
      function ApplyRedirects(injector, configLoader, urlSerializer, urlTree, config) {
        this.injector = injector;
        this.configLoader = configLoader;
        this.urlSerializer = urlSerializer;
        this.urlTree = urlTree;
        this.config = config;
        this.allowRedirects = true;
      }
      ApplyRedirects.prototype.apply = function() {
        var _this = this;
        var expanded$ = this.expandSegmentGroup(this.injector, this.config, this.urlTree.root, PRIMARY_OUTLET);
        var urlTrees$ = rxjs_operator_map.map.call(expanded$, function(rootSegmentGroup) {
          return _this.createUrlTree(rootSegmentGroup, _this.urlTree.queryParams, _this.urlTree.fragment);
        });
        return rxjs_operator_catch._catch.call(urlTrees$, function(e) {
          if (e instanceof AbsoluteRedirect) {
            _this.allowRedirects = false;
            return _this.match(e.urlTree);
          } else if (e instanceof NoMatch) {
            throw _this.noMatchError(e);
          } else {
            throw e;
          }
        });
      };
      ApplyRedirects.prototype.match = function(tree) {
        var _this = this;
        var expanded$ = this.expandSegmentGroup(this.injector, this.config, tree.root, PRIMARY_OUTLET);
        var mapped$ = rxjs_operator_map.map.call(expanded$, function(rootSegmentGroup) {
          return _this.createUrlTree(rootSegmentGroup, tree.queryParams, tree.fragment);
        });
        return rxjs_operator_catch._catch.call(mapped$, function(e) {
          if (e instanceof NoMatch) {
            throw _this.noMatchError(e);
          } else {
            throw e;
          }
        });
      };
      ApplyRedirects.prototype.noMatchError = function(e) {
        return new Error("Cannot match any routes. URL Segment: '" + e.segmentGroup + "'");
      };
      ApplyRedirects.prototype.createUrlTree = function(rootCandidate, queryParams, fragment) {
        var root = rootCandidate.segments.length > 0 ? new UrlSegmentGroup([], (_a = {}, _a[PRIMARY_OUTLET] = rootCandidate, _a)) : rootCandidate;
        return new UrlTree(root, queryParams, fragment);
        var _a;
      };
      ApplyRedirects.prototype.expandSegmentGroup = function(injector, routes, segmentGroup, outlet) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
          return rxjs_operator_map.map.call(this.expandChildren(injector, routes, segmentGroup), function(children) {
            return new UrlSegmentGroup([], children);
          });
        } else {
          return this.expandSegment(injector, segmentGroup, routes, segmentGroup.segments, outlet, true);
        }
      };
      ApplyRedirects.prototype.expandChildren = function(injector, routes, segmentGroup) {
        var _this = this;
        return waitForMap(segmentGroup.children, function(childOutlet, child) {
          return _this.expandSegmentGroup(injector, routes, child, childOutlet);
        });
      };
      ApplyRedirects.prototype.expandSegment = function(injector, segmentGroup, routes, segments, outlet, allowRedirects) {
        var _this = this;
        var routes$ = rxjs_observable_of.of.apply(void 0, routes);
        var processedRoutes$ = rxjs_operator_map.map.call(routes$, function(r) {
          var expanded$ = _this.expandSegmentAgainstRoute(injector, segmentGroup, routes, r, segments, outlet, allowRedirects);
          return rxjs_operator_catch._catch.call(expanded$, function(e) {
            if (e instanceof NoMatch)
              return rxjs_observable_of.of(null);
            else
              throw e;
          });
        });
        var concattedProcessedRoutes$ = rxjs_operator_concatAll.concatAll.call(processedRoutes$);
        var first$ = rxjs_operator_first.first.call(concattedProcessedRoutes$, function(s) {
          return !!s;
        });
        return rxjs_operator_catch._catch.call(first$, function(e, _) {
          if (e instanceof rxjs_util_EmptyError.EmptyError) {
            if (_this.noLeftoversInUrl(segmentGroup, segments, outlet)) {
              return rxjs_observable_of.of(new UrlSegmentGroup([], {}));
            } else {
              throw new NoMatch(segmentGroup);
            }
          } else {
            throw e;
          }
        });
      };
      ApplyRedirects.prototype.noLeftoversInUrl = function(segmentGroup, segments, outlet) {
        return segments.length === 0 && !segmentGroup.children[outlet];
      };
      ApplyRedirects.prototype.expandSegmentAgainstRoute = function(injector, segmentGroup, routes, route, paths, outlet, allowRedirects) {
        if (getOutlet$1(route) !== outlet)
          return noMatch(segmentGroup);
        if (route.redirectTo !== undefined && !(allowRedirects && this.allowRedirects))
          return noMatch(segmentGroup);
        if (route.redirectTo === undefined) {
          return this.matchSegmentAgainstRoute(injector, segmentGroup, route, paths);
        } else {
          return this.expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, paths, outlet);
        }
      };
      ApplyRedirects.prototype.expandSegmentAgainstRouteUsingRedirect = function(injector, segmentGroup, routes, route, segments, outlet) {
        if (route.path === '**') {
          return this.expandWildCardWithParamsAgainstRouteUsingRedirect(injector, routes, route, outlet);
        } else {
          return this.expandRegularSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet);
        }
      };
      ApplyRedirects.prototype.expandWildCardWithParamsAgainstRouteUsingRedirect = function(injector, routes, route, outlet) {
        var _this = this;
        var newTree = this.applyRedirectCommands([], route.redirectTo, {});
        if (route.redirectTo.startsWith('/')) {
          return absoluteRedirect(newTree);
        } else {
          return rxjs_operator_mergeMap.mergeMap.call(this.lineralizeSegments(route, newTree), function(newSegments) {
            var group = new UrlSegmentGroup(newSegments, {});
            return _this.expandSegment(injector, group, routes, newSegments, outlet, false);
          });
        }
      };
      ApplyRedirects.prototype.expandRegularSegmentAgainstRouteUsingRedirect = function(injector, segmentGroup, routes, route, segments, outlet) {
        var _this = this;
        var _a = match(segmentGroup, route, segments),
            matched = _a.matched,
            consumedSegments = _a.consumedSegments,
            lastChild = _a.lastChild,
            positionalParamSegments = _a.positionalParamSegments;
        if (!matched)
          return noMatch(segmentGroup);
        var newTree = this.applyRedirectCommands(consumedSegments, route.redirectTo, (positionalParamSegments));
        if (route.redirectTo.startsWith('/')) {
          return absoluteRedirect(newTree);
        } else {
          return rxjs_operator_mergeMap.mergeMap.call(this.lineralizeSegments(route, newTree), function(newSegments) {
            return _this.expandSegment(injector, segmentGroup, routes, newSegments.concat(segments.slice(lastChild)), outlet, false);
          });
        }
      };
      ApplyRedirects.prototype.matchSegmentAgainstRoute = function(injector, rawSegmentGroup, route, segments) {
        var _this = this;
        if (route.path === '**') {
          if (route.loadChildren) {
            return rxjs_operator_map.map.call(this.configLoader.load(injector, route.loadChildren), function(r) {
              ((route))._loadedConfig = r;
              return new UrlSegmentGroup(segments, {});
            });
          } else {
            return rxjs_observable_of.of(new UrlSegmentGroup(segments, {}));
          }
        } else {
          var _a = match(rawSegmentGroup, route, segments),
              matched = _a.matched,
              consumedSegments_1 = _a.consumedSegments,
              lastChild = _a.lastChild;
          if (!matched)
            return noMatch(rawSegmentGroup);
          var rawSlicedSegments_1 = segments.slice(lastChild);
          var childConfig$ = this.getChildConfig(injector, route);
          return rxjs_operator_mergeMap.mergeMap.call(childConfig$, function(routerConfig) {
            var childInjector = routerConfig.injector;
            var childConfig = routerConfig.routes;
            var _a = split(rawSegmentGroup, consumedSegments_1, rawSlicedSegments_1, childConfig),
                segmentGroup = _a.segmentGroup,
                slicedSegments = _a.slicedSegments;
            if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
              var expanded$ = _this.expandChildren(childInjector, childConfig, segmentGroup);
              return rxjs_operator_map.map.call(expanded$, function(children) {
                return new UrlSegmentGroup(consumedSegments_1, children);
              });
            } else if (childConfig.length === 0 && slicedSegments.length === 0) {
              return rxjs_observable_of.of(new UrlSegmentGroup(consumedSegments_1, {}));
            } else {
              var expanded$ = _this.expandSegment(childInjector, segmentGroup, childConfig, slicedSegments, PRIMARY_OUTLET, true);
              return rxjs_operator_map.map.call(expanded$, function(cs) {
                return new UrlSegmentGroup(consumedSegments_1.concat(cs.segments), cs.children);
              });
            }
          });
        }
      };
      ApplyRedirects.prototype.getChildConfig = function(injector, route) {
        var _this = this;
        if (route.children) {
          return rxjs_observable_of.of(new LoadedRouterConfig(route.children, injector, null, null));
        } else if (route.loadChildren) {
          return rxjs_operator_mergeMap.mergeMap.call(runGuards(injector, route), function(shouldLoad) {
            if (shouldLoad) {
              if (((route))._loadedConfig) {
                return rxjs_observable_of.of(((route))._loadedConfig);
              } else {
                return rxjs_operator_map.map.call(_this.configLoader.load(injector, route.loadChildren), function(r) {
                  ((route))._loadedConfig = r;
                  return r;
                });
              }
            } else {
              return canLoadFails(route);
            }
          });
        } else {
          return rxjs_observable_of.of(new LoadedRouterConfig([], injector, null, null));
        }
      };
      ApplyRedirects.prototype.lineralizeSegments = function(route, urlTree) {
        var res = [];
        var c = urlTree.root;
        while (true) {
          res = res.concat(c.segments);
          if (c.numberOfChildren === 0) {
            return rxjs_observable_of.of(res);
          } else if (c.numberOfChildren > 1 || !c.children[PRIMARY_OUTLET]) {
            return namedOutletsRedirect(route.redirectTo);
          } else {
            c = c.children[PRIMARY_OUTLET];
          }
        }
      };
      ApplyRedirects.prototype.applyRedirectCommands = function(segments, redirectTo, posParams) {
        var t = this.urlSerializer.parse(redirectTo);
        return this.applyRedirectCreatreUrlTree(redirectTo, this.urlSerializer.parse(redirectTo), segments, posParams);
      };
      ApplyRedirects.prototype.applyRedirectCreatreUrlTree = function(redirectTo, urlTree, segments, posParams) {
        var newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
        return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
      };
      ApplyRedirects.prototype.createQueryParams = function(redirectToParams, actualParams) {
        var res = {};
        forEach(redirectToParams, function(v, k) {
          if (v.startsWith(':')) {
            res[k] = actualParams[v.substring(1)];
          } else {
            res[k] = v;
          }
        });
        return res;
      };
      ApplyRedirects.prototype.createSegmentGroup = function(redirectTo, group, segments, posParams) {
        var _this = this;
        var updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
        var children = {};
        forEach(group.children, function(child, name) {
          children[name] = _this.createSegmentGroup(redirectTo, child, segments, posParams);
        });
        return new UrlSegmentGroup(updatedSegments, children);
      };
      ApplyRedirects.prototype.createSegments = function(redirectTo, redirectToSegments, actualSegments, posParams) {
        var _this = this;
        return redirectToSegments.map(function(s) {
          return s.path.startsWith(':') ? _this.findPosParam(redirectTo, s, posParams) : _this.findOrReturn(s, actualSegments);
        });
      };
      ApplyRedirects.prototype.findPosParam = function(redirectTo, redirectToUrlSegment, posParams) {
        var pos = posParams[redirectToUrlSegment.path.substring(1)];
        if (!pos)
          throw new Error("Cannot redirect to '" + redirectTo + "'. Cannot find '" + redirectToUrlSegment.path + "'.");
        return pos;
      };
      ApplyRedirects.prototype.findOrReturn = function(redirectToUrlSegment, actualSegments) {
        var idx = 0;
        for (var _i = 0,
            actualSegments_1 = actualSegments; _i < actualSegments_1.length; _i++) {
          var s = actualSegments_1[_i];
          if (s.path === redirectToUrlSegment.path) {
            actualSegments.splice(idx);
            return s;
          }
          idx++;
        }
        return redirectToUrlSegment;
      };
      return ApplyRedirects;
    }());
    function runGuards(injector, route) {
      var canLoad = route.canLoad;
      if (!canLoad || canLoad.length === 0)
        return rxjs_observable_of.of(true);
      var obs = rxjs_operator_map.map.call(rxjs_observable_from.from(canLoad), function(c) {
        var guard = injector.get(c);
        if (guard.canLoad) {
          return wrapIntoObservable(guard.canLoad(route));
        } else {
          return wrapIntoObservable(guard(route));
        }
      });
      return andObservables(obs);
    }
    function match(segmentGroup, route, segments) {
      var noMatch = {
        matched: false,
        consumedSegments: ([]),
        lastChild: 0,
        positionalParamSegments: {}
      };
      if (route.path === '') {
        if ((route.pathMatch === 'full') && (segmentGroup.hasChildren() || segments.length > 0)) {
          return {
            matched: false,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
          };
        } else {
          return {
            matched: true,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
          };
        }
      }
      var matcher = route.matcher || defaultUrlMatcher;
      var res = matcher(segments, segmentGroup, route);
      if (!res)
        return noMatch;
      return {
        matched: true,
        consumedSegments: res.consumed,
        lastChild: res.consumed.length,
        positionalParamSegments: res.posParams
      };
    }
    function split(segmentGroup, consumedSegments, slicedSegments, config) {
      if (slicedSegments.length > 0 && containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        var s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptySegments(config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
        return {
          segmentGroup: mergeTrivialChildren(s),
          slicedSegments: []
        };
      } else if (slicedSegments.length === 0 && containsEmptyPathRedirects(segmentGroup, slicedSegments, config)) {
        var s = new UrlSegmentGroup(segmentGroup.segments, addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
        return {
          segmentGroup: mergeTrivialChildren(s),
          slicedSegments: slicedSegments
        };
      } else {
        return {
          segmentGroup: segmentGroup,
          slicedSegments: slicedSegments
        };
      }
    }
    function mergeTrivialChildren(s) {
      if (s.numberOfChildren === 1 && s.children[PRIMARY_OUTLET]) {
        var c = s.children[PRIMARY_OUTLET];
        return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
      } else {
        return s;
      }
    }
    function addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
      var res = {};
      for (var _i = 0,
          routes_1 = routes; _i < routes_1.length; _i++) {
        var r = routes_1[_i];
        if (emptyPathRedirect(segmentGroup, slicedSegments, r) && !children[getOutlet$1(r)]) {
          res[getOutlet$1(r)] = new UrlSegmentGroup([], {});
        }
      }
      return merge(children, res);
    }
    function createChildrenForEmptySegments(routes, primarySegmentGroup) {
      var res = {};
      res[PRIMARY_OUTLET] = primarySegmentGroup;
      for (var _i = 0,
          routes_2 = routes; _i < routes_2.length; _i++) {
        var r = routes_2[_i];
        if (r.path === '' && getOutlet$1(r) !== PRIMARY_OUTLET) {
          res[getOutlet$1(r)] = new UrlSegmentGroup([], {});
        }
      }
      return res;
    }
    function containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, slicedSegments, routes) {
      return routes.filter(function(r) {
        return emptyPathRedirect(segmentGroup, slicedSegments, r) && getOutlet$1(r) !== PRIMARY_OUTLET;
      }).length > 0;
    }
    function containsEmptyPathRedirects(segmentGroup, slicedSegments, routes) {
      return routes.filter(function(r) {
        return emptyPathRedirect(segmentGroup, slicedSegments, r);
      }).length > 0;
    }
    function emptyPathRedirect(segmentGroup, slicedSegments, r) {
      if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full')
        return false;
      return r.path === '' && r.redirectTo !== undefined;
    }
    function getOutlet$1(route) {
      return route.outlet ? route.outlet : PRIMARY_OUTLET;
    }
    function validateConfig(config, parentPath) {
      if (parentPath === void 0) {
        parentPath = '';
      }
      for (var i = 0; i < config.length; i++) {
        var route = config[i];
        var fullPath = getFullPath(parentPath, route);
        validateNode(route, fullPath);
      }
    }
    function validateNode(route, fullPath) {
      if (!route) {
        throw new Error("\n      Invalid configuration of route '" + fullPath + "': Encountered undefined route.\n      The reason might be an extra comma.\n       \n      Example: \n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    ");
      }
      if (Array.isArray(route)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': Array cannot be specified");
      }
      if (!route.component && (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': a componentless route cannot have a named outlet set");
      }
      if (route.redirectTo && route.children) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and children cannot be used together");
      }
      if (route.redirectTo && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and loadChildren cannot be used together");
      }
      if (route.children && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': children and loadChildren cannot be used together");
      }
      if (route.redirectTo && route.component) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and component cannot be used together");
      }
      if (route.path && route.matcher) {
        throw new Error("Invalid configuration of route '" + fullPath + "': path and matcher cannot be used together");
      }
      if (route.redirectTo === void 0 && !route.component && !route.children && !route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "'. One of the following must be provided: component, redirectTo, children or loadChildren");
      }
      if (route.path === void 0 && route.matcher === void 0) {
        throw new Error("Invalid configuration of route '" + fullPath + "': routes must have either a path or a matcher specified");
      }
      if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
        throw new Error("Invalid configuration of route '" + fullPath + "': path cannot start with a slash");
      }
      if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
        var exp = "The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.";
        throw new Error("Invalid configuration of route '{path: \"" + fullPath + "\", redirectTo: \"" + route.redirectTo + "\"}': please provide 'pathMatch'. " + exp);
      }
      if (route.pathMatch !== void 0 && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
        throw new Error("Invalid configuration of route '" + fullPath + "': pathMatch can only be set to 'prefix' or 'full'");
      }
      if (route.children) {
        validateConfig(route.children, fullPath);
      }
    }
    function getFullPath(parentPath, currentRoute) {
      if (!currentRoute) {
        return parentPath;
      }
      if (!parentPath && !currentRoute.path) {
        return '';
      } else if (parentPath && !currentRoute.path) {
        return parentPath + "/";
      } else if (!parentPath && currentRoute.path) {
        return currentRoute.path;
      } else {
        return parentPath + "/" + currentRoute.path;
      }
    }
    var Tree = (function() {
      function Tree(root) {
        this._root = root;
      }
      Object.defineProperty(Tree.prototype, "root", {
        get: function() {
          return this._root.value;
        },
        enumerable: true,
        configurable: true
      });
      Tree.prototype.parent = function(t) {
        var p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
      };
      Tree.prototype.children = function(t) {
        var n = findNode(t, this._root);
        return n ? n.children.map(function(t) {
          return t.value;
        }) : [];
      };
      Tree.prototype.firstChild = function(t) {
        var n = findNode(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
      };
      Tree.prototype.siblings = function(t) {
        var p = findPath(t, this._root, []);
        if (p.length < 2)
          return [];
        var c = p[p.length - 2].children.map(function(c) {
          return c.value;
        });
        return c.filter(function(cc) {
          return cc !== t;
        });
      };
      Tree.prototype.pathFromRoot = function(t) {
        return findPath(t, this._root, []).map(function(s) {
          return s.value;
        });
      };
      return Tree;
    }());
    function findNode(expected, c) {
      if (expected === c.value)
        return c;
      for (var _i = 0,
          _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var r = findNode(expected, cc);
        if (r)
          return r;
      }
      return null;
    }
    function findPath(expected, c, collected) {
      collected.push(c);
      if (expected === c.value)
        return collected;
      for (var _i = 0,
          _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var cloned = collected.slice(0);
        var r = findPath(expected, cc, cloned);
        if (r.length > 0)
          return r;
      }
      return [];
    }
    var TreeNode = (function() {
      function TreeNode(value, children) {
        this.value = value;
        this.children = children;
      }
      TreeNode.prototype.toString = function() {
        return "TreeNode(" + this.value + ")";
      };
      return TreeNode;
    }());
    var __extends$1 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var RouterState = (function(_super) {
      __extends$1(RouterState, _super);
      function RouterState(root, snapshot) {
        _super.call(this, root);
        this.snapshot = snapshot;
        setRouterStateSnapshot(this, root);
      }
      RouterState.prototype.toString = function() {
        return this.snapshot.toString();
      };
      return RouterState;
    }(Tree));
    function createEmptyState(urlTree, rootComponent) {
      var snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
      var emptyUrl = new rxjs_BehaviorSubject.BehaviorSubject([new UrlSegment('', {})]);
      var emptyParams = new rxjs_BehaviorSubject.BehaviorSubject({});
      var emptyData = new rxjs_BehaviorSubject.BehaviorSubject({});
      var emptyQueryParams = new rxjs_BehaviorSubject.BehaviorSubject({});
      var fragment = new rxjs_BehaviorSubject.BehaviorSubject('');
      var activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
      activated.snapshot = snapshot.root;
      return new RouterState(new TreeNode(activated, []), snapshot);
    }
    function createEmptyStateSnapshot(urlTree, rootComponent) {
      var emptyParams = {};
      var emptyData = {};
      var emptyQueryParams = {};
      var fragment = '';
      var activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1, {});
      return new RouterStateSnapshot('', new TreeNode(activated, []));
    }
    var ActivatedRoute = (function() {
      function ActivatedRoute(url, params, queryParams, fragment, data, outlet, component, futureSnapshot) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
      }
      Object.defineProperty(ActivatedRoute.prototype, "routeConfig", {
        get: function() {
          return this._futureSnapshot.routeConfig;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRoute.prototype, "root", {
        get: function() {
          return this._routerState.root;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRoute.prototype, "parent", {
        get: function() {
          return this._routerState.parent(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRoute.prototype, "firstChild", {
        get: function() {
          return this._routerState.firstChild(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRoute.prototype, "children", {
        get: function() {
          return this._routerState.children(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRoute.prototype, "pathFromRoot", {
        get: function() {
          return this._routerState.pathFromRoot(this);
        },
        enumerable: true,
        configurable: true
      });
      ActivatedRoute.prototype.toString = function() {
        return this.snapshot ? this.snapshot.toString() : "Future(" + this._futureSnapshot + ")";
      };
      return ActivatedRoute;
    }());
    function inheritedParamsDataResolve(route) {
      var pathToRoot = route.pathFromRoot;
      var inhertingStartingFrom = pathToRoot.length - 1;
      while (inhertingStartingFrom >= 1) {
        var current = pathToRoot[inhertingStartingFrom];
        var parent_1 = pathToRoot[inhertingStartingFrom - 1];
        if (current.routeConfig && current.routeConfig.path === '') {
          inhertingStartingFrom--;
        } else if (!parent_1.component) {
          inhertingStartingFrom--;
        } else {
          break;
        }
      }
      return pathToRoot.slice(inhertingStartingFrom).reduce(function(res, curr) {
        var params = merge(res.params, curr.params);
        var data = merge(res.data, curr.data);
        var resolve = merge(res.resolve, curr._resolvedData);
        return {
          params: params,
          data: data,
          resolve: resolve
        };
      }, ({
        params: {},
        data: {},
        resolve: {}
      }));
    }
    var ActivatedRouteSnapshot = (function() {
      function ActivatedRouteSnapshot(url, params, queryParams, fragment, data, outlet, component, routeConfig, urlSegment, lastPathIndex, resolve) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._routeConfig = routeConfig;
        this._urlSegment = urlSegment;
        this._lastPathIndex = lastPathIndex;
        this._resolve = resolve;
      }
      Object.defineProperty(ActivatedRouteSnapshot.prototype, "routeConfig", {
        get: function() {
          return this._routeConfig;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRouteSnapshot.prototype, "root", {
        get: function() {
          return this._routerState.root;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRouteSnapshot.prototype, "parent", {
        get: function() {
          return this._routerState.parent(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRouteSnapshot.prototype, "firstChild", {
        get: function() {
          return this._routerState.firstChild(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRouteSnapshot.prototype, "children", {
        get: function() {
          return this._routerState.children(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ActivatedRouteSnapshot.prototype, "pathFromRoot", {
        get: function() {
          return this._routerState.pathFromRoot(this);
        },
        enumerable: true,
        configurable: true
      });
      ActivatedRouteSnapshot.prototype.toString = function() {
        var url = this.url.map(function(segment) {
          return segment.toString();
        }).join('/');
        var matched = this._routeConfig ? this._routeConfig.path : '';
        return "Route(url:'" + url + "', path:'" + matched + "')";
      };
      return ActivatedRouteSnapshot;
    }());
    var RouterStateSnapshot = (function(_super) {
      __extends$1(RouterStateSnapshot, _super);
      function RouterStateSnapshot(url, root) {
        _super.call(this, root);
        this.url = url;
        setRouterStateSnapshot(this, root);
      }
      RouterStateSnapshot.prototype.toString = function() {
        return serializeNode(this._root);
      };
      return RouterStateSnapshot;
    }(Tree));
    function setRouterStateSnapshot(state, node) {
      node.value._routerState = state;
      node.children.forEach(function(c) {
        return setRouterStateSnapshot(state, c);
      });
    }
    function serializeNode(node) {
      var c = node.children.length > 0 ? " { " + node.children.map(serializeNode).join(", ") + " } " : '';
      return "" + node.value + c;
    }
    function advanceActivatedRoute(route) {
      if (route.snapshot) {
        var currentSnapshot = route.snapshot;
        route.snapshot = route._futureSnapshot;
        if (!shallowEqual(currentSnapshot.queryParams, route._futureSnapshot.queryParams)) {
          ((route.queryParams)).next(route._futureSnapshot.queryParams);
        }
        if (currentSnapshot.fragment !== route._futureSnapshot.fragment) {
          ((route.fragment)).next(route._futureSnapshot.fragment);
        }
        if (!shallowEqual(currentSnapshot.params, route._futureSnapshot.params)) {
          ((route.params)).next(route._futureSnapshot.params);
        }
        if (!shallowEqualArrays(currentSnapshot.url, route._futureSnapshot.url)) {
          ((route.url)).next(route._futureSnapshot.url);
        }
        if (!equalParamsAndUrlSegments(currentSnapshot, route._futureSnapshot)) {
          ((route.data)).next(route._futureSnapshot.data);
        }
      } else {
        route.snapshot = route._futureSnapshot;
        ((route.data)).next(route._futureSnapshot.data);
      }
    }
    function equalParamsAndUrlSegments(a, b) {
      return shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
    }
    function createRouterState(routeReuseStrategy, curr, prevState) {
      var root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : undefined);
      return new RouterState(root, curr);
    }
    function createNode(routeReuseStrategy, curr, prevState) {
      if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
        var value = prevState.value;
        value._futureSnapshot = curr.value;
        var children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
        return new TreeNode(value, children);
      } else if (routeReuseStrategy.retrieve(curr.value)) {
        var tree = ((routeReuseStrategy.retrieve(curr.value))).route;
        setFutureSnapshotsOfActivatedRoutes(curr, tree);
        return tree;
      } else {
        var value = createActivatedRoute(curr.value);
        var children = curr.children.map(function(c) {
          return createNode(routeReuseStrategy, c);
        });
        return new TreeNode(value, children);
      }
    }
    function setFutureSnapshotsOfActivatedRoutes(curr, result) {
      if (curr.value.routeConfig !== result.value.routeConfig) {
        throw new Error('Cannot reattach ActivatedRouteSnapshot created from a different route');
      }
      if (curr.children.length !== result.children.length) {
        throw new Error('Cannot reattach ActivatedRouteSnapshot with a different number of children');
      }
      result.value._futureSnapshot = curr.value;
      for (var i = 0; i < curr.children.length; ++i) {
        setFutureSnapshotsOfActivatedRoutes(curr.children[i], result.children[i]);
      }
    }
    function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
      return curr.children.map(function(child) {
        for (var _i = 0,
            _a = prevState.children; _i < _a.length; _i++) {
          var p = _a[_i];
          if (routeReuseStrategy.shouldReuseRoute(p.value.snapshot, child.value)) {
            return createNode(routeReuseStrategy, child, p);
          }
        }
        return createNode(routeReuseStrategy, child);
      });
    }
    function createActivatedRoute(c) {
      return new ActivatedRoute(new rxjs_BehaviorSubject.BehaviorSubject(c.url), new rxjs_BehaviorSubject.BehaviorSubject(c.params), new rxjs_BehaviorSubject.BehaviorSubject(c.queryParams), new rxjs_BehaviorSubject.BehaviorSubject(c.fragment), new rxjs_BehaviorSubject.BehaviorSubject(c.data), c.outlet, c.component, c);
    }
    function createUrlTree(route, urlTree, commands, queryParams, fragment) {
      if (commands.length === 0) {
        return tree(urlTree.root, urlTree.root, urlTree, queryParams, fragment);
      }
      var nav = computeNavigation(commands);
      if (nav.toRoot()) {
        return tree(urlTree.root, new UrlSegmentGroup([], {}), urlTree, queryParams, fragment);
      }
      var startingPosition = findStartingPosition(nav, urlTree, route);
      var segmentGroup = startingPosition.processChildren ? updateSegmentGroupChildren(startingPosition.segmentGroup, startingPosition.index, nav.commands) : updateSegmentGroup(startingPosition.segmentGroup, startingPosition.index, nav.commands);
      return tree(startingPosition.segmentGroup, segmentGroup, urlTree, queryParams, fragment);
    }
    function isMatrixParams(command) {
      return typeof command === 'object' && command != null && !command.outlets && !command.segmentPath;
    }
    function tree(oldSegmentGroup, newSegmentGroup, urlTree, queryParams, fragment) {
      if (urlTree.root === oldSegmentGroup) {
        return new UrlTree(newSegmentGroup, stringify(queryParams), fragment);
      }
      return new UrlTree(replaceSegment(urlTree.root, oldSegmentGroup, newSegmentGroup), stringify(queryParams), fragment);
    }
    function replaceSegment(current, oldSegment, newSegment) {
      var children = {};
      forEach(current.children, function(c, outletName) {
        if (c === oldSegment) {
          children[outletName] = newSegment;
        } else {
          children[outletName] = replaceSegment(c, oldSegment, newSegment);
        }
      });
      return new UrlSegmentGroup(current.segments, children);
    }
    var Navigation = (function() {
      function Navigation(isAbsolute, numberOfDoubleDots, commands) {
        this.isAbsolute = isAbsolute;
        this.numberOfDoubleDots = numberOfDoubleDots;
        this.commands = commands;
        if (isAbsolute && commands.length > 0 && isMatrixParams(commands[0])) {
          throw new Error('Root segment cannot have matrix parameters');
        }
        var cmdWithOutlet = commands.find(function(c) {
          return typeof c === 'object' && c != null && c.outlets;
        });
        if (cmdWithOutlet && cmdWithOutlet !== last(commands)) {
          throw new Error('{outlets:{}} has to be the last command');
        }
      }
      Navigation.prototype.toRoot = function() {
        return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
      };
      return Navigation;
    }());
    function computeNavigation(commands) {
      if ((typeof commands[0] === 'string') && commands.length === 1 && commands[0] === '/') {
        return new Navigation(true, 0, commands);
      }
      var numberOfDoubleDots = 0;
      var isAbsolute = false;
      var res = commands.reduce(function(res, cmd, cmdIdx) {
        if (typeof cmd === 'object' && cmd != null) {
          if (cmd.outlets) {
            var outlets_1 = {};
            forEach(cmd.outlets, function(commands, name) {
              outlets_1[name] = typeof commands === 'string' ? commands.split('/') : commands;
            });
            return res.concat([{outlets: outlets_1}]);
          }
          if (cmd.segmentPath) {
            return res.concat([cmd.segmentPath]);
          }
        }
        if (!(typeof cmd === 'string')) {
          return res.concat([cmd]);
        }
        if (cmdIdx === 0) {
          cmd.split('/').forEach(function(urlPart, partIndex) {
            if (partIndex == 0 && urlPart === '.') {} else if (partIndex == 0 && urlPart === '') {
              isAbsolute = true;
            } else if (urlPart === '..') {
              numberOfDoubleDots++;
            } else if (urlPart != '') {
              res.push(urlPart);
            }
          });
          return res;
        }
        return res.concat([cmd]);
      }, []);
      return new Navigation(isAbsolute, numberOfDoubleDots, res);
    }
    var Position = (function() {
      function Position(segmentGroup, processChildren, index) {
        this.segmentGroup = segmentGroup;
        this.processChildren = processChildren;
        this.index = index;
      }
      return Position;
    }());
    function findStartingPosition(nav, tree, route) {
      if (nav.isAbsolute) {
        return new Position(tree.root, true, 0);
      }
      if (route.snapshot._lastPathIndex === -1) {
        return new Position(route.snapshot._urlSegment, true, 0);
      }
      var modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
      var index = route.snapshot._lastPathIndex + modifier;
      return createPositionApplyingDoubleDots(route.snapshot._urlSegment, index, nav.numberOfDoubleDots);
    }
    function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
      var g = group;
      var ci = index;
      var dd = numberOfDoubleDots;
      while (dd > ci) {
        dd -= ci;
        g = g.parent;
        if (!g) {
          throw new Error('Invalid number of \'../\'');
        }
        ci = g.segments.length;
      }
      return new Position(g, false, ci - dd);
    }
    function getPath(command) {
      if (typeof command === 'object' && command != null && command.outlets) {
        return command.outlets[PRIMARY_OUTLET];
      }
      return "" + command;
    }
    function getOutlets(commands) {
      if (!(typeof commands[0] === 'object'))
        return (_a = {}, _a[PRIMARY_OUTLET] = commands, _a);
      if (commands[0].outlets === undefined)
        return (_b = {}, _b[PRIMARY_OUTLET] = commands, _b);
      return commands[0].outlets;
      var _a,
          _b;
    }
    function updateSegmentGroup(segmentGroup, startIndex, commands) {
      if (!segmentGroup) {
        segmentGroup = new UrlSegmentGroup([], {});
      }
      if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
        return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
      }
      var m = prefixedWith(segmentGroup, startIndex, commands);
      var slicedCommands = commands.slice(m.commandIndex);
      if (m.match && m.pathIndex < segmentGroup.segments.length) {
        var g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
        g.children[PRIMARY_OUTLET] = new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
        return updateSegmentGroupChildren(g, 0, slicedCommands);
      } else if (m.match && slicedCommands.length === 0) {
        return new UrlSegmentGroup(segmentGroup.segments, {});
      } else if (m.match && !segmentGroup.hasChildren()) {
        return createNewSegmentGroup(segmentGroup, startIndex, commands);
      } else if (m.match) {
        return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
      } else {
        return createNewSegmentGroup(segmentGroup, startIndex, commands);
      }
    }
    function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
      if (commands.length === 0) {
        return new UrlSegmentGroup(segmentGroup.segments, {});
      } else {
        var outlets_2 = getOutlets(commands);
        var children_1 = {};
        forEach(outlets_2, function(commands, outlet) {
          if (commands !== null) {
            children_1[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands);
          }
        });
        forEach(segmentGroup.children, function(child, childOutlet) {
          if (outlets_2[childOutlet] === undefined) {
            children_1[childOutlet] = child;
          }
        });
        return new UrlSegmentGroup(segmentGroup.segments, children_1);
      }
    }
    function prefixedWith(segmentGroup, startIndex, commands) {
      var currentCommandIndex = 0;
      var currentPathIndex = startIndex;
      var noMatch = {
        match: false,
        pathIndex: 0,
        commandIndex: 0
      };
      while (currentPathIndex < segmentGroup.segments.length) {
        if (currentCommandIndex >= commands.length)
          return noMatch;
        var path = segmentGroup.segments[currentPathIndex];
        var curr = getPath(commands[currentCommandIndex]);
        var next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
        if (currentPathIndex > 0 && curr === undefined)
          break;
        if (curr && next && (typeof next === 'object') && next.outlets === undefined) {
          if (!compare(curr, next, path))
            return noMatch;
          currentCommandIndex += 2;
        } else {
          if (!compare(curr, {}, path))
            return noMatch;
          currentCommandIndex++;
        }
        currentPathIndex++;
      }
      return {
        match: true,
        pathIndex: currentPathIndex,
        commandIndex: currentCommandIndex
      };
    }
    function createNewSegmentGroup(segmentGroup, startIndex, commands) {
      var paths = segmentGroup.segments.slice(0, startIndex);
      var i = 0;
      while (i < commands.length) {
        if (typeof commands[i] === 'object' && commands[i].outlets !== undefined) {
          var children = createNewSegmentChildren(commands[i].outlets);
          return new UrlSegmentGroup(paths, children);
        }
        if (i === 0 && isMatrixParams(commands[0])) {
          var p = segmentGroup.segments[startIndex];
          paths.push(new UrlSegment(p.path, commands[0]));
          i++;
          continue;
        }
        var curr = getPath(commands[i]);
        var next = (i < commands.length - 1) ? commands[i + 1] : null;
        if (curr && next && isMatrixParams(next)) {
          paths.push(new UrlSegment(curr, stringify(next)));
          i += 2;
        } else {
          paths.push(new UrlSegment(curr, {}));
          i++;
        }
      }
      return new UrlSegmentGroup(paths, {});
    }
    function createNewSegmentChildren(outlets) {
      var children = {};
      forEach(outlets, function(commands, outlet) {
        if (commands !== null) {
          children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
        }
      });
      return children;
    }
    function stringify(params) {
      var res = {};
      forEach(params, function(v, k) {
        return res[k] = "" + v;
      });
      return res;
    }
    function compare(path, params, segment) {
      return path == segment.path && shallowEqual(params, segment.parameters);
    }
    var NoMatch$1 = (function() {
      function NoMatch() {}
      return NoMatch;
    }());
    function recognize(rootComponentType, config, urlTree, url) {
      return new Recognizer(rootComponentType, config, urlTree, url).recognize();
    }
    var Recognizer = (function() {
      function Recognizer(rootComponentType, config, urlTree, url) {
        this.rootComponentType = rootComponentType;
        this.config = config;
        this.urlTree = urlTree;
        this.url = url;
      }
      Recognizer.prototype.recognize = function() {
        try {
          var rootSegmentGroup = split$1(this.urlTree.root, [], [], this.config).segmentGroup;
          var children = this.processSegmentGroup(this.config, rootSegmentGroup, PRIMARY_OUTLET);
          var root = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, {}, PRIMARY_OUTLET, this.rootComponentType, null, this.urlTree.root, -1, {});
          var rootNode = new TreeNode(root, children);
          var routeState = new RouterStateSnapshot(this.url, rootNode);
          this.inheriteParamsAndData(routeState._root);
          return rxjs_observable_of.of(routeState);
        } catch (e) {
          return new rxjs_Observable.Observable(function(obs) {
            return obs.error(e);
          });
        }
      };
      Recognizer.prototype.inheriteParamsAndData = function(routeNode) {
        var _this = this;
        var route = routeNode.value;
        var i = inheritedParamsDataResolve(route);
        route.params = Object.freeze(i.params);
        route.data = Object.freeze(i.data);
        routeNode.children.forEach(function(n) {
          return _this.inheriteParamsAndData(n);
        });
      };
      Recognizer.prototype.processSegmentGroup = function(config, segmentGroup, outlet) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
          return this.processChildren(config, segmentGroup);
        } else {
          return this.processSegment(config, segmentGroup, segmentGroup.segments, outlet);
        }
      };
      Recognizer.prototype.processChildren = function(config, segmentGroup) {
        var _this = this;
        var children = mapChildrenIntoArray(segmentGroup, function(child, childOutlet) {
          return _this.processSegmentGroup(config, child, childOutlet);
        });
        checkOutletNameUniqueness(children);
        sortActivatedRouteSnapshots(children);
        return children;
      };
      Recognizer.prototype.processSegment = function(config, segmentGroup, segments, outlet) {
        for (var _i = 0,
            config_1 = config; _i < config_1.length; _i++) {
          var r = config_1[_i];
          try {
            return this.processSegmentAgainstRoute(r, segmentGroup, segments, outlet);
          } catch (e) {
            if (!(e instanceof NoMatch$1))
              throw e;
          }
        }
        if (this.noLeftoversInUrl(segmentGroup, segments, outlet)) {
          return [];
        } else {
          throw new NoMatch$1();
        }
      };
      Recognizer.prototype.noLeftoversInUrl = function(segmentGroup, segments, outlet) {
        return segments.length === 0 && !segmentGroup.children[outlet];
      };
      Recognizer.prototype.processSegmentAgainstRoute = function(route, rawSegment, segments, outlet) {
        if (route.redirectTo)
          throw new NoMatch$1();
        if ((route.outlet ? route.outlet : PRIMARY_OUTLET) !== outlet)
          throw new NoMatch$1();
        if (route.path === '**') {
          var params = segments.length > 0 ? last(segments).parameters : {};
          var snapshot_1 = new ActivatedRouteSnapshot(segments, params, Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, getData(route), outlet, route.component, route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + segments.length, getResolve(route));
          return [new TreeNode(snapshot_1, [])];
        }
        var _a = match$1(rawSegment, route, segments),
            consumedSegments = _a.consumedSegments,
            parameters = _a.parameters,
            lastChild = _a.lastChild;
        var rawSlicedSegments = segments.slice(lastChild);
        var childConfig = getChildConfig(route);
        var _b = split$1(rawSegment, consumedSegments, rawSlicedSegments, childConfig),
            segmentGroup = _b.segmentGroup,
            slicedSegments = _b.slicedSegments;
        var snapshot = new ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, getData(route), outlet, route.component, route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + consumedSegments.length, getResolve(route));
        if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
          var children = this.processChildren(childConfig, segmentGroup);
          return [new TreeNode(snapshot, children)];
        } else if (childConfig.length === 0 && slicedSegments.length === 0) {
          return [new TreeNode(snapshot, [])];
        } else {
          var children = this.processSegment(childConfig, segmentGroup, slicedSegments, PRIMARY_OUTLET);
          return [new TreeNode(snapshot, children)];
        }
      };
      return Recognizer;
    }());
    function sortActivatedRouteSnapshots(nodes) {
      nodes.sort(function(a, b) {
        if (a.value.outlet === PRIMARY_OUTLET)
          return -1;
        if (b.value.outlet === PRIMARY_OUTLET)
          return 1;
        return a.value.outlet.localeCompare(b.value.outlet);
      });
    }
    function getChildConfig(route) {
      if (route.children) {
        return route.children;
      } else if (route.loadChildren) {
        return ((route))._loadedConfig.routes;
      } else {
        return [];
      }
    }
    function match$1(segmentGroup, route, segments) {
      if (route.path === '') {
        if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
          throw new NoMatch$1();
        } else {
          return {
            consumedSegments: [],
            lastChild: 0,
            parameters: {}
          };
        }
      }
      var matcher = route.matcher || defaultUrlMatcher;
      var res = matcher(segments, segmentGroup, route);
      if (!res)
        throw new NoMatch$1();
      var posParams = {};
      forEach(res.posParams, function(v, k) {
        posParams[k] = v.path;
      });
      var parameters = merge(posParams, res.consumed[res.consumed.length - 1].parameters);
      return {
        consumedSegments: res.consumed,
        lastChild: res.consumed.length,
        parameters: parameters
      };
    }
    function checkOutletNameUniqueness(nodes) {
      var names = {};
      nodes.forEach(function(n) {
        var routeWithSameOutletName = names[n.value.outlet];
        if (routeWithSameOutletName) {
          var p = routeWithSameOutletName.url.map(function(s) {
            return s.toString();
          }).join('/');
          var c = n.value.url.map(function(s) {
            return s.toString();
          }).join('/');
          throw new Error("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
        }
        names[n.value.outlet] = n.value;
      });
    }
    function getSourceSegmentGroup(segmentGroup) {
      var s = segmentGroup;
      while (s._sourceSegment) {
        s = s._sourceSegment;
      }
      return s;
    }
    function getPathIndexShift(segmentGroup) {
      var s = segmentGroup;
      var res = (s._segmentIndexShift ? s._segmentIndexShift : 0);
      while (s._sourceSegment) {
        s = s._sourceSegment;
        res += (s._segmentIndexShift ? s._segmentIndexShift : 0);
      }
      return res - 1;
    }
    function split$1(segmentGroup, consumedSegments, slicedSegments, config) {
      if (slicedSegments.length > 0 && containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        var s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return {
          segmentGroup: s,
          slicedSegments: []
        };
      } else if (slicedSegments.length === 0 && containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
        var s = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return {
          segmentGroup: s,
          slicedSegments: slicedSegments
        };
      } else {
        var s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return {
          segmentGroup: s,
          slicedSegments: slicedSegments
        };
      }
    }
    function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
      var res = {};
      for (var _i = 0,
          routes_1 = routes; _i < routes_1.length; _i++) {
        var r = routes_1[_i];
        if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet$2(r)]) {
          var s = new UrlSegmentGroup([], {});
          s._sourceSegment = segmentGroup;
          s._segmentIndexShift = segmentGroup.segments.length;
          res[getOutlet$2(r)] = s;
        }
      }
      return merge(children, res);
    }
    function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes, primarySegment) {
      var res = {};
      res[PRIMARY_OUTLET] = primarySegment;
      primarySegment._sourceSegment = segmentGroup;
      primarySegment._segmentIndexShift = consumedSegments.length;
      for (var _i = 0,
          routes_2 = routes; _i < routes_2.length; _i++) {
        var r = routes_2[_i];
        if (r.path === '' && getOutlet$2(r) !== PRIMARY_OUTLET) {
          var s = new UrlSegmentGroup([], {});
          s._sourceSegment = segmentGroup;
          s._segmentIndexShift = consumedSegments.length;
          res[getOutlet$2(r)] = s;
        }
      }
      return res;
    }
    function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
      return routes.filter(function(r) {
        return emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet$2(r) !== PRIMARY_OUTLET;
      }).length > 0;
    }
    function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
      return routes.filter(function(r) {
        return emptyPathMatch(segmentGroup, slicedSegments, r);
      }).length > 0;
    }
    function emptyPathMatch(segmentGroup, slicedSegments, r) {
      if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full')
        return false;
      return r.path === '' && r.redirectTo === undefined;
    }
    function getOutlet$2(route) {
      return route.outlet ? route.outlet : PRIMARY_OUTLET;
    }
    function getData(route) {
      return route.data ? route.data : {};
    }
    function getResolve(route) {
      return route.resolve ? route.resolve : {};
    }
    var RouterOutletMap = (function() {
      function RouterOutletMap() {
        this._outlets = {};
      }
      RouterOutletMap.prototype.registerOutlet = function(name, outlet) {
        this._outlets[name] = outlet;
      };
      RouterOutletMap.prototype.removeOutlet = function(name) {
        this._outlets[name] = undefined;
      };
      return RouterOutletMap;
    }());
    var UrlHandlingStrategy = (function() {
      function UrlHandlingStrategy() {}
      UrlHandlingStrategy.prototype.shouldProcessUrl = function(url) {};
      UrlHandlingStrategy.prototype.extract = function(url) {};
      UrlHandlingStrategy.prototype.merge = function(newUrlPart, rawUrl) {};
      return UrlHandlingStrategy;
    }());
    var DefaultUrlHandlingStrategy = (function() {
      function DefaultUrlHandlingStrategy() {}
      DefaultUrlHandlingStrategy.prototype.shouldProcessUrl = function(url) {
        return true;
      };
      DefaultUrlHandlingStrategy.prototype.extract = function(url) {
        return url;
      };
      DefaultUrlHandlingStrategy.prototype.merge = function(newUrlPart, wholeUrl) {
        return newUrlPart;
      };
      return DefaultUrlHandlingStrategy;
    }());
    var NavigationStart = (function() {
      function NavigationStart(id, url) {
        this.id = id;
        this.url = url;
      }
      NavigationStart.prototype.toString = function() {
        return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')";
      };
      return NavigationStart;
    }());
    var NavigationEnd = (function() {
      function NavigationEnd(id, url, urlAfterRedirects) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
      }
      NavigationEnd.prototype.toString = function() {
        return "NavigationEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "')";
      };
      return NavigationEnd;
    }());
    var NavigationCancel = (function() {
      function NavigationCancel(id, url, reason) {
        this.id = id;
        this.url = url;
        this.reason = reason;
      }
      NavigationCancel.prototype.toString = function() {
        return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')";
      };
      return NavigationCancel;
    }());
    var NavigationError = (function() {
      function NavigationError(id, url, error) {
        this.id = id;
        this.url = url;
        this.error = error;
      }
      NavigationError.prototype.toString = function() {
        return "NavigationError(id: " + this.id + ", url: '" + this.url + "', error: " + this.error + ")";
      };
      return NavigationError;
    }());
    var RoutesRecognized = (function() {
      function RoutesRecognized(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      RoutesRecognized.prototype.toString = function() {
        return "RoutesRecognized(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
      };
      return RoutesRecognized;
    }());
    function defaultErrorHandler(error) {
      throw error;
    }
    function defaultRouterHook(snapshot) {
      return rxjs_observable_of.of(null);
    }
    var DefaultRouteReuseStrategy = (function() {
      function DefaultRouteReuseStrategy() {}
      DefaultRouteReuseStrategy.prototype.shouldDetach = function(route) {
        return false;
      };
      DefaultRouteReuseStrategy.prototype.store = function(route, detachedTree) {};
      DefaultRouteReuseStrategy.prototype.shouldAttach = function(route) {
        return false;
      };
      DefaultRouteReuseStrategy.prototype.retrieve = function(route) {
        return null;
      };
      DefaultRouteReuseStrategy.prototype.shouldReuseRoute = function(future, curr) {
        return future.routeConfig === curr.routeConfig;
      };
      return DefaultRouteReuseStrategy;
    }());
    var Router = (function() {
      function Router(rootComponentType, urlSerializer, outletMap, location, injector, loader, compiler, config) {
        this.rootComponentType = rootComponentType;
        this.urlSerializer = urlSerializer;
        this.outletMap = outletMap;
        this.location = location;
        this.injector = injector;
        this.config = config;
        this.navigations = new rxjs_BehaviorSubject.BehaviorSubject(null);
        this.routerEvents = new rxjs_Subject.Subject();
        this.navigationId = 0;
        this.errorHandler = defaultErrorHandler;
        this.navigated = false;
        this.hooks = {
          beforePreactivation: defaultRouterHook,
          afterPreactivation: defaultRouterHook
        };
        this.urlHandlingStrategy = new DefaultUrlHandlingStrategy();
        this.routeReuseStrategy = new DefaultRouteReuseStrategy();
        this.resetConfig(config);
        this.currentUrlTree = createEmptyUrlTree();
        this.rawUrlTree = this.currentUrlTree;
        this.configLoader = new RouterConfigLoader(loader, compiler);
        this.currentRouterState = createEmptyState(this.currentUrlTree, this.rootComponentType);
        this.processNavigations();
      }
      Router.prototype.resetRootComponentType = function(rootComponentType) {
        this.rootComponentType = rootComponentType;
        this.currentRouterState.root.component = this.rootComponentType;
      };
      Router.prototype.initialNavigation = function() {
        this.setUpLocationChangeListener();
        if (this.navigationId === 0) {
          this.navigateByUrl(this.location.path(true), {replaceUrl: true});
        }
      };
      Router.prototype.setUpLocationChangeListener = function() {
        var _this = this;
        if (!this.locationSubscription) {
          this.locationSubscription = (this.location.subscribe(Zone.current.wrap(function(change) {
            var rawUrlTree = _this.urlSerializer.parse(change['url']);
            var source = change['type'] === 'popstate' ? 'popstate' : 'hashchange';
            setTimeout(function() {
              _this.scheduleNavigation(rawUrlTree, source, {replaceUrl: true});
            }, 0);
          })));
        }
      };
      Object.defineProperty(Router.prototype, "routerState", {
        get: function() {
          return this.currentRouterState;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Router.prototype, "url", {
        get: function() {
          return this.serializeUrl(this.currentUrlTree);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Router.prototype, "events", {
        get: function() {
          return this.routerEvents;
        },
        enumerable: true,
        configurable: true
      });
      Router.prototype.resetConfig = function(config) {
        validateConfig(config);
        this.config = config;
      };
      Router.prototype.ngOnDestroy = function() {
        this.dispose();
      };
      Router.prototype.dispose = function() {
        if (this.locationSubscription) {
          this.locationSubscription.unsubscribe();
          this.locationSubscription = null;
        }
      };
      Router.prototype.createUrlTree = function(commands, _a) {
        var _b = _a === void 0 ? {} : _a,
            relativeTo = _b.relativeTo,
            queryParams = _b.queryParams,
            fragment = _b.fragment,
            preserveQueryParams = _b.preserveQueryParams,
            preserveFragment = _b.preserveFragment;
        var a = relativeTo || this.routerState.root;
        var q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams;
        var f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        return createUrlTree(a, this.currentUrlTree, commands, q, f);
      };
      Router.prototype.navigateByUrl = function(url, extras) {
        if (extras === void 0) {
          extras = {skipLocationChange: false};
        }
        if (url instanceof UrlTree) {
          return this.scheduleNavigation(this.urlHandlingStrategy.merge(url, this.rawUrlTree), 'imperative', extras);
        }
        var urlTree = this.urlSerializer.parse(url);
        return this.scheduleNavigation(this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree), 'imperative', extras);
      };
      Router.prototype.navigate = function(commands, extras) {
        if (extras === void 0) {
          extras = {skipLocationChange: false};
        }
        validateCommands(commands);
        if (typeof extras.queryParams === 'object' && extras.queryParams !== null) {
          extras.queryParams = this.removeEmptyProps(extras.queryParams);
        }
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
      };
      Router.prototype.serializeUrl = function(url) {
        return this.urlSerializer.serialize(url);
      };
      Router.prototype.parseUrl = function(url) {
        return this.urlSerializer.parse(url);
      };
      Router.prototype.isActive = function(url, exact) {
        if (url instanceof UrlTree) {
          return containsTree(this.currentUrlTree, url, exact);
        } else {
          var urlTree = this.urlSerializer.parse(url);
          return containsTree(this.currentUrlTree, urlTree, exact);
        }
      };
      Router.prototype.removeEmptyProps = function(params) {
        return Object.keys(params).reduce(function(result, key) {
          var value = params[key];
          if (value !== null && value !== undefined) {
            result[key] = value;
          }
          return result;
        }, {});
      };
      Router.prototype.processNavigations = function() {
        var _this = this;
        rxjs_operator_concatMap.concatMap.call(this.navigations, function(nav) {
          if (nav) {
            _this.executeScheduledNavigation(nav);
            return nav.promise.catch(function() {});
          } else {
            return (rxjs_observable_of.of(null));
          }
        }).subscribe(function() {});
      };
      Router.prototype.scheduleNavigation = function(rawUrl, source, extras) {
        var lastNavigation = this.navigations.value;
        if (lastNavigation && source !== 'imperative' && lastNavigation.source === 'imperative' && lastNavigation.rawUrl.toString() === rawUrl.toString()) {
          return null;
        }
        if (lastNavigation && source == 'hashchange' && lastNavigation.source === 'popstate' && lastNavigation.rawUrl.toString() === rawUrl.toString()) {
          return null;
        }
        var resolve = null;
        var reject = null;
        var promise = new Promise(function(res, rej) {
          resolve = res;
          reject = rej;
        });
        var id = ++this.navigationId;
        this.navigations.next({
          id: id,
          source: source,
          rawUrl: rawUrl,
          extras: extras,
          resolve: resolve,
          reject: reject,
          promise: promise
        });
        return promise.catch(function(e) {
          return Promise.reject(e);
        });
      };
      Router.prototype.executeScheduledNavigation = function(_a) {
        var _this = this;
        var id = _a.id,
            rawUrl = _a.rawUrl,
            extras = _a.extras,
            resolve = _a.resolve,
            reject = _a.reject;
        var url = this.urlHandlingStrategy.extract(rawUrl);
        var urlTransition = !this.navigated || url.toString() !== this.currentUrlTree.toString();
        if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(rawUrl)) {
          this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
          Promise.resolve().then(function(_) {
            return _this.runNavigate(url, rawUrl, extras.skipLocationChange, extras.replaceUrl, id, null);
          }).then(resolve, reject);
        } else if (urlTransition && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
          this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
          Promise.resolve().then(function(_) {
            return _this.runNavigate(url, rawUrl, false, false, id, createEmptyState(url, _this.rootComponentType).snapshot);
          }).then(resolve, reject);
        } else {
          this.rawUrlTree = rawUrl;
          resolve(null);
        }
      };
      Router.prototype.runNavigate = function(url, rawUrl, shouldPreventPushState, shouldReplaceUrl, id, precreatedState) {
        var _this = this;
        if (id !== this.navigationId) {
          this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
          this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url), "Navigation ID " + id + " is not equal to the current navigation id " + this.navigationId));
          return Promise.resolve(false);
        }
        return new Promise(function(resolvePromise, rejectPromise) {
          var urlAndSnapshot$;
          if (!precreatedState) {
            var redirectsApplied$ = applyRedirects(_this.injector, _this.configLoader, _this.urlSerializer, url, _this.config);
            urlAndSnapshot$ = rxjs_operator_mergeMap.mergeMap.call(redirectsApplied$, function(appliedUrl) {
              return rxjs_operator_map.map.call(recognize(_this.rootComponentType, _this.config, appliedUrl, _this.serializeUrl(appliedUrl)), function(snapshot) {
                _this.routerEvents.next(new RoutesRecognized(id, _this.serializeUrl(url), _this.serializeUrl(appliedUrl), snapshot));
                return {
                  appliedUrl: appliedUrl,
                  snapshot: snapshot
                };
              });
            });
          } else {
            urlAndSnapshot$ = rxjs_observable_of.of({
              appliedUrl: url,
              snapshot: precreatedState
            });
          }
          var beforePreactivationDone$ = rxjs_operator_mergeMap.mergeMap.call(urlAndSnapshot$, function(p) {
            return rxjs_operator_map.map.call(_this.hooks.beforePreactivation(p.snapshot), function() {
              return p;
            });
          });
          var preActivation;
          var preactivationTraverse$ = rxjs_operator_map.map.call(beforePreactivationDone$, function(_a) {
            var appliedUrl = _a.appliedUrl,
                snapshot = _a.snapshot;
            preActivation = new PreActivation(snapshot, _this.currentRouterState.snapshot, _this.injector);
            preActivation.traverse(_this.outletMap);
            return {
              appliedUrl: appliedUrl,
              snapshot: snapshot
            };
          });
          var preactivationCheckGuards$ = rxjs_operator_mergeMap.mergeMap.call(preactivationTraverse$, function(_a) {
            var appliedUrl = _a.appliedUrl,
                snapshot = _a.snapshot;
            if (_this.navigationId !== id)
              return rxjs_observable_of.of(false);
            return rxjs_operator_map.map.call(preActivation.checkGuards(), function(shouldActivate) {
              return {
                appliedUrl: appliedUrl,
                snapshot: snapshot,
                shouldActivate: shouldActivate
              };
            });
          });
          var preactivationResolveData$ = rxjs_operator_mergeMap.mergeMap.call(preactivationCheckGuards$, function(p) {
            if (_this.navigationId !== id)
              return rxjs_observable_of.of(false);
            if (p.shouldActivate) {
              return rxjs_operator_map.map.call(preActivation.resolveData(), function() {
                return p;
              });
            } else {
              return rxjs_observable_of.of(p);
            }
          });
          var preactivationDone$ = rxjs_operator_mergeMap.mergeMap.call(preactivationResolveData$, function(p) {
            return rxjs_operator_map.map.call(_this.hooks.afterPreactivation(p.snapshot), function() {
              return p;
            });
          });
          var routerState$ = rxjs_operator_map.map.call(preactivationDone$, function(_a) {
            var appliedUrl = _a.appliedUrl,
                snapshot = _a.snapshot,
                shouldActivate = _a.shouldActivate;
            if (shouldActivate) {
              var state = createRouterState(_this.routeReuseStrategy, snapshot, _this.currentRouterState);
              return {
                appliedUrl: appliedUrl,
                state: state,
                shouldActivate: shouldActivate
              };
            } else {
              return {
                appliedUrl: appliedUrl,
                state: null,
                shouldActivate: shouldActivate
              };
            }
          });
          var navigationIsSuccessful;
          var storedState = _this.currentRouterState;
          var storedUrl = _this.currentUrlTree;
          routerState$.forEach(function(_a) {
            var appliedUrl = _a.appliedUrl,
                state = _a.state,
                shouldActivate = _a.shouldActivate;
            if (!shouldActivate || id !== _this.navigationId) {
              navigationIsSuccessful = false;
              return;
            }
            _this.currentUrlTree = appliedUrl;
            _this.rawUrlTree = _this.urlHandlingStrategy.merge(_this.currentUrlTree, rawUrl);
            _this.currentRouterState = state;
            if (!shouldPreventPushState) {
              var path = _this.urlSerializer.serialize(_this.rawUrlTree);
              if (_this.location.isCurrentPathEqualTo(path) || shouldReplaceUrl) {
                _this.location.replaceState(path);
              } else {
                _this.location.go(path);
              }
            }
            new ActivateRoutes(_this.routeReuseStrategy, state, storedState).activate(_this.outletMap);
            navigationIsSuccessful = true;
          }).then(function() {
            if (navigationIsSuccessful) {
              _this.navigated = true;
              _this.routerEvents.next(new NavigationEnd(id, _this.serializeUrl(url), _this.serializeUrl(_this.currentUrlTree)));
              resolvePromise(true);
            } else {
              _this.resetUrlToCurrentUrlTree();
              _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), ''));
              resolvePromise(false);
            }
          }, function(e) {
            if (e instanceof NavigationCancelingError) {
              _this.resetUrlToCurrentUrlTree();
              _this.navigated = true;
              _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), e.message));
              resolvePromise(false);
            } else {
              _this.routerEvents.next(new NavigationError(id, _this.serializeUrl(url), e));
              try {
                resolvePromise(_this.errorHandler(e));
              } catch (ee) {
                rejectPromise(ee);
              }
            }
            _this.currentRouterState = storedState;
            _this.currentUrlTree = storedUrl;
            _this.rawUrlTree = _this.urlHandlingStrategy.merge(_this.currentUrlTree, rawUrl);
            _this.location.replaceState(_this.serializeUrl(_this.rawUrlTree));
          });
        });
      };
      Router.prototype.resetUrlToCurrentUrlTree = function() {
        var path = this.urlSerializer.serialize(this.rawUrlTree);
        this.location.replaceState(path);
      };
      return Router;
    }());
    var CanActivate = (function() {
      function CanActivate(path) {
        this.path = path;
      }
      Object.defineProperty(CanActivate.prototype, "route", {
        get: function() {
          return this.path[this.path.length - 1];
        },
        enumerable: true,
        configurable: true
      });
      return CanActivate;
    }());
    var CanDeactivate = (function() {
      function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
      }
      return CanDeactivate;
    }());
    var PreActivation = (function() {
      function PreActivation(future, curr, injector) {
        this.future = future;
        this.curr = curr;
        this.injector = injector;
        this.checks = [];
      }
      PreActivation.prototype.traverse = function(parentOutletMap) {
        var futureRoot = this.future._root;
        var currRoot = this.curr ? this.curr._root : null;
        this.traverseChildRoutes(futureRoot, currRoot, parentOutletMap, [futureRoot.value]);
      };
      PreActivation.prototype.checkGuards = function() {
        var _this = this;
        if (this.checks.length === 0)
          return rxjs_observable_of.of(true);
        var checks$ = rxjs_observable_from.from(this.checks);
        var runningChecks$ = rxjs_operator_mergeMap.mergeMap.call(checks$, function(s) {
          if (s instanceof CanActivate) {
            return andObservables(rxjs_observable_from.from([_this.runCanActivateChild(s.path), _this.runCanActivate(s.route)]));
          } else if (s instanceof CanDeactivate) {
            var s2 = (s);
            return _this.runCanDeactivate(s2.component, s2.route);
          } else {
            throw new Error('Cannot be reached');
          }
        });
        return rxjs_operator_every.every.call(runningChecks$, function(result) {
          return result === true;
        });
      };
      PreActivation.prototype.resolveData = function() {
        var _this = this;
        if (this.checks.length === 0)
          return rxjs_observable_of.of(null);
        var checks$ = rxjs_observable_from.from(this.checks);
        var runningChecks$ = rxjs_operator_concatMap.concatMap.call(checks$, function(s) {
          if (s instanceof CanActivate) {
            return _this.runResolve(s.route);
          } else {
            return rxjs_observable_of.of(null);
          }
        });
        return rxjs_operator_reduce.reduce.call(runningChecks$, function(_, __) {
          return _;
        });
      };
      PreActivation.prototype.traverseChildRoutes = function(futureNode, currNode, outletMap, futurePath) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function(c) {
          _this.traverseRoutes(c, prevChildren[c.value.outlet], outletMap, futurePath.concat([c.value]));
          delete prevChildren[c.value.outlet];
        });
        forEach(prevChildren, function(v, k) {
          return _this.deactiveRouteAndItsChildren(v, outletMap._outlets[k]);
        });
      };
      PreActivation.prototype.traverseRoutes = function(futureNode, currNode, parentOutletMap, futurePath) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        var outlet = parentOutletMap ? parentOutletMap._outlets[futureNode.value.outlet] : null;
        if (curr && future._routeConfig === curr._routeConfig) {
          if (!equalParamsAndUrlSegments(future, curr)) {
            this.checks.push(new CanDeactivate(outlet.component, curr), new CanActivate(futurePath));
          } else {
            future.data = curr.data;
            future._resolvedData = curr._resolvedData;
          }
          if (future.component) {
            this.traverseChildRoutes(futureNode, currNode, outlet ? outlet.outletMap : null, futurePath);
          } else {
            this.traverseChildRoutes(futureNode, currNode, parentOutletMap, futurePath);
          }
        } else {
          if (curr) {
            this.deactiveRouteAndItsChildren(currNode, outlet);
          }
          this.checks.push(new CanActivate(futurePath));
          if (future.component) {
            this.traverseChildRoutes(futureNode, null, outlet ? outlet.outletMap : null, futurePath);
          } else {
            this.traverseChildRoutes(futureNode, null, parentOutletMap, futurePath);
          }
        }
      };
      PreActivation.prototype.deactiveRouteAndItsChildren = function(route, outlet) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(route);
        var r = route.value;
        forEach(prevChildren, function(v, k) {
          if (!r.component) {
            _this.deactiveRouteAndItsChildren(v, outlet);
          } else if (!!outlet) {
            _this.deactiveRouteAndItsChildren(v, outlet.outletMap._outlets[k]);
          } else {
            _this.deactiveRouteAndItsChildren(v, null);
          }
        });
        if (!r.component) {
          this.checks.push(new CanDeactivate(null, r));
        } else if (outlet && outlet.isActivated) {
          this.checks.push(new CanDeactivate(outlet.component, r));
        } else {
          this.checks.push(new CanDeactivate(null, r));
        }
      };
      PreActivation.prototype.runCanActivate = function(future) {
        var _this = this;
        var canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
        if (!canActivate || canActivate.length === 0)
          return rxjs_observable_of.of(true);
        var obs = rxjs_operator_map.map.call(rxjs_observable_from.from(canActivate), function(c) {
          var guard = _this.getToken(c, future);
          var observable;
          if (guard.canActivate) {
            observable = wrapIntoObservable(guard.canActivate(future, _this.future));
          } else {
            observable = wrapIntoObservable(guard(future, _this.future));
          }
          return rxjs_operator_first.first.call(observable);
        });
        return andObservables(obs);
      };
      PreActivation.prototype.runCanActivateChild = function(path) {
        var _this = this;
        var future = path[path.length - 1];
        var canActivateChildGuards = path.slice(0, path.length - 1).reverse().map(function(p) {
          return _this.extractCanActivateChild(p);
        }).filter(function(_) {
          return _ !== null;
        });
        return andObservables(rxjs_operator_map.map.call(rxjs_observable_from.from(canActivateChildGuards), function(d) {
          var obs = rxjs_operator_map.map.call(rxjs_observable_from.from(d.guards), function(c) {
            var guard = _this.getToken(c, d.node);
            var observable;
            if (guard.canActivateChild) {
              observable = wrapIntoObservable(guard.canActivateChild(future, _this.future));
            } else {
              observable = wrapIntoObservable(guard(future, _this.future));
            }
            return rxjs_operator_first.first.call(observable);
          });
          return andObservables(obs);
        }));
      };
      PreActivation.prototype.extractCanActivateChild = function(p) {
        var canActivateChild = p._routeConfig ? p._routeConfig.canActivateChild : null;
        if (!canActivateChild || canActivateChild.length === 0)
          return null;
        return {
          node: p,
          guards: canActivateChild
        };
      };
      PreActivation.prototype.runCanDeactivate = function(component, curr) {
        var _this = this;
        var canDeactivate = curr && curr._routeConfig ? curr._routeConfig.canDeactivate : null;
        if (!canDeactivate || canDeactivate.length === 0)
          return rxjs_observable_of.of(true);
        var canDeactivate$ = rxjs_operator_mergeMap.mergeMap.call(rxjs_observable_from.from(canDeactivate), function(c) {
          var guard = _this.getToken(c, curr);
          var observable;
          if (guard.canDeactivate) {
            observable = wrapIntoObservable(guard.canDeactivate(component, curr, _this.curr));
          } else {
            observable = wrapIntoObservable(guard(component, curr, _this.curr));
          }
          return rxjs_operator_first.first.call(observable);
        });
        return rxjs_operator_every.every.call(canDeactivate$, function(result) {
          return result === true;
        });
      };
      PreActivation.prototype.runResolve = function(future) {
        var resolve = future._resolve;
        return rxjs_operator_map.map.call(this.resolveNode(resolve, future), function(resolvedData) {
          future._resolvedData = resolvedData;
          future.data = merge(future.data, inheritedParamsDataResolve(future).resolve);
          return null;
        });
      };
      PreActivation.prototype.resolveNode = function(resolve, future) {
        var _this = this;
        return waitForMap(resolve, function(k, v) {
          var resolver = _this.getToken(v, future);
          return resolver.resolve ? wrapIntoObservable(resolver.resolve(future, _this.future)) : wrapIntoObservable(resolver(future, _this.future));
        });
      };
      PreActivation.prototype.getToken = function(token, snapshot) {
        var config = closestLoadedConfig(snapshot);
        var injector = config ? config.injector : this.injector;
        return injector.get(token);
      };
      return PreActivation;
    }());
    var ActivateRoutes = (function() {
      function ActivateRoutes(routeReuseStrategy, futureState, currState) {
        this.routeReuseStrategy = routeReuseStrategy;
        this.futureState = futureState;
        this.currState = currState;
      }
      ActivateRoutes.prototype.activate = function(parentOutletMap) {
        var futureRoot = this.futureState._root;
        var currRoot = this.currState ? this.currState._root : null;
        this.deactivateChildRoutes(futureRoot, currRoot, parentOutletMap);
        advanceActivatedRoute(this.futureState.root);
        this.activateChildRoutes(futureRoot, currRoot, parentOutletMap);
      };
      ActivateRoutes.prototype.deactivateChildRoutes = function(futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function(c) {
          _this.deactivateRoutes(c, prevChildren[c.value.outlet], outletMap);
          delete prevChildren[c.value.outlet];
        });
        forEach(prevChildren, function(v, k) {
          return _this.deactiveRouteAndItsChildren(v, outletMap);
        });
      };
      ActivateRoutes.prototype.activateChildRoutes = function(futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function(c) {
          _this.activateRoutes(c, prevChildren[c.value.outlet], outletMap);
        });
      };
      ActivateRoutes.prototype.deactivateRoutes = function(futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        if (future === curr) {
          if (future.component) {
            var outlet = getOutlet(parentOutletMap, future);
            this.deactivateChildRoutes(futureNode, currNode, outlet.outletMap);
          } else {
            this.deactivateChildRoutes(futureNode, currNode, parentOutletMap);
          }
        } else {
          if (curr) {
            this.deactiveRouteAndItsChildren(currNode, parentOutletMap);
          }
        }
      };
      ActivateRoutes.prototype.activateRoutes = function(futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        if (future === curr) {
          advanceActivatedRoute(future);
          if (future.component) {
            var outlet = getOutlet(parentOutletMap, future);
            this.activateChildRoutes(futureNode, currNode, outlet.outletMap);
          } else {
            this.activateChildRoutes(futureNode, currNode, parentOutletMap);
          }
        } else {
          if (future.component) {
            advanceActivatedRoute(future);
            var outlet = getOutlet(parentOutletMap, futureNode.value);
            if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
              var stored = ((this.routeReuseStrategy.retrieve(future.snapshot)));
              this.routeReuseStrategy.store(future.snapshot, null);
              outlet.attach(stored.componentRef, stored.route.value);
              advanceActivatedRouteNodeAndItsChildren(stored.route);
            } else {
              var outletMap = new RouterOutletMap();
              this.placeComponentIntoOutlet(outletMap, future, outlet);
              this.activateChildRoutes(futureNode, null, outletMap);
            }
          } else {
            advanceActivatedRoute(future);
            this.activateChildRoutes(futureNode, null, parentOutletMap);
          }
        }
      };
      ActivateRoutes.prototype.placeComponentIntoOutlet = function(outletMap, future, outlet) {
        var resolved = ([{
          provide: ActivatedRoute,
          useValue: future
        }, {
          provide: RouterOutletMap,
          useValue: outletMap
        }]);
        var config = parentLoadedConfig(future.snapshot);
        var resolver = null;
        var injector = null;
        if (config) {
          injector = config.injectorFactory(outlet.locationInjector);
          resolver = config.factoryResolver;
          resolved.push({
            provide: _angular_core.ComponentFactoryResolver,
            useValue: resolver
          });
        } else {
          injector = outlet.locationInjector;
          resolver = outlet.locationFactoryResolver;
        }
        outlet.activate(future, resolver, injector, _angular_core.ReflectiveInjector.resolve(resolved), outletMap);
      };
      ActivateRoutes.prototype.deactiveRouteAndItsChildren = function(route, parentOutletMap) {
        if (this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
          this.detachAndStoreRouteSubtree(route, parentOutletMap);
        } else {
          this.deactiveRouteAndOutlet(route, parentOutletMap);
        }
      };
      ActivateRoutes.prototype.detachAndStoreRouteSubtree = function(route, parentOutletMap) {
        var outlet = getOutlet(parentOutletMap, route.value);
        var componentRef = outlet.detach();
        this.routeReuseStrategy.store(route.value.snapshot, {
          componentRef: componentRef,
          route: route
        });
      };
      ActivateRoutes.prototype.deactiveRouteAndOutlet = function(route, parentOutletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(route);
        var outlet = null;
        try {
          outlet = getOutlet(parentOutletMap, route.value);
        } catch (e) {
          return;
        }
        var childOutletMap = outlet.outletMap;
        forEach(prevChildren, function(v, k) {
          if (route.value.component) {
            _this.deactiveRouteAndItsChildren(v, childOutletMap);
          } else {
            _this.deactiveRouteAndItsChildren(v, parentOutletMap);
          }
        });
        if (outlet && outlet.isActivated) {
          outlet.deactivate();
        }
      };
      return ActivateRoutes;
    }());
    function advanceActivatedRouteNodeAndItsChildren(node) {
      advanceActivatedRoute(node.value);
      node.children.forEach(advanceActivatedRouteNodeAndItsChildren);
    }
    function parentLoadedConfig(snapshot) {
      var s = snapshot.parent;
      while (s) {
        var c = s._routeConfig;
        if (c && c._loadedConfig)
          return c._loadedConfig;
        if (c && c.component)
          return null;
        s = s.parent;
      }
      return null;
    }
    function closestLoadedConfig(snapshot) {
      if (!snapshot)
        return null;
      var s = snapshot.parent;
      while (s) {
        var c = s._routeConfig;
        if (c && c._loadedConfig)
          return c._loadedConfig;
        s = s.parent;
      }
      return null;
    }
    function nodeChildrenAsMap(node) {
      return node ? node.children.reduce(function(m, c) {
        m[c.value.outlet] = c;
        return m;
      }, {}) : {};
    }
    function getOutlet(outletMap, route) {
      var outlet = outletMap._outlets[route.outlet];
      if (!outlet) {
        var componentName = ((route.component)).name;
        if (route.outlet === PRIMARY_OUTLET) {
          throw new Error("Cannot find primary outlet to load '" + componentName + "'");
        } else {
          throw new Error("Cannot find the outlet " + route.outlet + " to load '" + componentName + "'");
        }
      }
      return outlet;
    }
    function validateCommands(commands) {
      for (var i = 0; i < commands.length; i++) {
        var cmd = commands[i];
        if (cmd == null) {
          throw new Error("The requested path contains " + cmd + " segment at index " + i);
        }
      }
    }
    var RouterLink = (function() {
      function RouterLink(router, route) {
        this.router = router;
        this.route = route;
        this.commands = [];
      }
      Object.defineProperty(RouterLink.prototype, "routerLink", {
        set: function(commands) {
          if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
          } else {
            this.commands = [];
          }
        },
        enumerable: true,
        configurable: true
      });
      RouterLink.prototype.onClick = function() {
        var extras = {
          skipLocationChange: attrBoolValue(this.skipLocationChange),
          replaceUrl: attrBoolValue(this.replaceUrl)
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
      };
      Object.defineProperty(RouterLink.prototype, "urlTree", {
        get: function() {
          return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserveQueryParams),
            preserveFragment: attrBoolValue(this.preserveFragment)
          });
        },
        enumerable: true,
        configurable: true
      });
      RouterLink.decorators = [{
        type: _angular_core.Directive,
        args: [{selector: ':not(a)[routerLink]'}]
      }];
      RouterLink.ctorParameters = function() {
        return [{type: Router}, {type: ActivatedRoute}];
      };
      RouterLink.propDecorators = {
        'queryParams': [{type: _angular_core.Input}],
        'fragment': [{type: _angular_core.Input}],
        'preserveQueryParams': [{type: _angular_core.Input}],
        'preserveFragment': [{type: _angular_core.Input}],
        'skipLocationChange': [{type: _angular_core.Input}],
        'replaceUrl': [{type: _angular_core.Input}],
        'routerLink': [{type: _angular_core.Input}],
        'onClick': [{
          type: _angular_core.HostListener,
          args: ['click']
        }]
      };
      return RouterLink;
    }());
    var RouterLinkWithHref = (function() {
      function RouterLinkWithHref(router, route, locationStrategy) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
        this.subscription = router.events.subscribe(function(s) {
          if (s instanceof NavigationEnd) {
            _this.updateTargetUrlAndHref();
          }
        });
      }
      Object.defineProperty(RouterLinkWithHref.prototype, "routerLink", {
        set: function(commands) {
          if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
          } else {
            this.commands = [];
          }
        },
        enumerable: true,
        configurable: true
      });
      RouterLinkWithHref.prototype.ngOnChanges = function(changes) {
        this.updateTargetUrlAndHref();
      };
      RouterLinkWithHref.prototype.ngOnDestroy = function() {
        this.subscription.unsubscribe();
      };
      RouterLinkWithHref.prototype.onClick = function(button, ctrlKey, metaKey) {
        if (button !== 0 || ctrlKey || metaKey) {
          return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
          return true;
        }
        var extras = {
          skipLocationChange: attrBoolValue(this.skipLocationChange),
          replaceUrl: attrBoolValue(this.replaceUrl)
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
      };
      RouterLinkWithHref.prototype.updateTargetUrlAndHref = function() {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
      };
      Object.defineProperty(RouterLinkWithHref.prototype, "urlTree", {
        get: function() {
          return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserveQueryParams),
            preserveFragment: attrBoolValue(this.preserveFragment)
          });
        },
        enumerable: true,
        configurable: true
      });
      RouterLinkWithHref.decorators = [{
        type: _angular_core.Directive,
        args: [{selector: 'a[routerLink]'}]
      }];
      RouterLinkWithHref.ctorParameters = function() {
        return [{type: Router}, {type: ActivatedRoute}, {type: _angular_common.LocationStrategy}];
      };
      RouterLinkWithHref.propDecorators = {
        'target': [{
          type: _angular_core.HostBinding,
          args: ['attr.target']
        }, {type: _angular_core.Input}],
        'queryParams': [{type: _angular_core.Input}],
        'fragment': [{type: _angular_core.Input}],
        'preserveQueryParams': [{type: _angular_core.Input}],
        'preserveFragment': [{type: _angular_core.Input}],
        'skipLocationChange': [{type: _angular_core.Input}],
        'replaceUrl': [{type: _angular_core.Input}],
        'href': [{type: _angular_core.HostBinding}],
        'routerLink': [{type: _angular_core.Input}],
        'onClick': [{
          type: _angular_core.HostListener,
          args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey']]
        }]
      };
      return RouterLinkWithHref;
    }());
    function attrBoolValue(s) {
      return s === '' || !!s;
    }
    var RouterLinkActive = (function() {
      function RouterLinkActive(router, element, renderer, cdr) {
        var _this = this;
        this.router = router;
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        this.classes = [];
        this.active = false;
        this.routerLinkActiveOptions = {exact: false};
        this.subscription = router.events.subscribe(function(s) {
          if (s instanceof NavigationEnd) {
            _this.update();
          }
        });
      }
      Object.defineProperty(RouterLinkActive.prototype, "isActive", {
        get: function() {
          return this.active;
        },
        enumerable: true,
        configurable: true
      });
      RouterLinkActive.prototype.ngAfterContentInit = function() {
        var _this = this;
        this.links.changes.subscribe(function(_) {
          return _this.update();
        });
        this.linksWithHrefs.changes.subscribe(function(_) {
          return _this.update();
        });
        this.update();
      };
      Object.defineProperty(RouterLinkActive.prototype, "routerLinkActive", {
        set: function(data) {
          var classes = Array.isArray(data) ? data : data.split(' ');
          this.classes = classes.filter(function(c) {
            return !!c;
          });
        },
        enumerable: true,
        configurable: true
      });
      RouterLinkActive.prototype.ngOnChanges = function(changes) {
        this.update();
      };
      RouterLinkActive.prototype.ngOnDestroy = function() {
        this.subscription.unsubscribe();
      };
      RouterLinkActive.prototype.update = function() {
        var _this = this;
        if (!this.links || !this.linksWithHrefs || !this.router.navigated)
          return;
        var hasActiveLinks = this.hasActiveLinks();
        if (this.active !== hasActiveLinks) {
          this.active = hasActiveLinks;
          this.classes.forEach(function(c) {
            return _this.renderer.setElementClass(_this.element.nativeElement, c, hasActiveLinks);
          });
          this.cdr.detectChanges();
        }
      };
      RouterLinkActive.prototype.isLinkActive = function(router) {
        var _this = this;
        return function(link) {
          return router.isActive(link.urlTree, _this.routerLinkActiveOptions.exact);
        };
      };
      RouterLinkActive.prototype.hasActiveLinks = function() {
        return this.links.some(this.isLinkActive(this.router)) || this.linksWithHrefs.some(this.isLinkActive(this.router));
      };
      RouterLinkActive.decorators = [{
        type: _angular_core.Directive,
        args: [{
          selector: '[routerLinkActive]',
          exportAs: 'routerLinkActive'
        }]
      }];
      RouterLinkActive.ctorParameters = function() {
        return [{type: Router}, {type: _angular_core.ElementRef}, {type: _angular_core.Renderer}, {type: _angular_core.ChangeDetectorRef}];
      };
      RouterLinkActive.propDecorators = {
        'links': [{
          type: _angular_core.ContentChildren,
          args: [RouterLink, {descendants: true}]
        }],
        'linksWithHrefs': [{
          type: _angular_core.ContentChildren,
          args: [RouterLinkWithHref, {descendants: true}]
        }],
        'routerLinkActiveOptions': [{type: _angular_core.Input}],
        'routerLinkActive': [{type: _angular_core.Input}]
      };
      return RouterLinkActive;
    }());
    var RouterOutlet = (function() {
      function RouterOutlet(parentOutletMap, location, resolver, name) {
        this.parentOutletMap = parentOutletMap;
        this.location = location;
        this.resolver = resolver;
        this.name = name;
        this.activateEvents = new _angular_core.EventEmitter();
        this.deactivateEvents = new _angular_core.EventEmitter();
        parentOutletMap.registerOutlet(name ? name : PRIMARY_OUTLET, this);
      }
      RouterOutlet.prototype.ngOnDestroy = function() {
        this.parentOutletMap.removeOutlet(this.name ? this.name : PRIMARY_OUTLET);
      };
      Object.defineProperty(RouterOutlet.prototype, "locationInjector", {
        get: function() {
          return this.location.injector;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RouterOutlet.prototype, "locationFactoryResolver", {
        get: function() {
          return this.resolver;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RouterOutlet.prototype, "isActivated", {
        get: function() {
          return !!this.activated;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RouterOutlet.prototype, "component", {
        get: function() {
          if (!this.activated)
            throw new Error('Outlet is not activated');
          return this.activated.instance;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
        get: function() {
          if (!this.activated)
            throw new Error('Outlet is not activated');
          return this._activatedRoute;
        },
        enumerable: true,
        configurable: true
      });
      RouterOutlet.prototype.detach = function() {
        if (!this.activated)
          throw new Error('Outlet is not activated');
        this.location.detach();
        var r = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        return r;
      };
      RouterOutlet.prototype.attach = function(ref, activatedRoute) {
        this.activated = ref;
        this._activatedRoute = activatedRoute;
        this.location.insert(ref.hostView);
      };
      RouterOutlet.prototype.deactivate = function() {
        if (this.activated) {
          var c = this.component;
          this.activated.destroy();
          this.activated = null;
          this._activatedRoute = null;
          this.deactivateEvents.emit(c);
        }
      };
      RouterOutlet.prototype.activate = function(activatedRoute, resolver, injector, providers, outletMap) {
        if (this.isActivated) {
          throw new Error('Cannot activate an already activated outlet');
        }
        this.outletMap = outletMap;
        this._activatedRoute = activatedRoute;
        var snapshot = activatedRoute._futureSnapshot;
        var component = (snapshot._routeConfig.component);
        var factory = resolver.resolveComponentFactory(component);
        var inj = _angular_core.ReflectiveInjector.fromResolvedProviders(providers, injector);
        this.activated = this.location.createComponent(factory, this.location.length, inj, []);
        this.activated.changeDetectorRef.detectChanges();
        this.activateEvents.emit(this.activated.instance);
      };
      RouterOutlet.decorators = [{
        type: _angular_core.Directive,
        args: [{selector: 'router-outlet'}]
      }];
      RouterOutlet.ctorParameters = function() {
        return [{type: RouterOutletMap}, {type: _angular_core.ViewContainerRef}, {type: _angular_core.ComponentFactoryResolver}, {
          type: undefined,
          decorators: [{
            type: _angular_core.Attribute,
            args: ['name']
          }]
        }];
      };
      RouterOutlet.propDecorators = {
        'activateEvents': [{
          type: _angular_core.Output,
          args: ['activate']
        }],
        'deactivateEvents': [{
          type: _angular_core.Output,
          args: ['deactivate']
        }]
      };
      return RouterOutlet;
    }());
    var RouteReuseStrategy = (function() {
      function RouteReuseStrategy() {}
      RouteReuseStrategy.prototype.shouldDetach = function(route) {};
      RouteReuseStrategy.prototype.store = function(route, handle) {};
      RouteReuseStrategy.prototype.shouldAttach = function(route) {};
      RouteReuseStrategy.prototype.retrieve = function(route) {};
      RouteReuseStrategy.prototype.shouldReuseRoute = function(future, curr) {};
      return RouteReuseStrategy;
    }());
    var getDOM = _angular_platformBrowser.__platform_browser_private__.getDOM;
    var PreloadingStrategy = (function() {
      function PreloadingStrategy() {}
      PreloadingStrategy.prototype.preload = function(route, fn) {};
      return PreloadingStrategy;
    }());
    var PreloadAllModules = (function() {
      function PreloadAllModules() {}
      PreloadAllModules.prototype.preload = function(route, fn) {
        return rxjs_operator_catch._catch.call(fn(), function() {
          return rxjs_observable_of.of(null);
        });
      };
      return PreloadAllModules;
    }());
    var NoPreloading = (function() {
      function NoPreloading() {}
      NoPreloading.prototype.preload = function(route, fn) {
        return rxjs_observable_of.of(null);
      };
      return NoPreloading;
    }());
    var RouterPreloader = (function() {
      function RouterPreloader(router, moduleLoader, compiler, injector, preloadingStrategy) {
        this.router = router;
        this.injector = injector;
        this.preloadingStrategy = preloadingStrategy;
        this.loader = new RouterConfigLoader(moduleLoader, compiler);
      }
      ;
      RouterPreloader.prototype.setUpPreloading = function() {
        var _this = this;
        var navigations = rxjs_operator_filter.filter.call(this.router.events, function(e) {
          return e instanceof NavigationEnd;
        });
        this.subscription = rxjs_operator_concatMap.concatMap.call(navigations, function() {
          return _this.preload();
        }).subscribe(function(v) {});
      };
      RouterPreloader.prototype.preload = function() {
        return this.processRoutes(this.injector, this.router.config);
      };
      RouterPreloader.prototype.ngOnDestroy = function() {
        this.subscription.unsubscribe();
      };
      RouterPreloader.prototype.processRoutes = function(injector, routes) {
        var res = [];
        for (var _i = 0,
            routes_1 = routes; _i < routes_1.length; _i++) {
          var c = routes_1[_i];
          if (c.loadChildren && !c.canLoad && ((c))._loadedConfig) {
            var childConfig = ((c))._loadedConfig;
            res.push(this.processRoutes(childConfig.injector, childConfig.routes));
          } else if (c.loadChildren && !c.canLoad) {
            res.push(this.preloadConfig(injector, c));
          } else if (c.children) {
            res.push(this.processRoutes(injector, c.children));
          }
        }
        return rxjs_operator_mergeAll.mergeAll.call(rxjs_observable_from.from(res));
      };
      RouterPreloader.prototype.preloadConfig = function(injector, route) {
        var _this = this;
        return this.preloadingStrategy.preload(route, function() {
          var loaded = _this.loader.load(injector, route.loadChildren);
          return rxjs_operator_mergeMap.mergeMap.call(loaded, function(config) {
            var c = route;
            c._loadedConfig = config;
            return _this.processRoutes(config.injector, config.routes);
          });
        });
      };
      RouterPreloader.decorators = [{type: _angular_core.Injectable}];
      RouterPreloader.ctorParameters = function() {
        return [{type: Router}, {type: _angular_core.NgModuleFactoryLoader}, {type: _angular_core.Compiler}, {type: _angular_core.Injector}, {type: PreloadingStrategy}];
      };
      return RouterPreloader;
    }());
    var ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive];
    var ROUTER_CONFIGURATION = new _angular_core.OpaqueToken('ROUTER_CONFIGURATION');
    var ROUTER_FORROOT_GUARD = new _angular_core.OpaqueToken('ROUTER_FORROOT_GUARD');
    var ROUTER_PROVIDERS = [_angular_common.Location, {
      provide: UrlSerializer,
      useClass: DefaultUrlSerializer
    }, {
      provide: Router,
      useFactory: setupRouter,
      deps: [_angular_core.ApplicationRef, UrlSerializer, RouterOutletMap, _angular_common.Location, _angular_core.Injector, _angular_core.NgModuleFactoryLoader, _angular_core.Compiler, ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new _angular_core.Optional()], [RouteReuseStrategy, new _angular_core.Optional()]]
    }, RouterOutletMap, {
      provide: ActivatedRoute,
      useFactory: rootRoute,
      deps: [Router]
    }, {
      provide: _angular_core.NgModuleFactoryLoader,
      useClass: _angular_core.SystemJsNgModuleLoader
    }, RouterPreloader, NoPreloading, PreloadAllModules, {
      provide: ROUTER_CONFIGURATION,
      useValue: {enableTracing: false}
    }];
    function routerNgProbeToken() {
      return new _angular_core.NgProbeToken('Router', Router);
    }
    var RouterModule = (function() {
      function RouterModule(guard) {}
      RouterModule.forRoot = function(routes, config) {
        return {
          ngModule: RouterModule,
          providers: [ROUTER_PROVIDERS, provideRoutes(routes), {
            provide: ROUTER_FORROOT_GUARD,
            useFactory: provideForRootGuard,
            deps: [[Router, new _angular_core.Optional(), new _angular_core.SkipSelf()]]
          }, {
            provide: ROUTER_CONFIGURATION,
            useValue: config ? config : {}
          }, {
            provide: _angular_common.LocationStrategy,
            useFactory: provideLocationStrategy,
            deps: [_angular_common.PlatformLocation, [new _angular_core.Inject(_angular_common.APP_BASE_HREF), new _angular_core.Optional()], ROUTER_CONFIGURATION]
          }, {
            provide: PreloadingStrategy,
            useExisting: config && config.preloadingStrategy ? config.preloadingStrategy : NoPreloading
          }, {
            provide: _angular_core.NgProbeToken,
            multi: true,
            useFactory: routerNgProbeToken
          }, provideRouterInitializer()]
        };
      };
      RouterModule.forChild = function(routes) {
        return {
          ngModule: RouterModule,
          providers: [provideRoutes(routes)]
        };
      };
      RouterModule.decorators = [{
        type: _angular_core.NgModule,
        args: [{
          declarations: ROUTER_DIRECTIVES,
          exports: ROUTER_DIRECTIVES
        }]
      }];
      RouterModule.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{type: _angular_core.Optional}, {
            type: _angular_core.Inject,
            args: [ROUTER_FORROOT_GUARD]
          }]
        }];
      };
      return RouterModule;
    }());
    function provideLocationStrategy(platformLocationStrategy, baseHref, options) {
      if (options === void 0) {
        options = {};
      }
      return options.useHash ? new _angular_common.HashLocationStrategy(platformLocationStrategy, baseHref) : new _angular_common.PathLocationStrategy(platformLocationStrategy, baseHref);
    }
    function provideForRootGuard(router) {
      if (router) {
        throw new Error("RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
      }
      return 'guarded';
    }
    function provideRoutes(routes) {
      return [{
        provide: _angular_core.ANALYZE_FOR_ENTRY_COMPONENTS,
        multi: true,
        useValue: routes
      }, {
        provide: ROUTES,
        multi: true,
        useValue: routes
      }];
    }
    function setupRouter(ref, urlSerializer, outletMap, location, injector, loader, compiler, config, opts, urlHandlingStrategy, routeReuseStrategy) {
      if (opts === void 0) {
        opts = {};
      }
      var router = new Router(null, urlSerializer, outletMap, location, injector, loader, compiler, flatten(config));
      if (urlHandlingStrategy) {
        router.urlHandlingStrategy = urlHandlingStrategy;
      }
      if (routeReuseStrategy) {
        router.routeReuseStrategy = routeReuseStrategy;
      }
      if (opts.errorHandler) {
        router.errorHandler = opts.errorHandler;
      }
      if (opts.enableTracing) {
        var dom_1 = getDOM();
        router.events.subscribe(function(e) {
          dom_1.logGroup("Router Event: " + ((e.constructor)).name);
          dom_1.log(e.toString());
          dom_1.log(e);
          dom_1.logGroupEnd();
        });
      }
      return router;
    }
    function rootRoute(router) {
      return router.routerState.root;
    }
    var RouterInitializer = (function() {
      function RouterInitializer(injector) {
        this.injector = injector;
        this.resultOfPreactivationDone = new rxjs_Subject.Subject();
      }
      RouterInitializer.prototype.appInitializer = function() {
        var _this = this;
        var p = this.injector.get(_angular_common.LOCATION_INITIALIZED, Promise.resolve(null));
        return p.then(function() {
          var resolve = null;
          var res = new Promise(function(r) {
            return resolve = r;
          });
          var router = _this.injector.get(Router);
          var opts = _this.injector.get(ROUTER_CONFIGURATION);
          if (opts.initialNavigation === false) {
            router.setUpLocationChangeListener();
          } else {
            router.hooks.afterPreactivation = function() {
              if (!_this.initNavigation) {
                _this.initNavigation = true;
                resolve(true);
                return _this.resultOfPreactivationDone;
              } else {
                return rxjs_observable_of.of(null);
              }
            };
            router.initialNavigation();
          }
          return res;
        });
      };
      RouterInitializer.prototype.bootstrapListener = function(bootstrappedComponentRef) {
        var ref = this.injector.get(_angular_core.ApplicationRef);
        if (bootstrappedComponentRef !== ref.components[0]) {
          return;
        }
        var preloader = this.injector.get(RouterPreloader);
        preloader.setUpPreloading();
        var router = this.injector.get(Router);
        router.resetRootComponentType(ref.componentTypes[0]);
        this.resultOfPreactivationDone.next(null);
        this.resultOfPreactivationDone.complete();
      };
      RouterInitializer.decorators = [{type: _angular_core.Injectable}];
      RouterInitializer.ctorParameters = function() {
        return [{type: _angular_core.Injector}];
      };
      return RouterInitializer;
    }());
    function getAppInitializer(r) {
      return r.appInitializer.bind(r);
    }
    function getBootstrapListener(r) {
      return r.bootstrapListener.bind(r);
    }
    var ROUTER_INITIALIZER = new _angular_core.OpaqueToken('Router Initializer');
    function provideRouterInitializer() {
      return [RouterInitializer, {
        provide: _angular_core.APP_INITIALIZER,
        multi: true,
        useFactory: getAppInitializer,
        deps: [RouterInitializer]
      }, {
        provide: ROUTER_INITIALIZER,
        useFactory: getBootstrapListener,
        deps: [RouterInitializer]
      }, {
        provide: _angular_core.APP_BOOTSTRAP_LISTENER,
        multi: true,
        useExisting: ROUTER_INITIALIZER
      }];
    }
    var VERSION = new _angular_core.Version('3.4.8');
    var __router_private__ = {
      ROUTER_PROVIDERS: ROUTER_PROVIDERS,
      ROUTES: ROUTES,
      flatten: flatten
    };
    exports.RouterLink = RouterLink;
    exports.RouterLinkWithHref = RouterLinkWithHref;
    exports.RouterLinkActive = RouterLinkActive;
    exports.RouterOutlet = RouterOutlet;
    exports.RouteReuseStrategy = RouteReuseStrategy;
    exports.NavigationCancel = NavigationCancel;
    exports.NavigationEnd = NavigationEnd;
    exports.NavigationError = NavigationError;
    exports.NavigationStart = NavigationStart;
    exports.Router = Router;
    exports.RoutesRecognized = RoutesRecognized;
    exports.ROUTER_CONFIGURATION = ROUTER_CONFIGURATION;
    exports.ROUTER_INITIALIZER = ROUTER_INITIALIZER;
    exports.RouterModule = RouterModule;
    exports.provideRoutes = provideRoutes;
    exports.RouterOutletMap = RouterOutletMap;
    exports.NoPreloading = NoPreloading;
    exports.PreloadAllModules = PreloadAllModules;
    exports.PreloadingStrategy = PreloadingStrategy;
    exports.RouterPreloader = RouterPreloader;
    exports.ActivatedRoute = ActivatedRoute;
    exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
    exports.RouterState = RouterState;
    exports.RouterStateSnapshot = RouterStateSnapshot;
    exports.PRIMARY_OUTLET = PRIMARY_OUTLET;
    exports.UrlHandlingStrategy = UrlHandlingStrategy;
    exports.DefaultUrlSerializer = DefaultUrlSerializer;
    exports.UrlSegment = UrlSegment;
    exports.UrlSegmentGroup = UrlSegmentGroup;
    exports.UrlSerializer = UrlSerializer;
    exports.UrlTree = UrlTree;
    exports.VERSION = VERSION;
    exports.__router_private__ = __router_private__;
  }));
})(require('process'));

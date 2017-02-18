/* */ 
"format cjs";
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/compiler/testing'), require('@angular/core'), require('@angular/core/testing'), require('@angular/platform-browser/testing'), require('@angular/platform-browser'), require('./platform-browser-dynamic.umd')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/compiler/testing', '@angular/core', '@angular/core/testing', '@angular/platform-browser/testing', '@angular/platform-browser', '@angular/platform-browser-dynamic'], factory) : (factory((global.ng = global.ng || {}, global.ng.platformBrowserDynamic = global.ng.platformBrowserDynamic || {}, global.ng.platformBrowserDynamic.testing = global.ng.platformBrowserDynamic.testing || {}), global.ng.compiler.testing, global.ng.core, global.ng.core.testing, global.ng.platformBrowser.testing, global.ng.platformBrowser, global.ng.platformBrowserDynamic));
}(this, function(exports, _angular_compiler_testing, _angular_core, _angular_core_testing, _angular_platformBrowser_testing, _angular_platformBrowser, _angular_platformBrowserDynamic) {
  'use strict';
  var getDOM = _angular_platformBrowser.__platform_browser_private__.getDOM;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var DOMTestComponentRenderer = (function(_super) {
    __extends(DOMTestComponentRenderer, _super);
    function DOMTestComponentRenderer(_doc) {
      _super.call(this);
      this._doc = _doc;
    }
    DOMTestComponentRenderer.prototype.insertRootElement = function(rootElId) {
      var rootEl = getDOM().firstChild(getDOM().content(getDOM().createTemplate("<div id=\"" + rootElId + "\"></div>")));
      var oldRoots = getDOM().querySelectorAll(this._doc, '[id^=root]');
      for (var i = 0; i < oldRoots.length; i++) {
        getDOM().remove(oldRoots[i]);
      }
      getDOM().appendChild(this._doc.body, rootEl);
    };
    DOMTestComponentRenderer.decorators = [{type: _angular_core.Injectable}];
    DOMTestComponentRenderer.ctorParameters = function() {
      return [{
        type: undefined,
        decorators: [{
          type: _angular_core.Inject,
          args: [_angular_platformBrowser.DOCUMENT]
        }]
      }];
    };
    return DOMTestComponentRenderer;
  }(_angular_core_testing.TestComponentRenderer));
  var INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = _angular_platformBrowserDynamic.__platform_browser_dynamic_private__.INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS;
  var __platform_browser_dynamic_private__$1 = {DOMTestComponentRenderer: DOMTestComponentRenderer};
  var platformBrowserDynamicTesting = _angular_core.createPlatformFactory(_angular_compiler_testing.platformCoreDynamicTesting, 'browserDynamicTesting', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
  var BrowserDynamicTestingModule = (function() {
    function BrowserDynamicTestingModule() {}
    BrowserDynamicTestingModule.decorators = [{
      type: _angular_core.NgModule,
      args: [{
        exports: [_angular_platformBrowser_testing.BrowserTestingModule],
        providers: [{
          provide: _angular_core_testing.TestComponentRenderer,
          useClass: DOMTestComponentRenderer
        }]
      }]
    }];
    BrowserDynamicTestingModule.ctorParameters = function() {
      return [];
    };
    return BrowserDynamicTestingModule;
  }());
  exports.platformBrowserDynamicTesting = platformBrowserDynamicTesting;
  exports.BrowserDynamicTestingModule = BrowserDynamicTestingModule;
  exports.__platform_browser_dynamic_private__ = __platform_browser_dynamic_private__$1;
}));

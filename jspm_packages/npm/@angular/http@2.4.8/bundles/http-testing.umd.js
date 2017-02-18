/* */ 
"format cjs";
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('./http.umd'), require('rxjs/ReplaySubject'), require('rxjs/Subject'), require('rxjs/operator/take')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/http', 'rxjs/ReplaySubject', 'rxjs/Subject', 'rxjs/operator/take'], factory) : (factory((global.ng = global.ng || {}, global.ng.http = global.ng.http || {}, global.ng.http.testing = global.ng.http.testing || {}), global.ng.core, global.ng.http, global.Rx, global.Rx, global.Rx.Observable.prototype));
}(this, function(exports, _angular_core, _angular_http, rxjs_ReplaySubject, rxjs_Subject, rxjs_operator_take) {
  'use strict';
  var MockConnection = (function() {
    function MockConnection(req) {
      this.response = rxjs_operator_take.take.call(new rxjs_ReplaySubject.ReplaySubject(1), 1);
      this.readyState = _angular_http.ReadyState.Open;
      this.request = req;
    }
    MockConnection.prototype.mockRespond = function(res) {
      if (this.readyState === _angular_http.ReadyState.Done || this.readyState === _angular_http.ReadyState.Cancelled) {
        throw new Error('Connection has already been resolved');
      }
      this.readyState = _angular_http.ReadyState.Done;
      this.response.next(res);
      this.response.complete();
    };
    MockConnection.prototype.mockDownload = function(res) {};
    MockConnection.prototype.mockError = function(err) {
      this.readyState = _angular_http.ReadyState.Done;
      this.response.error(err);
    };
    return MockConnection;
  }());
  var MockBackend = (function() {
    function MockBackend() {
      var _this = this;
      this.connectionsArray = [];
      this.connections = new rxjs_Subject.Subject();
      this.connections.subscribe(function(connection) {
        return _this.connectionsArray.push(connection);
      });
      this.pendingConnections = new rxjs_Subject.Subject();
    }
    MockBackend.prototype.verifyNoPendingRequests = function() {
      var pending = 0;
      this.pendingConnections.subscribe(function(c) {
        return pending++;
      });
      if (pending > 0)
        throw new Error(pending + " pending connections to be resolved");
    };
    MockBackend.prototype.resolveAllConnections = function() {
      this.connections.subscribe(function(c) {
        return c.readyState = 4;
      });
    };
    MockBackend.prototype.createConnection = function(req) {
      if (!req || !(req instanceof _angular_http.Request)) {
        throw new Error("createConnection requires an instance of Request, got " + req);
      }
      var connection = new MockConnection(req);
      this.connections.next(connection);
      return connection;
    };
    MockBackend.decorators = [{type: _angular_core.Injectable}];
    MockBackend.ctorParameters = function() {
      return [];
    };
    return MockBackend;
  }());
  exports.MockConnection = MockConnection;
  exports.MockBackend = MockBackend;
}));

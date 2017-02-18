/* */ 
"format cjs";
(function(process) {
  !function(e, n) {
    "object" == typeof exports && "undefined" != typeof module ? n() : "function" == typeof define && define.amd ? define(n) : n();
  }(this, function() {
    "use strict";
    function e(e, n, t, r, i) {
      var o = e[d];
      if (o)
        for (var u = 0; u < o.length; u++) {
          var a = o[u],
              c = a.data,
              s = c.handler;
          if ((c.handler === n || s.listener === n) && c.useCapturing === r && c.eventName === t)
            return i && o.splice(u, 1), a;
        }
      return null;
    }
    function n(e, n, t) {
      var r = e[d];
      r || (r = e[d] = []), t ? r.unshift(n) : r.push(n);
    }
    function t(t, r, i, o, u, c) {
      function s(e) {
        var t = e.data;
        return n(t.target, e, u), t.invokeAddFunc(v, e);
      }
      function d(n) {
        var t = n.data;
        return e(t.target, n.invoke, t.eventName, t.useCapturing, !0), t.invokeRemoveFunc(f, n);
      }
      void 0 === i && (i = !0), void 0 === o && (o = !1), void 0 === u && (u = !1), void 0 === c && (c = l);
      var v = a(t),
          f = a(r),
          p = !i && void 0;
      return function(n, r) {
        var i = c(n, r);
        i.useCapturing = i.useCapturing || p;
        var u = null;
        "function" == typeof i.handler ? u = i.handler : i.handler && i.handler.handleEvent && (u = function(e) {
          return i.handler.handleEvent(e);
        });
        var a = !1;
        try {
          a = i.handler && "[object FunctionWrapper]" === i.handler.toString();
        } catch (f) {
          return;
        }
        if (!u || a)
          return i.invokeAddFunc(v, i.handler);
        if (!o) {
          var l = e(i.target, i.handler, i.eventName, i.useCapturing, !1);
          if (l)
            return i.invokeAddFunc(v, l);
        }
        var h = Zone.current,
            g = i.target.constructor.name + "." + t + ":" + i.eventName;
        h.scheduleEventTask(g, u, i, s, d);
      };
    }
    function r(n, t, r) {
      void 0 === t && (t = !0), void 0 === r && (r = l);
      var i = a(n),
          o = !t && void 0;
      return function(n, t) {
        var u = r(n, t);
        u.useCapturing = u.useCapturing || o;
        var a = e(u.target, u.handler, u.eventName, u.useCapturing, !0);
        a ? a.zone.cancelTask(a) : u.invokeRemoveFunc(i, u.handler);
      };
    }
    function i(e, n, i, o) {
      return void 0 === n && (n = v), void 0 === i && (i = f), void 0 === o && (o = l), !(!e || !e[n]) && (u(e, n, function() {
        return t(n, i, !0, !1, !1, o);
      }), u(e, i, function() {
        return r(i, !0, o);
      }), !0);
    }
    function o(e, n) {
      try {
        return Function("f", "return function " + e + "(){return f(this, arguments)}")(n);
      } catch (t) {
        return function() {
          return n(this, arguments);
        };
      }
    }
    function u(e, n, t) {
      for (var r = e; r && Object.getOwnPropertyNames(r).indexOf(n) === -1; )
        r = Object.getPrototypeOf(r);
      !r && e[n] && (r = e);
      var i,
          u = a(n);
      return r && !(i = r[u]) && (i = r[u] = r[n], r[n] = o(n, t(i, u, n))), i;
    }
    var a = function(e) {
      return "__zone_symbol__" + e;
    },
        c = "object" == typeof window && window || "object" == typeof self && self || global,
        s = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope,
        d = (!("nw" in c) && "undefined" != typeof process && "[object process]" === {}.toString.call(process), "undefined" != typeof process && "[object process]" === {}.toString.call(process) && !s && !("undefined" == typeof window || !window.HTMLElement), a("eventTasks")),
        v = "addEventListener",
        f = "removeEventListener",
        l = function(e, n) {
          return {
            useCapturing: n[2],
            eventName: n[0],
            handler: n[1],
            target: e || c,
            name: n[0],
            invokeAddFunc: function(e, n) {
              return n && n.invoke ? this.target[e](this.eventName, n.invoke, this.useCapturing) : this.target[e](this.eventName, n, this.useCapturing);
            },
            invokeRemoveFunc: function(e, n) {
              return n && n.invoke ? this.target[e](this.eventName, n.invoke, this.useCapturing) : this.target[e](this.eventName, n, this.useCapturing);
            }
          };
        };
    t(v, f), r(f), a("originalInstance");
    !function(e) {
      function n(e) {
        e.MediaQueryList && i(e.MediaQueryList.prototype, "addListener", "removeListener", function(n, t) {
          return {
            useCapturing: !1,
            eventName: "mediaQuery",
            handler: t[0],
            target: n || e,
            name: "mediaQuery",
            invokeAddFunc: function(e, n) {
              return n && n.invoke ? this.target[e](n.invoke) : this.target[e](n);
            },
            invokeRemoveFunc: function(e, n) {
              return n && n.invoke ? this.target[e](n.invoke) : this.target[e](n);
            }
          };
        });
      }
      n(e);
    }("object" == typeof window && window || "object" == typeof self && self || global);
  });
})(require('process'));
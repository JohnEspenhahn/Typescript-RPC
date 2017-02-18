/* */ 
"format cjs";
(function(process) {
  !function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define(t) : t();
  }(this, function() {
    "use strict";
    function e(e, t) {
      var n = Object.getOwnPropertyDescriptor(e, t) || {
        enumerable: !0,
        configurable: !0
      },
          r = Object.getOwnPropertyDescriptor(e, "original" + t);
      !r && n.get && Object.defineProperty(e, "original" + t, {
        enumerable: !1,
        configurable: !0,
        get: n.get
      }), delete n.writable, delete n.value;
      var i = t.substr(2),
          o = "_" + t;
      n.set = function(e) {
        if (this[o] && this.removeEventListener(i, this[o]), "function" == typeof e) {
          var t = function(t) {
            var n;
            n = e.apply(this, arguments), void 0 == n || n || t.preventDefault();
          };
          this[o] = t, this.addEventListener(i, t, !1);
        } else
          this[o] = null;
      }, n.get = function() {
        var e = this[o] || null;
        return null === e && r && r.get && (e = r.get.apply(this, arguments), e && (n.set.apply(this, [e]), "function" == typeof this.removeAttribute && this.removeAttribute(t))), this[o] || null;
      }, Object.defineProperty(e, t, n);
    }
    function t(t, n) {
      var r = [];
      for (var i in t)
        "on" == i.substr(0, 2) && r.push(i);
      for (var o = 0; o < r.length; o++)
        e(t, r[o]);
      if (n)
        for (var a = 0; a < n.length; a++)
          e(t, "on" + n[a]);
    }
    function n(e, t, n, r, i) {
      var o = e[v];
      if (o)
        for (var a = 0; a < o.length; a++) {
          var u = o[a],
              s = u.data,
              c = s.handler;
          if ((s.handler === t || c.listener === t) && s.useCapturing === r && s.eventName === n)
            return i && o.splice(a, 1), u;
        }
      return null;
    }
    function r(e, t, n) {
      var r = e[v];
      r || (r = e[v] = []), n ? r.unshift(t) : r.push(t);
    }
    function i(e, t, i, o, u, s) {
      function v(e) {
        var t = e.data;
        return r(t.target, e, u), t.invokeAddFunc(l, e);
      }
      function c(e) {
        var t = e.data;
        return n(t.target, e.invoke, t.eventName, t.useCapturing, !0), t.invokeRemoveFunc(d, e);
      }
      void 0 === i && (i = !0), void 0 === o && (o = !1), void 0 === u && (u = !1), void 0 === s && (s = f);
      var l = a(e),
          d = a(t),
          p = !i && void 0;
      return function(t, r) {
        var i = s(t, r);
        i.useCapturing = i.useCapturing || p;
        var a = null;
        "function" == typeof i.handler ? a = i.handler : i.handler && i.handler.handleEvent && (a = function(e) {
          return i.handler.handleEvent(e);
        });
        var u = !1;
        try {
          u = i.handler && "[object FunctionWrapper]" === i.handler.toString();
        } catch (f) {
          return;
        }
        if (!a || u)
          return i.invokeAddFunc(l, i.handler);
        if (!o) {
          var d = n(i.target, i.handler, i.eventName, i.useCapturing, !1);
          if (d)
            return i.invokeAddFunc(l, d);
        }
        var h = Zone.current,
            g = i.target.constructor.name + "." + e + ":" + i.eventName;
        h.scheduleEventTask(g, a, i, v, c);
      };
    }
    function o(e, t, r) {
      void 0 === t && (t = !0), void 0 === r && (r = f);
      var i = a(e),
          o = !t && void 0;
      return function(e, t) {
        var a = r(e, t);
        a.useCapturing = a.useCapturing || o;
        var u = n(a.target, a.handler, a.eventName, a.useCapturing, !0);
        u ? u.zone.cancelTask(u) : a.invokeRemoveFunc(i, a.handler);
      };
    }
    var a = function(e) {
      return "__zone_symbol__" + e;
    },
        u = "object" == typeof window && window || "object" == typeof self && self || global,
        s = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope,
        v = (!("nw" in u) && "undefined" != typeof process && "[object process]" === {}.toString.call(process), "undefined" != typeof process && "[object process]" === {}.toString.call(process) && !s && !("undefined" == typeof window || !window.HTMLElement), a("eventTasks")),
        c = "addEventListener",
        l = "removeEventListener",
        f = function(e, t) {
          return {
            useCapturing: t[2],
            eventName: t[0],
            handler: t[1],
            target: e || u,
            name: t[0],
            invokeAddFunc: function(e, t) {
              return t && t.invoke ? this.target[e](this.eventName, t.invoke, this.useCapturing) : this.target[e](this.eventName, t, this.useCapturing);
            },
            invokeRemoveFunc: function(e, t) {
              return t && t.invoke ? this.target[e](this.eventName, t.invoke, this.useCapturing) : this.target[e](this.eventName, t, this.useCapturing);
            }
          };
        };
    i(c, l), o(l), a("originalInstance");
    !function(e) {
      function n(e) {
        var n = e.Notification;
        n && n.prototype && t(n.prototype, null);
      }
      n(e);
    }("object" == typeof window && window || "object" == typeof self && self || global);
  });
})(require('process'));

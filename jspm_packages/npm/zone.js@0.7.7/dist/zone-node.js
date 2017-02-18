/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define(factory) : (factory());
  }(this, (function() {
    'use strict';
    var Zone$1 = (function(global) {
      if (global['Zone']) {
        throw new Error('Zone already loaded.');
      }
      var NO_ZONE = {name: 'NO ZONE'};
      var notScheduled = 'notScheduled',
          scheduling = 'scheduling',
          scheduled = 'scheduled',
          running = 'running',
          canceling = 'canceling';
      var microTask = 'microTask',
          macroTask = 'macroTask',
          eventTask = 'eventTask';
      var Zone = (function() {
        function Zone(parent, zoneSpec) {
          this._properties = null;
          this._parent = parent;
          this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
          this._properties = zoneSpec && zoneSpec.properties || {};
          this._zoneDelegate = new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function() {
          if (global.Promise !== ZoneAwarePromise) {
            throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' + 'has been overwritten.\n' + 'Most likely cause is that a Promise polyfill has been loaded ' + 'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' + 'If you must load one, do so before loading zone.js.)');
          }
        };
        Object.defineProperty(Zone, "root", {
          get: function() {
            var zone = Zone.current;
            while (zone.parent) {
              zone = zone.parent;
            }
            return zone;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Zone, "current", {
          get: function() {
            return _currentZoneFrame.zone;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
          get: function() {
            return _currentTask;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Zone.prototype, "parent", {
          get: function() {
            return this._parent;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
          get: function() {
            return this._name;
          },
          enumerable: true,
          configurable: true
        });
        Zone.prototype.get = function(key) {
          var zone = this.getZoneWith(key);
          if (zone)
            return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function(key) {
          var current = this;
          while (current) {
            if (current._properties.hasOwnProperty(key)) {
              return current;
            }
            current = current._parent;
          }
          return null;
        };
        Zone.prototype.fork = function(zoneSpec) {
          if (!zoneSpec)
            throw new Error('ZoneSpec required!');
          return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function(callback, source) {
          if (typeof callback !== 'function') {
            throw new Error('Expecting function got: ' + callback);
          }
          var _callback = this._zoneDelegate.intercept(this, callback, source);
          var zone = this;
          return function() {
            return zone.runGuarded(_callback, this, arguments, source);
          };
        };
        Zone.prototype.run = function(callback, applyThis, applyArgs, source) {
          if (applyThis === void 0) {
            applyThis = undefined;
          }
          if (applyArgs === void 0) {
            applyArgs = null;
          }
          if (source === void 0) {
            source = null;
          }
          _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
          try {
            return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
          } finally {
            _currentZoneFrame = _currentZoneFrame.parent;
          }
        };
        Zone.prototype.runGuarded = function(callback, applyThis, applyArgs, source) {
          if (applyThis === void 0) {
            applyThis = null;
          }
          if (applyArgs === void 0) {
            applyArgs = null;
          }
          if (source === void 0) {
            source = null;
          }
          _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
          try {
            try {
              return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            } catch (error) {
              if (this._zoneDelegate.handleError(this, error)) {
                throw error;
              }
            }
          } finally {
            _currentZoneFrame = _currentZoneFrame.parent;
          }
        };
        Zone.prototype.runTask = function(task, applyThis, applyArgs) {
          if (task.zone != this)
            throw new Error('A task can only be run in the zone of creation! (Creation: ' + (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
          var reEntryGuard = task.state != running;
          reEntryGuard && task._transitionTo(running, scheduled);
          task.runCount++;
          var previousTask = _currentTask;
          _currentTask = task;
          _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
          try {
            if (task.type == macroTask && task.data && !task.data.isPeriodic) {
              task.cancelFn = null;
            }
            try {
              return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
            } catch (error) {
              if (this._zoneDelegate.handleError(this, error)) {
                throw error;
              }
            }
          } finally {
            if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
              reEntryGuard && task._transitionTo(scheduled, running, notScheduled);
            } else {
              task.runCount = 0;
              this._updateTaskCount(task, -1);
              reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
            }
            _currentZoneFrame = _currentZoneFrame.parent;
            _currentTask = previousTask;
          }
        };
        Zone.prototype.scheduleTask = function(task) {
          task._transitionTo(scheduling, notScheduled);
          var zoneDelegates = [];
          task._zoneDelegates = zoneDelegates;
          task.zone = this;
          task = this._zoneDelegate.scheduleTask(this, task);
          if (task._zoneDelegates === zoneDelegates) {
            this._updateTaskCount(task, 1);
          }
          if (task.state == scheduling) {
            task._transitionTo(scheduled, scheduling);
          }
          return task;
        };
        Zone.prototype.scheduleMicroTask = function(source, callback, data, customSchedule) {
          return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function(source, callback, data, customSchedule, customCancel) {
          return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function(source, callback, data, customSchedule, customCancel) {
          return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function(task) {
          task._transitionTo(canceling, scheduled, running);
          this._zoneDelegate.cancelTask(this, task);
          this._updateTaskCount(task, -1);
          task._transitionTo(notScheduled, canceling);
          task.runCount = 0;
          return task;
        };
        Zone.prototype._updateTaskCount = function(task, count) {
          var zoneDelegates = task._zoneDelegates;
          if (count == -1) {
            task._zoneDelegates = null;
          }
          for (var i = 0; i < zoneDelegates.length; i++) {
            zoneDelegates[i]._updateTaskCount(task.type, count);
          }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
      }());
      var DELEGATE_ZS = {
        name: '',
        onHasTask: function(delegate, _, target, hasTaskState) {
          return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function(delegate, _, target, task) {
          return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function(delegate, _, target, task, applyThis, applyArgs) {
          return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function(delegate, _, target, task) {
          return delegate.cancelTask(target, task);
        }
      };
      var ZoneDelegate = (function() {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
          this._taskCounts = {
            microTask: 0,
            macroTask: 0,
            eventTask: 0
          };
          this.zone = zone;
          this._parentDelegate = parentDelegate;
          this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
          this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
          this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
          this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
          this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
          this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
          this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
          this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
          this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
          this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
          this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
          this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
          this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
          this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
          this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
          this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
          this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
          this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
          this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
          this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
          this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
          this._hasTaskZS = null;
          this._hasTaskDlgt = null;
          this._hasTaskDlgtOwner = null;
          this._hasTaskCurrZone = null;
          var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
          var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
          if (zoneSpecHasTask || parentHasTask) {
            this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
            this._hasTaskDlgt = parentDelegate;
            this._hasTaskDlgtOwner = this;
            this._hasTaskCurrZone = zone;
            if (!zoneSpec.onScheduleTask) {
              this._scheduleTaskZS = DELEGATE_ZS;
              this._scheduleTaskDlgt = parentDelegate;
              this._scheduleTaskCurrZone = this.zone;
            }
            if (!zoneSpec.onInvokeTask) {
              this._invokeTaskZS = DELEGATE_ZS;
              this._invokeTaskDlgt = parentDelegate;
              this._invokeTaskCurrZone = this.zone;
            }
            if (!zoneSpec.onCancelTask) {
              this._cancelTaskZS = DELEGATE_ZS;
              this._cancelTaskDlgt = parentDelegate;
              this._cancelTaskCurrZone = this.zone;
            }
          }
        }
        ZoneDelegate.prototype.fork = function(targetZone, zoneSpec) {
          return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function(targetZone, callback, source) {
          return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
        };
        ZoneDelegate.prototype.invoke = function(targetZone, callback, applyThis, applyArgs, source) {
          return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function(targetZone, error) {
          return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
        };
        ZoneDelegate.prototype.scheduleTask = function(targetZone, task) {
          var returnTask = task;
          if (this._scheduleTaskZS) {
            if (this._hasTaskZS) {
              returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
            }
            returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
            if (!returnTask)
              returnTask = task;
          } else {
            if (task.scheduleFn) {
              task.scheduleFn(task);
            } else if (task.type == microTask) {
              scheduleMicroTask(task);
            } else {
              throw new Error('Task is missing scheduleFn.');
            }
          }
          return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function(targetZone, task, applyThis, applyArgs) {
          return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function(targetZone, task) {
          var value;
          if (this._cancelTaskZS) {
            value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
          } else {
            value = task.cancelFn(task);
          }
          return value;
        };
        ZoneDelegate.prototype.hasTask = function(targetZone, isEmpty) {
          return this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
        };
        ZoneDelegate.prototype._updateTaskCount = function(type, count) {
          var counts = this._taskCounts;
          var prev = counts[type];
          var next = counts[type] = prev + count;
          if (next < 0) {
            throw new Error('More tasks executed then were scheduled.');
          }
          if (prev == 0 || next == 0) {
            var isEmpty = {
              microTask: counts.microTask > 0,
              macroTask: counts.macroTask > 0,
              eventTask: counts.eventTask > 0,
              change: type
            };
            this.hasTask(this.zone, isEmpty);
          }
        };
        return ZoneDelegate;
      }());
      var ZoneTask = (function() {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
          this.zone = null;
          this.runCount = 0;
          this._zoneDelegates = null;
          this._state = 'notScheduled';
          this.type = type;
          this.source = source;
          this.data = options;
          this.scheduleFn = scheduleFn;
          this.cancelFn = cancelFn;
          this.callback = callback;
          var self = this;
          this.invoke = function() {
            _numberOfNestedTaskFrames++;
            try {
              self.runCount++;
              return self.zone.runTask(self, this, arguments);
            } finally {
              if (_numberOfNestedTaskFrames == 1) {
                drainMicroTaskQueue();
              }
              _numberOfNestedTaskFrames--;
            }
          };
        }
        Object.defineProperty(ZoneTask.prototype, "state", {
          get: function() {
            return this._state;
          },
          enumerable: true,
          configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function() {
          this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function(toState, fromState1, fromState2) {
          if (this._state === fromState1 || this._state === fromState2) {
            this._state = toState;
            if (toState == notScheduled) {
              this._zoneDelegates = null;
            }
          } else {
            debugger;
            throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ? ' or \'' + fromState2 + '\'' : '') + ", was '" + this._state + "'.");
          }
        };
        ZoneTask.prototype.toString = function() {
          if (this.data && typeof this.data.handleId !== 'undefined') {
            return this.data.handleId;
          } else {
            return Object.prototype.toString.call(this);
          }
        };
        ZoneTask.prototype.toJSON = function() {
          return {
            type: this.type,
            state: this.state,
            source: this.source,
            data: this.data,
            zone: this.zone.name,
            invoke: this.invoke,
            scheduleFn: this.scheduleFn,
            cancelFn: this.cancelFn,
            runCount: this.runCount,
            callback: this.callback
          };
        };
        return ZoneTask;
      }());
      var ZoneFrame = (function() {
        function ZoneFrame(parent, zone) {
          this.parent = parent;
          this.zone = zone;
        }
        return ZoneFrame;
      }());
      function __symbol__(name) {
        return '__zone_symbol__' + name;
      }
      var symbolSetTimeout = __symbol__('setTimeout');
      var symbolPromise = __symbol__('Promise');
      var symbolThen = __symbol__('then');
      var _currentZoneFrame = new ZoneFrame(null, new Zone(null, null));
      var _currentTask = null;
      var _microTaskQueue = [];
      var _isDrainingMicrotaskQueue = false;
      var _uncaughtPromiseErrors = [];
      var _numberOfNestedTaskFrames = 0;
      function scheduleQueueDrain() {
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
          if (global[symbolPromise]) {
            global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
          } else {
            global[symbolSetTimeout](drainMicroTaskQueue, 0);
          }
        }
      }
      function scheduleMicroTask(task) {
        scheduleQueueDrain();
        _microTaskQueue.push(task);
      }
      function consoleError(e) {
        var rejection = e && e.rejection;
        if (rejection) {
          console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
        }
        console.error(e);
      }
      function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
          _isDrainingMicrotaskQueue = true;
          while (_microTaskQueue.length) {
            var queue = _microTaskQueue;
            _microTaskQueue = [];
            for (var i = 0; i < queue.length; i++) {
              var task = queue[i];
              try {
                task.zone.runTask(task, null, null);
              } catch (error) {
                consoleError(error);
              }
            }
          }
          while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function() {
              var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
              try {
                uncaughtPromiseError.zone.runGuarded(function() {
                  throw uncaughtPromiseError;
                });
              } catch (error) {
                consoleError(error);
              }
            };
            while (_uncaughtPromiseErrors.length) {
              _loop_1();
            }
          }
          _isDrainingMicrotaskQueue = false;
        }
      }
      function isThenable(value) {
        return value && value.then;
      }
      function forwardResolution(value) {
        return value;
      }
      function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
      }
      var symbolState = __symbol__('state');
      var symbolValue = __symbol__('value');
      var source = 'Promise.then';
      var UNRESOLVED = null;
      var RESOLVED = true;
      var REJECTED = false;
      var REJECTED_NO_CATCH = 0;
      function makeResolver(promise, state) {
        return function(v) {
          try {
            resolvePromise(promise, state, v);
          } catch (err) {
            resolvePromise(promise, false, err);
          }
        };
      }
      var once = function() {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
          return function() {
            if (wasCalled) {
              return;
            }
            wasCalled = true;
            wrappedFunction.apply(null, arguments);
          };
        };
      };
      function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
          throw new TypeError('Promise resolved with itself');
        }
        if (promise[symbolState] === UNRESOLVED) {
          var then = null;
          try {
            if (typeof value === 'object' || typeof value === 'function') {
              then = value && value.then;
            }
          } catch (err) {
            onceWrapper(function() {
              resolvePromise(promise, false, err);
            })();
            return promise;
          }
          if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
            clearRejectedNoCatch(value);
            resolvePromise(promise, value[symbolState], value[symbolValue]);
          } else if (state !== REJECTED && typeof then === 'function') {
            try {
              then.apply(value, [onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false))]);
            } catch (err) {
              onceWrapper(function() {
                resolvePromise(promise, false, err);
              })();
            }
          } else {
            promise[symbolState] = state;
            var queue = promise[symbolValue];
            promise[symbolValue] = value;
            for (var i = 0; i < queue.length; ) {
              scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
            }
            if (queue.length == 0 && state == REJECTED) {
              promise[symbolState] = REJECTED_NO_CATCH;
              try {
                throw new Error('Uncaught (in promise): ' + value + (value && value.stack ? '\n' + value.stack : ''));
              } catch (err) {
                var error_1 = err;
                error_1.rejection = value;
                error_1.promise = promise;
                error_1.zone = Zone.current;
                error_1.task = Zone.currentTask;
                _uncaughtPromiseErrors.push(error_1);
                scheduleQueueDrain();
              }
            }
          }
        }
        return promise;
      }
      function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
          promise[symbolState] = REJECTED;
          for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
            if (promise === _uncaughtPromiseErrors[i].promise) {
              _uncaughtPromiseErrors.splice(i, 1);
              break;
            }
          }
        }
      }
      function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ? (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution : (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function() {
          try {
            resolvePromise(chainPromise, true, zone.run(delegate, undefined, [promise[symbolValue]]));
          } catch (error) {
            resolvePromise(chainPromise, false, error);
          }
        });
      }
      var ZoneAwarePromise = (function() {
        function ZoneAwarePromise(executor) {
          var promise = this;
          if (!(promise instanceof ZoneAwarePromise)) {
            throw new Error('Must be an instanceof Promise.');
          }
          promise[symbolState] = UNRESOLVED;
          promise[symbolValue] = [];
          try {
            executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
          } catch (error) {
            resolvePromise(promise, false, error);
          }
        }
        ZoneAwarePromise.toString = function() {
          return 'function ZoneAwarePromise() { [native code] }';
        };
        ZoneAwarePromise.resolve = function(value) {
          return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function(error) {
          return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function(values) {
          var resolve;
          var reject;
          var promise = new this(function(res, rej) {
            _a = [res, rej], resolve = _a[0], reject = _a[1];
            var _a;
          });
          function onResolve(value) {
            promise && (promise = null || resolve(value));
          }
          function onReject(error) {
            promise && (promise = null || reject(error));
          }
          for (var _i = 0,
              values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!isThenable(value)) {
              value = this.resolve(value);
            }
            value.then(onResolve, onReject);
          }
          return promise;
        };
        ZoneAwarePromise.all = function(values) {
          var resolve;
          var reject;
          var promise = new this(function(res, rej) {
            resolve = res;
            reject = rej;
          });
          var count = 0;
          var resolvedValues = [];
          for (var _i = 0,
              values_2 = values; _i < values_2.length; _i++) {
            var value = values_2[_i];
            if (!isThenable(value)) {
              value = this.resolve(value);
            }
            value.then((function(index) {
              return function(value) {
                resolvedValues[index] = value;
                count--;
                if (!count) {
                  resolve(resolvedValues);
                }
              };
            })(count), reject);
            count++;
          }
          if (!count)
            resolve(resolvedValues);
          return promise;
        };
        ZoneAwarePromise.prototype.then = function(onFulfilled, onRejected) {
          var chainPromise = new this.constructor(null);
          var zone = Zone.current;
          if (this[symbolState] == UNRESOLVED) {
            this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
          } else {
            scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
          }
          return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function(onRejected) {
          return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
      }());
      ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
      ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
      ZoneAwarePromise['race'] = ZoneAwarePromise.race;
      ZoneAwarePromise['all'] = ZoneAwarePromise.all;
      var NativePromise = global[symbolPromise] = global['Promise'];
      global['Promise'] = ZoneAwarePromise;
      var symbolThenPatched = __symbol__('thenPatched');
      function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var originalThen = proto.then;
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function(onResolve, onReject) {
          var _this = this;
          var wrapped = new ZoneAwarePromise(function(resolve, reject) {
            originalThen.call(_this, resolve, reject);
          });
          return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
      }
      function zoneify(fn) {
        return function() {
          var resultPromise = fn.apply(this, arguments);
          if (resultPromise instanceof ZoneAwarePromise) {
            return resultPromise;
          }
          var Ctor = resultPromise.constructor;
          if (!Ctor[symbolThenPatched]) {
            patchThen(Ctor);
          }
          return resultPromise;
        };
      }
      if (NativePromise) {
        patchThen(NativePromise);
        var fetch = global['fetch'];
        if (typeof fetch == 'function') {
          global['fetch'] = zoneify(fetch);
        }
      }
      Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
      var FrameType;
      (function(FrameType) {
        FrameType[FrameType["blackList"] = 0] = "blackList";
        FrameType[FrameType["transition"] = 1] = "transition";
      })(FrameType || (FrameType = {}));
      var NativeError = global[__symbol__('Error')] = global.Error;
      var blackListedStackFrames = {};
      var zoneAwareFrame;
      global.Error = ZoneAwareError;
      var frameParserStrategy = null;
      var stackRewrite = 'stackRewrite';
      var createProperty = function(props, key) {
        if (props[key]) {
          return;
        }
        var name = __symbol__(key);
        props[key] = {
          configurable: true,
          enumerable: true,
          get: function() {
            if (!this[name]) {
              var error_2 = this[__symbol__('error')];
              if (error_2) {
                this[name] = error_2[key];
              }
            }
            return this[name];
          },
          set: function(value) {
            this[name] = value;
          }
        };
      };
      var createMethodProperty = function(props, key) {
        if (props[key]) {
          return;
        }
        props[key] = {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function() {
            var error = this[__symbol__('error')];
            var errorMethod = (error && error[key]) || this[key];
            if (errorMethod) {
              return errorMethod.apply(error, arguments);
            }
          }
        };
      };
      var createErrorProperties = function() {
        var props = Object.create(null);
        var error = new NativeError();
        var keys = Object.getOwnPropertyNames(error);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (Object.prototype.hasOwnProperty.call(error, key)) {
            createProperty(props, key);
          }
        }
        var proto = NativeError.prototype;
        if (proto) {
          var pKeys = Object.getOwnPropertyNames(proto);
          for (var i = 0; i < pKeys.length; i++) {
            var key = pKeys[i];
            if (key !== 'constructor' && key !== 'toString' && key !== 'toSource') {
              createProperty(props, key);
            }
          }
        }
        createProperty(props, 'originalStack');
        createProperty(props, 'zoneAwareStack');
        createMethodProperty(props, 'toString');
        createMethodProperty(props, 'toSource');
        return props;
      };
      var errorProperties = createErrorProperties();
      var getErrorPropertiesForPrototype = function(prototype) {
        if (prototype === ZoneAwareError.prototype) {
          return errorProperties;
        }
        var newProps = Object.create(null);
        var cKeys = Object.getOwnPropertyNames(errorProperties);
        var keys = Object.getOwnPropertyNames(prototype);
        cKeys.forEach(function(cKey) {
          if (keys.filter(function(key) {
            return key === cKey;
          }).length === 0) {
            newProps[cKey] = errorProperties[cKey];
          }
        });
        return newProps;
      };
      function ZoneAwareError() {
        if (!(this instanceof ZoneAwareError)) {
          return ZoneAwareError.apply(Object.create(ZoneAwareError.prototype), arguments);
        }
        var error = NativeError.apply(this, arguments);
        this[__symbol__('error')] = error;
        error.originalStack = error.stack;
        if (ZoneAwareError[stackRewrite] && error.originalStack) {
          var frames_1 = error.originalStack.split('\n');
          var zoneFrame = _currentZoneFrame;
          var i = 0;
          while (frames_1[i] !== zoneAwareFrame && i < frames_1.length) {
            i++;
          }
          for (; i < frames_1.length && zoneFrame; i++) {
            var frame = frames_1[i];
            if (frame.trim()) {
              var frameType = blackListedStackFrames.hasOwnProperty(frame) && blackListedStackFrames[frame];
              if (frameType === FrameType.blackList) {
                frames_1.splice(i, 1);
                i--;
              } else if (frameType === FrameType.transition) {
                if (zoneFrame.parent) {
                  frames_1[i] += " [" + zoneFrame.parent.zone.name + " => " + zoneFrame.zone.name + "]";
                  zoneFrame = zoneFrame.parent;
                } else {
                  zoneFrame = null;
                }
              } else {
                frames_1[i] += " [" + zoneFrame.zone.name + "]";
              }
            }
          }
          error.stack = error.zoneAwareStack = frames_1.join('\n');
        }
        Object.defineProperties(this, getErrorPropertiesForPrototype(Object.getPrototypeOf(this)));
        return this;
      }
      ZoneAwareError.prototype = NativeError.prototype;
      ZoneAwareError[Zone.__symbol__('blacklistedStackFrames')] = blackListedStackFrames;
      ZoneAwareError[stackRewrite] = false;
      if (NativeError.hasOwnProperty('stackTraceLimit')) {
        NativeError.stackTraceLimit = Math.max(NativeError.stackTraceLimit, 15);
        Object.defineProperty(ZoneAwareError, 'stackTraceLimit', {
          get: function() {
            return NativeError.stackTraceLimit;
          },
          set: function(value) {
            return NativeError.stackTraceLimit = value;
          }
        });
      }
      if (NativeError.hasOwnProperty('captureStackTrace')) {
        Object.defineProperty(ZoneAwareError, 'captureStackTrace', {value: function zoneCaptureStackTrace(targetObject, constructorOpt) {
            NativeError.captureStackTrace(targetObject, constructorOpt);
          }});
      }
      Object.defineProperty(ZoneAwareError, 'prepareStackTrace', {
        get: function() {
          return NativeError.prepareStackTrace;
        },
        set: function(value) {
          if (!value || typeof value !== 'function') {
            return NativeError.prepareStackTrace = value;
          }
          return NativeError.prepareStackTrace = function(error, structuredStackTrace) {
            if (structuredStackTrace) {
              for (var i = 0; i < structuredStackTrace.length; i++) {
                var st = structuredStackTrace[i];
                if (st.getFunctionName() === 'zoneCaptureStackTrace') {
                  structuredStackTrace.splice(i, 1);
                  break;
                }
              }
            }
            return value.apply(this, [error, structuredStackTrace]);
          };
        }
      });
      var detectZone = Zone.current.fork({
        name: 'detect',
        onInvoke: function(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
          return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
        },
        onHandleError: function(parentZD, current, target, error) {
          if (error.originalStack && Error === ZoneAwareError) {
            var frames_2 = error.originalStack.split(/\n/);
            var runFrame = false,
                runGuardedFrame = false,
                runTaskFrame = false;
            while (frames_2.length) {
              var frame = frames_2.shift();
              if (/:\d+:\d+/.test(frame)) {
                var fnName = frame.split('(')[0].split('@')[0];
                var frameType = FrameType.transition;
                if (fnName.indexOf('ZoneAwareError') !== -1) {
                  zoneAwareFrame = frame;
                }
                if (fnName.indexOf('runGuarded') !== -1) {
                  runGuardedFrame = true;
                } else if (fnName.indexOf('runTask') !== -1) {
                  runTaskFrame = true;
                } else if (fnName.indexOf('run') !== -1) {
                  runFrame = true;
                } else {
                  frameType = FrameType.blackList;
                }
                blackListedStackFrames[frame] = frameType;
                if (runFrame && runGuardedFrame && runTaskFrame) {
                  ZoneAwareError[stackRewrite] = true;
                  break;
                }
              }
            }
          }
          return false;
        }
      });
      var detectRunFn = function() {
        detectZone.run(function() {
          detectZone.runGuarded(function() {
            throw new Error('blacklistStackFrames');
          });
        });
      };
      detectZone.runTask(detectZone.scheduleMacroTask('detect', detectRunFn, null, function() {
        return null;
      }, null));
      return global['Zone'] = Zone;
    })(typeof window === 'object' && window || typeof self === 'object' && self || global);
    var zoneSymbol = function(n) {
      return ("__zone_symbol__" + n);
    };
    var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
    function bindArguments(args, source) {
      for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
          args[i] = Zone.current.wrap(args[i], source + '_' + i);
        }
      }
      return args;
    }
    var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
    var isNode = (!('nw' in _global$1) && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');
    var isMix = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]' && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
    function patchProperty(obj, prop) {
      var desc = Object.getOwnPropertyDescriptor(obj, prop) || {
        enumerable: true,
        configurable: true
      };
      var originalDesc = Object.getOwnPropertyDescriptor(obj, 'original' + prop);
      if (!originalDesc && desc.get) {
        Object.defineProperty(obj, 'original' + prop, {
          enumerable: false,
          configurable: true,
          get: desc.get
        });
      }
      delete desc.writable;
      delete desc.value;
      var eventName = prop.substr(2);
      var _prop = '_' + prop;
      desc.set = function(fn) {
        if (this[_prop]) {
          this.removeEventListener(eventName, this[_prop]);
        }
        if (typeof fn === 'function') {
          var wrapFn = function(event) {
            var result;
            result = fn.apply(this, arguments);
            if (result != undefined && !result)
              event.preventDefault();
          };
          this[_prop] = wrapFn;
          this.addEventListener(eventName, wrapFn, false);
        } else {
          this[_prop] = null;
        }
      };
      desc.get = function() {
        var r = this[_prop] || null;
        if (r === null) {
          if (originalDesc && originalDesc.get) {
            r = originalDesc.get.apply(this, arguments);
            if (r) {
              desc.set.apply(this, [r]);
              if (typeof this['removeAttribute'] === 'function') {
                this.removeAttribute(prop);
              }
            }
          }
        }
        return this[_prop] || null;
      };
      Object.defineProperty(obj, prop, desc);
    }
    var EVENT_TASKS = zoneSymbol('eventTasks');
    var ADD_EVENT_LISTENER = 'addEventListener';
    var REMOVE_EVENT_LISTENER = 'removeEventListener';
    function findExistingRegisteredTask(target, handler, name, capture, remove) {
      var eventTasks = target[EVENT_TASKS];
      if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
          var eventTask = eventTasks[i];
          var data = eventTask.data;
          var listener = data.handler;
          if ((data.handler === handler || listener.listener === handler) && data.useCapturing === capture && data.eventName === name) {
            if (remove) {
              eventTasks.splice(i, 1);
            }
            return eventTask;
          }
        }
      }
      return null;
    }
    function findAllExistingRegisteredTasks(target, name, capture, remove) {
      var eventTasks = target[EVENT_TASKS];
      if (eventTasks) {
        var result = [];
        for (var i = eventTasks.length - 1; i >= 0; i--) {
          var eventTask = eventTasks[i];
          var data = eventTask.data;
          if (data.eventName === name && data.useCapturing === capture) {
            result.push(eventTask);
            if (remove) {
              eventTasks.splice(i, 1);
            }
          }
        }
        return result;
      }
      return null;
    }
    function attachRegisteredEvent(target, eventTask, isPrepend) {
      var eventTasks = target[EVENT_TASKS];
      if (!eventTasks) {
        eventTasks = target[EVENT_TASKS] = [];
      }
      if (isPrepend) {
        eventTasks.unshift(eventTask);
      } else {
        eventTasks.push(eventTask);
      }
    }
    var defaultListenerMetaCreator = function(self, args) {
      return {
        useCapturing: args[2],
        eventName: args[0],
        handler: args[1],
        target: self || _global$1,
        name: args[0],
        invokeAddFunc: function(addFnSymbol, delegate) {
          if (delegate && delegate.invoke) {
            return this.target[addFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
          } else {
            return this.target[addFnSymbol](this.eventName, delegate, this.useCapturing);
          }
        },
        invokeRemoveFunc: function(removeFnSymbol, delegate) {
          if (delegate && delegate.invoke) {
            return this.target[removeFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
          } else {
            return this.target[removeFnSymbol](this.eventName, delegate, this.useCapturing);
          }
        }
      };
    };
    function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates, isPrepend, metaCreator) {
      if (useCapturingParam === void 0) {
        useCapturingParam = true;
      }
      if (allowDuplicates === void 0) {
        allowDuplicates = false;
      }
      if (isPrepend === void 0) {
        isPrepend = false;
      }
      if (metaCreator === void 0) {
        metaCreator = defaultListenerMetaCreator;
      }
      var addFnSymbol = zoneSymbol(addFnName);
      var removeFnSymbol = zoneSymbol(removeFnName);
      var defaultUseCapturing = useCapturingParam ? false : undefined;
      function scheduleEventListener(eventTask) {
        var meta = eventTask.data;
        attachRegisteredEvent(meta.target, eventTask, isPrepend);
        return meta.invokeAddFunc(addFnSymbol, eventTask);
      }
      function cancelEventListener(eventTask) {
        var meta = eventTask.data;
        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
        return meta.invokeRemoveFunc(removeFnSymbol, eventTask);
      }
      return function zoneAwareAddListener(self, args) {
        var data = metaCreator(self, args);
        data.useCapturing = data.useCapturing || defaultUseCapturing;
        var delegate = null;
        if (typeof data.handler == 'function') {
          delegate = data.handler;
        } else if (data.handler && data.handler.handleEvent) {
          delegate = function(event) {
            return data.handler.handleEvent(event);
          };
        }
        var validZoneHandler = false;
        try {
          validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
        } catch (error) {
          return;
        }
        if (!delegate || validZoneHandler) {
          return data.invokeAddFunc(addFnSymbol, data.handler);
        }
        if (!allowDuplicates) {
          var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, false);
          if (eventTask) {
            return data.invokeAddFunc(addFnSymbol, eventTask);
          }
        }
        var zone = Zone.current;
        var source = data.target.constructor['name'] + '.' + addFnName + ':' + data.eventName;
        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
      };
    }
    function makeZoneAwareRemoveListener(fnName, useCapturingParam, metaCreator) {
      if (useCapturingParam === void 0) {
        useCapturingParam = true;
      }
      if (metaCreator === void 0) {
        metaCreator = defaultListenerMetaCreator;
      }
      var symbol = zoneSymbol(fnName);
      var defaultUseCapturing = useCapturingParam ? false : undefined;
      return function zoneAwareRemoveListener(self, args) {
        var data = metaCreator(self, args);
        data.useCapturing = data.useCapturing || defaultUseCapturing;
        var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, true);
        if (eventTask) {
          eventTask.zone.cancelTask(eventTask);
        } else {
          data.invokeRemoveFunc(symbol, data.handler);
        }
      };
    }
    function makeZoneAwareRemoveAllListeners(fnName, useCapturingParam) {
      if (useCapturingParam === void 0) {
        useCapturingParam = true;
      }
      var symbol = zoneSymbol(fnName);
      var defaultUseCapturing = useCapturingParam ? false : undefined;
      return function zoneAwareRemoveAllListener(self, args) {
        var target = self || _global$1;
        if (args.length === 0) {
          target[EVENT_TASKS] = [];
          target[symbol]();
          return;
        }
        var eventName = args[0];
        var useCapturing = args[1] || defaultUseCapturing;
        findAllExistingRegisteredTasks(target, eventName, useCapturing, true);
        target[symbol](eventName);
      };
    }
    function makeZoneAwareListeners(fnName) {
      var symbol = zoneSymbol(fnName);
      return function zoneAwareEventListeners(self, args) {
        var eventName = args[0];
        var target = self || _global$1;
        if (!target[EVENT_TASKS]) {
          return [];
        }
        return target[EVENT_TASKS].filter(function(task) {
          return task.data.eventName === eventName;
        }).map(function(task) {
          return task.data.handler;
        });
      };
    }
    var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
    var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);
    var originalInstanceKey = zoneSymbol('originalInstance');
    function createNamedFn(name, delegate) {
      try {
        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
      } catch (error) {
        return function() {
          return delegate(this, arguments);
        };
      }
    }
    function patchMethod(target, name, patchFn) {
      var proto = target;
      while (proto && Object.getOwnPropertyNames(proto).indexOf(name) === -1) {
        proto = Object.getPrototypeOf(proto);
      }
      if (!proto && target[name]) {
        proto = target;
      }
      var delegateName = zoneSymbol(name);
      var delegate;
      if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
      }
      return delegate;
    }
    function patchMacroTask(obj, funcName, metaCreator) {
      var setNative = null;
      function scheduleTask(task) {
        var data = task.data;
        data.args[data.callbackIndex] = function() {
          task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
      }
      setNative = patchMethod(obj, funcName, function(delegate) {
        return function(self, args) {
          var meta = metaCreator(self, args);
          if (meta.callbackIndex >= 0 && typeof args[meta.callbackIndex] === 'function') {
            var task = Zone.current.scheduleMacroTask(meta.name, args[meta.callbackIndex], meta, scheduleTask, null);
            return task;
          } else {
            return delegate.apply(self, args);
          }
        };
      });
    }
    function patchMicroTask(obj, funcName, metaCreator) {
      var setNative = null;
      function scheduleTask(task) {
        var data = task.data;
        data.args[data.callbackIndex] = function() {
          task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
      }
      setNative = patchMethod(obj, funcName, function(delegate) {
        return function(self, args) {
          var meta = metaCreator(self, args);
          if (meta.callbackIndex >= 0 && typeof args[meta.callbackIndex] === 'function') {
            var task = Zone.current.scheduleMicroTask(meta.name, args[meta.callbackIndex], meta, scheduleTask);
            return task;
          } else {
            return delegate.apply(self, args);
          }
        };
      });
    }
    var callAndReturnFirstParam = function(fn) {
      return function(self, args) {
        fn(self, args);
        return self;
      };
    };
    var EE_ADD_LISTENER = 'addListener';
    var EE_PREPEND_LISTENER = 'prependListener';
    var EE_REMOVE_LISTENER = 'removeListener';
    var EE_REMOVE_ALL_LISTENER = 'removeAllListeners';
    var EE_LISTENERS = 'listeners';
    var EE_ON = 'on';
    var zoneAwareAddListener$1 = callAndReturnFirstParam(makeZoneAwareAddListener(EE_ADD_LISTENER, EE_REMOVE_LISTENER, false, true, false));
    var zoneAwarePrependListener = callAndReturnFirstParam(makeZoneAwareAddListener(EE_PREPEND_LISTENER, EE_REMOVE_LISTENER, false, true, true));
    var zoneAwareRemoveListener$1 = callAndReturnFirstParam(makeZoneAwareRemoveListener(EE_REMOVE_LISTENER, false));
    var zoneAwareRemoveAllListeners = callAndReturnFirstParam(makeZoneAwareRemoveAllListeners(EE_REMOVE_ALL_LISTENER, false));
    var zoneAwareListeners = makeZoneAwareListeners(EE_LISTENERS);
    function patchEventEmitterMethods(obj) {
      if (obj && obj.addListener) {
        patchMethod(obj, EE_ADD_LISTENER, function() {
          return zoneAwareAddListener$1;
        });
        patchMethod(obj, EE_PREPEND_LISTENER, function() {
          return zoneAwarePrependListener;
        });
        patchMethod(obj, EE_REMOVE_LISTENER, function() {
          return zoneAwareRemoveListener$1;
        });
        patchMethod(obj, EE_REMOVE_ALL_LISTENER, function() {
          return zoneAwareRemoveAllListeners;
        });
        patchMethod(obj, EE_LISTENERS, function() {
          return zoneAwareListeners;
        });
        obj[EE_ON] = obj[EE_ADD_LISTENER];
        return true;
      } else {
        return false;
      }
    }
    var events;
    try {
      events = require('events');
    } catch (err) {}
    if (events && events.EventEmitter) {
      patchEventEmitterMethods(events.EventEmitter.prototype);
    }
    var fs;
    try {
      fs = require('fs');
    } catch (err) {}
    var TO_PATCH_MACROTASK_METHODS = ['access', 'appendFile', 'chmod', 'chown', 'close', 'exists', 'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod', 'lchown', 'link', 'lstat', 'mkdir', 'mkdtemp', 'open', 'read', 'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rmdir', 'stat', 'symlink', 'truncate', 'unlink', 'utimes', 'write', 'writeFile'];
    if (fs) {
      TO_PATCH_MACROTASK_METHODS.filter(function(name) {
        return !!fs[name] && typeof fs[name] === 'function';
      }).forEach(function(name) {
        patchMacroTask(fs, name, function(self, args) {
          return {
            name: 'fs.' + name,
            args: args,
            callbackIndex: args.length > 0 ? args.length - 1 : -1,
            target: self
          };
        });
      });
    }
    function patchTimer(window, setName, cancelName, nameSuffix) {
      var setNative = null;
      var clearNative = null;
      setName += nameSuffix;
      cancelName += nameSuffix;
      var tasksByHandleId = {};
      function scheduleTask(task) {
        var data = task.data;
        data.args[0] = function() {
          task.invoke.apply(this, arguments);
          delete tasksByHandleId[data.handleId];
        };
        data.handleId = setNative.apply(window, data.args);
        tasksByHandleId[data.handleId] = task;
        return task;
      }
      function clearTask(task) {
        delete tasksByHandleId[task.data.handleId];
        return clearNative(task.data.handleId);
      }
      setNative = patchMethod(window, setName, function(delegate) {
        return function(self, args) {
          if (typeof args[0] === 'function') {
            var zone = Zone.current;
            var options = {
              handleId: null,
              isPeriodic: nameSuffix === 'Interval',
              delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
              args: args
            };
            var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
            if (!task) {
              return task;
            }
            var handle = task.data.handleId;
            if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' && typeof handle.unref === 'function') {
              task.ref = handle.ref.bind(handle);
              task.unref = handle.unref.bind(handle);
            }
            return task;
          } else {
            return delegate.apply(window, args);
          }
        };
      });
      clearNative = patchMethod(window, cancelName, function(delegate) {
        return function(self, args) {
          var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
          if (task && typeof task.type === 'string') {
            if (task.state !== 'notScheduled' && (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
              task.zone.cancelTask(task);
            }
          } else {
            delegate.apply(window, args);
          }
        };
      });
    }
    var set = 'set';
    var clear = 'clear';
    var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
    var timers = require('timers');
    patchTimer(timers, set, clear, 'Timeout');
    patchTimer(timers, set, clear, 'Interval');
    patchTimer(timers, set, clear, 'Immediate');
    var shouldPatchGlobalTimers = global.setTimeout !== timers.setTimeout;
    if (shouldPatchGlobalTimers) {
      patchTimer(_global, set, clear, 'Timeout');
      patchTimer(_global, set, clear, 'Interval');
      patchTimer(_global, set, clear, 'Immediate');
    }
    patchProcess();
    var crypto;
    try {
      crypto = require('crypto');
    } catch (err) {}
    if (crypto) {
      var methodNames = ['randomBytes', 'pbkdf2'];
      methodNames.forEach(function(name) {
        patchMacroTask(crypto, name, function(self, args) {
          return {
            name: 'crypto.' + name,
            args: args,
            callbackIndex: (args.length > 0 && typeof args[args.length - 1] === 'function') ? args.length - 1 : -1,
            target: crypto
          };
        });
      });
    }
    function patchProcess() {
      patchMicroTask(process, 'nextTick', function(self, args) {
        return {
          name: 'process.nextTick',
          args: args,
          callbackIndex: (args.length > 0 && typeof args[0] === 'function') ? 0 : -1,
          target: process
        };
      });
    }
  })));
})(require('process'));

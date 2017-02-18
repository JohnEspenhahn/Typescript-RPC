/* */ 
"format cjs";
(function(Buffer, process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (factory((global.Rx = global.Rx || {})));
  }(this, (function(exports) {
    'use strict';
    var extendStatics = Object.setPrototypeOf || ({__proto__: []} instanceof Array && function(d, b) {
      d.__proto__ = b;
    }) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
    };
    function __extends(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var root = (typeof window == 'object' && window.window === window && window || typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global);
    if (!root) {
      throw new Error('RxJS could not find any global context (window, self, global)');
    }
    function isFunction(x) {
      return typeof x === 'function';
    }
    var isArray = Array.isArray || (function(x) {
      return x && typeof x.length === 'number';
    });
    function isObject(x) {
      return x != null && typeof x === 'object';
    }
    var errorObject = {e: {}};
    var tryCatchTarget;
    function tryCatcher() {
      try {
        return tryCatchTarget.apply(this, arguments);
      } catch (e) {
        errorObject.e = e;
        return errorObject;
      }
    }
    function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
    }
    var UnsubscriptionError = (function(_super) {
      __extends(UnsubscriptionError, _super);
      function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function(err, i) {
          return ((i + 1) + ") " + err.toString());
        }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
      }
      return UnsubscriptionError;
    }(Error));
    var Subscription = (function() {
      function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
          this._unsubscribe = unsubscribe;
        }
      }
      Subscription.prototype.unsubscribe = function() {
        var hasErrors = false;
        var errors;
        if (this.closed) {
          return;
        }
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents,
            _unsubscribe = _a._unsubscribe,
            _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
          _parent.remove(this);
          _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction(_unsubscribe)) {
          var trial = tryCatch(_unsubscribe).call(this);
          if (trial === errorObject) {
            hasErrors = true;
            errors = errors || (errorObject.e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject.e.errors) : [errorObject.e]);
          }
        }
        if (isArray(_subscriptions)) {
          index = -1;
          len = _subscriptions.length;
          while (++index < len) {
            var sub = _subscriptions[index];
            if (isObject(sub)) {
              var trial = tryCatch(sub.unsubscribe).call(sub);
              if (trial === errorObject) {
                hasErrors = true;
                errors = errors || [];
                var err = errorObject.e;
                if (err instanceof UnsubscriptionError) {
                  errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          }
        }
        if (hasErrors) {
          throw new UnsubscriptionError(errors);
        }
      };
      Subscription.prototype.add = function(teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
          return Subscription.EMPTY;
        }
        if (teardown === this) {
          return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
          case 'function':
            subscription = new Subscription(teardown);
          case 'object':
            if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
              return subscription;
            } else if (this.closed) {
              subscription.unsubscribe();
              return subscription;
            } else if (typeof subscription._addParent !== 'function') {
              var tmp = subscription;
              subscription = new Subscription();
              subscription._subscriptions = [tmp];
            }
            break;
          default:
            throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
      };
      Subscription.prototype.remove = function(subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
          var subscriptionIndex = subscriptions.indexOf(subscription);
          if (subscriptionIndex !== -1) {
            subscriptions.splice(subscriptionIndex, 1);
          }
        }
      };
      Subscription.prototype._addParent = function(parent) {
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
        if (!_parent || _parent === parent) {
          this._parent = parent;
        } else if (!_parents) {
          this._parents = [parent];
        } else if (_parents.indexOf(parent) === -1) {
          _parents.push(parent);
        }
      };
      Subscription.EMPTY = (function(empty) {
        empty.closed = true;
        return empty;
      }(new Subscription()));
      return Subscription;
    }());
    function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function(errs, err) {
        return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err);
      }, []);
    }
    var empty = {
      closed: true,
      next: function(value) {},
      error: function(err) {
        throw err;
      },
      complete: function() {}
    };
    var Symbol$1 = root.Symbol;
    var $$rxSubscriber = (typeof Symbol$1 === 'function' && typeof Symbol$1.for === 'function') ? Symbol$1.for('rxSubscriber') : '@@rxSubscriber';
    var Subscriber = (function(_super) {
      __extends(Subscriber, _super);
      function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
          case 0:
            this.destination = empty;
            break;
          case 1:
            if (!destinationOrNext) {
              this.destination = empty;
              break;
            }
            if (typeof destinationOrNext === 'object') {
              if (destinationOrNext instanceof Subscriber) {
                this.destination = destinationOrNext;
                this.destination.add(this);
              } else {
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext);
              }
              break;
            }
          default:
            this.syncErrorThrowable = true;
            this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
            break;
        }
      }
      Subscriber.prototype[$$rxSubscriber] = function() {
        return this;
      };
      Subscriber.create = function(next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
      };
      Subscriber.prototype.next = function(value) {
        if (!this.isStopped) {
          this._next(value);
        }
      };
      Subscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          this.isStopped = true;
          this._error(err);
        }
      };
      Subscriber.prototype.complete = function() {
        if (!this.isStopped) {
          this.isStopped = true;
          this._complete();
        }
      };
      Subscriber.prototype.unsubscribe = function() {
        if (this.closed) {
          return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
      };
      Subscriber.prototype._next = function(value) {
        this.destination.next(value);
      };
      Subscriber.prototype._error = function(err) {
        this.destination.error(err);
        this.unsubscribe();
      };
      Subscriber.prototype._complete = function() {
        this.destination.complete();
        this.unsubscribe();
      };
      Subscriber.prototype._unsubscribeAndRecycle = function() {
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
      };
      return Subscriber;
    }(Subscription));
    var SafeSubscriber = (function(_super) {
      __extends(SafeSubscriber, _super);
      function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction(observerOrNext)) {
          next = observerOrNext;
        } else if (observerOrNext) {
          context = observerOrNext;
          next = observerOrNext.next;
          error = observerOrNext.error;
          complete = observerOrNext.complete;
          if (isFunction(context.unsubscribe)) {
            this.add(context.unsubscribe.bind(context));
          }
          context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
      }
      SafeSubscriber.prototype.next = function(value) {
        if (!this.isStopped && this._next) {
          var _parentSubscriber = this._parentSubscriber;
          if (!_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._next, value);
          } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          if (this._error) {
            if (!_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(this._error, err);
              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, this._error, err);
              this.unsubscribe();
            }
          } else if (!_parentSubscriber.syncErrorThrowable) {
            this.unsubscribe();
            throw err;
          } else {
            _parentSubscriber.syncErrorValue = err;
            _parentSubscriber.syncErrorThrown = true;
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber.prototype.complete = function() {
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          if (this._complete) {
            if (!_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(this._complete);
              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, this._complete);
              this.unsubscribe();
            }
          } else {
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
        try {
          fn.call(this._context, value);
        } catch (err) {
          this.unsubscribe();
          throw err;
        }
      };
      SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
        try {
          fn.call(this._context, value);
        } catch (err) {
          parent.syncErrorValue = err;
          parent.syncErrorThrown = true;
          return true;
        }
        return false;
      };
      SafeSubscriber.prototype._unsubscribe = function() {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
      };
      return SafeSubscriber;
    }(Subscriber));
    function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber) {
          return nextOrObserver;
        }
        if (nextOrObserver[$$rxSubscriber]) {
          return nextOrObserver[$$rxSubscriber]();
        }
      }
      if (!nextOrObserver && !error && !complete) {
        return new Subscriber(empty);
      }
      return new Subscriber(nextOrObserver, error, complete);
    }
    function getSymbolObservable(context) {
      var $$observable;
      var Symbol = context.Symbol;
      if (typeof Symbol === 'function') {
        if (Symbol.observable) {
          $$observable = Symbol.observable;
        } else {
          $$observable = Symbol('observable');
          Symbol.observable = $$observable;
        }
      } else {
        $$observable = '@@observable';
      }
      return $$observable;
    }
    var $$observable = getSymbolObservable(root);
    var Observable = (function() {
      function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
          this._subscribe = subscribe;
        }
      }
      Observable.prototype.lift = function(operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };
      Observable.prototype.subscribe = function(observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
          operator.call(sink, this.source);
        } else {
          sink.add(this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
          sink.syncErrorThrowable = false;
          if (sink.syncErrorThrown) {
            throw sink.syncErrorValue;
          }
        }
        return sink;
      };
      Observable.prototype._trySubscribe = function(sink) {
        try {
          return this._subscribe(sink);
        } catch (err) {
          sink.syncErrorThrown = true;
          sink.syncErrorValue = err;
          sink.error(err);
        }
      };
      Observable.prototype.forEach = function(next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
          if (root.Rx && root.Rx.config && root.Rx.config.Promise) {
            PromiseCtor = root.Rx.config.Promise;
          } else if (root.Promise) {
            PromiseCtor = root.Promise;
          }
        }
        if (!PromiseCtor) {
          throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function(resolve, reject) {
          var subscription = _this.subscribe(function(value) {
            if (subscription) {
              try {
                next(value);
              } catch (err) {
                reject(err);
                subscription.unsubscribe();
              }
            } else {
              next(value);
            }
          }, reject, resolve);
        });
      };
      Observable.prototype._subscribe = function(subscriber) {
        return this.source.subscribe(subscriber);
      };
      Observable.prototype[$$observable] = function() {
        return this;
      };
      Observable.create = function(subscribe) {
        return new Observable(subscribe);
      };
      return Observable;
    }());
    var ObjectUnsubscribedError = (function(_super) {
      __extends(ObjectUnsubscribedError, _super);
      function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
      }
      return ObjectUnsubscribedError;
    }(Error));
    var SubjectSubscription = (function(_super) {
      __extends(SubjectSubscription, _super);
      function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
      }
      SubjectSubscription.prototype.unsubscribe = function() {
        if (this.closed) {
          return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
          return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
          observers.splice(subscriberIndex, 1);
        }
      };
      return SubjectSubscription;
    }(Subscription));
    var SubjectSubscriber = (function(_super) {
      __extends(SubjectSubscriber, _super);
      function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
      }
      return SubjectSubscriber;
    }(Subscriber));
    var Subject = (function(_super) {
      __extends(Subject, _super);
      function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
      }
      Subject.prototype[$$rxSubscriber] = function() {
        return new SubjectSubscriber(this);
      };
      Subject.prototype.lift = function(operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
      };
      Subject.prototype.next = function(value) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
            copy[i].next(value);
          }
        }
      };
      Subject.prototype.error = function(err) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
          copy[i].error(err);
        }
        this.observers.length = 0;
      };
      Subject.prototype.complete = function() {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
          copy[i].complete();
        }
        this.observers.length = 0;
      };
      Subject.prototype.unsubscribe = function() {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
      };
      Subject.prototype._trySubscribe = function(subscriber) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else {
          return _super.prototype._trySubscribe.call(this, subscriber);
        }
      };
      Subject.prototype._subscribe = function(subscriber) {
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else if (this.hasError) {
          subscriber.error(this.thrownError);
          return Subscription.EMPTY;
        } else if (this.isStopped) {
          subscriber.complete();
          return Subscription.EMPTY;
        } else {
          this.observers.push(subscriber);
          return new SubjectSubscription(this, subscriber);
        }
      };
      Subject.prototype.asObservable = function() {
        var observable = new Observable();
        observable.source = this;
        return observable;
      };
      Subject.create = function(destination, source) {
        return new AnonymousSubject(destination, source);
      };
      return Subject;
    }(Observable));
    var AnonymousSubject = (function(_super) {
      __extends(AnonymousSubject, _super);
      function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
      }
      AnonymousSubject.prototype.next = function(value) {
        var destination = this.destination;
        if (destination && destination.next) {
          destination.next(value);
        }
      };
      AnonymousSubject.prototype.error = function(err) {
        var destination = this.destination;
        if (destination && destination.error) {
          this.destination.error(err);
        }
      };
      AnonymousSubject.prototype.complete = function() {
        var destination = this.destination;
        if (destination && destination.complete) {
          this.destination.complete();
        }
      };
      AnonymousSubject.prototype._subscribe = function(subscriber) {
        var source = this.source;
        if (source) {
          return this.source.subscribe(subscriber);
        } else {
          return Subscription.EMPTY;
        }
      };
      return AnonymousSubject;
    }(Subject));
    var AsyncSubject = (function(_super) {
      __extends(AsyncSubject, _super);
      function AsyncSubject() {
        _super.apply(this, arguments);
        this.value = null;
        this.hasNext = false;
        this.hasCompleted = false;
      }
      AsyncSubject.prototype._subscribe = function(subscriber) {
        if (this.hasError) {
          subscriber.error(this.thrownError);
          return Subscription.EMPTY;
        } else if (this.hasCompleted && this.hasNext) {
          subscriber.next(this.value);
          subscriber.complete();
          return Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
      };
      AsyncSubject.prototype.next = function(value) {
        if (!this.hasCompleted) {
          this.value = value;
          this.hasNext = true;
        }
      };
      AsyncSubject.prototype.error = function(error) {
        if (!this.hasCompleted) {
          _super.prototype.error.call(this, error);
        }
      };
      AsyncSubject.prototype.complete = function() {
        this.hasCompleted = true;
        if (this.hasNext) {
          _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
      };
      return AsyncSubject;
    }(Subject));
    var BoundCallbackObservable = (function(_super) {
      __extends(BoundCallbackObservable, _super);
      function BoundCallbackObservable(callbackFunc, selector, args, context, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.context = context;
        this.scheduler = scheduler;
      }
      BoundCallbackObservable.create = function(func, selector, scheduler) {
        if (selector === void 0) {
          selector = undefined;
        }
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          return new BoundCallbackObservable(func, selector, args, this, scheduler);
        };
      };
      BoundCallbackObservable.prototype._subscribe = function(subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
          if (!subject) {
            subject = this.subject = new AsyncSubject();
            var handler = function handlerFn() {
              var innerArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i - 0] = arguments[_i];
              }
              var source = handlerFn.source;
              var selector = source.selector,
                  subject = source.subject;
              if (selector) {
                var result_1 = tryCatch(selector).apply(this, innerArgs);
                if (result_1 === errorObject) {
                  subject.error(errorObject.e);
                } else {
                  subject.next(result_1);
                  subject.complete();
                }
              } else {
                subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              }
            };
            handler.source = this;
            var result = tryCatch(callbackFunc).apply(this.context, args.concat(handler));
            if (result === errorObject) {
              subject.error(errorObject.e);
            }
          }
          return subject.subscribe(subscriber);
        } else {
          return scheduler.schedule(BoundCallbackObservable.dispatch, 0, {
            source: this,
            subscriber: subscriber,
            context: this.context
          });
        }
      };
      BoundCallbackObservable.dispatch = function(state) {
        var self = this;
        var source = state.source,
            subscriber = state.subscriber,
            context = state.context;
        var callbackFunc = source.callbackFunc,
            args = source.args,
            scheduler = source.scheduler;
        var subject = source.subject;
        if (!subject) {
          subject = source.subject = new AsyncSubject();
          var handler = function handlerFn() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i - 0] = arguments[_i];
            }
            var source = handlerFn.source;
            var selector = source.selector,
                subject = source.subject;
            if (selector) {
              var result_2 = tryCatch(selector).apply(this, innerArgs);
              if (result_2 === errorObject) {
                self.add(scheduler.schedule(dispatchError, 0, {
                  err: errorObject.e,
                  subject: subject
                }));
              } else {
                self.add(scheduler.schedule(dispatchNext, 0, {
                  value: result_2,
                  subject: subject
                }));
              }
            } else {
              var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
              self.add(scheduler.schedule(dispatchNext, 0, {
                value: value,
                subject: subject
              }));
            }
          };
          handler.source = source;
          var result = tryCatch(callbackFunc).apply(context, args.concat(handler));
          if (result === errorObject) {
            subject.error(errorObject.e);
          }
        }
        self.add(subject.subscribe(subscriber));
      };
      return BoundCallbackObservable;
    }(Observable));
    function dispatchNext(arg) {
      var value = arg.value,
          subject = arg.subject;
      subject.next(value);
      subject.complete();
    }
    function dispatchError(arg) {
      var err = arg.err,
          subject = arg.subject;
      subject.error(err);
    }
    var bindCallback = BoundCallbackObservable.create;
    Observable.bindCallback = bindCallback;
    var BoundNodeCallbackObservable = (function(_super) {
      __extends(BoundNodeCallbackObservable, _super);
      function BoundNodeCallbackObservable(callbackFunc, selector, args, context, scheduler) {
        _super.call(this);
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.context = context;
        this.scheduler = scheduler;
      }
      BoundNodeCallbackObservable.create = function(func, selector, scheduler) {
        if (selector === void 0) {
          selector = undefined;
        }
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          return new BoundNodeCallbackObservable(func, selector, args, this, scheduler);
        };
      };
      BoundNodeCallbackObservable.prototype._subscribe = function(subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
          if (!subject) {
            subject = this.subject = new AsyncSubject();
            var handler = function handlerFn() {
              var innerArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i - 0] = arguments[_i];
              }
              var source = handlerFn.source;
              var selector = source.selector,
                  subject = source.subject;
              var err = innerArgs.shift();
              if (err) {
                subject.error(err);
              } else if (selector) {
                var result_1 = tryCatch(selector).apply(this, innerArgs);
                if (result_1 === errorObject) {
                  subject.error(errorObject.e);
                } else {
                  subject.next(result_1);
                  subject.complete();
                }
              } else {
                subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              }
            };
            handler.source = this;
            var result = tryCatch(callbackFunc).apply(this.context, args.concat(handler));
            if (result === errorObject) {
              subject.error(errorObject.e);
            }
          }
          return subject.subscribe(subscriber);
        } else {
          return scheduler.schedule(dispatch, 0, {
            source: this,
            subscriber: subscriber,
            context: this.context
          });
        }
      };
      return BoundNodeCallbackObservable;
    }(Observable));
    function dispatch(state) {
      var self = this;
      var source = state.source,
          subscriber = state.subscriber,
          context = state.context;
      var _a = source,
          callbackFunc = _a.callbackFunc,
          args = _a.args,
          scheduler = _a.scheduler;
      var subject = source.subject;
      if (!subject) {
        subject = source.subject = new AsyncSubject();
        var handler = function handlerFn() {
          var innerArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            innerArgs[_i - 0] = arguments[_i];
          }
          var source = handlerFn.source;
          var selector = source.selector,
              subject = source.subject;
          var err = innerArgs.shift();
          if (err) {
            subject.error(err);
          } else if (selector) {
            var result_2 = tryCatch(selector).apply(this, innerArgs);
            if (result_2 === errorObject) {
              self.add(scheduler.schedule(dispatchError$1, 0, {
                err: errorObject.e,
                subject: subject
              }));
            } else {
              self.add(scheduler.schedule(dispatchNext$1, 0, {
                value: result_2,
                subject: subject
              }));
            }
          } else {
            var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
            self.add(scheduler.schedule(dispatchNext$1, 0, {
              value: value,
              subject: subject
            }));
          }
        };
        handler.source = source;
        var result = tryCatch(callbackFunc).apply(context, args.concat(handler));
        if (result === errorObject) {
          subject.error(errorObject.e);
        }
      }
      self.add(subject.subscribe(subscriber));
    }
    function dispatchNext$1(arg) {
      var value = arg.value,
          subject = arg.subject;
      subject.next(value);
      subject.complete();
    }
    function dispatchError$1(arg) {
      var err = arg.err,
          subject = arg.subject;
      subject.error(err);
    }
    var bindNodeCallback = BoundNodeCallbackObservable.create;
    Observable.bindNodeCallback = bindNodeCallback;
    function isScheduler(value) {
      return value && typeof value.schedule === 'function';
    }
    var ScalarObservable = (function(_super) {
      __extends(ScalarObservable, _super);
      function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
          this._isScalar = false;
        }
      }
      ScalarObservable.create = function(value, scheduler) {
        return new ScalarObservable(value, scheduler);
      };
      ScalarObservable.dispatch = function(state) {
        var done = state.done,
            value = state.value,
            subscriber = state.subscriber;
        if (done) {
          subscriber.complete();
          return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
        state.done = true;
        this.schedule(state);
      };
      ScalarObservable.prototype._subscribe = function(subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(ScalarObservable.dispatch, 0, {
            done: false,
            value: value,
            subscriber: subscriber
          });
        } else {
          subscriber.next(value);
          if (!subscriber.closed) {
            subscriber.complete();
          }
        }
      };
      return ScalarObservable;
    }(Observable));
    var EmptyObservable = (function(_super) {
      __extends(EmptyObservable, _super);
      function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
      }
      EmptyObservable.create = function(scheduler) {
        return new EmptyObservable(scheduler);
      };
      EmptyObservable.dispatch = function(arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
      };
      EmptyObservable.prototype._subscribe = function(subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(EmptyObservable.dispatch, 0, {subscriber: subscriber});
        } else {
          subscriber.complete();
        }
      };
      return EmptyObservable;
    }(Observable));
    var ArrayObservable = (function(_super) {
      __extends(ArrayObservable, _super);
      function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
          this._isScalar = true;
          this.value = array[0];
        }
      }
      ArrayObservable.create = function(array, scheduler) {
        return new ArrayObservable(array, scheduler);
      };
      ArrayObservable.of = function() {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler(scheduler)) {
          array.pop();
        } else {
          scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
          return new ArrayObservable(array, scheduler);
        } else if (len === 1) {
          return new ScalarObservable(array[0], scheduler);
        } else {
          return new EmptyObservable(scheduler);
        }
      };
      ArrayObservable.dispatch = function(state) {
        var array = state.array,
            index = state.index,
            count = state.count,
            subscriber = state.subscriber;
        if (index >= count) {
          subscriber.complete();
          return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
          return;
        }
        state.index = index + 1;
        this.schedule(state);
      };
      ArrayObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(ArrayObservable.dispatch, 0, {
            array: array,
            index: index,
            count: count,
            subscriber: subscriber
          });
        } else {
          for (var i = 0; i < count && !subscriber.closed; i++) {
            subscriber.next(array[i]);
          }
          subscriber.complete();
        }
      };
      return ArrayObservable;
    }(Observable));
    var OuterSubscriber = (function(_super) {
      __extends(OuterSubscriber, _super);
      function OuterSubscriber() {
        _super.apply(this, arguments);
      }
      OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
      };
      OuterSubscriber.prototype.notifyError = function(error, innerSub) {
        this.destination.error(error);
      };
      OuterSubscriber.prototype.notifyComplete = function(innerSub) {
        this.destination.complete();
      };
      return OuterSubscriber;
    }(Subscriber));
    function isPromise(value) {
      return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
    }
    function symbolIteratorPonyfill(root$$1) {
      var Symbol = root$$1.Symbol;
      if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
          Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
      } else {
        var Set_1 = root$$1.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
          return '@@iterator';
        }
        var Map_1 = root$$1.Map;
        if (Map_1) {
          var keys = Object.getOwnPropertyNames(Map_1.prototype);
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
              return key;
            }
          }
        }
        return '@@iterator';
      }
    }
    var $$iterator = symbolIteratorPonyfill(root);
    var InnerSubscriber = (function(_super) {
      __extends(InnerSubscriber, _super);
      function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
      }
      InnerSubscriber.prototype._next = function(value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
      };
      InnerSubscriber.prototype._error = function(error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
      };
      InnerSubscriber.prototype._complete = function() {
        this.parent.notifyComplete(this);
        this.unsubscribe();
      };
      return InnerSubscriber;
    }(Subscriber));
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
      var destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
      if (destination.closed) {
        return null;
      }
      if (result instanceof Observable) {
        if (result._isScalar) {
          destination.next(result.value);
          destination.complete();
          return null;
        } else {
          return result.subscribe(destination);
        }
      } else if (isArray(result)) {
        for (var i = 0,
            len = result.length; i < len && !destination.closed; i++) {
          destination.next(result[i]);
        }
        if (!destination.closed) {
          destination.complete();
        }
      } else if (isPromise(result)) {
        result.then(function(value) {
          if (!destination.closed) {
            destination.next(value);
            destination.complete();
          }
        }, function(err) {
          return destination.error(err);
        }).then(null, function(err) {
          root.setTimeout(function() {
            throw err;
          });
        });
        return destination;
      } else if (result && typeof result[$$iterator] === 'function') {
        var iterator = result[$$iterator]();
        do {
          var item = iterator.next();
          if (item.done) {
            destination.complete();
            break;
          }
          destination.next(item.value);
          if (destination.closed) {
            break;
          }
        } while (true);
      } else if (result && typeof result[$$observable] === 'function') {
        var obs = result[$$observable]();
        if (typeof obs.subscribe !== 'function') {
          destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        } else {
          return obs.subscribe(new InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
      } else {
        var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.") + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
      }
      return null;
    }
    var none = {};
    function combineLatest$1() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var project = null;
      if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
      }
      if (observables.length === 1 && isArray(observables[0])) {
        observables = observables[0].slice();
      }
      observables.unshift(this);
      return this.lift.call(new ArrayObservable(observables), new CombineLatestOperator(project));
    }
    var CombineLatestOperator = (function() {
      function CombineLatestOperator(project) {
        this.project = project;
      }
      CombineLatestOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
      };
      return CombineLatestOperator;
    }());
    var CombineLatestSubscriber = (function(_super) {
      __extends(CombineLatestSubscriber, _super);
      function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
      }
      CombineLatestSubscriber.prototype._next = function(observable) {
        this.values.push(none);
        this.observables.push(observable);
      };
      CombineLatestSubscriber.prototype._complete = function() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
          this.destination.complete();
        } else {
          this.active = len;
          this.toRespond = len;
          for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult(this, observable, observable, i));
          }
        }
      };
      CombineLatestSubscriber.prototype.notifyComplete = function(unused) {
        if ((this.active -= 1) === 0) {
          this.destination.complete();
        }
      };
      CombineLatestSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond ? 0 : oldVal === none ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
          if (this.project) {
            this._tryProject(values);
          } else {
            this.destination.next(values.slice());
          }
        }
      };
      CombineLatestSubscriber.prototype._tryProject = function(values) {
        var result;
        try {
          result = this.project.apply(this, values);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return CombineLatestSubscriber;
    }(OuterSubscriber));
    function combineLatest$$1() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var project = null;
      var scheduler = null;
      if (isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
      }
      if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
      }
      if (observables.length === 1 && isArray(observables[0])) {
        observables = observables[0];
      }
      return new ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
    }
    Observable.combineLatest = combineLatest$$1;
    function mergeAll(concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      return this.lift(new MergeAllOperator(concurrent));
    }
    var MergeAllOperator = (function() {
      function MergeAllOperator(concurrent) {
        this.concurrent = concurrent;
      }
      MergeAllOperator.prototype.call = function(observer, source) {
        return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
      };
      return MergeAllOperator;
    }());
    var MergeAllSubscriber = (function(_super) {
      __extends(MergeAllSubscriber, _super);
      function MergeAllSubscriber(destination, concurrent) {
        _super.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
      }
      MergeAllSubscriber.prototype._next = function(observable) {
        if (this.active < this.concurrent) {
          this.active++;
          this.add(subscribeToResult(this, observable));
        } else {
          this.buffer.push(observable);
        }
      };
      MergeAllSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }
      };
      MergeAllSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };
      return MergeAllSubscriber;
    }(OuterSubscriber));
    function concat$1() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      return this.lift.call(concatStatic.apply(void 0, [this].concat(observables)));
    }
    function concatStatic() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var scheduler = null;
      var args = observables;
      if (isScheduler(args[observables.length - 1])) {
        scheduler = args.pop();
      }
      if (scheduler === null && observables.length === 1) {
        return observables[0];
      }
      return new ArrayObservable(observables, scheduler).lift(new MergeAllOperator(1));
    }
    var concat$$1 = concatStatic;
    Observable.concat = concat$$1;
    var DeferObservable = (function(_super) {
      __extends(DeferObservable, _super);
      function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
      }
      DeferObservable.create = function(observableFactory) {
        return new DeferObservable(observableFactory);
      };
      DeferObservable.prototype._subscribe = function(subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
      };
      return DeferObservable;
    }(Observable));
    var DeferSubscriber = (function(_super) {
      __extends(DeferSubscriber, _super);
      function DeferSubscriber(destination, factory) {
        _super.call(this, destination);
        this.factory = factory;
        this.tryDefer();
      }
      DeferSubscriber.prototype.tryDefer = function() {
        try {
          this._callFactory();
        } catch (err) {
          this._error(err);
        }
      };
      DeferSubscriber.prototype._callFactory = function() {
        var result = this.factory();
        if (result) {
          this.add(subscribeToResult(this, result));
        }
      };
      return DeferSubscriber;
    }(OuterSubscriber));
    var defer = DeferObservable.create;
    Observable.defer = defer;
    var empty$1 = EmptyObservable.create;
    Observable.empty = empty$1;
    var ForkJoinObservable = (function(_super) {
      __extends(ForkJoinObservable, _super);
      function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
      }
      ForkJoinObservable.create = function() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
          return new EmptyObservable();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
          resultSelector = sources.pop();
        }
        if (sources.length === 1 && isArray(sources[0])) {
          sources = sources[0];
        }
        if (sources.length === 0) {
          return new EmptyObservable();
        }
        return new ForkJoinObservable(sources, resultSelector);
      };
      ForkJoinObservable.prototype._subscribe = function(subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
      };
      return ForkJoinObservable;
    }(Observable));
    var ForkJoinSubscriber = (function(_super) {
      __extends(ForkJoinSubscriber, _super);
      function ForkJoinSubscriber(destination, sources, resultSelector) {
        _super.call(this, destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        var len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
          var source = sources[i];
          var innerSubscription = subscribeToResult(this, source, null, i);
          if (innerSubscription) {
            innerSubscription.outerIndex = i;
            this.add(innerSubscription);
          }
        }
      }
      ForkJoinSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
          innerSub._hasValue = true;
          this.haveValues++;
        }
      };
      ForkJoinSubscriber.prototype.notifyComplete = function(innerSub) {
        var destination = this.destination;
        var _a = this,
            haveValues = _a.haveValues,
            resultSelector = _a.resultSelector,
            values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
          destination.complete();
          return;
        }
        this.completed++;
        if (this.completed !== len) {
          return;
        }
        if (haveValues === len) {
          var value = resultSelector ? resultSelector.apply(this, values) : values;
          destination.next(value);
        }
        destination.complete();
      };
      return ForkJoinSubscriber;
    }(OuterSubscriber));
    var forkJoin = ForkJoinObservable.create;
    Observable.forkJoin = forkJoin;
    var PromiseObservable = (function(_super) {
      __extends(PromiseObservable, _super);
      function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
      }
      PromiseObservable.create = function(promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
      };
      PromiseObservable.prototype._subscribe = function(subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
          if (this._isScalar) {
            if (!subscriber.closed) {
              subscriber.next(this.value);
              subscriber.complete();
            }
          } else {
            promise.then(function(value) {
              _this.value = value;
              _this._isScalar = true;
              if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
              }
            }, function(err) {
              if (!subscriber.closed) {
                subscriber.error(err);
              }
            }).then(null, function(err) {
              root.setTimeout(function() {
                throw err;
              });
            });
          }
        } else {
          if (this._isScalar) {
            if (!subscriber.closed) {
              return scheduler.schedule(dispatchNext$2, 0, {
                value: this.value,
                subscriber: subscriber
              });
            }
          } else {
            promise.then(function(value) {
              _this.value = value;
              _this._isScalar = true;
              if (!subscriber.closed) {
                subscriber.add(scheduler.schedule(dispatchNext$2, 0, {
                  value: value,
                  subscriber: subscriber
                }));
              }
            }, function(err) {
              if (!subscriber.closed) {
                subscriber.add(scheduler.schedule(dispatchError$2, 0, {
                  err: err,
                  subscriber: subscriber
                }));
              }
            }).then(null, function(err) {
              root.setTimeout(function() {
                throw err;
              });
            });
          }
        }
      };
      return PromiseObservable;
    }(Observable));
    function dispatchNext$2(arg) {
      var value = arg.value,
          subscriber = arg.subscriber;
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }
    function dispatchError$2(arg) {
      var err = arg.err,
          subscriber = arg.subscriber;
      if (!subscriber.closed) {
        subscriber.error(err);
      }
    }
    var IteratorObservable = (function(_super) {
      __extends(IteratorObservable, _super);
      function IteratorObservable(iterator, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator == null) {
          throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator);
      }
      IteratorObservable.create = function(iterator, scheduler) {
        return new IteratorObservable(iterator, scheduler);
      };
      IteratorObservable.dispatch = function(state) {
        var index = state.index,
            hasError = state.hasError,
            iterator = state.iterator,
            subscriber = state.subscriber;
        if (hasError) {
          subscriber.error(state.error);
          return;
        }
        var result = iterator.next();
        if (result.done) {
          subscriber.complete();
          return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
          if (typeof iterator.return === 'function') {
            iterator.return();
          }
          return;
        }
        this.schedule(state);
      };
      IteratorObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var _a = this,
            iterator = _a.iterator,
            scheduler = _a.scheduler;
        if (scheduler) {
          return scheduler.schedule(IteratorObservable.dispatch, 0, {
            index: index,
            iterator: iterator,
            subscriber: subscriber
          });
        } else {
          do {
            var result = iterator.next();
            if (result.done) {
              subscriber.complete();
              break;
            } else {
              subscriber.next(result.value);
            }
            if (subscriber.closed) {
              if (typeof iterator.return === 'function') {
                iterator.return();
              }
              break;
            }
          } while (true);
        }
      };
      return IteratorObservable;
    }(Observable));
    var StringIterator = (function() {
      function StringIterator(str, idx, len) {
        if (idx === void 0) {
          idx = 0;
        }
        if (len === void 0) {
          len = str.length;
        }
        this.str = str;
        this.idx = idx;
        this.len = len;
      }
      StringIterator.prototype[$$iterator] = function() {
        return (this);
      };
      StringIterator.prototype.next = function() {
        return this.idx < this.len ? {
          done: false,
          value: this.str.charAt(this.idx++)
        } : {
          done: true,
          value: undefined
        };
      };
      return StringIterator;
    }());
    var ArrayIterator = (function() {
      function ArrayIterator(arr, idx, len) {
        if (idx === void 0) {
          idx = 0;
        }
        if (len === void 0) {
          len = toLength(arr);
        }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
      }
      ArrayIterator.prototype[$$iterator] = function() {
        return this;
      };
      ArrayIterator.prototype.next = function() {
        return this.idx < this.len ? {
          done: false,
          value: this.arr[this.idx++]
        } : {
          done: true,
          value: undefined
        };
      };
      return ArrayIterator;
    }());
    function getIterator(obj) {
      var i = obj[$$iterator];
      if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
      }
      if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
      }
      if (!i) {
        throw new TypeError('object is not iterable');
      }
      return obj[$$iterator]();
    }
    var maxSafeInteger = Math.pow(2, 53) - 1;
    function toLength(o) {
      var len = +o.length;
      if (isNaN(len)) {
        return 0;
      }
      if (len === 0 || !numberIsFinite(len)) {
        return len;
      }
      len = sign(len) * Math.floor(Math.abs(len));
      if (len <= 0) {
        return 0;
      }
      if (len > maxSafeInteger) {
        return maxSafeInteger;
      }
      return len;
    }
    function numberIsFinite(value) {
      return typeof value === 'number' && root.isFinite(value);
    }
    function sign(value) {
      var valueAsNumber = +value;
      if (valueAsNumber === 0) {
        return valueAsNumber;
      }
      if (isNaN(valueAsNumber)) {
        return valueAsNumber;
      }
      return valueAsNumber < 0 ? -1 : 1;
    }
    var ArrayLikeObservable = (function(_super) {
      __extends(ArrayLikeObservable, _super);
      function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
          this._isScalar = true;
          this.value = arrayLike[0];
        }
      }
      ArrayLikeObservable.create = function(arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
          return new EmptyObservable();
        } else if (length === 1) {
          return new ScalarObservable(arrayLike[0], scheduler);
        } else {
          return new ArrayLikeObservable(arrayLike, scheduler);
        }
      };
      ArrayLikeObservable.dispatch = function(state) {
        var arrayLike = state.arrayLike,
            index = state.index,
            length = state.length,
            subscriber = state.subscriber;
        if (subscriber.closed) {
          return;
        }
        if (index >= length) {
          subscriber.complete();
          return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
      };
      ArrayLikeObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var _a = this,
            arrayLike = _a.arrayLike,
            scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
          return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
            arrayLike: arrayLike,
            index: index,
            length: length,
            subscriber: subscriber
          });
        } else {
          for (var i = 0; i < length && !subscriber.closed; i++) {
            subscriber.next(arrayLike[i]);
          }
          subscriber.complete();
        }
      };
      return ArrayLikeObservable;
    }(Observable));
    var Notification = (function() {
      function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
      }
      Notification.prototype.observe = function(observer) {
        switch (this.kind) {
          case 'N':
            return observer.next && observer.next(this.value);
          case 'E':
            return observer.error && observer.error(this.error);
          case 'C':
            return observer.complete && observer.complete();
        }
      };
      Notification.prototype.do = function(next, error, complete) {
        var kind = this.kind;
        switch (kind) {
          case 'N':
            return next && next(this.value);
          case 'E':
            return error && error(this.error);
          case 'C':
            return complete && complete();
        }
      };
      Notification.prototype.accept = function(nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
          return this.observe(nextOrObserver);
        } else {
          return this.do(nextOrObserver, error, complete);
        }
      };
      Notification.prototype.toObservable = function() {
        var kind = this.kind;
        switch (kind) {
          case 'N':
            return Observable.of(this.value);
          case 'E':
            return Observable.throw(this.error);
          case 'C':
            return Observable.empty();
        }
        throw new Error('unexpected notification kind value');
      };
      Notification.createNext = function(value) {
        if (typeof value !== 'undefined') {
          return new Notification('N', value);
        }
        return this.undefinedValueNotification;
      };
      Notification.createError = function(err) {
        return new Notification('E', undefined, err);
      };
      Notification.createComplete = function() {
        return this.completeNotification;
      };
      Notification.completeNotification = new Notification('C');
      Notification.undefinedValueNotification = new Notification('N', undefined);
      return Notification;
    }());
    function observeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this.lift(new ObserveOnOperator(scheduler, delay));
    }
    var ObserveOnOperator = (function() {
      function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
      }
      ObserveOnOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
      };
      return ObserveOnOperator;
    }());
    var ObserveOnSubscriber = (function(_super) {
      __extends(ObserveOnSubscriber, _super);
      function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
      }
      ObserveOnSubscriber.dispatch = function(arg) {
        var notification = arg.notification,
            destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
      };
      ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
      };
      ObserveOnSubscriber.prototype._next = function(value) {
        this.scheduleMessage(Notification.createNext(value));
      };
      ObserveOnSubscriber.prototype._error = function(err) {
        this.scheduleMessage(Notification.createError(err));
      };
      ObserveOnSubscriber.prototype._complete = function() {
        this.scheduleMessage(Notification.createComplete());
      };
      return ObserveOnSubscriber;
    }(Subscriber));
    var ObserveOnMessage = (function() {
      function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
      }
      return ObserveOnMessage;
    }());
    var isArrayLike = (function(x) {
      return x && typeof x.length === 'number';
    });
    var FromObservable = (function(_super) {
      __extends(FromObservable, _super);
      function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
      }
      FromObservable.create = function(ish, scheduler) {
        if (ish != null) {
          if (typeof ish[$$observable] === 'function') {
            if (ish instanceof Observable && !scheduler) {
              return ish;
            }
            return new FromObservable(ish, scheduler);
          } else if (isArray(ish)) {
            return new ArrayObservable(ish, scheduler);
          } else if (isPromise(ish)) {
            return new PromiseObservable(ish, scheduler);
          } else if (typeof ish[$$iterator] === 'function' || typeof ish === 'string') {
            return new IteratorObservable(ish, scheduler);
          } else if (isArrayLike(ish)) {
            return new ArrayLikeObservable(ish, scheduler);
          }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
      };
      FromObservable.prototype._subscribe = function(subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
          return ish[$$observable]().subscribe(subscriber);
        } else {
          return ish[$$observable]().subscribe(new ObserveOnSubscriber(subscriber, scheduler, 0));
        }
      };
      return FromObservable;
    }(Observable));
    var from = FromObservable.create;
    Observable.from = from;
    var toString = Object.prototype.toString;
    function isNodeStyleEventEmitter(sourceObj) {
      return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
    }
    function isJQueryStyleEventEmitter(sourceObj) {
      return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
    }
    function isNodeList(sourceObj) {
      return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
    }
    function isHTMLCollection(sourceObj) {
      return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
    }
    function isEventTarget(sourceObj) {
      return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
    }
    var FromEventObservable = (function(_super) {
      __extends(FromEventObservable, _super);
      function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
      }
      FromEventObservable.create = function(target, eventName, options, selector) {
        if (isFunction(options)) {
          selector = options;
          options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
      };
      FromEventObservable.setupSubscription = function(sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
          for (var i = 0,
              len = sourceObj.length; i < len; i++) {
            FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
          }
        } else if (isEventTarget(sourceObj)) {
          var source_1 = sourceObj;
          sourceObj.addEventListener(eventName, handler, options);
          unsubscribe = function() {
            return source_1.removeEventListener(eventName, handler);
          };
        } else if (isJQueryStyleEventEmitter(sourceObj)) {
          var source_2 = sourceObj;
          sourceObj.on(eventName, handler);
          unsubscribe = function() {
            return source_2.off(eventName, handler);
          };
        } else if (isNodeStyleEventEmitter(sourceObj)) {
          var source_3 = sourceObj;
          sourceObj.addListener(eventName, handler);
          unsubscribe = function() {
            return source_3.removeListener(eventName, handler);
          };
        } else {
          throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription(unsubscribe));
      };
      FromEventObservable.prototype._subscribe = function(subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          var result = tryCatch(selector).apply(void 0, args);
          if (result === errorObject) {
            subscriber.error(errorObject.e);
          } else {
            subscriber.next(result);
          }
        } : function(e) {
          return subscriber.next(e);
        };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
      };
      return FromEventObservable;
    }(Observable));
    var fromEvent = FromEventObservable.create;
    Observable.fromEvent = fromEvent;
    var FromEventPatternObservable = (function(_super) {
      __extends(FromEventPatternObservable, _super);
      function FromEventPatternObservable(addHandler, removeHandler, selector) {
        _super.call(this);
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.selector = selector;
      }
      FromEventPatternObservable.create = function(addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
      };
      FromEventPatternObservable.prototype._subscribe = function(subscriber) {
        var _this = this;
        var removeHandler = this.removeHandler;
        var handler = !!this.selector ? function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          _this._callSelector(subscriber, args);
        } : function(e) {
          subscriber.next(e);
        };
        var retValue = this._callAddHandler(handler, subscriber);
        if (!isFunction(removeHandler)) {
          return;
        }
        subscriber.add(new Subscription(function() {
          removeHandler(handler, retValue);
        }));
      };
      FromEventPatternObservable.prototype._callSelector = function(subscriber, args) {
        try {
          var result = this.selector.apply(this, args);
          subscriber.next(result);
        } catch (e) {
          subscriber.error(e);
        }
      };
      FromEventPatternObservable.prototype._callAddHandler = function(handler, errorSubscriber) {
        try {
          return this.addHandler(handler) || null;
        } catch (e) {
          errorSubscriber.error(e);
        }
      };
      return FromEventPatternObservable;
    }(Observable));
    var fromEventPattern = FromEventPatternObservable.create;
    Observable.fromEventPattern = fromEventPattern;
    var fromPromise = PromiseObservable.create;
    Observable.fromPromise = fromPromise;
    var selfSelector = function(value) {
      return value;
    };
    var GenerateObservable = (function(_super) {
      __extends(GenerateObservable, _super);
      function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
        _super.call(this);
        this.initialState = initialState;
        this.condition = condition;
        this.iterate = iterate;
        this.resultSelector = resultSelector;
        this.scheduler = scheduler;
      }
      GenerateObservable.create = function(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
        if (arguments.length == 1) {
          return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
        }
        if (resultSelectorOrObservable === undefined || isScheduler(resultSelectorOrObservable)) {
          return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
        }
        return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
      };
      GenerateObservable.prototype._subscribe = function(subscriber) {
        var state = this.initialState;
        if (this.scheduler) {
          return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
            subscriber: subscriber,
            iterate: this.iterate,
            condition: this.condition,
            resultSelector: this.resultSelector,
            state: state
          });
        }
        var _a = this,
            condition = _a.condition,
            resultSelector = _a.resultSelector,
            iterate = _a.iterate;
        do {
          if (condition) {
            var conditionResult = void 0;
            try {
              conditionResult = condition(state);
            } catch (err) {
              subscriber.error(err);
              return;
            }
            if (!conditionResult) {
              subscriber.complete();
              break;
            }
          }
          var value = void 0;
          try {
            value = resultSelector(state);
          } catch (err) {
            subscriber.error(err);
            return;
          }
          subscriber.next(value);
          if (subscriber.closed) {
            break;
          }
          try {
            state = iterate(state);
          } catch (err) {
            subscriber.error(err);
            return;
          }
        } while (true);
      };
      GenerateObservable.dispatch = function(state) {
        var subscriber = state.subscriber,
            condition = state.condition;
        if (subscriber.closed) {
          return;
        }
        if (state.needIterate) {
          try {
            state.state = state.iterate(state.state);
          } catch (err) {
            subscriber.error(err);
            return;
          }
        } else {
          state.needIterate = true;
        }
        if (condition) {
          var conditionResult = void 0;
          try {
            conditionResult = condition(state.state);
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (!conditionResult) {
            subscriber.complete();
            return;
          }
          if (subscriber.closed) {
            return;
          }
        }
        var value;
        try {
          value = state.resultSelector(state.state);
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (subscriber.closed) {
          return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
        return this.schedule(state);
      };
      return GenerateObservable;
    }(Observable));
    Observable.generate = GenerateObservable.create;
    var IfObservable = (function(_super) {
      __extends(IfObservable, _super);
      function IfObservable(condition, thenSource, elseSource) {
        _super.call(this);
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
      }
      IfObservable.create = function(condition, thenSource, elseSource) {
        return new IfObservable(condition, thenSource, elseSource);
      };
      IfObservable.prototype._subscribe = function(subscriber) {
        var _a = this,
            condition = _a.condition,
            thenSource = _a.thenSource,
            elseSource = _a.elseSource;
        return new IfSubscriber(subscriber, condition, thenSource, elseSource);
      };
      return IfObservable;
    }(Observable));
    var IfSubscriber = (function(_super) {
      __extends(IfSubscriber, _super);
      function IfSubscriber(destination, condition, thenSource, elseSource) {
        _super.call(this, destination);
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
        this.tryIf();
      }
      IfSubscriber.prototype.tryIf = function() {
        var _a = this,
            condition = _a.condition,
            thenSource = _a.thenSource,
            elseSource = _a.elseSource;
        var result;
        try {
          result = condition();
          var source = result ? thenSource : elseSource;
          if (source) {
            this.add(subscribeToResult(this, source));
          } else {
            this._complete();
          }
        } catch (err) {
          this._error(err);
        }
      };
      return IfSubscriber;
    }(OuterSubscriber));
    var _if = IfObservable.create;
    Observable.if = _if;
    function isNumeric(val) {
      return !isArray(val) && (val - parseFloat(val) + 1) >= 0;
    }
    var Action = (function(_super) {
      __extends(Action, _super);
      function Action(scheduler, work) {
        _super.call(this);
      }
      Action.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return this;
      };
      return Action;
    }(Subscription));
    var AsyncAction = (function(_super) {
      __extends(AsyncAction, _super);
      function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
      }
      AsyncAction.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (this.closed) {
          return this;
        }
        this.state = state;
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
      };
      AsyncAction.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return root.setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && this.delay === delay) {
          return id;
        }
        return root.clearInterval(id) && undefined || undefined;
      };
      AsyncAction.prototype.execute = function(state, delay) {
        if (this.closed) {
          return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
          return error;
        } else if (this.pending === false && this.id != null) {
          this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
      };
      AsyncAction.prototype._execute = function(state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
          this.work(state);
        } catch (e) {
          errored = true;
          errorValue = !!e && e || new Error(e);
        }
        if (errored) {
          this.unsubscribe();
          return errorValue;
        }
      };
      AsyncAction.prototype._unsubscribe = function() {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.delay = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
          actions.splice(index, 1);
        }
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
      };
      return AsyncAction;
    }(Action));
    var Scheduler$1 = (function() {
      function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
      }
      Scheduler.prototype.schedule = function(work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
      };
      Scheduler.now = Date.now ? Date.now : function() {
        return +new Date();
      };
      return Scheduler;
    }());
    var AsyncScheduler = (function(_super) {
      __extends(AsyncScheduler, _super);
      function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        this.active = false;
        this.scheduled = undefined;
      }
      AsyncScheduler.prototype.flush = function(action) {
        var actions = this.actions;
        if (this.active) {
          actions.push(action);
          return;
        }
        var error;
        this.active = true;
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsyncScheduler;
    }(Scheduler$1));
    var async = new AsyncScheduler(AsyncAction);
    var IntervalObservable = (function(_super) {
      __extends(IntervalObservable, _super);
      function IntervalObservable(period, scheduler) {
        if (period === void 0) {
          period = 0;
        }
        if (scheduler === void 0) {
          scheduler = async;
        }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric(period) || period < 0) {
          this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
          this.scheduler = async;
        }
      }
      IntervalObservable.create = function(period, scheduler) {
        if (period === void 0) {
          period = 0;
        }
        if (scheduler === void 0) {
          scheduler = async;
        }
        return new IntervalObservable(period, scheduler);
      };
      IntervalObservable.dispatch = function(state) {
        var index = state.index,
            subscriber = state.subscriber,
            period = state.period;
        subscriber.next(index);
        if (subscriber.closed) {
          return;
        }
        state.index += 1;
        this.schedule(state, period);
      };
      IntervalObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
          index: index,
          subscriber: subscriber,
          period: period
        }));
      };
      return IntervalObservable;
    }(Observable));
    var interval = IntervalObservable.create;
    Observable.interval = interval;
    function merge$1() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      return this.lift.call(mergeStatic.apply(void 0, [this].concat(observables)));
    }
    function mergeStatic() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var concurrent = Number.POSITIVE_INFINITY;
      var scheduler = null;
      var last = observables[observables.length - 1];
      if (isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
          concurrent = observables.pop();
        }
      } else if (typeof last === 'number') {
        concurrent = observables.pop();
      }
      if (scheduler === null && observables.length === 1) {
        return observables[0];
      }
      return new ArrayObservable(observables, scheduler).lift(new MergeAllOperator(concurrent));
    }
    var merge$$1 = mergeStatic;
    Observable.merge = merge$$1;
    function race() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      if (observables.length === 1 && isArray(observables[0])) {
        observables = observables[0];
      }
      return this.lift.call(raceStatic.apply(void 0, [this].concat(observables)));
    }
    function raceStatic() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      if (observables.length === 1) {
        if (isArray(observables[0])) {
          observables = observables[0];
        } else {
          return observables[0];
        }
      }
      return new ArrayObservable(observables).lift(new RaceOperator());
    }
    var RaceOperator = (function() {
      function RaceOperator() {}
      RaceOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new RaceSubscriber(subscriber));
      };
      return RaceOperator;
    }());
    var RaceSubscriber = (function(_super) {
      __extends(RaceSubscriber, _super);
      function RaceSubscriber(destination) {
        _super.call(this, destination);
        this.hasFirst = false;
        this.observables = [];
        this.subscriptions = [];
      }
      RaceSubscriber.prototype._next = function(observable) {
        this.observables.push(observable);
      };
      RaceSubscriber.prototype._complete = function() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
          this.destination.complete();
        } else {
          for (var i = 0; i < len && !this.hasFirst; i++) {
            var observable = observables[i];
            var subscription = subscribeToResult(this, observable, observable, i);
            if (this.subscriptions) {
              this.subscriptions.push(subscription);
            }
            this.add(subscription);
          }
          this.observables = null;
        }
      };
      RaceSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
          this.hasFirst = true;
          for (var i = 0; i < this.subscriptions.length; i++) {
            if (i !== outerIndex) {
              var subscription = this.subscriptions[i];
              subscription.unsubscribe();
              this.remove(subscription);
            }
          }
          this.subscriptions = null;
        }
        this.destination.next(innerValue);
      };
      return RaceSubscriber;
    }(OuterSubscriber));
    Observable.race = raceStatic;
    function noop() {}
    var NeverObservable = (function(_super) {
      __extends(NeverObservable, _super);
      function NeverObservable() {
        _super.call(this);
      }
      NeverObservable.create = function() {
        return new NeverObservable();
      };
      NeverObservable.prototype._subscribe = function(subscriber) {
        noop();
      };
      return NeverObservable;
    }(Observable));
    var never = NeverObservable.create;
    Observable.never = never;
    var of = ArrayObservable.of;
    Observable.of = of;
    function onErrorResumeNext() {
      var nextSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i - 0] = arguments[_i];
      }
      if (nextSources.length === 1 && isArray(nextSources[0])) {
        nextSources = nextSources[0];
      }
      return this.lift(new OnErrorResumeNextOperator(nextSources));
    }
    function onErrorResumeNextStatic() {
      var nextSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i - 0] = arguments[_i];
      }
      var source = null;
      if (nextSources.length === 1 && isArray(nextSources[0])) {
        nextSources = nextSources[0];
      }
      source = nextSources.shift();
      return new FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
    }
    var OnErrorResumeNextOperator = (function() {
      function OnErrorResumeNextOperator(nextSources) {
        this.nextSources = nextSources;
      }
      OnErrorResumeNextOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
      };
      return OnErrorResumeNextOperator;
    }());
    var OnErrorResumeNextSubscriber = (function(_super) {
      __extends(OnErrorResumeNextSubscriber, _super);
      function OnErrorResumeNextSubscriber(destination, nextSources) {
        _super.call(this, destination);
        this.destination = destination;
        this.nextSources = nextSources;
      }
      OnErrorResumeNextSubscriber.prototype.notifyError = function(error, innerSub) {
        this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype.notifyComplete = function(innerSub) {
        this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype._error = function(err) {
        this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype._complete = function() {
        this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function() {
        var next = this.nextSources.shift();
        if (next) {
          this.add(subscribeToResult(this, next));
        } else {
          this.destination.complete();
        }
      };
      return OnErrorResumeNextSubscriber;
    }(OuterSubscriber));
    Observable.onErrorResumeNext = onErrorResumeNextStatic;
    function dispatch$1(state) {
      var obj = state.obj,
          keys = state.keys,
          length = state.length,
          index = state.index,
          subscriber = state.subscriber;
      if (index === length) {
        subscriber.complete();
        return;
      }
      var key = keys[index];
      subscriber.next([key, obj[key]]);
      state.index = index + 1;
      this.schedule(state);
    }
    var PairsObservable = (function(_super) {
      __extends(PairsObservable, _super);
      function PairsObservable(obj, scheduler) {
        _super.call(this);
        this.obj = obj;
        this.scheduler = scheduler;
        this.keys = Object.keys(obj);
      }
      PairsObservable.create = function(obj, scheduler) {
        return new PairsObservable(obj, scheduler);
      };
      PairsObservable.prototype._subscribe = function(subscriber) {
        var _a = this,
            keys = _a.keys,
            scheduler = _a.scheduler;
        var length = keys.length;
        if (scheduler) {
          return scheduler.schedule(dispatch$1, 0, {
            obj: this.obj,
            keys: keys,
            length: length,
            index: 0,
            subscriber: subscriber
          });
        } else {
          for (var idx = 0; idx < length; idx++) {
            var key = keys[idx];
            subscriber.next([key, this.obj[key]]);
          }
          subscriber.complete();
        }
      };
      return PairsObservable;
    }(Observable));
    var pairs = PairsObservable.create;
    Observable.pairs = pairs;
    var RangeObservable = (function(_super) {
      __extends(RangeObservable, _super);
      function RangeObservable(start, count, scheduler) {
        _super.call(this);
        this.start = start;
        this._count = count;
        this.scheduler = scheduler;
      }
      RangeObservable.create = function(start, count, scheduler) {
        if (start === void 0) {
          start = 0;
        }
        if (count === void 0) {
          count = 0;
        }
        return new RangeObservable(start, count, scheduler);
      };
      RangeObservable.dispatch = function(state) {
        var start = state.start,
            index = state.index,
            count = state.count,
            subscriber = state.subscriber;
        if (index >= count) {
          subscriber.complete();
          return;
        }
        subscriber.next(start);
        if (subscriber.closed) {
          return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
      };
      RangeObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var start = this.start;
        var count = this._count;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(RangeObservable.dispatch, 0, {
            index: index,
            count: count,
            start: start,
            subscriber: subscriber
          });
        } else {
          do {
            if (index++ >= count) {
              subscriber.complete();
              break;
            }
            subscriber.next(start++);
            if (subscriber.closed) {
              break;
            }
          } while (true);
        }
      };
      return RangeObservable;
    }(Observable));
    var range = RangeObservable.create;
    Observable.range = range;
    var UsingObservable = (function(_super) {
      __extends(UsingObservable, _super);
      function UsingObservable(resourceFactory, observableFactory) {
        _super.call(this);
        this.resourceFactory = resourceFactory;
        this.observableFactory = observableFactory;
      }
      UsingObservable.create = function(resourceFactory, observableFactory) {
        return new UsingObservable(resourceFactory, observableFactory);
      };
      UsingObservable.prototype._subscribe = function(subscriber) {
        var _a = this,
            resourceFactory = _a.resourceFactory,
            observableFactory = _a.observableFactory;
        var resource;
        try {
          resource = resourceFactory();
          return new UsingSubscriber(subscriber, resource, observableFactory);
        } catch (err) {
          subscriber.error(err);
        }
      };
      return UsingObservable;
    }(Observable));
    var UsingSubscriber = (function(_super) {
      __extends(UsingSubscriber, _super);
      function UsingSubscriber(destination, resource, observableFactory) {
        _super.call(this, destination);
        this.resource = resource;
        this.observableFactory = observableFactory;
        destination.add(resource);
        this.tryUse();
      }
      UsingSubscriber.prototype.tryUse = function() {
        try {
          var source = this.observableFactory.call(this, this.resource);
          if (source) {
            this.add(subscribeToResult(this, source));
          }
        } catch (err) {
          this._error(err);
        }
      };
      return UsingSubscriber;
    }(OuterSubscriber));
    var using = UsingObservable.create;
    Observable.using = using;
    var ErrorObservable = (function(_super) {
      __extends(ErrorObservable, _super);
      function ErrorObservable(error, scheduler) {
        _super.call(this);
        this.error = error;
        this.scheduler = scheduler;
      }
      ErrorObservable.create = function(error, scheduler) {
        return new ErrorObservable(error, scheduler);
      };
      ErrorObservable.dispatch = function(arg) {
        var error = arg.error,
            subscriber = arg.subscriber;
        subscriber.error(error);
      };
      ErrorObservable.prototype._subscribe = function(subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        if (scheduler) {
          return scheduler.schedule(ErrorObservable.dispatch, 0, {
            error: error,
            subscriber: subscriber
          });
        } else {
          subscriber.error(error);
        }
      };
      return ErrorObservable;
    }(Observable));
    var _throw = ErrorObservable.create;
    Observable.throw = _throw;
    function isDate(value) {
      return value instanceof Date && !isNaN(+value);
    }
    var TimerObservable = (function(_super) {
      __extends(TimerObservable, _super);
      function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) {
          dueTime = 0;
        }
        _super.call(this);
        this.period = -1;
        this.dueTime = 0;
        if (isNumeric(period)) {
          this.period = Number(period) < 1 && 1 || Number(period);
        } else if (isScheduler(period)) {
          scheduler = period;
        }
        if (!isScheduler(scheduler)) {
          scheduler = async;
        }
        this.scheduler = scheduler;
        this.dueTime = isDate(dueTime) ? (+dueTime - this.scheduler.now()) : dueTime;
      }
      TimerObservable.create = function(initialDelay, period, scheduler) {
        if (initialDelay === void 0) {
          initialDelay = 0;
        }
        return new TimerObservable(initialDelay, period, scheduler);
      };
      TimerObservable.dispatch = function(state) {
        var index = state.index,
            period = state.period,
            subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (subscriber.closed) {
          return;
        } else if (period === -1) {
          return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
      };
      TimerObservable.prototype._subscribe = function(subscriber) {
        var index = 0;
        var _a = this,
            period = _a.period,
            dueTime = _a.dueTime,
            scheduler = _a.scheduler;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
          index: index,
          period: period,
          subscriber: subscriber
        });
      };
      return TimerObservable;
    }(Observable));
    var timer = TimerObservable.create;
    Observable.timer = timer;
    function zipProto() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      return this.lift.call(zipStatic.apply(void 0, [this].concat(observables)));
    }
    function zipStatic() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
      }
      var project = observables[observables.length - 1];
      if (typeof project === 'function') {
        observables.pop();
      }
      return new ArrayObservable(observables).lift(new ZipOperator(project));
    }
    var ZipOperator = (function() {
      function ZipOperator(project) {
        this.project = project;
      }
      ZipOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ZipSubscriber(subscriber, this.project));
      };
      return ZipOperator;
    }());
    var ZipSubscriber = (function(_super) {
      __extends(ZipSubscriber, _super);
      function ZipSubscriber(destination, project, values) {
        if (values === void 0) {
          values = Object.create(null);
        }
        _super.call(this, destination);
        this.iterators = [];
        this.active = 0;
        this.project = (typeof project === 'function') ? project : null;
        this.values = values;
      }
      ZipSubscriber.prototype._next = function(value) {
        var iterators = this.iterators;
        if (isArray(value)) {
          iterators.push(new StaticArrayIterator(value));
        } else if (typeof value[$$iterator] === 'function') {
          iterators.push(new StaticIterator(value[$$iterator]()));
        } else {
          iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
      };
      ZipSubscriber.prototype._complete = function() {
        var iterators = this.iterators;
        var len = iterators.length;
        this.active = len;
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          if (iterator.stillUnsubscribed) {
            this.add(iterator.subscribe(iterator, i));
          } else {
            this.active--;
          }
        }
      };
      ZipSubscriber.prototype.notifyInactive = function() {
        this.active--;
        if (this.active === 0) {
          this.destination.complete();
        }
      };
      ZipSubscriber.prototype.checkIterators = function() {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
            return;
          }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          var result = iterator.next();
          if (iterator.hasCompleted()) {
            shouldComplete = true;
          }
          if (result.done) {
            destination.complete();
            return;
          }
          args.push(result.value);
        }
        if (this.project) {
          this._tryProject(args);
        } else {
          destination.next(args);
        }
        if (shouldComplete) {
          destination.complete();
        }
      };
      ZipSubscriber.prototype._tryProject = function(args) {
        var result;
        try {
          result = this.project.apply(this, args);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return ZipSubscriber;
    }(Subscriber));
    var StaticIterator = (function() {
      function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
      }
      StaticIterator.prototype.hasValue = function() {
        return true;
      };
      StaticIterator.prototype.next = function() {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
      };
      StaticIterator.prototype.hasCompleted = function() {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
      };
      return StaticIterator;
    }());
    var StaticArrayIterator = (function() {
      function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
      }
      StaticArrayIterator.prototype[$$iterator] = function() {
        return this;
      };
      StaticArrayIterator.prototype.next = function(value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? {
          value: array[i],
          done: false
        } : {
          value: null,
          done: true
        };
      };
      StaticArrayIterator.prototype.hasValue = function() {
        return this.array.length > this.index;
      };
      StaticArrayIterator.prototype.hasCompleted = function() {
        return this.array.length === this.index;
      };
      return StaticArrayIterator;
    }());
    var ZipBufferIterator = (function(_super) {
      __extends(ZipBufferIterator, _super);
      function ZipBufferIterator(destination, parent, observable) {
        _super.call(this, destination);
        this.parent = parent;
        this.observable = observable;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
      }
      ZipBufferIterator.prototype[$$iterator] = function() {
        return this;
      };
      ZipBufferIterator.prototype.next = function() {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
          return {
            value: null,
            done: true
          };
        } else {
          return {
            value: buffer.shift(),
            done: false
          };
        }
      };
      ZipBufferIterator.prototype.hasValue = function() {
        return this.buffer.length > 0;
      };
      ZipBufferIterator.prototype.hasCompleted = function() {
        return this.buffer.length === 0 && this.isComplete;
      };
      ZipBufferIterator.prototype.notifyComplete = function() {
        if (this.buffer.length > 0) {
          this.isComplete = true;
          this.parent.notifyInactive();
        } else {
          this.destination.complete();
        }
      };
      ZipBufferIterator.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
      };
      ZipBufferIterator.prototype.subscribe = function(value, index) {
        return subscribeToResult(this, this.observable, this, index);
      };
      return ZipBufferIterator;
    }(OuterSubscriber));
    var zip = zipStatic;
    Observable.zip = zip;
    function map(project, thisArg) {
      if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
      }
      return this.lift(new MapOperator(project, thisArg));
    }
    var MapOperator = (function() {
      function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
      }
      MapOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
      };
      return MapOperator;
    }());
    var MapSubscriber = (function(_super) {
      __extends(MapSubscriber, _super);
      function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
      }
      MapSubscriber.prototype._next = function(value) {
        var result;
        try {
          result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return MapSubscriber;
    }(Subscriber));
    function getCORSRequest() {
      if (root.XMLHttpRequest) {
        var xhr = new root.XMLHttpRequest();
        if ('withCredentials' in xhr) {
          xhr.withCredentials = !!this.withCredentials;
        }
        return xhr;
      } else if (!!root.XDomainRequest) {
        return new root.XDomainRequest();
      } else {
        throw new Error('CORS is not supported by your browser');
      }
    }
    function getXMLHttpRequest() {
      if (root.XMLHttpRequest) {
        return new root.XMLHttpRequest();
      } else {
        var progId = void 0;
        try {
          var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
          for (var i = 0; i < 3; i++) {
            try {
              progId = progIds[i];
              if (new root.ActiveXObject(progId)) {
                break;
              }
            } catch (e) {}
          }
          return new root.ActiveXObject(progId);
        } catch (e) {
          throw new Error('XMLHttpRequest is not supported by your browser');
        }
      }
    }
    function ajaxGet(url, headers) {
      if (headers === void 0) {
        headers = null;
      }
      return new AjaxObservable({
        method: 'GET',
        url: url,
        headers: headers
      });
    }
    function ajaxPost(url, body, headers) {
      return new AjaxObservable({
        method: 'POST',
        url: url,
        body: body,
        headers: headers
      });
    }
    function ajaxDelete(url, headers) {
      return new AjaxObservable({
        method: 'DELETE',
        url: url,
        headers: headers
      });
    }
    function ajaxPut(url, body, headers) {
      return new AjaxObservable({
        method: 'PUT',
        url: url,
        body: body,
        headers: headers
      });
    }
    function ajaxGetJSON(url, headers) {
      return new AjaxObservable({
        method: 'GET',
        url: url,
        responseType: 'json',
        headers: headers
      }).lift(new MapOperator(function(x, index) {
        return x.response;
      }, null));
    }
    var AjaxObservable = (function(_super) {
      __extends(AjaxObservable, _super);
      function AjaxObservable(urlOrRequest) {
        _super.call(this);
        var request = {
          async: true,
          createXHR: function() {
            return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
          },
          crossDomain: false,
          withCredentials: false,
          headers: {},
          method: 'GET',
          responseType: 'json',
          timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
          request.url = urlOrRequest;
        } else {
          for (var prop in urlOrRequest) {
            if (urlOrRequest.hasOwnProperty(prop)) {
              request[prop] = urlOrRequest[prop];
            }
          }
        }
        this.request = request;
      }
      AjaxObservable.prototype._subscribe = function(subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
      };
      AjaxObservable.create = (function() {
        var create = function(urlOrRequest) {
          return new AjaxObservable(urlOrRequest);
        };
        create.get = ajaxGet;
        create.post = ajaxPost;
        create.delete = ajaxDelete;
        create.put = ajaxPut;
        create.getJSON = ajaxGetJSON;
        return create;
      })();
      return AjaxObservable;
    }(Observable));
    var AjaxSubscriber = (function(_super) {
      __extends(AjaxSubscriber, _super);
      function AjaxSubscriber(destination, request) {
        _super.call(this, destination);
        this.request = request;
        this.done = false;
        var headers = request.headers = request.headers || {};
        if (!request.crossDomain && !headers['X-Requested-With']) {
          headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        if (!('Content-Type' in headers) && !(root.FormData && request.body instanceof root.FormData) && typeof request.body !== 'undefined') {
          headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
        this.send();
      }
      AjaxSubscriber.prototype.next = function(e) {
        this.done = true;
        var _a = this,
            xhr = _a.xhr,
            request = _a.request,
            destination = _a.destination;
        var response = new AjaxResponse(e, xhr, request);
        destination.next(response);
      };
      AjaxSubscriber.prototype.send = function() {
        var _a = this,
            request = _a.request,
            _b = _a.request,
            user = _b.user,
            method = _b.method,
            url = _b.url,
            async = _b.async,
            password = _b.password,
            headers = _b.headers,
            body = _b.body;
        var createXHR = request.createXHR;
        var xhr = tryCatch(createXHR).call(request);
        if (xhr === errorObject) {
          this.error(errorObject.e);
        } else {
          this.xhr = xhr;
          this.setupEvents(xhr, request);
          var result = void 0;
          if (user) {
            result = tryCatch(xhr.open).call(xhr, method, url, async, user, password);
          } else {
            result = tryCatch(xhr.open).call(xhr, method, url, async);
          }
          if (result === errorObject) {
            this.error(errorObject.e);
            return null;
          }
          xhr.timeout = request.timeout;
          xhr.responseType = request.responseType;
          this.setHeaders(xhr, headers);
          result = body ? tryCatch(xhr.send).call(xhr, body) : tryCatch(xhr.send).call(xhr);
          if (result === errorObject) {
            this.error(errorObject.e);
            return null;
          }
        }
        return xhr;
      };
      AjaxSubscriber.prototype.serializeBody = function(body, contentType) {
        if (!body || typeof body === 'string') {
          return body;
        } else if (root.FormData && body instanceof root.FormData) {
          return body;
        }
        if (contentType) {
          var splitIndex = contentType.indexOf(';');
          if (splitIndex !== -1) {
            contentType = contentType.substring(0, splitIndex);
          }
        }
        switch (contentType) {
          case 'application/x-www-form-urlencoded':
            return Object.keys(body).map(function(key) {
              return (encodeURI(key) + "=" + encodeURI(body[key]));
            }).join('&');
          case 'application/json':
            return JSON.stringify(body);
          default:
            return body;
        }
      };
      AjaxSubscriber.prototype.setHeaders = function(xhr, headers) {
        for (var key in headers) {
          if (headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, headers[key]);
          }
        }
      };
      AjaxSubscriber.prototype.setupEvents = function(xhr, request) {
        var progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
          var _a = xhrTimeout,
              subscriber = _a.subscriber,
              progressSubscriber = _a.progressSubscriber,
              request = _a.request;
          if (progressSubscriber) {
            progressSubscriber.error(e);
          }
          subscriber.error(new AjaxTimeoutError(this, request));
        }
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr) {
          if (progressSubscriber) {
            var xhrProgress_1;
            xhrProgress_1 = function(e) {
              var progressSubscriber = xhrProgress_1.progressSubscriber;
              progressSubscriber.next(e);
            };
            if (root.XDomainRequest) {
              xhr.onprogress = xhrProgress_1;
            } else {
              xhr.upload.onprogress = xhrProgress_1;
            }
            xhrProgress_1.progressSubscriber = progressSubscriber;
          }
          var xhrError_1;
          xhrError_1 = function(e) {
            var _a = xhrError_1,
                progressSubscriber = _a.progressSubscriber,
                subscriber = _a.subscriber,
                request = _a.request;
            if (progressSubscriber) {
              progressSubscriber.error(e);
            }
            subscriber.error(new AjaxError('ajax error', this, request));
          };
          xhr.onerror = xhrError_1;
          xhrError_1.request = request;
          xhrError_1.subscriber = this;
          xhrError_1.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
          var _a = xhrReadyStateChange,
              subscriber = _a.subscriber,
              progressSubscriber = _a.progressSubscriber,
              request = _a.request;
          if (this.readyState === 4) {
            var status_1 = this.status === 1223 ? 204 : this.status;
            var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
            if (status_1 === 0) {
              status_1 = response ? 200 : 0;
            }
            if (200 <= status_1 && status_1 < 300) {
              if (progressSubscriber) {
                progressSubscriber.complete();
              }
              subscriber.next(e);
              subscriber.complete();
            } else {
              if (progressSubscriber) {
                progressSubscriber.error(e);
              }
              subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
            }
          }
        }
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
      };
      AjaxSubscriber.prototype.unsubscribe = function() {
        var _a = this,
            done = _a.done,
            xhr = _a.xhr;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
          xhr.abort();
        }
        _super.prototype.unsubscribe.call(this);
      };
      return AjaxSubscriber;
    }(Subscriber));
    var AjaxResponse = (function() {
      function AjaxResponse(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        switch (this.responseType) {
          case 'json':
            if ('response' in xhr) {
              this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
            } else {
              this.response = JSON.parse(xhr.responseText || 'null');
            }
            break;
          case 'xml':
            this.response = xhr.responseXML;
            break;
          case 'text':
          default:
            this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
            break;
        }
      }
      return AjaxResponse;
    }());
    var AjaxError = (function(_super) {
      __extends(AjaxError, _super);
      function AjaxError(message, xhr, request) {
        _super.call(this, message);
        this.message = message;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
      }
      return AjaxError;
    }(Error));
    var AjaxTimeoutError = (function(_super) {
      __extends(AjaxTimeoutError, _super);
      function AjaxTimeoutError(xhr, request) {
        _super.call(this, 'ajax timeout', xhr, request);
      }
      return AjaxTimeoutError;
    }(AjaxError));
    var ajax = AjaxObservable.create;
    Observable.ajax = ajax;
    var QueueAction = (function(_super) {
      __extends(QueueAction, _super);
      function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
      }
      QueueAction.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay > 0) {
          return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
      };
      QueueAction.prototype.execute = function(state, delay) {
        return (delay > 0 || this.closed) ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
      };
      QueueAction.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
      };
      return QueueAction;
    }(AsyncAction));
    var QueueScheduler = (function(_super) {
      __extends(QueueScheduler, _super);
      function QueueScheduler() {
        _super.apply(this, arguments);
      }
      return QueueScheduler;
    }(AsyncScheduler));
    var queue = new QueueScheduler(QueueAction);
    var ReplaySubject = (function(_super) {
      __extends(ReplaySubject, _super);
      function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
          bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
          windowTime = Number.POSITIVE_INFINITY;
        }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
      }
      ReplaySubject.prototype.next = function(value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
      };
      ReplaySubject.prototype._subscribe = function(subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else if (this.hasError) {
          subscription = Subscription.EMPTY;
        } else if (this.isStopped) {
          subscription = Subscription.EMPTY;
        } else {
          this.observers.push(subscriber);
          subscription = new SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
          subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
          subscriber.next(_events[i].value);
        }
        if (this.hasError) {
          subscriber.error(this.thrownError);
        } else if (this.isStopped) {
          subscriber.complete();
        }
        return subscription;
      };
      ReplaySubject.prototype._getNow = function() {
        return (this.scheduler || queue).now();
      };
      ReplaySubject.prototype._trimBufferThenGetEvents = function() {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
          if ((now - _events[spliceCount].time) < _windowTime) {
            break;
          }
          spliceCount++;
        }
        if (eventsCount > _bufferSize) {
          spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
          _events.splice(0, spliceCount);
        }
        return _events;
      };
      return ReplaySubject;
    }(Subject));
    var ReplayEvent = (function() {
      function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
      }
      return ReplayEvent;
    }());
    function assignImpl(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }
      var len = sources.length;
      for (var i = 0; i < len; i++) {
        var source = sources[i];
        for (var k in source) {
          if (source.hasOwnProperty(k)) {
            target[k] = source[k];
          }
        }
      }
      return target;
    }
    function getAssign(root$$1) {
      return root$$1.Object.assign || assignImpl;
    }
    var assign = getAssign(root);
    var WebSocketSubject = (function(_super) {
      __extends(WebSocketSubject, _super);
      function WebSocketSubject(urlConfigOrSource, destination) {
        if (urlConfigOrSource instanceof Observable) {
          _super.call(this, destination, urlConfigOrSource);
        } else {
          _super.call(this);
          this.WebSocketCtor = root.WebSocket;
          this._output = new Subject();
          if (typeof urlConfigOrSource === 'string') {
            this.url = urlConfigOrSource;
          } else {
            assign(this, urlConfigOrSource);
          }
          if (!this.WebSocketCtor) {
            throw new Error('no WebSocket constructor can be found');
          }
          this.destination = new ReplaySubject();
        }
      }
      WebSocketSubject.prototype.resultSelector = function(e) {
        return JSON.parse(e.data);
      };
      WebSocketSubject.create = function(urlConfigOrSource) {
        return new WebSocketSubject(urlConfigOrSource);
      };
      WebSocketSubject.prototype.lift = function(operator) {
        var sock = new WebSocketSubject(this, this.destination);
        sock.operator = operator;
        return sock;
      };
      WebSocketSubject.prototype._resetState = function() {
        this.socket = null;
        if (!this.source) {
          this.destination = new ReplaySubject();
        }
        this._output = new Subject();
      };
      WebSocketSubject.prototype.multiplex = function(subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new Observable(function(observer) {
          var result = tryCatch(subMsg)();
          if (result === errorObject) {
            observer.error(errorObject.e);
          } else {
            self.next(result);
          }
          var subscription = self.subscribe(function(x) {
            var result = tryCatch(messageFilter)(x);
            if (result === errorObject) {
              observer.error(errorObject.e);
            } else if (result) {
              observer.next(x);
            }
          }, function(err) {
            return observer.error(err);
          }, function() {
            return observer.complete();
          });
          return function() {
            var result = tryCatch(unsubMsg)();
            if (result === errorObject) {
              observer.error(errorObject.e);
            } else {
              self.next(result);
            }
            subscription.unsubscribe();
          };
        });
      };
      WebSocketSubject.prototype._connectSocket = function() {
        var _this = this;
        var WebSocketCtor = this.WebSocketCtor;
        var observer = this._output;
        var socket = null;
        try {
          socket = this.protocol ? new WebSocketCtor(this.url, this.protocol) : new WebSocketCtor(this.url);
          this.socket = socket;
        } catch (e) {
          observer.error(e);
          return;
        }
        var subscription = new Subscription(function() {
          _this.socket = null;
          if (socket && socket.readyState === 1) {
            socket.close();
          }
        });
        socket.onopen = function(e) {
          var openObserver = _this.openObserver;
          if (openObserver) {
            openObserver.next(e);
          }
          var queue = _this.destination;
          _this.destination = Subscriber.create(function(x) {
            return socket.readyState === 1 && socket.send(x);
          }, function(e) {
            var closingObserver = _this.closingObserver;
            if (closingObserver) {
              closingObserver.next(undefined);
            }
            if (e && e.code) {
              socket.close(e.code, e.reason);
            } else {
              observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' + 'and an optional reason: { code: number, reason: string }'));
            }
            _this._resetState();
          }, function() {
            var closingObserver = _this.closingObserver;
            if (closingObserver) {
              closingObserver.next(undefined);
            }
            socket.close();
            _this._resetState();
          });
          if (queue && queue instanceof ReplaySubject) {
            subscription.add(queue.subscribe(_this.destination));
          }
        };
        socket.onerror = function(e) {
          _this._resetState();
          observer.error(e);
        };
        socket.onclose = function(e) {
          _this._resetState();
          var closeObserver = _this.closeObserver;
          if (closeObserver) {
            closeObserver.next(e);
          }
          if (e.wasClean) {
            observer.complete();
          } else {
            observer.error(e);
          }
        };
        socket.onmessage = function(e) {
          var result = tryCatch(_this.resultSelector)(e);
          if (result === errorObject) {
            observer.error(errorObject.e);
          } else {
            observer.next(result);
          }
        };
      };
      WebSocketSubject.prototype._subscribe = function(subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
          return source.subscribe(subscriber);
        }
        if (!this.socket) {
          this._connectSocket();
        }
        var subscription = new Subscription();
        subscription.add(this._output.subscribe(subscriber));
        subscription.add(function() {
          var socket = _this.socket;
          if (_this._output.observers.length === 0) {
            if (socket && socket.readyState === 1) {
              socket.close();
            }
            _this._resetState();
          }
        });
        return subscription;
      };
      WebSocketSubject.prototype.unsubscribe = function() {
        var _a = this,
            source = _a.source,
            socket = _a.socket;
        if (socket && socket.readyState === 1) {
          socket.close();
          this._resetState();
        }
        _super.prototype.unsubscribe.call(this);
        if (!source) {
          this.destination = new ReplaySubject();
        }
      };
      return WebSocketSubject;
    }(AnonymousSubject));
    var webSocket = WebSocketSubject.create;
    Observable.webSocket = webSocket;
    function buffer(closingNotifier) {
      return this.lift(new BufferOperator(closingNotifier));
    }
    var BufferOperator = (function() {
      function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
      }
      BufferOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
      };
      return BufferOperator;
    }());
    var BufferSubscriber = (function(_super) {
      __extends(BufferSubscriber, _super);
      function BufferSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.buffer = [];
        this.add(subscribeToResult(this, closingNotifier));
      }
      BufferSubscriber.prototype._next = function(value) {
        this.buffer.push(value);
      };
      BufferSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
      };
      return BufferSubscriber;
    }(OuterSubscriber));
    Observable.prototype.buffer = buffer;
    function bufferCount(bufferSize, startBufferEvery) {
      if (startBufferEvery === void 0) {
        startBufferEvery = null;
      }
      return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    }
    var BufferCountOperator = (function() {
      function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
      }
      BufferCountOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
      };
      return BufferCountOperator;
    }());
    var BufferCountSubscriber = (function(_super) {
      __extends(BufferCountSubscriber, _super);
      function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _super.call(this, destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [];
        this.count = 0;
      }
      BufferCountSubscriber.prototype._next = function(value) {
        var count = this.count++;
        var _a = this,
            destination = _a.destination,
            bufferSize = _a.bufferSize,
            startBufferEvery = _a.startBufferEvery,
            buffers = _a.buffers;
        var startOn = (startBufferEvery == null) ? bufferSize : startBufferEvery;
        if (count % startOn === 0) {
          buffers.push([]);
        }
        for (var i = buffers.length; i--; ) {
          var buffer = buffers[i];
          buffer.push(value);
          if (buffer.length === bufferSize) {
            buffers.splice(i, 1);
            destination.next(buffer);
          }
        }
      };
      BufferCountSubscriber.prototype._complete = function() {
        var destination = this.destination;
        var buffers = this.buffers;
        while (buffers.length > 0) {
          var buffer = buffers.shift();
          if (buffer.length > 0) {
            destination.next(buffer);
          }
        }
        _super.prototype._complete.call(this);
      };
      return BufferCountSubscriber;
    }(Subscriber));
    Observable.prototype.bufferCount = bufferCount;
    function bufferTime(bufferTimeSpan) {
      var length = arguments.length;
      var scheduler = async;
      if (isScheduler(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
      }
      var bufferCreationInterval = null;
      if (length >= 2) {
        bufferCreationInterval = arguments[1];
      }
      var maxBufferSize = Number.POSITIVE_INFINITY;
      if (length >= 3) {
        maxBufferSize = arguments[2];
      }
      return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
    }
    var BufferTimeOperator = (function() {
      function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
      }
      BufferTimeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
      };
      return BufferTimeOperator;
    }());
    var Context = (function() {
      function Context() {
        this.buffer = [];
      }
      return Context;
    }());
    var BufferTimeSubscriber = (function(_super) {
      __extends(BufferTimeSubscriber, _super);
      function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        _super.call(this, destination);
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
        this.contexts = [];
        var context = this.openContext();
        this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
        if (this.timespanOnly) {
          var timeSpanOnlyState = {
            subscriber: this,
            context: context,
            bufferTimeSpan: bufferTimeSpan
          };
          this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        } else {
          var closeState = {
            subscriber: this,
            context: context
          };
          var creationState = {
            bufferTimeSpan: bufferTimeSpan,
            bufferCreationInterval: bufferCreationInterval,
            subscriber: this,
            scheduler: scheduler
          };
          this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
          this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
      }
      BufferTimeSubscriber.prototype._next = function(value) {
        var contexts = this.contexts;
        var len = contexts.length;
        var filledBufferContext;
        for (var i = 0; i < len; i++) {
          var context = contexts[i];
          var buffer = context.buffer;
          buffer.push(value);
          if (buffer.length == this.maxBufferSize) {
            filledBufferContext = context;
          }
        }
        if (filledBufferContext) {
          this.onBufferFull(filledBufferContext);
        }
      };
      BufferTimeSubscriber.prototype._error = function(err) {
        this.contexts.length = 0;
        _super.prototype._error.call(this, err);
      };
      BufferTimeSubscriber.prototype._complete = function() {
        var _a = this,
            contexts = _a.contexts,
            destination = _a.destination;
        while (contexts.length > 0) {
          var context = contexts.shift();
          destination.next(context.buffer);
        }
        _super.prototype._complete.call(this);
      };
      BufferTimeSubscriber.prototype._unsubscribe = function() {
        this.contexts = null;
      };
      BufferTimeSubscriber.prototype.onBufferFull = function(context) {
        this.closeContext(context);
        var closeAction = context.closeAction;
        closeAction.unsubscribe();
        this.remove(closeAction);
        if (!this.closed && this.timespanOnly) {
          context = this.openContext();
          var bufferTimeSpan = this.bufferTimeSpan;
          var timeSpanOnlyState = {
            subscriber: this,
            context: context,
            bufferTimeSpan: bufferTimeSpan
          };
          this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
      };
      BufferTimeSubscriber.prototype.openContext = function() {
        var context = new Context();
        this.contexts.push(context);
        return context;
      };
      BufferTimeSubscriber.prototype.closeContext = function(context) {
        this.destination.next(context.buffer);
        var contexts = this.contexts;
        var spliceIndex = contexts ? contexts.indexOf(context) : -1;
        if (spliceIndex >= 0) {
          contexts.splice(contexts.indexOf(context), 1);
        }
      };
      return BufferTimeSubscriber;
    }(Subscriber));
    function dispatchBufferTimeSpanOnly(state) {
      var subscriber = state.subscriber;
      var prevContext = state.context;
      if (prevContext) {
        subscriber.closeContext(prevContext);
      }
      if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
      }
    }
    function dispatchBufferCreation(state) {
      var bufferCreationInterval = state.bufferCreationInterval,
          bufferTimeSpan = state.bufferTimeSpan,
          subscriber = state.subscriber,
          scheduler = state.scheduler;
      var context = subscriber.openContext();
      var action = this;
      if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, {
          subscriber: subscriber,
          context: context
        }));
        action.schedule(state, bufferCreationInterval);
      }
    }
    function dispatchBufferClose(arg) {
      var subscriber = arg.subscriber,
          context = arg.context;
      subscriber.closeContext(context);
    }
    Observable.prototype.bufferTime = bufferTime;
    function bufferToggle(openings, closingSelector) {
      return this.lift(new BufferToggleOperator(openings, closingSelector));
    }
    var BufferToggleOperator = (function() {
      function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
      }
      BufferToggleOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
      };
      return BufferToggleOperator;
    }());
    var BufferToggleSubscriber = (function(_super) {
      __extends(BufferToggleSubscriber, _super);
      function BufferToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(subscribeToResult(this, openings));
      }
      BufferToggleSubscriber.prototype._next = function(value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
          contexts[i].buffer.push(value);
        }
      };
      BufferToggleSubscriber.prototype._error = function(err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
          var context = contexts.shift();
          context.subscription.unsubscribe();
          context.buffer = null;
          context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
      };
      BufferToggleSubscriber.prototype._complete = function() {
        var contexts = this.contexts;
        while (contexts.length > 0) {
          var context = contexts.shift();
          this.destination.next(context.buffer);
          context.subscription.unsubscribe();
          context.buffer = null;
          context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
      };
      BufferToggleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
      };
      BufferToggleSubscriber.prototype.notifyComplete = function(innerSub) {
        this.closeBuffer(innerSub.context);
      };
      BufferToggleSubscriber.prototype.openBuffer = function(value) {
        try {
          var closingSelector = this.closingSelector;
          var closingNotifier = closingSelector.call(this, value);
          if (closingNotifier) {
            this.trySubscribe(closingNotifier);
          }
        } catch (err) {
          this._error(err);
        }
      };
      BufferToggleSubscriber.prototype.closeBuffer = function(context) {
        var contexts = this.contexts;
        if (contexts && context) {
          var buffer = context.buffer,
              subscription = context.subscription;
          this.destination.next(buffer);
          contexts.splice(contexts.indexOf(context), 1);
          this.remove(subscription);
          subscription.unsubscribe();
        }
      };
      BufferToggleSubscriber.prototype.trySubscribe = function(closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription();
        var context = {
          buffer: buffer,
          subscription: subscription
        };
        contexts.push(context);
        var innerSubscription = subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
          this.closeBuffer(context);
        } else {
          innerSubscription.context = context;
          this.add(innerSubscription);
          subscription.add(innerSubscription);
        }
      };
      return BufferToggleSubscriber;
    }(OuterSubscriber));
    Observable.prototype.bufferToggle = bufferToggle;
    function bufferWhen(closingSelector) {
      return this.lift(new BufferWhenOperator(closingSelector));
    }
    var BufferWhenOperator = (function() {
      function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
      }
      BufferWhenOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
      };
      return BufferWhenOperator;
    }());
    var BufferWhenSubscriber = (function(_super) {
      __extends(BufferWhenSubscriber, _super);
      function BufferWhenSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.closingSelector = closingSelector;
        this.subscribing = false;
        this.openBuffer();
      }
      BufferWhenSubscriber.prototype._next = function(value) {
        this.buffer.push(value);
      };
      BufferWhenSubscriber.prototype._complete = function() {
        var buffer = this.buffer;
        if (buffer) {
          this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
      };
      BufferWhenSubscriber.prototype._unsubscribe = function() {
        this.buffer = null;
        this.subscribing = false;
      };
      BufferWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
      };
      BufferWhenSubscriber.prototype.notifyComplete = function() {
        if (this.subscribing) {
          this.complete();
        } else {
          this.openBuffer();
        }
      };
      BufferWhenSubscriber.prototype.openBuffer = function() {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
          this.remove(closingSubscription);
          closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
          this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject) {
          this.error(errorObject.e);
        } else {
          closingSubscription = new Subscription();
          this.closingSubscription = closingSubscription;
          this.add(closingSubscription);
          this.subscribing = true;
          closingSubscription.add(subscribeToResult(this, closingNotifier));
          this.subscribing = false;
        }
      };
      return BufferWhenSubscriber;
    }(OuterSubscriber));
    Observable.prototype.bufferWhen = bufferWhen;
    function _catch(selector) {
      var operator = new CatchOperator(selector);
      var caught = this.lift(operator);
      return (operator.caught = caught);
    }
    var CatchOperator = (function() {
      function CatchOperator(selector) {
        this.selector = selector;
      }
      CatchOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
      };
      return CatchOperator;
    }());
    var CatchSubscriber = (function(_super) {
      __extends(CatchSubscriber, _super);
      function CatchSubscriber(destination, selector, caught) {
        _super.call(this, destination);
        this.selector = selector;
        this.caught = caught;
      }
      CatchSubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          var result = void 0;
          try {
            result = this.selector(err, this.caught);
          } catch (err2) {
            _super.prototype.error.call(this, err2);
            return;
          }
          this._unsubscribeAndRecycle();
          this.add(subscribeToResult(this, result));
        }
      };
      return CatchSubscriber;
    }(OuterSubscriber));
    Observable.prototype.catch = _catch;
    Observable.prototype._catch = _catch;
    function combineAll(project) {
      return this.lift(new CombineLatestOperator(project));
    }
    Observable.prototype.combineAll = combineAll;
    Observable.prototype.combineLatest = combineLatest$1;
    Observable.prototype.concat = concat$1;
    function concatAll() {
      return this.lift(new MergeAllOperator(1));
    }
    Observable.prototype.concatAll = concatAll;
    function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
      }
      return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
    }
    var MergeMapOperator = (function() {
      function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
      }
      MergeMapOperator.prototype.call = function(observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
      };
      return MergeMapOperator;
    }());
    var MergeMapSubscriber = (function(_super) {
      __extends(MergeMapSubscriber, _super);
      function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
      }
      MergeMapSubscriber.prototype._next = function(value) {
        if (this.active < this.concurrent) {
          this._tryNext(value);
        } else {
          this.buffer.push(value);
        }
      };
      MergeMapSubscriber.prototype._tryNext = function(value) {
        var result;
        var index = this.index++;
        try {
          result = this.project(value, index);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.active++;
        this._innerSub(result, value, index);
      };
      MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
        this.add(subscribeToResult(this, ish, value, index));
      };
      MergeMapSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }
      };
      MergeMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
          this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        } else {
          this.destination.next(innerValue);
        }
      };
      MergeMapSubscriber.prototype._notifyResultSelector = function(outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
          result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };
      return MergeMapSubscriber;
    }(OuterSubscriber));
    function concatMap(project, resultSelector) {
      return this.lift(new MergeMapOperator(project, resultSelector, 1));
    }
    Observable.prototype.concatMap = concatMap;
    function mergeMapTo(innerObservable, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
      }
      return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
    }
    var MergeMapToOperator = (function() {
      function MergeMapToOperator(ish, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
      }
      MergeMapToOperator.prototype.call = function(observer, source) {
        return source.subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
      };
      return MergeMapToOperator;
    }());
    var MergeMapToSubscriber = (function(_super) {
      __extends(MergeMapToSubscriber, _super);
      function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        _super.call(this, destination);
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
      }
      MergeMapToSubscriber.prototype._next = function(value) {
        if (this.active < this.concurrent) {
          var resultSelector = this.resultSelector;
          var index = this.index++;
          var ish = this.ish;
          var destination = this.destination;
          this.active++;
          this._innerSub(ish, destination, resultSelector, value, index);
        } else {
          this.buffer.push(value);
        }
      };
      MergeMapToSubscriber.prototype._innerSub = function(ish, destination, resultSelector, value, index) {
        this.add(subscribeToResult(this, ish, value, index));
      };
      MergeMapToSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }
      };
      MergeMapToSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        if (resultSelector) {
          this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        } else {
          destination.next(innerValue);
        }
      };
      MergeMapToSubscriber.prototype.trySelectResult = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        var result;
        try {
          result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        } catch (err) {
          destination.error(err);
          return;
        }
        destination.next(result);
      };
      MergeMapToSubscriber.prototype.notifyError = function(err) {
        this.destination.error(err);
      };
      MergeMapToSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };
      return MergeMapToSubscriber;
    }(OuterSubscriber));
    function concatMapTo(innerObservable, resultSelector) {
      return this.lift(new MergeMapToOperator(innerObservable, resultSelector, 1));
    }
    Observable.prototype.concatMapTo = concatMapTo;
    function count(predicate) {
      return this.lift(new CountOperator(predicate, this));
    }
    var CountOperator = (function() {
      function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
      }
      CountOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
      };
      return CountOperator;
    }());
    var CountSubscriber = (function(_super) {
      __extends(CountSubscriber, _super);
      function CountSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.count = 0;
        this.index = 0;
      }
      CountSubscriber.prototype._next = function(value) {
        if (this.predicate) {
          this._tryPredicate(value);
        } else {
          this.count++;
        }
      };
      CountSubscriber.prototype._tryPredicate = function(value) {
        var result;
        try {
          result = this.predicate(value, this.index++, this.source);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        if (result) {
          this.count++;
        }
      };
      CountSubscriber.prototype._complete = function() {
        this.destination.next(this.count);
        this.destination.complete();
      };
      return CountSubscriber;
    }(Subscriber));
    Observable.prototype.count = count;
    function dematerialize() {
      return this.lift(new DeMaterializeOperator());
    }
    var DeMaterializeOperator = (function() {
      function DeMaterializeOperator() {}
      DeMaterializeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DeMaterializeSubscriber(subscriber));
      };
      return DeMaterializeOperator;
    }());
    var DeMaterializeSubscriber = (function(_super) {
      __extends(DeMaterializeSubscriber, _super);
      function DeMaterializeSubscriber(destination) {
        _super.call(this, destination);
      }
      DeMaterializeSubscriber.prototype._next = function(value) {
        value.observe(this.destination);
      };
      return DeMaterializeSubscriber;
    }(Subscriber));
    Observable.prototype.dematerialize = dematerialize;
    function debounce(durationSelector) {
      return this.lift(new DebounceOperator(durationSelector));
    }
    var DebounceOperator = (function() {
      function DebounceOperator(durationSelector) {
        this.durationSelector = durationSelector;
      }
      DebounceOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
      };
      return DebounceOperator;
    }());
    var DebounceSubscriber = (function(_super) {
      __extends(DebounceSubscriber, _super);
      function DebounceSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
        this.durationSubscription = null;
      }
      DebounceSubscriber.prototype._next = function(value) {
        try {
          var result = this.durationSelector.call(this, value);
          if (result) {
            this._tryNext(value, result);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };
      DebounceSubscriber.prototype._complete = function() {
        this.emitValue();
        this.destination.complete();
      };
      DebounceSubscriber.prototype._tryNext = function(value, duration) {
        var subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
          subscription.unsubscribe();
          this.remove(subscription);
        }
        subscription = subscribeToResult(this, duration);
        if (!subscription.closed) {
          this.add(this.durationSubscription = subscription);
        }
      };
      DebounceSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
      };
      DebounceSubscriber.prototype.notifyComplete = function() {
        this.emitValue();
      };
      DebounceSubscriber.prototype.emitValue = function() {
        if (this.hasValue) {
          var value = this.value;
          var subscription = this.durationSubscription;
          if (subscription) {
            this.durationSubscription = null;
            subscription.unsubscribe();
            this.remove(subscription);
          }
          this.value = null;
          this.hasValue = false;
          _super.prototype._next.call(this, value);
        }
      };
      return DebounceSubscriber;
    }(OuterSubscriber));
    Observable.prototype.debounce = debounce;
    function debounceTime(dueTime, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      return this.lift(new DebounceTimeOperator(dueTime, scheduler));
    }
    var DebounceTimeOperator = (function() {
      function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
      }
      DebounceTimeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
      };
      return DebounceTimeOperator;
    }());
    var DebounceTimeSubscriber = (function(_super) {
      __extends(DebounceTimeSubscriber, _super);
      function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
      }
      DebounceTimeSubscriber.prototype._next = function(value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext$3, this.dueTime, this));
      };
      DebounceTimeSubscriber.prototype._complete = function() {
        this.debouncedNext();
        this.destination.complete();
      };
      DebounceTimeSubscriber.prototype.debouncedNext = function() {
        this.clearDebounce();
        if (this.hasValue) {
          this.destination.next(this.lastValue);
          this.lastValue = null;
          this.hasValue = false;
        }
      };
      DebounceTimeSubscriber.prototype.clearDebounce = function() {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
          this.remove(debouncedSubscription);
          debouncedSubscription.unsubscribe();
          this.debouncedSubscription = null;
        }
      };
      return DebounceTimeSubscriber;
    }(Subscriber));
    function dispatchNext$3(subscriber) {
      subscriber.debouncedNext();
    }
    Observable.prototype.debounceTime = debounceTime;
    function defaultIfEmpty(defaultValue) {
      if (defaultValue === void 0) {
        defaultValue = null;
      }
      return this.lift(new DefaultIfEmptyOperator(defaultValue));
    }
    var DefaultIfEmptyOperator = (function() {
      function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
      }
      DefaultIfEmptyOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
      };
      return DefaultIfEmptyOperator;
    }());
    var DefaultIfEmptySubscriber = (function(_super) {
      __extends(DefaultIfEmptySubscriber, _super);
      function DefaultIfEmptySubscriber(destination, defaultValue) {
        _super.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
      }
      DefaultIfEmptySubscriber.prototype._next = function(value) {
        this.isEmpty = false;
        this.destination.next(value);
      };
      DefaultIfEmptySubscriber.prototype._complete = function() {
        if (this.isEmpty) {
          this.destination.next(this.defaultValue);
        }
        this.destination.complete();
      };
      return DefaultIfEmptySubscriber;
    }(Subscriber));
    Observable.prototype.defaultIfEmpty = defaultIfEmpty;
    function delay(delay, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      var absoluteDelay = isDate(delay);
      var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
      return this.lift(new DelayOperator(delayFor, scheduler));
    }
    var DelayOperator = (function() {
      function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
      }
      DelayOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
      };
      return DelayOperator;
    }());
    var DelaySubscriber = (function(_super) {
      __extends(DelaySubscriber, _super);
      function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
      }
      DelaySubscriber.dispatch = function(state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
          queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
          var delay_1 = Math.max(0, queue[0].time - scheduler.now());
          this.schedule(state, delay_1);
        } else {
          source.active = false;
        }
      };
      DelaySubscriber.prototype._schedule = function(scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
          source: this,
          destination: this.destination,
          scheduler: scheduler
        }));
      };
      DelaySubscriber.prototype.scheduleNotification = function(notification) {
        if (this.errored === true) {
          return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
          this._schedule(scheduler);
        }
      };
      DelaySubscriber.prototype._next = function(value) {
        this.scheduleNotification(Notification.createNext(value));
      };
      DelaySubscriber.prototype._error = function(err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
      };
      DelaySubscriber.prototype._complete = function() {
        this.scheduleNotification(Notification.createComplete());
      };
      return DelaySubscriber;
    }(Subscriber));
    var DelayMessage = (function() {
      function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
      }
      return DelayMessage;
    }());
    Observable.prototype.delay = delay;
    function delayWhen(delayDurationSelector, subscriptionDelay) {
      if (subscriptionDelay) {
        return new SubscriptionDelayObservable(this, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
      }
      return this.lift(new DelayWhenOperator(delayDurationSelector));
    }
    var DelayWhenOperator = (function() {
      function DelayWhenOperator(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
      }
      DelayWhenOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
      };
      return DelayWhenOperator;
    }());
    var DelayWhenSubscriber = (function(_super) {
      __extends(DelayWhenSubscriber, _super);
      function DelayWhenSubscriber(destination, delayDurationSelector) {
        _super.call(this, destination);
        this.delayDurationSelector = delayDurationSelector;
        this.completed = false;
        this.delayNotifierSubscriptions = [];
        this.values = [];
      }
      DelayWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
      };
      DelayWhenSubscriber.prototype.notifyError = function(error, innerSub) {
        this._error(error);
      };
      DelayWhenSubscriber.prototype.notifyComplete = function(innerSub) {
        var value = this.removeSubscription(innerSub);
        if (value) {
          this.destination.next(value);
        }
        this.tryComplete();
      };
      DelayWhenSubscriber.prototype._next = function(value) {
        try {
          var delayNotifier = this.delayDurationSelector(value);
          if (delayNotifier) {
            this.tryDelay(delayNotifier, value);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };
      DelayWhenSubscriber.prototype._complete = function() {
        this.completed = true;
        this.tryComplete();
      };
      DelayWhenSubscriber.prototype.removeSubscription = function(subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        var value = null;
        if (subscriptionIdx !== -1) {
          value = this.values[subscriptionIdx];
          this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
          this.values.splice(subscriptionIdx, 1);
        }
        return value;
      };
      DelayWhenSubscriber.prototype.tryDelay = function(delayNotifier, value) {
        var notifierSubscription = subscribeToResult(this, delayNotifier, value);
        this.add(notifierSubscription);
        this.delayNotifierSubscriptions.push(notifierSubscription);
        this.values.push(value);
      };
      DelayWhenSubscriber.prototype.tryComplete = function() {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
          this.destination.complete();
        }
      };
      return DelayWhenSubscriber;
    }(OuterSubscriber));
    var SubscriptionDelayObservable = (function(_super) {
      __extends(SubscriptionDelayObservable, _super);
      function SubscriptionDelayObservable(source, subscriptionDelay) {
        _super.call(this);
        this.source = source;
        this.subscriptionDelay = subscriptionDelay;
      }
      SubscriptionDelayObservable.prototype._subscribe = function(subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
      };
      return SubscriptionDelayObservable;
    }(Observable));
    var SubscriptionDelaySubscriber = (function(_super) {
      __extends(SubscriptionDelaySubscriber, _super);
      function SubscriptionDelaySubscriber(parent, source) {
        _super.call(this);
        this.parent = parent;
        this.source = source;
        this.sourceSubscribed = false;
      }
      SubscriptionDelaySubscriber.prototype._next = function(unused) {
        this.subscribeToSource();
      };
      SubscriptionDelaySubscriber.prototype._error = function(err) {
        this.unsubscribe();
        this.parent.error(err);
      };
      SubscriptionDelaySubscriber.prototype._complete = function() {
        this.subscribeToSource();
      };
      SubscriptionDelaySubscriber.prototype.subscribeToSource = function() {
        if (!this.sourceSubscribed) {
          this.sourceSubscribed = true;
          this.unsubscribe();
          this.source.subscribe(this.parent);
        }
      };
      return SubscriptionDelaySubscriber;
    }(Subscriber));
    Observable.prototype.delayWhen = delayWhen;
    function minimalSetImpl() {
      return (function() {
        function MinimalSet() {
          this._values = [];
        }
        MinimalSet.prototype.add = function(value) {
          if (!this.has(value)) {
            this._values.push(value);
          }
        };
        MinimalSet.prototype.has = function(value) {
          return this._values.indexOf(value) !== -1;
        };
        Object.defineProperty(MinimalSet.prototype, "size", {
          get: function() {
            return this._values.length;
          },
          enumerable: true,
          configurable: true
        });
        MinimalSet.prototype.clear = function() {
          this._values.length = 0;
        };
        return MinimalSet;
      }());
    }
    var Set = root.Set || minimalSetImpl();
    function distinct(keySelector, flushes) {
      return this.lift(new DistinctOperator(keySelector, flushes));
    }
    var DistinctOperator = (function() {
      function DistinctOperator(keySelector, flushes) {
        this.keySelector = keySelector;
        this.flushes = flushes;
      }
      DistinctOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
      };
      return DistinctOperator;
    }());
    var DistinctSubscriber = (function(_super) {
      __extends(DistinctSubscriber, _super);
      function DistinctSubscriber(destination, keySelector, flushes) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.values = new Set();
        if (flushes) {
          this.add(subscribeToResult(this, flushes));
        }
      }
      DistinctSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
      };
      DistinctSubscriber.prototype.notifyError = function(error, innerSub) {
        this._error(error);
      };
      DistinctSubscriber.prototype._next = function(value) {
        if (this.keySelector) {
          this._useKeySelector(value);
        } else {
          this._finalizeNext(value, value);
        }
      };
      DistinctSubscriber.prototype._useKeySelector = function(value) {
        var key;
        var destination = this.destination;
        try {
          key = this.keySelector(value);
        } catch (err) {
          destination.error(err);
          return;
        }
        this._finalizeNext(key, value);
      };
      DistinctSubscriber.prototype._finalizeNext = function(key, value) {
        var values = this.values;
        if (!values.has(key)) {
          values.add(key);
          this.destination.next(value);
        }
      };
      return DistinctSubscriber;
    }(OuterSubscriber));
    Observable.prototype.distinct = distinct;
    function distinctUntilChanged(compare, keySelector) {
      return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
    }
    var DistinctUntilChangedOperator = (function() {
      function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
      }
      DistinctUntilChangedOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
      };
      return DistinctUntilChangedOperator;
    }());
    var DistinctUntilChangedSubscriber = (function(_super) {
      __extends(DistinctUntilChangedSubscriber, _super);
      function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
          this.compare = compare;
        }
      }
      DistinctUntilChangedSubscriber.prototype.compare = function(x, y) {
        return x === y;
      };
      DistinctUntilChangedSubscriber.prototype._next = function(value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
          key = tryCatch(this.keySelector)(value);
          if (key === errorObject) {
            return this.destination.error(errorObject.e);
          }
        }
        var result = false;
        if (this.hasKey) {
          result = tryCatch(this.compare)(this.key, key);
          if (result === errorObject) {
            return this.destination.error(errorObject.e);
          }
        } else {
          this.hasKey = true;
        }
        if (Boolean(result) === false) {
          this.key = key;
          this.destination.next(value);
        }
      };
      return DistinctUntilChangedSubscriber;
    }(Subscriber));
    Observable.prototype.distinctUntilChanged = distinctUntilChanged;
    function distinctUntilKeyChanged(key, compare) {
      return distinctUntilChanged.call(this, function(x, y) {
        if (compare) {
          return compare(x[key], y[key]);
        }
        return x[key] === y[key];
      });
    }
    Observable.prototype.distinctUntilKeyChanged = distinctUntilKeyChanged;
    function _do(nextOrObserver, error, complete) {
      return this.lift(new DoOperator(nextOrObserver, error, complete));
    }
    var DoOperator = (function() {
      function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
      }
      DoOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
      };
      return DoOperator;
    }());
    var DoSubscriber = (function(_super) {
      __extends(DoSubscriber, _super);
      function DoSubscriber(destination, nextOrObserver, error, complete) {
        _super.call(this, destination);
        var safeSubscriber = new Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
      }
      DoSubscriber.prototype._next = function(value) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
          this.destination.error(safeSubscriber.syncErrorValue);
        } else {
          this.destination.next(value);
        }
      };
      DoSubscriber.prototype._error = function(err) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
          this.destination.error(safeSubscriber.syncErrorValue);
        } else {
          this.destination.error(err);
        }
      };
      DoSubscriber.prototype._complete = function() {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
          this.destination.error(safeSubscriber.syncErrorValue);
        } else {
          this.destination.complete();
        }
      };
      return DoSubscriber;
    }(Subscriber));
    Observable.prototype.do = _do;
    Observable.prototype._do = _do;
    function exhaust() {
      return this.lift(new SwitchFirstOperator());
    }
    var SwitchFirstOperator = (function() {
      function SwitchFirstOperator() {}
      SwitchFirstOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SwitchFirstSubscriber(subscriber));
      };
      return SwitchFirstOperator;
    }());
    var SwitchFirstSubscriber = (function(_super) {
      __extends(SwitchFirstSubscriber, _super);
      function SwitchFirstSubscriber(destination) {
        _super.call(this, destination);
        this.hasCompleted = false;
        this.hasSubscription = false;
      }
      SwitchFirstSubscriber.prototype._next = function(value) {
        if (!this.hasSubscription) {
          this.hasSubscription = true;
          this.add(subscribeToResult(this, value));
        }
      };
      SwitchFirstSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
          this.destination.complete();
        }
      };
      SwitchFirstSubscriber.prototype.notifyComplete = function(innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
          this.destination.complete();
        }
      };
      return SwitchFirstSubscriber;
    }(OuterSubscriber));
    Observable.prototype.exhaust = exhaust;
    function exhaustMap(project, resultSelector) {
      return this.lift(new SwitchFirstMapOperator(project, resultSelector));
    }
    var SwitchFirstMapOperator = (function() {
      function SwitchFirstMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
      }
      SwitchFirstMapOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
      };
      return SwitchFirstMapOperator;
    }());
    var SwitchFirstMapSubscriber = (function(_super) {
      __extends(SwitchFirstMapSubscriber, _super);
      function SwitchFirstMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.hasSubscription = false;
        this.hasCompleted = false;
        this.index = 0;
      }
      SwitchFirstMapSubscriber.prototype._next = function(value) {
        if (!this.hasSubscription) {
          this.tryNext(value);
        }
      };
      SwitchFirstMapSubscriber.prototype.tryNext = function(value) {
        var index = this.index++;
        var destination = this.destination;
        try {
          var result = this.project(value, index);
          this.hasSubscription = true;
          this.add(subscribeToResult(this, result, value, index));
        } catch (err) {
          destination.error(err);
        }
      };
      SwitchFirstMapSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
          this.destination.complete();
        }
      };
      SwitchFirstMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        if (resultSelector) {
          this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        } else {
          destination.next(innerValue);
        }
      };
      SwitchFirstMapSubscriber.prototype.trySelectResult = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        try {
          var result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
          destination.next(result);
        } catch (err) {
          destination.error(err);
        }
      };
      SwitchFirstMapSubscriber.prototype.notifyError = function(err) {
        this.destination.error(err);
      };
      SwitchFirstMapSubscriber.prototype.notifyComplete = function(innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
          this.destination.complete();
        }
      };
      return SwitchFirstMapSubscriber;
    }(OuterSubscriber));
    Observable.prototype.exhaustMap = exhaustMap;
    function expand(project, concurrent, scheduler) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      if (scheduler === void 0) {
        scheduler = undefined;
      }
      concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
      return this.lift(new ExpandOperator(project, concurrent, scheduler));
    }
    var ExpandOperator = (function() {
      function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
      }
      ExpandOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
      };
      return ExpandOperator;
    }());
    var ExpandSubscriber = (function(_super) {
      __extends(ExpandSubscriber, _super);
      function ExpandSubscriber(destination, project, concurrent, scheduler) {
        _super.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
          this.buffer = [];
        }
      }
      ExpandSubscriber.dispatch = function(arg) {
        var subscriber = arg.subscriber,
            result = arg.result,
            value = arg.value,
            index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
      };
      ExpandSubscriber.prototype._next = function(value) {
        var destination = this.destination;
        if (destination.closed) {
          this._complete();
          return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
          destination.next(value);
          var result = tryCatch(this.project)(value, index);
          if (result === errorObject) {
            destination.error(errorObject.e);
          } else if (!this.scheduler) {
            this.subscribeToProjection(result, value, index);
          } else {
            var state = {
              subscriber: this,
              result: result,
              value: value,
              index: index
            };
            this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
          }
        } else {
          this.buffer.push(value);
        }
      };
      ExpandSubscriber.prototype.subscribeToProjection = function(result, value, index) {
        this.active++;
        this.add(subscribeToResult(this, result, value, index));
      };
      ExpandSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }
      };
      ExpandSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
      };
      ExpandSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
          this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }
      };
      return ExpandSubscriber;
    }(OuterSubscriber));
    Observable.prototype.expand = expand;
    var ArgumentOutOfRangeError = (function(_super) {
      __extends(ArgumentOutOfRangeError, _super);
      function ArgumentOutOfRangeError() {
        var err = _super.call(this, 'argument out of range');
        this.name = err.name = 'ArgumentOutOfRangeError';
        this.stack = err.stack;
        this.message = err.message;
      }
      return ArgumentOutOfRangeError;
    }(Error));
    function elementAt(index, defaultValue) {
      return this.lift(new ElementAtOperator(index, defaultValue));
    }
    var ElementAtOperator = (function() {
      function ElementAtOperator(index, defaultValue) {
        this.index = index;
        this.defaultValue = defaultValue;
        if (index < 0) {
          throw new ArgumentOutOfRangeError;
        }
      }
      ElementAtOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
      };
      return ElementAtOperator;
    }());
    var ElementAtSubscriber = (function(_super) {
      __extends(ElementAtSubscriber, _super);
      function ElementAtSubscriber(destination, index, defaultValue) {
        _super.call(this, destination);
        this.index = index;
        this.defaultValue = defaultValue;
      }
      ElementAtSubscriber.prototype._next = function(x) {
        if (this.index-- === 0) {
          this.destination.next(x);
          this.destination.complete();
        }
      };
      ElementAtSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (this.index >= 0) {
          if (typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
          } else {
            destination.error(new ArgumentOutOfRangeError);
          }
        }
        destination.complete();
      };
      return ElementAtSubscriber;
    }(Subscriber));
    Observable.prototype.elementAt = elementAt;
    function filter(predicate, thisArg) {
      return this.lift(new FilterOperator(predicate, thisArg));
    }
    var FilterOperator = (function() {
      function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
      }
      FilterOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
      };
      return FilterOperator;
    }());
    var FilterSubscriber = (function(_super) {
      __extends(FilterSubscriber, _super);
      function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
        this.predicate = predicate;
      }
      FilterSubscriber.prototype._next = function(value) {
        var result;
        try {
          result = this.predicate.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        if (result) {
          this.destination.next(value);
        }
      };
      return FilterSubscriber;
    }(Subscriber));
    Observable.prototype.filter = filter;
    function _finally(callback) {
      return this.lift(new FinallyOperator(callback));
    }
    var FinallyOperator = (function() {
      function FinallyOperator(callback) {
        this.callback = callback;
      }
      FinallyOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new FinallySubscriber(subscriber, this.callback));
      };
      return FinallyOperator;
    }());
    var FinallySubscriber = (function(_super) {
      __extends(FinallySubscriber, _super);
      function FinallySubscriber(destination, callback) {
        _super.call(this, destination);
        this.add(new Subscription(callback));
      }
      return FinallySubscriber;
    }(Subscriber));
    Observable.prototype.finally = _finally;
    Observable.prototype._finally = _finally;
    function find(predicate, thisArg) {
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate is not a function');
      }
      return this.lift(new FindValueOperator(predicate, this, false, thisArg));
    }
    var FindValueOperator = (function() {
      function FindValueOperator(predicate, source, yieldIndex, thisArg) {
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
      }
      FindValueOperator.prototype.call = function(observer, source) {
        return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
      };
      return FindValueOperator;
    }());
    var FindValueSubscriber = (function(_super) {
      __extends(FindValueSubscriber, _super);
      function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
        this.index = 0;
      }
      FindValueSubscriber.prototype.notifyComplete = function(value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
      };
      FindValueSubscriber.prototype._next = function(value) {
        var _a = this,
            predicate = _a.predicate,
            thisArg = _a.thisArg;
        var index = this.index++;
        try {
          var result = predicate.call(thisArg || this, value, index, this.source);
          if (result) {
            this.notifyComplete(this.yieldIndex ? index : value);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };
      FindValueSubscriber.prototype._complete = function() {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
      };
      return FindValueSubscriber;
    }(Subscriber));
    Observable.prototype.find = find;
    function findIndex(predicate, thisArg) {
      return this.lift(new FindValueOperator(predicate, this, true, thisArg));
    }
    Observable.prototype.findIndex = findIndex;
    var EmptyError = (function(_super) {
      __extends(EmptyError, _super);
      function EmptyError() {
        var err = _super.call(this, 'no elements in sequence');
        this.name = err.name = 'EmptyError';
        this.stack = err.stack;
        this.message = err.message;
      }
      return EmptyError;
    }(Error));
    function first(predicate, resultSelector, defaultValue) {
      return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
    }
    var FirstOperator = (function() {
      function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
      }
      FirstOperator.prototype.call = function(observer, source) {
        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
      };
      return FirstOperator;
    }());
    var FirstSubscriber = (function(_super) {
      __extends(FirstSubscriber, _super);
      function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
        this._emitted = false;
      }
      FirstSubscriber.prototype._next = function(value) {
        var index = this.index++;
        if (this.predicate) {
          this._tryPredicate(value, index);
        } else {
          this._emit(value, index);
        }
      };
      FirstSubscriber.prototype._tryPredicate = function(value, index) {
        var result;
        try {
          result = this.predicate(value, index, this.source);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        if (result) {
          this._emit(value, index);
        }
      };
      FirstSubscriber.prototype._emit = function(value, index) {
        if (this.resultSelector) {
          this._tryResultSelector(value, index);
          return;
        }
        this._emitFinal(value);
      };
      FirstSubscriber.prototype._tryResultSelector = function(value, index) {
        var result;
        try {
          result = this.resultSelector(value, index);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this._emitFinal(result);
      };
      FirstSubscriber.prototype._emitFinal = function(value) {
        var destination = this.destination;
        if (!this._emitted) {
          this._emitted = true;
          destination.next(value);
          destination.complete();
          this.hasCompleted = true;
        }
      };
      FirstSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
          destination.next(this.defaultValue);
          destination.complete();
        } else if (!this.hasCompleted) {
          destination.error(new EmptyError);
        }
      };
      return FirstSubscriber;
    }(Subscriber));
    Observable.prototype.first = first;
    var MapPolyfill = (function() {
      function MapPolyfill() {
        this.size = 0;
        this._values = [];
        this._keys = [];
      }
      MapPolyfill.prototype.get = function(key) {
        var i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
      };
      MapPolyfill.prototype.set = function(key, value) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          this._keys.push(key);
          this._values.push(value);
          this.size++;
        } else {
          this._values[i] = value;
        }
        return this;
      };
      MapPolyfill.prototype.delete = function(key) {
        var i = this._keys.indexOf(key);
        if (i === -1) {
          return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
      };
      MapPolyfill.prototype.clear = function() {
        this._keys.length = 0;
        this._values.length = 0;
        this.size = 0;
      };
      MapPolyfill.prototype.forEach = function(cb, thisArg) {
        for (var i = 0; i < this.size; i++) {
          cb.call(thisArg, this._values[i], this._keys[i]);
        }
      };
      return MapPolyfill;
    }());
    var Map = root.Map || (function() {
      return MapPolyfill;
    })();
    var FastMap = (function() {
      function FastMap() {
        this.values = {};
      }
      FastMap.prototype.delete = function(key) {
        this.values[key] = null;
        return true;
      };
      FastMap.prototype.set = function(key, value) {
        this.values[key] = value;
        return this;
      };
      FastMap.prototype.get = function(key) {
        return this.values[key];
      };
      FastMap.prototype.forEach = function(cb, thisArg) {
        var values = this.values;
        for (var key in values) {
          if (values.hasOwnProperty(key) && values[key] !== null) {
            cb.call(thisArg, values[key], key);
          }
        }
      };
      FastMap.prototype.clear = function() {
        this.values = {};
      };
      return FastMap;
    }());
    function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
      return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
    }
    var GroupByOperator = (function() {
      function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
      }
      GroupByOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
      };
      return GroupByOperator;
    }());
    var GroupBySubscriber = (function(_super) {
      __extends(GroupBySubscriber, _super);
      function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
        this.groups = null;
        this.attemptedToUnsubscribe = false;
        this.count = 0;
      }
      GroupBySubscriber.prototype._next = function(value) {
        var key;
        try {
          key = this.keySelector(value);
        } catch (err) {
          this.error(err);
          return;
        }
        this._group(value, key);
      };
      GroupBySubscriber.prototype._group = function(value, key) {
        var groups = this.groups;
        if (!groups) {
          groups = this.groups = typeof key === 'string' ? new FastMap() : new Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
          try {
            element = this.elementSelector(value);
          } catch (err) {
            this.error(err);
          }
        } else {
          element = value;
        }
        if (!group) {
          group = this.subjectSelector ? this.subjectSelector() : new Subject();
          groups.set(key, group);
          var groupedObservable = new GroupedObservable(key, group, this);
          this.destination.next(groupedObservable);
          if (this.durationSelector) {
            var duration = void 0;
            try {
              duration = this.durationSelector(new GroupedObservable(key, group));
            } catch (err) {
              this.error(err);
              return;
            }
            this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
          }
        }
        if (!group.closed) {
          group.next(element);
        }
      };
      GroupBySubscriber.prototype._error = function(err) {
        var groups = this.groups;
        if (groups) {
          groups.forEach(function(group, key) {
            group.error(err);
          });
          groups.clear();
        }
        this.destination.error(err);
      };
      GroupBySubscriber.prototype._complete = function() {
        var groups = this.groups;
        if (groups) {
          groups.forEach(function(group, key) {
            group.complete();
          });
          groups.clear();
        }
        this.destination.complete();
      };
      GroupBySubscriber.prototype.removeGroup = function(key) {
        this.groups.delete(key);
      };
      GroupBySubscriber.prototype.unsubscribe = function() {
        if (!this.closed) {
          this.attemptedToUnsubscribe = true;
          if (this.count === 0) {
            _super.prototype.unsubscribe.call(this);
          }
        }
      };
      return GroupBySubscriber;
    }(Subscriber));
    var GroupDurationSubscriber = (function(_super) {
      __extends(GroupDurationSubscriber, _super);
      function GroupDurationSubscriber(key, group, parent) {
        _super.call(this);
        this.key = key;
        this.group = group;
        this.parent = parent;
      }
      GroupDurationSubscriber.prototype._next = function(value) {
        this._complete();
      };
      GroupDurationSubscriber.prototype._error = function(err) {
        var group = this.group;
        if (!group.closed) {
          group.error(err);
        }
        this.parent.removeGroup(this.key);
      };
      GroupDurationSubscriber.prototype._complete = function() {
        var group = this.group;
        if (!group.closed) {
          group.complete();
        }
        this.parent.removeGroup(this.key);
      };
      return GroupDurationSubscriber;
    }(Subscriber));
    var GroupedObservable = (function(_super) {
      __extends(GroupedObservable, _super);
      function GroupedObservable(key, groupSubject, refCountSubscription) {
        _super.call(this);
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
      }
      GroupedObservable.prototype._subscribe = function(subscriber) {
        var subscription = new Subscription();
        var _a = this,
            refCountSubscription = _a.refCountSubscription,
            groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
          subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
      };
      return GroupedObservable;
    }(Observable));
    var InnerRefCountSubscription = (function(_super) {
      __extends(InnerRefCountSubscription, _super);
      function InnerRefCountSubscription(parent) {
        _super.call(this);
        this.parent = parent;
        parent.count++;
      }
      InnerRefCountSubscription.prototype.unsubscribe = function() {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
          _super.prototype.unsubscribe.call(this);
          parent.count -= 1;
          if (parent.count === 0 && parent.attemptedToUnsubscribe) {
            parent.unsubscribe();
          }
        }
      };
      return InnerRefCountSubscription;
    }(Subscription));
    Observable.prototype.groupBy = groupBy;
    function ignoreElements() {
      return this.lift(new IgnoreElementsOperator());
    }
    var IgnoreElementsOperator = (function() {
      function IgnoreElementsOperator() {}
      IgnoreElementsOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
      };
      return IgnoreElementsOperator;
    }());
    var IgnoreElementsSubscriber = (function(_super) {
      __extends(IgnoreElementsSubscriber, _super);
      function IgnoreElementsSubscriber() {
        _super.apply(this, arguments);
      }
      IgnoreElementsSubscriber.prototype._next = function(unused) {
        noop();
      };
      return IgnoreElementsSubscriber;
    }(Subscriber));
    Observable.prototype.ignoreElements = ignoreElements;
    function isEmpty() {
      return this.lift(new IsEmptyOperator());
    }
    var IsEmptyOperator = (function() {
      function IsEmptyOperator() {}
      IsEmptyOperator.prototype.call = function(observer, source) {
        return source.subscribe(new IsEmptySubscriber(observer));
      };
      return IsEmptyOperator;
    }());
    var IsEmptySubscriber = (function(_super) {
      __extends(IsEmptySubscriber, _super);
      function IsEmptySubscriber(destination) {
        _super.call(this, destination);
      }
      IsEmptySubscriber.prototype.notifyComplete = function(isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
      };
      IsEmptySubscriber.prototype._next = function(value) {
        this.notifyComplete(false);
      };
      IsEmptySubscriber.prototype._complete = function() {
        this.notifyComplete(true);
      };
      return IsEmptySubscriber;
    }(Subscriber));
    Observable.prototype.isEmpty = isEmpty;
    function audit(durationSelector) {
      return this.lift(new AuditOperator(durationSelector));
    }
    var AuditOperator = (function() {
      function AuditOperator(durationSelector) {
        this.durationSelector = durationSelector;
      }
      AuditOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
      };
      return AuditOperator;
    }());
    var AuditSubscriber = (function(_super) {
      __extends(AuditSubscriber, _super);
      function AuditSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
      }
      AuditSubscriber.prototype._next = function(value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
          var duration = tryCatch(this.durationSelector)(value);
          if (duration === errorObject) {
            this.destination.error(errorObject.e);
          } else {
            this.add(this.throttled = subscribeToResult(this, duration));
          }
        }
      };
      AuditSubscriber.prototype.clearThrottle = function() {
        var _a = this,
            value = _a.value,
            hasValue = _a.hasValue,
            throttled = _a.throttled;
        if (throttled) {
          this.remove(throttled);
          this.throttled = null;
          throttled.unsubscribe();
        }
        if (hasValue) {
          this.value = null;
          this.hasValue = false;
          this.destination.next(value);
        }
      };
      AuditSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
      };
      AuditSubscriber.prototype.notifyComplete = function() {
        this.clearThrottle();
      };
      return AuditSubscriber;
    }(OuterSubscriber));
    Observable.prototype.audit = audit;
    function auditTime(duration, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      return this.lift(new AuditTimeOperator(duration, scheduler));
    }
    var AuditTimeOperator = (function() {
      function AuditTimeOperator(duration, scheduler) {
        this.duration = duration;
        this.scheduler = scheduler;
      }
      AuditTimeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
      };
      return AuditTimeOperator;
    }());
    var AuditTimeSubscriber = (function(_super) {
      __extends(AuditTimeSubscriber, _super);
      function AuditTimeSubscriber(destination, duration, scheduler) {
        _super.call(this, destination);
        this.duration = duration;
        this.scheduler = scheduler;
        this.hasValue = false;
      }
      AuditTimeSubscriber.prototype._next = function(value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
          this.add(this.throttled = this.scheduler.schedule(dispatchNext$4, this.duration, this));
        }
      };
      AuditTimeSubscriber.prototype.clearThrottle = function() {
        var _a = this,
            value = _a.value,
            hasValue = _a.hasValue,
            throttled = _a.throttled;
        if (throttled) {
          this.remove(throttled);
          this.throttled = null;
          throttled.unsubscribe();
        }
        if (hasValue) {
          this.value = null;
          this.hasValue = false;
          this.destination.next(value);
        }
      };
      return AuditTimeSubscriber;
    }(Subscriber));
    function dispatchNext$4(subscriber) {
      subscriber.clearThrottle();
    }
    Observable.prototype.auditTime = auditTime;
    function last(predicate, resultSelector, defaultValue) {
      return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
    }
    var LastOperator = (function() {
      function LastOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
      }
      LastOperator.prototype.call = function(observer, source) {
        return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
      };
      return LastOperator;
    }());
    var LastSubscriber = (function(_super) {
      __extends(LastSubscriber, _super);
      function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
          this.lastValue = defaultValue;
          this.hasValue = true;
        }
      }
      LastSubscriber.prototype._next = function(value) {
        var index = this.index++;
        if (this.predicate) {
          this._tryPredicate(value, index);
        } else {
          if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
          }
          this.lastValue = value;
          this.hasValue = true;
        }
      };
      LastSubscriber.prototype._tryPredicate = function(value, index) {
        var result;
        try {
          result = this.predicate(value, index, this.source);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        if (result) {
          if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
          }
          this.lastValue = value;
          this.hasValue = true;
        }
      };
      LastSubscriber.prototype._tryResultSelector = function(value, index) {
        var result;
        try {
          result = this.resultSelector(value, index);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.lastValue = result;
        this.hasValue = true;
      };
      LastSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (this.hasValue) {
          destination.next(this.lastValue);
          destination.complete();
        } else {
          destination.error(new EmptyError);
        }
      };
      return LastSubscriber;
    }(Subscriber));
    Observable.prototype.last = last;
    function letProto(func) {
      return func(this);
    }
    Observable.prototype.let = letProto;
    Observable.prototype.letBind = letProto;
    function every(predicate, thisArg) {
      return this.lift(new EveryOperator(predicate, thisArg, this));
    }
    var EveryOperator = (function() {
      function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
      }
      EveryOperator.prototype.call = function(observer, source) {
        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
      };
      return EveryOperator;
    }());
    var EverySubscriber = (function(_super) {
      __extends(EverySubscriber, _super);
      function EverySubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
      }
      EverySubscriber.prototype.notifyComplete = function(everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
      };
      EverySubscriber.prototype._next = function(value) {
        var result = false;
        try {
          result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        if (!result) {
          this.notifyComplete(false);
        }
      };
      EverySubscriber.prototype._complete = function() {
        this.notifyComplete(true);
      };
      return EverySubscriber;
    }(Subscriber));
    Observable.prototype.every = every;
    Observable.prototype.map = map;
    function mapTo(value) {
      return this.lift(new MapToOperator(value));
    }
    var MapToOperator = (function() {
      function MapToOperator(value) {
        this.value = value;
      }
      MapToOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new MapToSubscriber(subscriber, this.value));
      };
      return MapToOperator;
    }());
    var MapToSubscriber = (function(_super) {
      __extends(MapToSubscriber, _super);
      function MapToSubscriber(destination, value) {
        _super.call(this, destination);
        this.value = value;
      }
      MapToSubscriber.prototype._next = function(x) {
        this.destination.next(this.value);
      };
      return MapToSubscriber;
    }(Subscriber));
    Observable.prototype.mapTo = mapTo;
    function materialize() {
      return this.lift(new MaterializeOperator());
    }
    var MaterializeOperator = (function() {
      function MaterializeOperator() {}
      MaterializeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new MaterializeSubscriber(subscriber));
      };
      return MaterializeOperator;
    }());
    var MaterializeSubscriber = (function(_super) {
      __extends(MaterializeSubscriber, _super);
      function MaterializeSubscriber(destination) {
        _super.call(this, destination);
      }
      MaterializeSubscriber.prototype._next = function(value) {
        this.destination.next(Notification.createNext(value));
      };
      MaterializeSubscriber.prototype._error = function(err) {
        var destination = this.destination;
        destination.next(Notification.createError(err));
        destination.complete();
      };
      MaterializeSubscriber.prototype._complete = function() {
        var destination = this.destination;
        destination.next(Notification.createComplete());
        destination.complete();
      };
      return MaterializeSubscriber;
    }(Subscriber));
    Observable.prototype.materialize = materialize;
    function reduce(accumulator, seed) {
      var hasSeed = false;
      if (arguments.length >= 2) {
        hasSeed = true;
      }
      return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
    }
    var ReduceOperator = (function() {
      function ReduceOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) {
          hasSeed = false;
        }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
      }
      ReduceOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
      };
      return ReduceOperator;
    }());
    var ReduceSubscriber = (function(_super) {
      __extends(ReduceSubscriber, _super);
      function ReduceSubscriber(destination, accumulator, seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.hasSeed = hasSeed;
        this.index = 0;
        this.hasValue = false;
        this.acc = seed;
        if (!this.hasSeed) {
          this.index++;
        }
      }
      ReduceSubscriber.prototype._next = function(value) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
          this._tryReduce(value);
        } else {
          this.acc = value;
          this.hasValue = true;
        }
      };
      ReduceSubscriber.prototype._tryReduce = function(value) {
        var result;
        try {
          result = this.accumulator(this.acc, value, this.index++);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.acc = result;
      };
      ReduceSubscriber.prototype._complete = function() {
        if (this.hasValue || this.hasSeed) {
          this.destination.next(this.acc);
        }
        this.destination.complete();
      };
      return ReduceSubscriber;
    }(Subscriber));
    function max(comparer) {
      var max = (typeof comparer === 'function') ? function(x, y) {
        return comparer(x, y) > 0 ? x : y;
      } : function(x, y) {
        return x > y ? x : y;
      };
      return this.lift(new ReduceOperator(max));
    }
    Observable.prototype.max = max;
    Observable.prototype.merge = merge$1;
    Observable.prototype.mergeAll = mergeAll;
    Observable.prototype.mergeMap = mergeMap;
    Observable.prototype.flatMap = mergeMap;
    Observable.prototype.flatMapTo = mergeMapTo;
    Observable.prototype.mergeMapTo = mergeMapTo;
    function mergeScan(accumulator, seed, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      return this.lift(new MergeScanOperator(accumulator, seed, concurrent));
    }
    var MergeScanOperator = (function() {
      function MergeScanOperator(accumulator, seed, concurrent) {
        this.accumulator = accumulator;
        this.seed = seed;
        this.concurrent = concurrent;
      }
      MergeScanOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
      };
      return MergeScanOperator;
    }());
    var MergeScanSubscriber = (function(_super) {
      __extends(MergeScanSubscriber, _super);
      function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.acc = acc;
        this.concurrent = concurrent;
        this.hasValue = false;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
      }
      MergeScanSubscriber.prototype._next = function(value) {
        if (this.active < this.concurrent) {
          var index = this.index++;
          var ish = tryCatch(this.accumulator)(this.acc, value);
          var destination = this.destination;
          if (ish === errorObject) {
            destination.error(errorObject.e);
          } else {
            this.active++;
            this._innerSub(ish, value, index);
          }
        } else {
          this.buffer.push(value);
        }
      };
      MergeScanSubscriber.prototype._innerSub = function(ish, value, index) {
        this.add(subscribeToResult(this, ish, value, index));
      };
      MergeScanSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          if (this.hasValue === false) {
            this.destination.next(this.acc);
          }
          this.destination.complete();
        }
      };
      MergeScanSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var destination = this.destination;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
      };
      MergeScanSubscriber.prototype.notifyComplete = function(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          if (this.hasValue === false) {
            this.destination.next(this.acc);
          }
          this.destination.complete();
        }
      };
      return MergeScanSubscriber;
    }(OuterSubscriber));
    Observable.prototype.mergeScan = mergeScan;
    function min(comparer) {
      var min = (typeof comparer === 'function') ? function(x, y) {
        return comparer(x, y) < 0 ? x : y;
      } : function(x, y) {
        return x < y ? x : y;
      };
      return this.lift(new ReduceOperator(min));
    }
    Observable.prototype.min = min;
    var ConnectableObservable = (function(_super) {
      __extends(ConnectableObservable, _super);
      function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
      }
      ConnectableObservable.prototype._subscribe = function(subscriber) {
        return this.getSubject().subscribe(subscriber);
      };
      ConnectableObservable.prototype.getSubject = function() {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
          this._subject = this.subjectFactory();
        }
        return this._subject;
      };
      ConnectableObservable.prototype.connect = function() {
        var connection = this._connection;
        if (!connection) {
          connection = this._connection = new Subscription();
          connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
          if (connection.closed) {
            this._connection = null;
            connection = Subscription.EMPTY;
          } else {
            this._connection = connection;
          }
        }
        return connection;
      };
      ConnectableObservable.prototype.refCount = function() {
        return this.lift(new RefCountOperator(this));
      };
      return ConnectableObservable;
    }(Observable));
    var connectableObservableDescriptor = {
      operator: {value: null},
      _refCount: {
        value: 0,
        writable: true
      },
      _subscribe: {value: ConnectableObservable.prototype._subscribe},
      getSubject: {value: ConnectableObservable.prototype.getSubject},
      connect: {value: ConnectableObservable.prototype.connect},
      refCount: {value: ConnectableObservable.prototype.refCount}
    };
    var ConnectableSubscriber = (function(_super) {
      __extends(ConnectableSubscriber, _super);
      function ConnectableSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
      }
      ConnectableSubscriber.prototype._error = function(err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
      };
      ConnectableSubscriber.prototype._complete = function() {
        this._unsubscribe();
        _super.prototype._complete.call(this);
      };
      ConnectableSubscriber.prototype._unsubscribe = function() {
        var connectable = this.connectable;
        if (connectable) {
          this.connectable = null;
          var connection = connectable._connection;
          connectable._refCount = 0;
          connectable._subject = null;
          connectable._connection = null;
          if (connection) {
            connection.unsubscribe();
          }
        }
      };
      return ConnectableSubscriber;
    }(SubjectSubscriber));
    var RefCountOperator = (function() {
      function RefCountOperator(connectable) {
        this.connectable = connectable;
      }
      RefCountOperator.prototype.call = function(subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
          refCounter.connection = connectable.connect();
        }
        return subscription;
      };
      return RefCountOperator;
    }());
    var RefCountSubscriber = (function(_super) {
      __extends(RefCountSubscriber, _super);
      function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
      }
      RefCountSubscriber.prototype._unsubscribe = function() {
        var connectable = this.connectable;
        if (!connectable) {
          this.connection = null;
          return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
          this.connection = null;
          return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
          this.connection = null;
          return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
          sharedConnection.unsubscribe();
        }
      };
      return RefCountSubscriber;
    }(Subscriber));
    function multicast(subjectOrSubjectFactory, selector) {
      var subjectFactory;
      if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
      } else {
        subjectFactory = function subjectFactory() {
          return subjectOrSubjectFactory;
        };
      }
      if (typeof selector === 'function') {
        return this.lift(new MulticastOperator(subjectFactory, selector));
      }
      var connectable = Object.create(this, connectableObservableDescriptor);
      connectable.source = this;
      connectable.subjectFactory = subjectFactory;
      return connectable;
    }
    var MulticastOperator = (function() {
      function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
      }
      MulticastOperator.prototype.call = function(subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
      };
      return MulticastOperator;
    }());
    Observable.prototype.multicast = multicast;
    Observable.prototype.observeOn = observeOn;
    Observable.prototype.onErrorResumeNext = onErrorResumeNext;
    function pairwise() {
      return this.lift(new PairwiseOperator());
    }
    var PairwiseOperator = (function() {
      function PairwiseOperator() {}
      PairwiseOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new PairwiseSubscriber(subscriber));
      };
      return PairwiseOperator;
    }());
    var PairwiseSubscriber = (function(_super) {
      __extends(PairwiseSubscriber, _super);
      function PairwiseSubscriber(destination) {
        _super.call(this, destination);
        this.hasPrev = false;
      }
      PairwiseSubscriber.prototype._next = function(value) {
        if (this.hasPrev) {
          this.destination.next([this.prev, value]);
        } else {
          this.hasPrev = true;
        }
        this.prev = value;
      };
      return PairwiseSubscriber;
    }(Subscriber));
    Observable.prototype.pairwise = pairwise;
    function not(pred, thisArg) {
      function notPred() {
        return !(notPred.pred.apply(notPred.thisArg, arguments));
      }
      notPred.pred = pred;
      notPred.thisArg = thisArg;
      return notPred;
    }
    function partition(predicate, thisArg) {
      return [filter.call(this, predicate, thisArg), filter.call(this, not(predicate, thisArg))];
    }
    Observable.prototype.partition = partition;
    function pluck() {
      var properties = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
      }
      var length = properties.length;
      if (length === 0) {
        throw new Error('list of properties cannot be empty.');
      }
      return map.call(this, plucker(properties, length));
    }
    function plucker(props, length) {
      var mapper = function(x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
          var p = currentProp[props[i]];
          if (typeof p !== 'undefined') {
            currentProp = p;
          } else {
            return undefined;
          }
        }
        return currentProp;
      };
      return mapper;
    }
    Observable.prototype.pluck = pluck;
    function publish(selector) {
      return selector ? multicast.call(this, function() {
        return new Subject();
      }, selector) : multicast.call(this, new Subject());
    }
    Observable.prototype.publish = publish;
    var BehaviorSubject = (function(_super) {
      __extends(BehaviorSubject, _super);
      function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
      }
      Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function() {
          return this.getValue();
        },
        enumerable: true,
        configurable: true
      });
      BehaviorSubject.prototype._subscribe = function(subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
          subscriber.next(this._value);
        }
        return subscription;
      };
      BehaviorSubject.prototype.getValue = function() {
        if (this.hasError) {
          throw this.thrownError;
        } else if (this.closed) {
          throw new ObjectUnsubscribedError();
        } else {
          return this._value;
        }
      };
      BehaviorSubject.prototype.next = function(value) {
        _super.prototype.next.call(this, this._value = value);
      };
      return BehaviorSubject;
    }(Subject));
    function publishBehavior(value) {
      return multicast.call(this, new BehaviorSubject(value));
    }
    Observable.prototype.publishBehavior = publishBehavior;
    function publishReplay(bufferSize, windowTime, scheduler) {
      if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
      }
      if (windowTime === void 0) {
        windowTime = Number.POSITIVE_INFINITY;
      }
      return multicast.call(this, new ReplaySubject(bufferSize, windowTime, scheduler));
    }
    Observable.prototype.publishReplay = publishReplay;
    function publishLast() {
      return multicast.call(this, new AsyncSubject());
    }
    Observable.prototype.publishLast = publishLast;
    Observable.prototype.race = race;
    Observable.prototype.reduce = reduce;
    function repeat(count) {
      if (count === void 0) {
        count = -1;
      }
      if (count === 0) {
        return new EmptyObservable();
      } else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
      } else {
        return this.lift(new RepeatOperator(count - 1, this));
      }
    }
    var RepeatOperator = (function() {
      function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
      }
      RepeatOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
      };
      return RepeatOperator;
    }());
    var RepeatSubscriber = (function(_super) {
      __extends(RepeatSubscriber, _super);
      function RepeatSubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
      }
      RepeatSubscriber.prototype.complete = function() {
        if (!this.isStopped) {
          var _a = this,
              source = _a.source,
              count = _a.count;
          if (count === 0) {
            return _super.prototype.complete.call(this);
          } else if (count > -1) {
            this.count = count - 1;
          }
          source.subscribe(this._unsubscribeAndRecycle());
        }
      };
      return RepeatSubscriber;
    }(Subscriber));
    Observable.prototype.repeat = repeat;
    function repeatWhen(notifier) {
      return this.lift(new RepeatWhenOperator(notifier));
    }
    var RepeatWhenOperator = (function() {
      function RepeatWhenOperator(notifier) {
        this.notifier = notifier;
      }
      RepeatWhenOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
      };
      return RepeatWhenOperator;
    }());
    var RepeatWhenSubscriber = (function(_super) {
      __extends(RepeatWhenSubscriber, _super);
      function RepeatWhenSubscriber(destination, notifier, source) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.source = source;
        this.sourceIsBeingSubscribedTo = true;
      }
      RepeatWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
      };
      RepeatWhenSubscriber.prototype.notifyComplete = function(innerSub) {
        if (this.sourceIsBeingSubscribedTo === false) {
          return _super.prototype.complete.call(this);
        }
      };
      RepeatWhenSubscriber.prototype.complete = function() {
        this.sourceIsBeingSubscribedTo = false;
        if (!this.isStopped) {
          if (!this.retries) {
            this.subscribeToRetries();
          } else if (this.retriesSubscription.closed) {
            return _super.prototype.complete.call(this);
          }
          this._unsubscribeAndRecycle();
          this.notifications.next();
        }
      };
      RepeatWhenSubscriber.prototype._unsubscribe = function() {
        var _a = this,
            notifications = _a.notifications,
            retriesSubscription = _a.retriesSubscription;
        if (notifications) {
          notifications.unsubscribe();
          this.notifications = null;
        }
        if (retriesSubscription) {
          retriesSubscription.unsubscribe();
          this.retriesSubscription = null;
        }
        this.retries = null;
      };
      RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function() {
        var _a = this,
            notifications = _a.notifications,
            retries = _a.retries,
            retriesSubscription = _a.retriesSubscription;
        this.notifications = null;
        this.retries = null;
        this.retriesSubscription = null;
        _super.prototype._unsubscribeAndRecycle.call(this);
        this.notifications = notifications;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        return this;
      };
      RepeatWhenSubscriber.prototype.subscribeToRetries = function() {
        this.notifications = new Subject();
        var retries = tryCatch(this.notifier)(this.notifications);
        if (retries === errorObject) {
          return _super.prototype.complete.call(this);
        }
        this.retries = retries;
        this.retriesSubscription = subscribeToResult(this, retries);
      };
      return RepeatWhenSubscriber;
    }(OuterSubscriber));
    Observable.prototype.repeatWhen = repeatWhen;
    function retry(count) {
      if (count === void 0) {
        count = -1;
      }
      return this.lift(new RetryOperator(count, this));
    }
    var RetryOperator = (function() {
      function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
      }
      RetryOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
      };
      return RetryOperator;
    }());
    var RetrySubscriber = (function(_super) {
      __extends(RetrySubscriber, _super);
      function RetrySubscriber(destination, count, source) {
        _super.call(this, destination);
        this.count = count;
        this.source = source;
      }
      RetrySubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          var _a = this,
              source = _a.source,
              count = _a.count;
          if (count === 0) {
            return _super.prototype.error.call(this, err);
          } else if (count > -1) {
            this.count = count - 1;
          }
          source.subscribe(this._unsubscribeAndRecycle());
        }
      };
      return RetrySubscriber;
    }(Subscriber));
    Observable.prototype.retry = retry;
    function retryWhen(notifier) {
      return this.lift(new RetryWhenOperator(notifier, this));
    }
    var RetryWhenOperator = (function() {
      function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
      }
      RetryWhenOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
      };
      return RetryWhenOperator;
    }());
    var RetryWhenSubscriber = (function(_super) {
      __extends(RetryWhenSubscriber, _super);
      function RetryWhenSubscriber(destination, notifier, source) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.source = source;
      }
      RetryWhenSubscriber.prototype.error = function(err) {
        if (!this.isStopped) {
          var errors = this.errors;
          var retries = this.retries;
          var retriesSubscription = this.retriesSubscription;
          if (!retries) {
            errors = new Subject();
            retries = tryCatch(this.notifier)(errors);
            if (retries === errorObject) {
              return _super.prototype.error.call(this, errorObject.e);
            }
            retriesSubscription = subscribeToResult(this, retries);
          } else {
            this.errors = null;
            this.retriesSubscription = null;
          }
          this._unsubscribeAndRecycle();
          this.errors = errors;
          this.retries = retries;
          this.retriesSubscription = retriesSubscription;
          errors.next(err);
        }
      };
      RetryWhenSubscriber.prototype._unsubscribe = function() {
        var _a = this,
            errors = _a.errors,
            retriesSubscription = _a.retriesSubscription;
        if (errors) {
          errors.unsubscribe();
          this.errors = null;
        }
        if (retriesSubscription) {
          retriesSubscription.unsubscribe();
          this.retriesSubscription = null;
        }
        this.retries = null;
      };
      RetryWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this,
            errors = _a.errors,
            retries = _a.retries,
            retriesSubscription = _a.retriesSubscription;
        this.errors = null;
        this.retries = null;
        this.retriesSubscription = null;
        this._unsubscribeAndRecycle();
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
      };
      return RetryWhenSubscriber;
    }(OuterSubscriber));
    Observable.prototype.retryWhen = retryWhen;
    function sample(notifier) {
      return this.lift(new SampleOperator(notifier));
    }
    var SampleOperator = (function() {
      function SampleOperator(notifier) {
        this.notifier = notifier;
      }
      SampleOperator.prototype.call = function(subscriber, source) {
        var sampleSubscriber = new SampleSubscriber(subscriber);
        var subscription = source.subscribe(sampleSubscriber);
        subscription.add(subscribeToResult(sampleSubscriber, this.notifier));
        return subscription;
      };
      return SampleOperator;
    }());
    var SampleSubscriber = (function(_super) {
      __extends(SampleSubscriber, _super);
      function SampleSubscriber() {
        _super.apply(this, arguments);
        this.hasValue = false;
      }
      SampleSubscriber.prototype._next = function(value) {
        this.value = value;
        this.hasValue = true;
      };
      SampleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
      };
      SampleSubscriber.prototype.notifyComplete = function() {
        this.emitValue();
      };
      SampleSubscriber.prototype.emitValue = function() {
        if (this.hasValue) {
          this.hasValue = false;
          this.destination.next(this.value);
        }
      };
      return SampleSubscriber;
    }(OuterSubscriber));
    Observable.prototype.sample = sample;
    function sampleTime(period, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      return this.lift(new SampleTimeOperator(period, scheduler));
    }
    var SampleTimeOperator = (function() {
      function SampleTimeOperator(period, scheduler) {
        this.period = period;
        this.scheduler = scheduler;
      }
      SampleTimeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
      };
      return SampleTimeOperator;
    }());
    var SampleTimeSubscriber = (function(_super) {
      __extends(SampleTimeSubscriber, _super);
      function SampleTimeSubscriber(destination, period, scheduler) {
        _super.call(this, destination);
        this.period = period;
        this.scheduler = scheduler;
        this.hasValue = false;
        this.add(scheduler.schedule(dispatchNotification, period, {
          subscriber: this,
          period: period
        }));
      }
      SampleTimeSubscriber.prototype._next = function(value) {
        this.lastValue = value;
        this.hasValue = true;
      };
      SampleTimeSubscriber.prototype.notifyNext = function() {
        if (this.hasValue) {
          this.hasValue = false;
          this.destination.next(this.lastValue);
        }
      };
      return SampleTimeSubscriber;
    }(Subscriber));
    function dispatchNotification(state) {
      var subscriber = state.subscriber,
          period = state.period;
      subscriber.notifyNext();
      this.schedule(state, period);
    }
    Observable.prototype.sampleTime = sampleTime;
    function scan(accumulator, seed) {
      var hasSeed = false;
      if (arguments.length >= 2) {
        hasSeed = true;
      }
      return this.lift(new ScanOperator(accumulator, seed, hasSeed));
    }
    var ScanOperator = (function() {
      function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) {
          hasSeed = false;
        }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
      }
      ScanOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
      };
      return ScanOperator;
    }());
    var ScanSubscriber = (function(_super) {
      __extends(ScanSubscriber, _super);
      function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
      }
      Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function() {
          return this._seed;
        },
        set: function(value) {
          this.hasSeed = true;
          this._seed = value;
        },
        enumerable: true,
        configurable: true
      });
      ScanSubscriber.prototype._next = function(value) {
        if (!this.hasSeed) {
          this.seed = value;
          this.destination.next(value);
        } else {
          return this._tryNext(value);
        }
      };
      ScanSubscriber.prototype._tryNext = function(value) {
        var index = this.index++;
        var result;
        try {
          result = this.accumulator(this.seed, value, index);
        } catch (err) {
          this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
      };
      return ScanSubscriber;
    }(Subscriber));
    Observable.prototype.scan = scan;
    function sequenceEqual(compareTo, comparor) {
      return this.lift(new SequenceEqualOperator(compareTo, comparor));
    }
    var SequenceEqualOperator = (function() {
      function SequenceEqualOperator(compareTo, comparor) {
        this.compareTo = compareTo;
        this.comparor = comparor;
      }
      SequenceEqualOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
      };
      return SequenceEqualOperator;
    }());
    var SequenceEqualSubscriber = (function(_super) {
      __extends(SequenceEqualSubscriber, _super);
      function SequenceEqualSubscriber(destination, compareTo, comparor) {
        _super.call(this, destination);
        this.compareTo = compareTo;
        this.comparor = comparor;
        this._a = [];
        this._b = [];
        this._oneComplete = false;
        this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, this)));
      }
      SequenceEqualSubscriber.prototype._next = function(value) {
        if (this._oneComplete && this._b.length === 0) {
          this.emit(false);
        } else {
          this._a.push(value);
          this.checkValues();
        }
      };
      SequenceEqualSubscriber.prototype._complete = function() {
        if (this._oneComplete) {
          this.emit(this._a.length === 0 && this._b.length === 0);
        } else {
          this._oneComplete = true;
        }
      };
      SequenceEqualSubscriber.prototype.checkValues = function() {
        var _c = this,
            _a = _c._a,
            _b = _c._b,
            comparor = _c.comparor;
        while (_a.length > 0 && _b.length > 0) {
          var a = _a.shift();
          var b = _b.shift();
          var areEqual = false;
          if (comparor) {
            areEqual = tryCatch(comparor)(a, b);
            if (areEqual === errorObject) {
              this.destination.error(errorObject.e);
            }
          } else {
            areEqual = a === b;
          }
          if (!areEqual) {
            this.emit(false);
          }
        }
      };
      SequenceEqualSubscriber.prototype.emit = function(value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
      };
      SequenceEqualSubscriber.prototype.nextB = function(value) {
        if (this._oneComplete && this._a.length === 0) {
          this.emit(false);
        } else {
          this._b.push(value);
          this.checkValues();
        }
      };
      return SequenceEqualSubscriber;
    }(Subscriber));
    var SequenceEqualCompareToSubscriber = (function(_super) {
      __extends(SequenceEqualCompareToSubscriber, _super);
      function SequenceEqualCompareToSubscriber(destination, parent) {
        _super.call(this, destination);
        this.parent = parent;
      }
      SequenceEqualCompareToSubscriber.prototype._next = function(value) {
        this.parent.nextB(value);
      };
      SequenceEqualCompareToSubscriber.prototype._error = function(err) {
        this.parent.error(err);
      };
      SequenceEqualCompareToSubscriber.prototype._complete = function() {
        this.parent._complete();
      };
      return SequenceEqualCompareToSubscriber;
    }(Subscriber));
    Observable.prototype.sequenceEqual = sequenceEqual;
    function shareSubjectFactory() {
      return new Subject();
    }
    function share() {
      return multicast.call(this, shareSubjectFactory).refCount();
    }
    Observable.prototype.share = share;
    function single(predicate) {
      return this.lift(new SingleOperator(predicate, this));
    }
    var SingleOperator = (function() {
      function SingleOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
      }
      SingleOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
      };
      return SingleOperator;
    }());
    var SingleSubscriber = (function(_super) {
      __extends(SingleSubscriber, _super);
      function SingleSubscriber(destination, predicate, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
      }
      SingleSubscriber.prototype.applySingleValue = function(value) {
        if (this.seenValue) {
          this.destination.error('Sequence contains more than one element');
        } else {
          this.seenValue = true;
          this.singleValue = value;
        }
      };
      SingleSubscriber.prototype._next = function(value) {
        var predicate = this.predicate;
        this.index++;
        if (predicate) {
          this.tryNext(value);
        } else {
          this.applySingleValue(value);
        }
      };
      SingleSubscriber.prototype.tryNext = function(value) {
        try {
          var result = this.predicate(value, this.index, this.source);
          if (result) {
            this.applySingleValue(value);
          }
        } catch (err) {
          this.destination.error(err);
        }
      };
      SingleSubscriber.prototype._complete = function() {
        var destination = this.destination;
        if (this.index > 0) {
          destination.next(this.seenValue ? this.singleValue : undefined);
          destination.complete();
        } else {
          destination.error(new EmptyError);
        }
      };
      return SingleSubscriber;
    }(Subscriber));
    Observable.prototype.single = single;
    function skip(total) {
      return this.lift(new SkipOperator(total));
    }
    var SkipOperator = (function() {
      function SkipOperator(total) {
        this.total = total;
      }
      SkipOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SkipSubscriber(subscriber, this.total));
      };
      return SkipOperator;
    }());
    var SkipSubscriber = (function(_super) {
      __extends(SkipSubscriber, _super);
      function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
      }
      SkipSubscriber.prototype._next = function(x) {
        if (++this.count > this.total) {
          this.destination.next(x);
        }
      };
      return SkipSubscriber;
    }(Subscriber));
    Observable.prototype.skip = skip;
    function skipUntil(notifier) {
      return this.lift(new SkipUntilOperator(notifier));
    }
    var SkipUntilOperator = (function() {
      function SkipUntilOperator(notifier) {
        this.notifier = notifier;
      }
      SkipUntilOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
      };
      return SkipUntilOperator;
    }());
    var SkipUntilSubscriber = (function(_super) {
      __extends(SkipUntilSubscriber, _super);
      function SkipUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.hasValue = false;
        this.isInnerStopped = false;
        this.add(subscribeToResult(this, notifier));
      }
      SkipUntilSubscriber.prototype._next = function(value) {
        if (this.hasValue) {
          _super.prototype._next.call(this, value);
        }
      };
      SkipUntilSubscriber.prototype._complete = function() {
        if (this.isInnerStopped) {
          _super.prototype._complete.call(this);
        } else {
          this.unsubscribe();
        }
      };
      SkipUntilSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
      };
      SkipUntilSubscriber.prototype.notifyComplete = function() {
        this.isInnerStopped = true;
        if (this.isStopped) {
          _super.prototype._complete.call(this);
        }
      };
      return SkipUntilSubscriber;
    }(OuterSubscriber));
    Observable.prototype.skipUntil = skipUntil;
    function skipWhile(predicate) {
      return this.lift(new SkipWhileOperator(predicate));
    }
    var SkipWhileOperator = (function() {
      function SkipWhileOperator(predicate) {
        this.predicate = predicate;
      }
      SkipWhileOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
      };
      return SkipWhileOperator;
    }());
    var SkipWhileSubscriber = (function(_super) {
      __extends(SkipWhileSubscriber, _super);
      function SkipWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
      }
      SkipWhileSubscriber.prototype._next = function(value) {
        var destination = this.destination;
        if (this.skipping) {
          this.tryCallPredicate(value);
        }
        if (!this.skipping) {
          destination.next(value);
        }
      };
      SkipWhileSubscriber.prototype.tryCallPredicate = function(value) {
        try {
          var result = this.predicate(value, this.index++);
          this.skipping = Boolean(result);
        } catch (err) {
          this.destination.error(err);
        }
      };
      return SkipWhileSubscriber;
    }(Subscriber));
    Observable.prototype.skipWhile = skipWhile;
    function startWith() {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
      }
      var scheduler = array[array.length - 1];
      if (isScheduler(scheduler)) {
        array.pop();
      } else {
        scheduler = null;
      }
      var len = array.length;
      if (len === 1) {
        return concatStatic(new ScalarObservable(array[0], scheduler), this);
      } else if (len > 1) {
        return concatStatic(new ArrayObservable(array, scheduler), this);
      } else {
        return concatStatic(new EmptyObservable(scheduler), this);
      }
    }
    Observable.prototype.startWith = startWith;
    var ImmediateDefinition = (function() {
      function ImmediateDefinition(root$$1) {
        this.root = root$$1;
        if (root$$1.setImmediate && typeof root$$1.setImmediate === 'function') {
          this.setImmediate = root$$1.setImmediate.bind(root$$1);
          this.clearImmediate = root$$1.clearImmediate.bind(root$$1);
        } else {
          this.nextHandle = 1;
          this.tasksByHandle = {};
          this.currentlyRunningATask = false;
          if (this.canUseProcessNextTick()) {
            this.setImmediate = this.createProcessNextTickSetImmediate();
          } else if (this.canUsePostMessage()) {
            this.setImmediate = this.createPostMessageSetImmediate();
          } else if (this.canUseMessageChannel()) {
            this.setImmediate = this.createMessageChannelSetImmediate();
          } else if (this.canUseReadyStateChange()) {
            this.setImmediate = this.createReadyStateChangeSetImmediate();
          } else {
            this.setImmediate = this.createSetTimeoutSetImmediate();
          }
          var ci = function clearImmediate(handle) {
            delete clearImmediate.instance.tasksByHandle[handle];
          };
          ci.instance = this;
          this.clearImmediate = ci;
        }
      }
      ImmediateDefinition.prototype.identify = function(o) {
        return this.root.Object.prototype.toString.call(o);
      };
      ImmediateDefinition.prototype.canUseProcessNextTick = function() {
        return this.identify(this.root.process) === '[object process]';
      };
      ImmediateDefinition.prototype.canUseMessageChannel = function() {
        return Boolean(this.root.MessageChannel);
      };
      ImmediateDefinition.prototype.canUseReadyStateChange = function() {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
      };
      ImmediateDefinition.prototype.canUsePostMessage = function() {
        var root$$1 = this.root;
        if (root$$1.postMessage && !root$$1.importScripts) {
          var postMessageIsAsynchronous_1 = true;
          var oldOnMessage = root$$1.onmessage;
          root$$1.onmessage = function() {
            postMessageIsAsynchronous_1 = false;
          };
          root$$1.postMessage('', '*');
          root$$1.onmessage = oldOnMessage;
          return postMessageIsAsynchronous_1;
        }
        return false;
      };
      ImmediateDefinition.prototype.partiallyApplied = function(handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
          var _a = result,
              handler = _a.handler,
              args = _a.args;
          if (typeof handler === 'function') {
            handler.apply(undefined, args);
          } else {
            (new Function('' + handler))();
          }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
      };
      ImmediateDefinition.prototype.addFromSetImmediateArguments = function(args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
      };
      ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function() {
        var fn = function setImmediate() {
          var instance = setImmediate.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
          return handle;
        };
        fn.instance = this;
        return fn;
      };
      ImmediateDefinition.prototype.createPostMessageSetImmediate = function() {
        var root$$1 = this.root;
        var messagePrefix = 'setImmediate$' + root$$1.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
          var instance = globalMessageHandler.instance;
          if (event.source === root$$1 && typeof event.data === 'string' && event.data.indexOf(messagePrefix) === 0) {
            instance.runIfPresent(+event.data.slice(messagePrefix.length));
          }
        };
        onGlobalMessage.instance = this;
        root$$1.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
          var _a = setImmediate,
              messagePrefix = _a.messagePrefix,
              instance = _a.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          instance.root.postMessage(messagePrefix + handle, '*');
          return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
      };
      ImmediateDefinition.prototype.runIfPresent = function(handle) {
        if (this.currentlyRunningATask) {
          this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        } else {
          var task = this.tasksByHandle[handle];
          if (task) {
            this.currentlyRunningATask = true;
            try {
              task();
            } finally {
              this.clearImmediate(handle);
              this.currentlyRunningATask = false;
            }
          }
        }
      };
      ImmediateDefinition.prototype.createMessageChannelSetImmediate = function() {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function(event) {
          var handle = event.data;
          _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
          var _a = setImmediate,
              channel = _a.channel,
              instance = _a.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          channel.port2.postMessage(handle);
          return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
      };
      ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function() {
        var fn = function setImmediate() {
          var instance = setImmediate.instance;
          var root$$1 = instance.root;
          var doc = root$$1.document;
          var html = doc.documentElement;
          var handle = instance.addFromSetImmediateArguments(arguments);
          var script = doc.createElement('script');
          script.onreadystatechange = function() {
            instance.runIfPresent(handle);
            script.onreadystatechange = null;
            html.removeChild(script);
            script = null;
          };
          html.appendChild(script);
          return handle;
        };
        fn.instance = this;
        return fn;
      };
      ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function() {
        var fn = function setImmediate() {
          var instance = setImmediate.instance;
          var handle = instance.addFromSetImmediateArguments(arguments);
          instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
          return handle;
        };
        fn.instance = this;
        return fn;
      };
      return ImmediateDefinition;
    }());
    var Immediate = new ImmediateDefinition(root);
    var AsapAction = (function(_super) {
      __extends(AsapAction, _super);
      function AsapAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
      }
      AsapAction.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
      };
      AsapAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
          Immediate.clearImmediate(id);
          scheduler.scheduled = undefined;
        }
        return undefined;
      };
      return AsapAction;
    }(AsyncAction));
    var AsapScheduler = (function(_super) {
      __extends(AsapScheduler, _super);
      function AsapScheduler() {
        _super.apply(this, arguments);
      }
      AsapScheduler.prototype.flush = function(action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
          while (++index < count && (action = actions.shift())) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsapScheduler;
    }(AsyncScheduler));
    var asap = new AsapScheduler(AsapAction);
    var SubscribeOnObservable = (function(_super) {
      __extends(SubscribeOnObservable, _super);
      function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
          delayTime = 0;
        }
        if (scheduler === void 0) {
          scheduler = asap;
        }
        _super.call(this);
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric(delayTime) || delayTime < 0) {
          this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
          this.scheduler = asap;
        }
      }
      SubscribeOnObservable.create = function(source, delay, scheduler) {
        if (delay === void 0) {
          delay = 0;
        }
        if (scheduler === void 0) {
          scheduler = asap;
        }
        return new SubscribeOnObservable(source, delay, scheduler);
      };
      SubscribeOnObservable.dispatch = function(arg) {
        var source = arg.source,
            subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
      };
      SubscribeOnObservable.prototype._subscribe = function(subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
          source: source,
          subscriber: subscriber
        });
      };
      return SubscribeOnObservable;
    }(Observable));
    function subscribeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this.lift(new SubscribeOnOperator(scheduler, delay));
    }
    var SubscribeOnOperator = (function() {
      function SubscribeOnOperator(scheduler, delay) {
        this.scheduler = scheduler;
        this.delay = delay;
      }
      SubscribeOnOperator.prototype.call = function(subscriber, source) {
        return new SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
      };
      return SubscribeOnOperator;
    }());
    Observable.prototype.subscribeOn = subscribeOn;
    function _switch() {
      return this.lift(new SwitchOperator());
    }
    var SwitchOperator = (function() {
      function SwitchOperator() {}
      SwitchOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SwitchSubscriber(subscriber));
      };
      return SwitchOperator;
    }());
    var SwitchSubscriber = (function(_super) {
      __extends(SwitchSubscriber, _super);
      function SwitchSubscriber(destination) {
        _super.call(this, destination);
        this.active = 0;
        this.hasCompleted = false;
      }
      SwitchSubscriber.prototype._next = function(value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = subscribeToResult(this, value));
      };
      SwitchSubscriber.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0) {
          this.destination.complete();
        }
      };
      SwitchSubscriber.prototype.unsubscribeInner = function() {
        this.active = this.active > 0 ? this.active - 1 : 0;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
          innerSubscription.unsubscribe();
          this.remove(innerSubscription);
        }
      };
      SwitchSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
      };
      SwitchSubscriber.prototype.notifyError = function(err) {
        this.destination.error(err);
      };
      SwitchSubscriber.prototype.notifyComplete = function() {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
          this.destination.complete();
        }
      };
      return SwitchSubscriber;
    }(OuterSubscriber));
    Observable.prototype.switch = _switch;
    Observable.prototype._switch = _switch;
    function switchMap(project, resultSelector) {
      return this.lift(new SwitchMapOperator(project, resultSelector));
    }
    var SwitchMapOperator = (function() {
      function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
      }
      SwitchMapOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
      };
      return SwitchMapOperator;
    }());
    var SwitchMapSubscriber = (function(_super) {
      __extends(SwitchMapSubscriber, _super);
      function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
      }
      SwitchMapSubscriber.prototype._next = function(value) {
        var result;
        var index = this.index++;
        try {
          result = this.project(value, index);
        } catch (error) {
          this.destination.error(error);
          return;
        }
        this._innerSub(result, value, index);
      };
      SwitchMapSubscriber.prototype._innerSub = function(result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
          innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult(this, result, value, index));
      };
      SwitchMapSubscriber.prototype._complete = function() {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapSubscriber.prototype._unsubscribe = function() {
        this.innerSubscription = null;
      };
      SwitchMapSubscriber.prototype.notifyComplete = function(innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
          this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        } else {
          this.destination.next(innerValue);
        }
      };
      SwitchMapSubscriber.prototype._tryNotifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
          result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return SwitchMapSubscriber;
    }(OuterSubscriber));
    Observable.prototype.switchMap = switchMap;
    function switchMapTo(innerObservable, resultSelector) {
      return this.lift(new SwitchMapToOperator(innerObservable, resultSelector));
    }
    var SwitchMapToOperator = (function() {
      function SwitchMapToOperator(observable, resultSelector) {
        this.observable = observable;
        this.resultSelector = resultSelector;
      }
      SwitchMapToOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
      };
      return SwitchMapToOperator;
    }());
    var SwitchMapToSubscriber = (function(_super) {
      __extends(SwitchMapToSubscriber, _super);
      function SwitchMapToSubscriber(destination, inner, resultSelector) {
        _super.call(this, destination);
        this.inner = inner;
        this.resultSelector = resultSelector;
        this.index = 0;
      }
      SwitchMapToSubscriber.prototype._next = function(value) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
          innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult(this, this.inner, value, this.index++));
      };
      SwitchMapToSubscriber.prototype._complete = function() {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapToSubscriber.prototype._unsubscribe = function() {
        this.innerSubscription = null;
      };
      SwitchMapToSubscriber.prototype.notifyComplete = function(innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
          _super.prototype._complete.call(this);
        }
      };
      SwitchMapToSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        if (resultSelector) {
          this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        } else {
          destination.next(innerValue);
        }
      };
      SwitchMapToSubscriber.prototype.tryResultSelector = function(outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this,
            resultSelector = _a.resultSelector,
            destination = _a.destination;
        var result;
        try {
          result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        } catch (err) {
          destination.error(err);
          return;
        }
        destination.next(result);
      };
      return SwitchMapToSubscriber;
    }(OuterSubscriber));
    Observable.prototype.switchMapTo = switchMapTo;
    function take(count) {
      if (count === 0) {
        return new EmptyObservable();
      } else {
        return this.lift(new TakeOperator(count));
      }
    }
    var TakeOperator = (function() {
      function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
          throw new ArgumentOutOfRangeError;
        }
      }
      TakeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
      };
      return TakeOperator;
    }());
    var TakeSubscriber = (function(_super) {
      __extends(TakeSubscriber, _super);
      function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
      }
      TakeSubscriber.prototype._next = function(value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
          this.destination.next(value);
          if (count === total) {
            this.destination.complete();
            this.unsubscribe();
          }
        }
      };
      return TakeSubscriber;
    }(Subscriber));
    Observable.prototype.take = take;
    function takeLast(count) {
      if (count === 0) {
        return new EmptyObservable();
      } else {
        return this.lift(new TakeLastOperator(count));
      }
    }
    var TakeLastOperator = (function() {
      function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
          throw new ArgumentOutOfRangeError;
        }
      }
      TakeLastOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
      };
      return TakeLastOperator;
    }());
    var TakeLastSubscriber = (function(_super) {
      __extends(TakeLastSubscriber, _super);
      function TakeLastSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
      }
      TakeLastSubscriber.prototype._next = function(value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
          ring.push(value);
        } else {
          var index = count % total;
          ring[index] = value;
        }
      };
      TakeLastSubscriber.prototype._complete = function() {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
          var total = this.count >= this.total ? this.total : this.count;
          var ring = this.ring;
          for (var i = 0; i < total; i++) {
            var idx = (count++) % total;
            destination.next(ring[idx]);
          }
        }
        destination.complete();
      };
      return TakeLastSubscriber;
    }(Subscriber));
    Observable.prototype.takeLast = takeLast;
    function takeUntil(notifier) {
      return this.lift(new TakeUntilOperator(notifier));
    }
    var TakeUntilOperator = (function() {
      function TakeUntilOperator(notifier) {
        this.notifier = notifier;
      }
      TakeUntilOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
      };
      return TakeUntilOperator;
    }());
    var TakeUntilSubscriber = (function(_super) {
      __extends(TakeUntilSubscriber, _super);
      function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult(this, notifier));
      }
      TakeUntilSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
      };
      TakeUntilSubscriber.prototype.notifyComplete = function() {};
      return TakeUntilSubscriber;
    }(OuterSubscriber));
    Observable.prototype.takeUntil = takeUntil;
    function takeWhile(predicate) {
      return this.lift(new TakeWhileOperator(predicate));
    }
    var TakeWhileOperator = (function() {
      function TakeWhileOperator(predicate) {
        this.predicate = predicate;
      }
      TakeWhileOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
      };
      return TakeWhileOperator;
    }());
    var TakeWhileSubscriber = (function(_super) {
      __extends(TakeWhileSubscriber, _super);
      function TakeWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.index = 0;
      }
      TakeWhileSubscriber.prototype._next = function(value) {
        var destination = this.destination;
        var result;
        try {
          result = this.predicate(value, this.index++);
        } catch (err) {
          destination.error(err);
          return;
        }
        this.nextOrComplete(value, result);
      };
      TakeWhileSubscriber.prototype.nextOrComplete = function(value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
          destination.next(value);
        } else {
          destination.complete();
        }
      };
      return TakeWhileSubscriber;
    }(Subscriber));
    Observable.prototype.takeWhile = takeWhile;
    function throttle(durationSelector) {
      return this.lift(new ThrottleOperator(durationSelector));
    }
    var ThrottleOperator = (function() {
      function ThrottleOperator(durationSelector) {
        this.durationSelector = durationSelector;
      }
      ThrottleOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
      };
      return ThrottleOperator;
    }());
    var ThrottleSubscriber = (function(_super) {
      __extends(ThrottleSubscriber, _super);
      function ThrottleSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.destination = destination;
        this.durationSelector = durationSelector;
      }
      ThrottleSubscriber.prototype._next = function(value) {
        if (!this.throttled) {
          this.tryDurationSelector(value);
        }
      };
      ThrottleSubscriber.prototype.tryDurationSelector = function(value) {
        var duration = null;
        try {
          duration = this.durationSelector(value);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.emitAndThrottle(value, duration);
      };
      ThrottleSubscriber.prototype.emitAndThrottle = function(value, duration) {
        this.add(this.throttled = subscribeToResult(this, duration));
        this.destination.next(value);
      };
      ThrottleSubscriber.prototype._unsubscribe = function() {
        var throttled = this.throttled;
        if (throttled) {
          this.remove(throttled);
          this.throttled = null;
          throttled.unsubscribe();
        }
      };
      ThrottleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._unsubscribe();
      };
      ThrottleSubscriber.prototype.notifyComplete = function() {
        this._unsubscribe();
      };
      return ThrottleSubscriber;
    }(OuterSubscriber));
    Observable.prototype.throttle = throttle;
    function throttleTime(duration, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      return this.lift(new ThrottleTimeOperator(duration, scheduler));
    }
    var ThrottleTimeOperator = (function() {
      function ThrottleTimeOperator(duration, scheduler) {
        this.duration = duration;
        this.scheduler = scheduler;
      }
      ThrottleTimeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
      };
      return ThrottleTimeOperator;
    }());
    var ThrottleTimeSubscriber = (function(_super) {
      __extends(ThrottleTimeSubscriber, _super);
      function ThrottleTimeSubscriber(destination, duration, scheduler) {
        _super.call(this, destination);
        this.duration = duration;
        this.scheduler = scheduler;
      }
      ThrottleTimeSubscriber.prototype._next = function(value) {
        if (!this.throttled) {
          this.add(this.throttled = this.scheduler.schedule(dispatchNext$5, this.duration, {subscriber: this}));
          this.destination.next(value);
        }
      };
      ThrottleTimeSubscriber.prototype.clearThrottle = function() {
        var throttled = this.throttled;
        if (throttled) {
          throttled.unsubscribe();
          this.remove(throttled);
          this.throttled = null;
        }
      };
      return ThrottleTimeSubscriber;
    }(Subscriber));
    function dispatchNext$5(arg) {
      var subscriber = arg.subscriber;
      subscriber.clearThrottle();
    }
    Observable.prototype.throttleTime = throttleTime;
    function timeInterval(scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      return this.lift(new TimeIntervalOperator(scheduler));
    }
    var TimeInterval = (function() {
      function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
      }
      return TimeInterval;
    }());
    var TimeIntervalOperator = (function() {
      function TimeIntervalOperator(scheduler) {
        this.scheduler = scheduler;
      }
      TimeIntervalOperator.prototype.call = function(observer, source) {
        return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
      };
      return TimeIntervalOperator;
    }());
    var TimeIntervalSubscriber = (function(_super) {
      __extends(TimeIntervalSubscriber, _super);
      function TimeIntervalSubscriber(destination, scheduler) {
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.lastTime = 0;
        this.lastTime = scheduler.now();
      }
      TimeIntervalSubscriber.prototype._next = function(value) {
        var now = this.scheduler.now();
        var span = now - this.lastTime;
        this.lastTime = now;
        this.destination.next(new TimeInterval(value, span));
      };
      return TimeIntervalSubscriber;
    }(Subscriber));
    Observable.prototype.timeInterval = timeInterval;
    var TimeoutError = (function(_super) {
      __extends(TimeoutError, _super);
      function TimeoutError() {
        var err = _super.call(this, 'Timeout has occurred');
        this.name = err.name = 'TimeoutError';
        this.stack = err.stack;
        this.message = err.message;
      }
      return TimeoutError;
    }(Error));
    function timeout(due, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      var absoluteTimeout = isDate(due);
      var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
      return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError()));
    }
    var TimeoutOperator = (function() {
      function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
      }
      TimeoutOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
      };
      return TimeoutOperator;
    }());
    var TimeoutSubscriber = (function(_super) {
      __extends(TimeoutSubscriber, _super);
      function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
        _super.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
      }
      Object.defineProperty(TimeoutSubscriber.prototype, "previousIndex", {
        get: function() {
          return this._previousIndex;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimeoutSubscriber.prototype, "hasCompleted", {
        get: function() {
          return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
      });
      TimeoutSubscriber.dispatchTimeout = function(state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
          source.notifyTimeout();
        }
      };
      TimeoutSubscriber.prototype.scheduleTimeout = function() {
        var currentIndex = this.index;
        this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, {
          subscriber: this,
          index: currentIndex
        });
        this.index++;
        this._previousIndex = currentIndex;
      };
      TimeoutSubscriber.prototype._next = function(value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
          this.scheduleTimeout();
        }
      };
      TimeoutSubscriber.prototype._error = function(err) {
        this.destination.error(err);
        this._hasCompleted = true;
      };
      TimeoutSubscriber.prototype._complete = function() {
        this.destination.complete();
        this._hasCompleted = true;
      };
      TimeoutSubscriber.prototype.notifyTimeout = function() {
        this.error(this.errorInstance);
      };
      return TimeoutSubscriber;
    }(Subscriber));
    Observable.prototype.timeout = timeout;
    function timeoutWith(due, withObservable, scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      var absoluteTimeout = isDate(due);
      var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
      return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    }
    var TimeoutWithOperator = (function() {
      function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
      }
      TimeoutWithOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
      };
      return TimeoutWithOperator;
    }());
    var TimeoutWithSubscriber = (function(_super) {
      __extends(TimeoutWithSubscriber, _super);
      function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _super.call(this);
        this.destination = destination;
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.timeoutSubscription = undefined;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        destination.add(this);
        this.scheduleTimeout();
      }
      Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
        get: function() {
          return this._previousIndex;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
        get: function() {
          return this._hasCompleted;
        },
        enumerable: true,
        configurable: true
      });
      TimeoutWithSubscriber.dispatchTimeout = function(state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
          source.handleTimeout();
        }
      };
      TimeoutWithSubscriber.prototype.scheduleTimeout = function() {
        var currentIndex = this.index;
        var timeoutState = {
          subscriber: this,
          index: currentIndex
        };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
        this.index++;
        this._previousIndex = currentIndex;
      };
      TimeoutWithSubscriber.prototype._next = function(value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
          this.scheduleTimeout();
        }
      };
      TimeoutWithSubscriber.prototype._error = function(err) {
        this.destination.error(err);
        this._hasCompleted = true;
      };
      TimeoutWithSubscriber.prototype._complete = function() {
        this.destination.complete();
        this._hasCompleted = true;
      };
      TimeoutWithSubscriber.prototype.handleTimeout = function() {
        if (!this.closed) {
          var withObservable = this.withObservable;
          this.unsubscribe();
          this.destination.add(this.timeoutSubscription = subscribeToResult(this, withObservable));
        }
      };
      return TimeoutWithSubscriber;
    }(OuterSubscriber));
    Observable.prototype.timeoutWith = timeoutWith;
    function timestamp(scheduler) {
      if (scheduler === void 0) {
        scheduler = async;
      }
      return this.lift(new TimestampOperator(scheduler));
    }
    var Timestamp = (function() {
      function Timestamp(value, timestamp) {
        this.value = value;
        this.timestamp = timestamp;
      }
      return Timestamp;
    }());
    var TimestampOperator = (function() {
      function TimestampOperator(scheduler) {
        this.scheduler = scheduler;
      }
      TimestampOperator.prototype.call = function(observer, source) {
        return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
      };
      return TimestampOperator;
    }());
    var TimestampSubscriber = (function(_super) {
      __extends(TimestampSubscriber, _super);
      function TimestampSubscriber(destination, scheduler) {
        _super.call(this, destination);
        this.scheduler = scheduler;
      }
      TimestampSubscriber.prototype._next = function(value) {
        var now = this.scheduler.now();
        this.destination.next(new Timestamp(value, now));
      };
      return TimestampSubscriber;
    }(Subscriber));
    Observable.prototype.timestamp = timestamp;
    function toArray() {
      return this.lift(new ToArrayOperator());
    }
    var ToArrayOperator = (function() {
      function ToArrayOperator() {}
      ToArrayOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new ToArraySubscriber(subscriber));
      };
      return ToArrayOperator;
    }());
    var ToArraySubscriber = (function(_super) {
      __extends(ToArraySubscriber, _super);
      function ToArraySubscriber(destination) {
        _super.call(this, destination);
        this.array = [];
      }
      ToArraySubscriber.prototype._next = function(x) {
        this.array.push(x);
      };
      ToArraySubscriber.prototype._complete = function() {
        this.destination.next(this.array);
        this.destination.complete();
      };
      return ToArraySubscriber;
    }(Subscriber));
    Observable.prototype.toArray = toArray;
    function toPromise(PromiseCtor) {
      var _this = this;
      if (!PromiseCtor) {
        if (root.Rx && root.Rx.config && root.Rx.config.Promise) {
          PromiseCtor = root.Rx.config.Promise;
        } else if (root.Promise) {
          PromiseCtor = root.Promise;
        }
      }
      if (!PromiseCtor) {
        throw new Error('no Promise impl found');
      }
      return new PromiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    }
    Observable.prototype.toPromise = toPromise;
    function window$1(windowBoundaries) {
      return this.lift(new WindowOperator(windowBoundaries));
    }
    var WindowOperator = (function() {
      function WindowOperator(windowBoundaries) {
        this.windowBoundaries = windowBoundaries;
      }
      WindowOperator.prototype.call = function(subscriber, source) {
        var windowSubscriber = new WindowSubscriber(subscriber);
        var sourceSubscription = source.subscribe(windowSubscriber);
        if (!sourceSubscription.closed) {
          windowSubscriber.add(subscribeToResult(windowSubscriber, this.windowBoundaries));
        }
        return sourceSubscription;
      };
      return WindowOperator;
    }());
    var WindowSubscriber = (function(_super) {
      __extends(WindowSubscriber, _super);
      function WindowSubscriber(destination) {
        _super.call(this, destination);
        this.window = new Subject();
        destination.next(this.window);
      }
      WindowSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow();
      };
      WindowSubscriber.prototype.notifyError = function(error, innerSub) {
        this._error(error);
      };
      WindowSubscriber.prototype.notifyComplete = function(innerSub) {
        this._complete();
      };
      WindowSubscriber.prototype._next = function(value) {
        this.window.next(value);
      };
      WindowSubscriber.prototype._error = function(err) {
        this.window.error(err);
        this.destination.error(err);
      };
      WindowSubscriber.prototype._complete = function() {
        this.window.complete();
        this.destination.complete();
      };
      WindowSubscriber.prototype._unsubscribe = function() {
        this.window = null;
      };
      WindowSubscriber.prototype.openWindow = function() {
        var prevWindow = this.window;
        if (prevWindow) {
          prevWindow.complete();
        }
        var destination = this.destination;
        var newWindow = this.window = new Subject();
        destination.next(newWindow);
      };
      return WindowSubscriber;
    }(OuterSubscriber));
    Observable.prototype.window = window$1;
    function windowCount(windowSize, startWindowEvery) {
      if (startWindowEvery === void 0) {
        startWindowEvery = 0;
      }
      return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
    }
    var WindowCountOperator = (function() {
      function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
      }
      WindowCountOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
      };
      return WindowCountOperator;
    }());
    var WindowCountSubscriber = (function(_super) {
      __extends(WindowCountSubscriber, _super);
      function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new Subject()];
        this.count = 0;
        destination.next(this.windows[0]);
      }
      WindowCountSubscriber.prototype._next = function(value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
          windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
          windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
          var window_1 = new Subject();
          windows.push(window_1);
          destination.next(window_1);
        }
      };
      WindowCountSubscriber.prototype._error = function(err) {
        var windows = this.windows;
        if (windows) {
          while (windows.length > 0 && !this.closed) {
            windows.shift().error(err);
          }
        }
        this.destination.error(err);
      };
      WindowCountSubscriber.prototype._complete = function() {
        var windows = this.windows;
        if (windows) {
          while (windows.length > 0 && !this.closed) {
            windows.shift().complete();
          }
        }
        this.destination.complete();
      };
      WindowCountSubscriber.prototype._unsubscribe = function() {
        this.count = 0;
        this.windows = null;
      };
      return WindowCountSubscriber;
    }(Subscriber));
    Observable.prototype.windowCount = windowCount;
    function windowTime(windowTimeSpan, windowCreationInterval, scheduler) {
      if (windowCreationInterval === void 0) {
        windowCreationInterval = null;
      }
      if (scheduler === void 0) {
        scheduler = async;
      }
      return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
    }
    var WindowTimeOperator = (function() {
      function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
      }
      WindowTimeOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler));
      };
      return WindowTimeOperator;
    }());
    var WindowTimeSubscriber = (function(_super) {
      __extends(WindowTimeSubscriber, _super);
      function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        _super.call(this, destination);
        this.destination = destination;
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
        this.windows = [];
        var window = this.openWindow();
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
          var closeState = {
            subscriber: this,
            window: window,
            context: null
          };
          var creationState = {
            windowTimeSpan: windowTimeSpan,
            windowCreationInterval: windowCreationInterval,
            subscriber: this,
            scheduler: scheduler
          };
          this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
          this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        } else {
          var timeSpanOnlyState = {
            subscriber: this,
            window: window,
            windowTimeSpan: windowTimeSpan
          };
          this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
      }
      WindowTimeSubscriber.prototype._next = function(value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
          var window_1 = windows[i];
          if (!window_1.closed) {
            window_1.next(value);
          }
        }
      };
      WindowTimeSubscriber.prototype._error = function(err) {
        var windows = this.windows;
        while (windows.length > 0) {
          windows.shift().error(err);
        }
        this.destination.error(err);
      };
      WindowTimeSubscriber.prototype._complete = function() {
        var windows = this.windows;
        while (windows.length > 0) {
          var window_2 = windows.shift();
          if (!window_2.closed) {
            window_2.complete();
          }
        }
        this.destination.complete();
      };
      WindowTimeSubscriber.prototype.openWindow = function() {
        var window = new Subject();
        this.windows.push(window);
        var destination = this.destination;
        destination.next(window);
        return window;
      };
      WindowTimeSubscriber.prototype.closeWindow = function(window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
      };
      return WindowTimeSubscriber;
    }(Subscriber));
    function dispatchWindowTimeSpanOnly(state) {
      var subscriber = state.subscriber,
          windowTimeSpan = state.windowTimeSpan,
          window = state.window;
      if (window) {
        subscriber.closeWindow(window);
      }
      state.window = subscriber.openWindow();
      this.schedule(state, windowTimeSpan);
    }
    function dispatchWindowCreation(state) {
      var windowTimeSpan = state.windowTimeSpan,
          subscriber = state.subscriber,
          scheduler = state.scheduler,
          windowCreationInterval = state.windowCreationInterval;
      var window = subscriber.openWindow();
      var action = this;
      var context = {
        action: action,
        subscription: null
      };
      var timeSpanState = {
        subscriber: subscriber,
        window: window,
        context: context
      };
      context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
      action.add(context.subscription);
      action.schedule(state, windowCreationInterval);
    }
    function dispatchWindowClose(state) {
      var subscriber = state.subscriber,
          window = state.window,
          context = state.context;
      if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
      }
      subscriber.closeWindow(window);
    }
    Observable.prototype.windowTime = windowTime;
    function windowToggle(openings, closingSelector) {
      return this.lift(new WindowToggleOperator(openings, closingSelector));
    }
    var WindowToggleOperator = (function() {
      function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
      }
      WindowToggleOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
      };
      return WindowToggleOperator;
    }());
    var WindowToggleSubscriber = (function(_super) {
      __extends(WindowToggleSubscriber, _super);
      function WindowToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openSubscription = subscribeToResult(this, openings, openings));
      }
      WindowToggleSubscriber.prototype._next = function(value) {
        var contexts = this.contexts;
        if (contexts) {
          var len = contexts.length;
          for (var i = 0; i < len; i++) {
            contexts[i].window.next(value);
          }
        }
      };
      WindowToggleSubscriber.prototype._error = function(err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
          var len = contexts.length;
          var index = -1;
          while (++index < len) {
            var context = contexts[index];
            context.window.error(err);
            context.subscription.unsubscribe();
          }
        }
        _super.prototype._error.call(this, err);
      };
      WindowToggleSubscriber.prototype._complete = function() {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
          var len = contexts.length;
          var index = -1;
          while (++index < len) {
            var context = contexts[index];
            context.window.complete();
            context.subscription.unsubscribe();
          }
        }
        _super.prototype._complete.call(this);
      };
      WindowToggleSubscriber.prototype._unsubscribe = function() {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
          var len = contexts.length;
          var index = -1;
          while (++index < len) {
            var context = contexts[index];
            context.window.unsubscribe();
            context.subscription.unsubscribe();
          }
        }
      };
      WindowToggleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
          var closingSelector = this.closingSelector;
          var closingNotifier = tryCatch(closingSelector)(innerValue);
          if (closingNotifier === errorObject) {
            return this.error(errorObject.e);
          } else {
            var window_1 = new Subject();
            var subscription = new Subscription();
            var context = {
              window: window_1,
              subscription: subscription
            };
            this.contexts.push(context);
            var innerSubscription = subscribeToResult(this, closingNotifier, context);
            if (innerSubscription.closed) {
              this.closeWindow(this.contexts.length - 1);
            } else {
              innerSubscription.context = context;
              subscription.add(innerSubscription);
            }
            this.destination.next(window_1);
          }
        } else {
          this.closeWindow(this.contexts.indexOf(outerValue));
        }
      };
      WindowToggleSubscriber.prototype.notifyError = function(err) {
        this.error(err);
      };
      WindowToggleSubscriber.prototype.notifyComplete = function(inner) {
        if (inner !== this.openSubscription) {
          this.closeWindow(this.contexts.indexOf(inner.context));
        }
      };
      WindowToggleSubscriber.prototype.closeWindow = function(index) {
        if (index === -1) {
          return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window,
            subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
      };
      return WindowToggleSubscriber;
    }(OuterSubscriber));
    Observable.prototype.windowToggle = windowToggle;
    function windowWhen(closingSelector) {
      return this.lift(new WindowOperator$1(closingSelector));
    }
    var WindowOperator$1 = (function() {
      function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
      }
      WindowOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new WindowSubscriber$1(subscriber, this.closingSelector));
      };
      return WindowOperator;
    }());
    var WindowSubscriber$1 = (function(_super) {
      __extends(WindowSubscriber, _super);
      function WindowSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.destination = destination;
        this.closingSelector = closingSelector;
        this.openWindow();
      }
      WindowSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow(innerSub);
      };
      WindowSubscriber.prototype.notifyError = function(error, innerSub) {
        this._error(error);
      };
      WindowSubscriber.prototype.notifyComplete = function(innerSub) {
        this.openWindow(innerSub);
      };
      WindowSubscriber.prototype._next = function(value) {
        this.window.next(value);
      };
      WindowSubscriber.prototype._error = function(err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
      };
      WindowSubscriber.prototype._complete = function() {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
      };
      WindowSubscriber.prototype.unsubscribeClosingNotification = function() {
        if (this.closingNotification) {
          this.closingNotification.unsubscribe();
        }
      };
      WindowSubscriber.prototype.openWindow = function(innerSub) {
        if (innerSub === void 0) {
          innerSub = null;
        }
        if (innerSub) {
          this.remove(innerSub);
          innerSub.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
          prevWindow.complete();
        }
        var window = this.window = new Subject();
        this.destination.next(window);
        var closingNotifier = tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject) {
          var err = errorObject.e;
          this.destination.error(err);
          this.window.error(err);
        } else {
          this.add(this.closingNotification = subscribeToResult(this, closingNotifier));
        }
      };
      return WindowSubscriber;
    }(OuterSubscriber));
    Observable.prototype.windowWhen = windowWhen;
    function withLatestFrom() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var project;
      if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
      }
      var observables = args;
      return this.lift(new WithLatestFromOperator(observables, project));
    }
    var WithLatestFromOperator = (function() {
      function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
      }
      WithLatestFromOperator.prototype.call = function(subscriber, source) {
        return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
      };
      return WithLatestFromOperator;
    }());
    var WithLatestFromSubscriber = (function(_super) {
      __extends(WithLatestFromSubscriber, _super);
      function WithLatestFromSubscriber(destination, observables, project) {
        _super.call(this, destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        var len = observables.length;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
          this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
          var observable = observables[i];
          this.add(subscribeToResult(this, observable, observable, i));
        }
      }
      WithLatestFromSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
          var found = toRespond.indexOf(outerIndex);
          if (found !== -1) {
            toRespond.splice(found, 1);
          }
        }
      };
      WithLatestFromSubscriber.prototype.notifyComplete = function() {};
      WithLatestFromSubscriber.prototype._next = function(value) {
        if (this.toRespond.length === 0) {
          var args = [value].concat(this.values);
          if (this.project) {
            this._tryProject(args);
          } else {
            this.destination.next(args);
          }
        }
      };
      WithLatestFromSubscriber.prototype._tryProject = function(args) {
        var result;
        try {
          result = this.project.apply(this, args);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return WithLatestFromSubscriber;
    }(OuterSubscriber));
    Observable.prototype.withLatestFrom = withLatestFrom;
    Observable.prototype.zip = zipProto;
    function zipAll(project) {
      return this.lift(new ZipOperator(project));
    }
    Observable.prototype.zipAll = zipAll;
    var SubscriptionLog = (function() {
      function SubscriptionLog(subscribedFrame, unsubscribedFrame) {
        if (unsubscribedFrame === void 0) {
          unsubscribedFrame = Number.POSITIVE_INFINITY;
        }
        this.subscribedFrame = subscribedFrame;
        this.unsubscribedFrame = unsubscribedFrame;
      }
      return SubscriptionLog;
    }());
    var SubscriptionLoggable = (function() {
      function SubscriptionLoggable() {
        this.subscriptions = [];
      }
      SubscriptionLoggable.prototype.logSubscribedFrame = function() {
        this.subscriptions.push(new SubscriptionLog(this.scheduler.now()));
        return this.subscriptions.length - 1;
      };
      SubscriptionLoggable.prototype.logUnsubscribedFrame = function(index) {
        var subscriptionLogs = this.subscriptions;
        var oldSubscriptionLog = subscriptionLogs[index];
        subscriptionLogs[index] = new SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
      };
      return SubscriptionLoggable;
    }());
    function applyMixins(derivedCtor, baseCtors) {
      for (var i = 0,
          len = baseCtors.length; i < len; i++) {
        var baseCtor = baseCtors[i];
        var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
        for (var j = 0,
            len2 = propertyKeys.length; j < len2; j++) {
          var name_1 = propertyKeys[j];
          derivedCtor.prototype[name_1] = baseCtor.prototype[name_1];
        }
      }
    }
    var ColdObservable = (function(_super) {
      __extends(ColdObservable, _super);
      function ColdObservable(messages, scheduler) {
        _super.call(this, function(subscriber) {
          var observable = this;
          var index = observable.logSubscribedFrame();
          subscriber.add(new Subscription(function() {
            observable.logUnsubscribedFrame(index);
          }));
          observable.scheduleMessages(subscriber);
          return subscriber;
        });
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
      }
      ColdObservable.prototype.scheduleMessages = function(subscriber) {
        var messagesLength = this.messages.length;
        for (var i = 0; i < messagesLength; i++) {
          var message = this.messages[i];
          subscriber.add(this.scheduler.schedule(function(_a) {
            var message = _a.message,
                subscriber = _a.subscriber;
            message.notification.observe(subscriber);
          }, message.frame, {
            message: message,
            subscriber: subscriber
          }));
        }
      };
      return ColdObservable;
    }(Observable));
    applyMixins(ColdObservable, [SubscriptionLoggable]);
    var HotObservable = (function(_super) {
      __extends(HotObservable, _super);
      function HotObservable(messages, scheduler) {
        _super.call(this);
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
      }
      HotObservable.prototype._subscribe = function(subscriber) {
        var subject = this;
        var index = subject.logSubscribedFrame();
        subscriber.add(new Subscription(function() {
          subject.logUnsubscribedFrame(index);
        }));
        return _super.prototype._subscribe.call(this, subscriber);
      };
      HotObservable.prototype.setup = function() {
        var subject = this;
        var messagesLength = subject.messages.length;
        for (var i = 0; i < messagesLength; i++) {
          (function() {
            var message = subject.messages[i];
            subject.scheduler.schedule(function() {
              message.notification.observe(subject);
            }, message.frame);
          })();
        }
      };
      return HotObservable;
    }(Subject));
    applyMixins(HotObservable, [SubscriptionLoggable]);
    var VirtualTimeScheduler = (function(_super) {
      __extends(VirtualTimeScheduler, _super);
      function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        var _this = this;
        if (SchedulerAction === void 0) {
          SchedulerAction = VirtualAction;
        }
        if (maxFrames === void 0) {
          maxFrames = Number.POSITIVE_INFINITY;
        }
        _super.call(this, SchedulerAction, function() {
          return _this.frame;
        });
        this.maxFrames = maxFrames;
        this.frame = 0;
        this.index = -1;
      }
      VirtualTimeScheduler.prototype.flush = function() {
        var _a = this,
            actions = _a.actions,
            maxFrames = _a.maxFrames;
        var error,
            action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        }
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      VirtualTimeScheduler.frameTimeFactor = 10;
      return VirtualTimeScheduler;
    }(AsyncScheduler));
    var VirtualAction = (function(_super) {
      __extends(VirtualAction, _super);
      function VirtualAction(scheduler, work, index) {
        if (index === void 0) {
          index = scheduler.index += 1;
        }
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.index = index;
        this.index = scheduler.index = index;
      }
      VirtualAction.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (!this.id) {
          return _super.prototype.schedule.call(this, state, delay);
        }
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
      };
      VirtualAction.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
      };
      VirtualAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return undefined;
      };
      VirtualAction.sortActions = function(a, b) {
        if (a.delay === b.delay) {
          if (a.index === b.index) {
            return 0;
          } else if (a.index > b.index) {
            return 1;
          } else {
            return -1;
          }
        } else if (a.delay > b.delay) {
          return 1;
        } else {
          return -1;
        }
      };
      return VirtualAction;
    }(AsyncAction));
    var defaultMaxFrame = 750;
    var TestScheduler = (function(_super) {
      __extends(TestScheduler, _super);
      function TestScheduler(assertDeepEqual) {
        _super.call(this, VirtualAction, defaultMaxFrame);
        this.assertDeepEqual = assertDeepEqual;
        this.hotObservables = [];
        this.coldObservables = [];
        this.flushTests = [];
      }
      TestScheduler.prototype.createTime = function(marbles) {
        var indexOf = marbles.indexOf('|');
        if (indexOf === -1) {
          throw new Error('marble diagram for time should have a completion marker "|"');
        }
        return indexOf * TestScheduler.frameTimeFactor;
      };
      TestScheduler.prototype.createColdObservable = function(marbles, values, error) {
        if (marbles.indexOf('^') !== -1) {
          throw new Error('cold observable cannot have subscription offset "^"');
        }
        if (marbles.indexOf('!') !== -1) {
          throw new Error('cold observable cannot have unsubscription marker "!"');
        }
        var messages = TestScheduler.parseMarbles(marbles, values, error);
        var cold = new ColdObservable(messages, this);
        this.coldObservables.push(cold);
        return cold;
      };
      TestScheduler.prototype.createHotObservable = function(marbles, values, error) {
        if (marbles.indexOf('!') !== -1) {
          throw new Error('hot observable cannot have unsubscription marker "!"');
        }
        var messages = TestScheduler.parseMarbles(marbles, values, error);
        var subject = new HotObservable(messages, this);
        this.hotObservables.push(subject);
        return subject;
      };
      TestScheduler.prototype.materializeInnerObservable = function(observable, outerFrame) {
        var _this = this;
        var messages = [];
        observable.subscribe(function(value) {
          messages.push({
            frame: _this.frame - outerFrame,
            notification: Notification.createNext(value)
          });
        }, function(err) {
          messages.push({
            frame: _this.frame - outerFrame,
            notification: Notification.createError(err)
          });
        }, function() {
          messages.push({
            frame: _this.frame - outerFrame,
            notification: Notification.createComplete()
          });
        });
        return messages;
      };
      TestScheduler.prototype.expectObservable = function(observable, unsubscriptionMarbles) {
        var _this = this;
        if (unsubscriptionMarbles === void 0) {
          unsubscriptionMarbles = null;
        }
        var actual = [];
        var flushTest = {
          actual: actual,
          ready: false
        };
        var unsubscriptionFrame = TestScheduler.parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
        var subscription;
        this.schedule(function() {
          subscription = observable.subscribe(function(x) {
            var value = x;
            if (x instanceof Observable) {
              value = _this.materializeInnerObservable(value, _this.frame);
            }
            actual.push({
              frame: _this.frame,
              notification: Notification.createNext(value)
            });
          }, function(err) {
            actual.push({
              frame: _this.frame,
              notification: Notification.createError(err)
            });
          }, function() {
            actual.push({
              frame: _this.frame,
              notification: Notification.createComplete()
            });
          });
        }, 0);
        if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
          this.schedule(function() {
            return subscription.unsubscribe();
          }, unsubscriptionFrame);
        }
        this.flushTests.push(flushTest);
        return {toBe: function(marbles, values, errorValue) {
            flushTest.ready = true;
            flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
          }};
      };
      TestScheduler.prototype.expectSubscriptions = function(actualSubscriptionLogs) {
        var flushTest = {
          actual: actualSubscriptionLogs,
          ready: false
        };
        this.flushTests.push(flushTest);
        return {toBe: function(marbles) {
            var marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
            flushTest.ready = true;
            flushTest.expected = marblesArray.map(function(marbles) {
              return TestScheduler.parseMarblesAsSubscriptions(marbles);
            });
          }};
      };
      TestScheduler.prototype.flush = function() {
        var hotObservables = this.hotObservables;
        while (hotObservables.length > 0) {
          hotObservables.shift().setup();
        }
        _super.prototype.flush.call(this);
        var readyFlushTests = this.flushTests.filter(function(test) {
          return test.ready;
        });
        while (readyFlushTests.length > 0) {
          var test = readyFlushTests.shift();
          this.assertDeepEqual(test.actual, test.expected);
        }
      };
      TestScheduler.parseMarblesAsSubscriptions = function(marbles) {
        if (typeof marbles !== 'string') {
          return new SubscriptionLog(Number.POSITIVE_INFINITY);
        }
        var len = marbles.length;
        var groupStart = -1;
        var subscriptionFrame = Number.POSITIVE_INFINITY;
        var unsubscriptionFrame = Number.POSITIVE_INFINITY;
        for (var i = 0; i < len; i++) {
          var frame = i * this.frameTimeFactor;
          var c = marbles[i];
          switch (c) {
            case '-':
            case ' ':
              break;
            case '(':
              groupStart = frame;
              break;
            case ')':
              groupStart = -1;
              break;
            case '^':
              if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
                throw new Error('found a second subscription point \'^\' in a ' + 'subscription marble diagram. There can only be one.');
              }
              subscriptionFrame = groupStart > -1 ? groupStart : frame;
              break;
            case '!':
              if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                throw new Error('found a second subscription point \'^\' in a ' + 'subscription marble diagram. There can only be one.');
              }
              unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
              break;
            default:
              throw new Error('there can only be \'^\' and \'!\' markers in a ' + 'subscription marble diagram. Found instead \'' + c + '\'.');
          }
        }
        if (unsubscriptionFrame < 0) {
          return new SubscriptionLog(subscriptionFrame);
        } else {
          return new SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
        }
      };
      TestScheduler.parseMarbles = function(marbles, values, errorValue, materializeInnerObservables) {
        if (materializeInnerObservables === void 0) {
          materializeInnerObservables = false;
        }
        if (marbles.indexOf('!') !== -1) {
          throw new Error('conventional marble diagrams cannot have the ' + 'unsubscription marker "!"');
        }
        var len = marbles.length;
        var testMessages = [];
        var subIndex = marbles.indexOf('^');
        var frameOffset = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
        var getValue = typeof values !== 'object' ? function(x) {
          return x;
        } : function(x) {
          if (materializeInnerObservables && values[x] instanceof ColdObservable) {
            return values[x].messages;
          }
          return values[x];
        };
        var groupStart = -1;
        for (var i = 0; i < len; i++) {
          var frame = i * this.frameTimeFactor + frameOffset;
          var notification = void 0;
          var c = marbles[i];
          switch (c) {
            case '-':
            case ' ':
              break;
            case '(':
              groupStart = frame;
              break;
            case ')':
              groupStart = -1;
              break;
            case '|':
              notification = Notification.createComplete();
              break;
            case '^':
              break;
            case '#':
              notification = Notification.createError(errorValue || 'error');
              break;
            default:
              notification = Notification.createNext(getValue(c));
              break;
          }
          if (notification) {
            testMessages.push({
              frame: groupStart > -1 ? groupStart : frame,
              notification: notification
            });
          }
        }
        return testMessages;
      };
      return TestScheduler;
    }(VirtualTimeScheduler));
    var RequestAnimationFrameDefinition = (function() {
      function RequestAnimationFrameDefinition(root$$1) {
        if (root$$1.requestAnimationFrame) {
          this.cancelAnimationFrame = root$$1.cancelAnimationFrame.bind(root$$1);
          this.requestAnimationFrame = root$$1.requestAnimationFrame.bind(root$$1);
        } else if (root$$1.mozRequestAnimationFrame) {
          this.cancelAnimationFrame = root$$1.mozCancelAnimationFrame.bind(root$$1);
          this.requestAnimationFrame = root$$1.mozRequestAnimationFrame.bind(root$$1);
        } else if (root$$1.webkitRequestAnimationFrame) {
          this.cancelAnimationFrame = root$$1.webkitCancelAnimationFrame.bind(root$$1);
          this.requestAnimationFrame = root$$1.webkitRequestAnimationFrame.bind(root$$1);
        } else if (root$$1.msRequestAnimationFrame) {
          this.cancelAnimationFrame = root$$1.msCancelAnimationFrame.bind(root$$1);
          this.requestAnimationFrame = root$$1.msRequestAnimationFrame.bind(root$$1);
        } else if (root$$1.oRequestAnimationFrame) {
          this.cancelAnimationFrame = root$$1.oCancelAnimationFrame.bind(root$$1);
          this.requestAnimationFrame = root$$1.oRequestAnimationFrame.bind(root$$1);
        } else {
          this.cancelAnimationFrame = root$$1.clearTimeout.bind(root$$1);
          this.requestAnimationFrame = function(cb) {
            return root$$1.setTimeout(cb, 1000 / 60);
          };
        }
      }
      return RequestAnimationFrameDefinition;
    }());
    var AnimationFrame = new RequestAnimationFrameDefinition(root);
    var AnimationFrameAction = (function(_super) {
      __extends(AnimationFrameAction, _super);
      function AnimationFrameAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
      }
      AnimationFrameAction.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = AnimationFrame.requestAnimationFrame(scheduler.flush.bind(scheduler, null)));
      };
      AnimationFrameAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
          AnimationFrame.cancelAnimationFrame(id);
          scheduler.scheduled = undefined;
        }
        return undefined;
      };
      return AnimationFrameAction;
    }(AsyncAction));
    var AnimationFrameScheduler = (function(_super) {
      __extends(AnimationFrameScheduler, _super);
      function AnimationFrameScheduler() {
        _super.apply(this, arguments);
      }
      AnimationFrameScheduler.prototype.flush = function(action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
          while (++index < count && (action = actions.shift())) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AnimationFrameScheduler;
    }(AsyncScheduler));
    var animationFrame = new AnimationFrameScheduler(AnimationFrameAction);
    var Scheduler = {
      asap: asap,
      queue: queue,
      animationFrame: animationFrame,
      async: async
    };
    var Symbol = {
      rxSubscriber: $$rxSubscriber,
      observable: $$observable,
      iterator: $$iterator
    };
    exports.Scheduler = Scheduler;
    exports.Symbol = Symbol;
    exports.Subject = Subject;
    exports.AnonymousSubject = AnonymousSubject;
    exports.Observable = Observable;
    exports.Subscription = Subscription;
    exports.Subscriber = Subscriber;
    exports.AsyncSubject = AsyncSubject;
    exports.ReplaySubject = ReplaySubject;
    exports.BehaviorSubject = BehaviorSubject;
    exports.ConnectableObservable = ConnectableObservable;
    exports.Notification = Notification;
    exports.EmptyError = EmptyError;
    exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
    exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
    exports.TimeoutError = TimeoutError;
    exports.UnsubscriptionError = UnsubscriptionError;
    exports.TimeInterval = TimeInterval;
    exports.Timestamp = Timestamp;
    exports.TestScheduler = TestScheduler;
    exports.VirtualTimeScheduler = VirtualTimeScheduler;
    exports.AjaxResponse = AjaxResponse;
    exports.AjaxError = AjaxError;
    exports.AjaxTimeoutError = AjaxTimeoutError;
    Object.defineProperty(exports, '__esModule', {value: true});
  })));
})(require('buffer').Buffer, require('process'));

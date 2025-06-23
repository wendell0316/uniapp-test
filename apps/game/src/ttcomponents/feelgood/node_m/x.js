function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _extends = unwrapExports(_extends_1);

var asyncToGenerator = createCommonjsModule(function (module) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  module.exports = _asyncToGenerator;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _asyncToGenerator = unwrapExports(asyncToGenerator);

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

/**
* 回参预处理函数, 使用指南: https://bytedance.feishu.cn/docs/doccnOKov7fNFjs98EF073mhdUd
* @param {object} params  客户端回参
* @param {'ios'|'android'} ctx.env.os  运行系统
* @param {string} ctx.env.version  运行宿主版本
* @param {object} ctx.params  入参
*/
function responseProcess(params, ctx) {
  return params;
}

/**
 * description: console 输出控制
 * author: chenmeng.cm@bytedance.com
 * date: 2021-03-03 14:55:15 +0800
 */
var logger = {
  disable: false,
  // lynx不支持function.apply 所以暂时强制用一个参数
  info: function info(p) {
    if (!this.disable) {
      console.info(p);
    }
  },
  warn: function warn(p) {
    if (!this.disable) {
      console.warn(p);
    }
  },
  log: function log(p) {
    if (!this.disable) {
      console.log(p);
    }
  }
};

var ObjProto = Object.prototype;
var hasOwnProperty = ObjProto.hasOwnProperty,
    toString = ObjProto.toString;
var util = {
  hasOwnProp: function hasOwnProp(obj, prop) {
    if (this.isObject(obj)) {
      return hasOwnProperty.call(obj, prop);
    }

    return false;
  },
  isEmpty: function isEmpty(obj) {
    if (obj == null) {
      return true;
    }

    return this.getProLen(obj) === 0;
  },
  getType: function getType(input) {
    return toString.call(input).match(/\[object (\w+)\]/)[1];
  },
  getProLen: function getProLen(obj) {
    var len = 0;

    if (this.isObject(obj)) {
      len = Object.keys(obj).length;
    }

    return len;
  },
  verCompare: function verCompare(v1, v2) {
    if (v1 === v2) {
      return 0;
    }

    var v1Arr = v1.toString().split('.');
    var v2Arr = v2.toString().split('.');

    while (v1Arr.length < v2Arr.length) {
      v1Arr.push('0');
    }

    while (v2Arr.length < v1Arr.length) {
      v2Arr.push('0');
    }

    var i = 0;

    while (i < v1Arr.length) {
      var v1Num = Number(v1Arr[i]);
      var v2Num = Number(v2Arr[i]);

      if (v2Num > v1Num) {
        return -1;
      } else if (v2Num < v1Num) {
        return 1;
      }

      i += 1;
    }

    return 0;
  },
  warn: function warn(msg) {
    logger.warn("[via]: " + msg);
  },
  error: function error(msg) {
    logger.warn("[via]: " + msg);
  }
};
['Number', 'Date', 'Object', 'String', 'Function', 'Boolean', 'Null', 'Undefined', 'Array'].forEach(function (type) {
  util["is" + type] = function (input) {
    var result = toString.call(input) === "[object " + type + "]";
    return result;
  };
});

function isVersionTargeted(version, targetAppVersion) {
  if (targetAppVersion === undefined || targetAppVersion === '*') {
    return true;
  }

  var rules = String(targetAppVersion).split('|').map(function (rule) {
    var chunks = rule.split('-');
    var r = '';

    switch (chunks.length) {
      case 1:
        r = chunks[0];
        break;

      case 2:
        r = {
          min: chunks[0],
          max: chunks[1]
        };
        break;
    }

    return r;
  }).filter(function (rule) {
    return rule;
  });
  return rules.some(function (rule) {
    if (util.isString(rule)) {
      return rule === version;
    } else if (util.isObject(rule)) {
      var min = rule.min;
      var max = rule.max;
      var b = true;

      if (min) {
        b = b && util.verCompare(version, min) !== -1;
      }

      if (max) {
        b = b && util.verCompare(version, max) !== 1;
      }

      return b;
    }

    return false;
  });
}

function parseEnv(env) {
  var appid = env.appid,
      appId = env.appId,
      container = env.container,
      os = env.os,
      version = env.version,
      sdkId = env.sdkId,
      sdkVersion = env.sdkVersion;
  return {
    s_aid: appid || appId,
    s_sid: sdkId,
    s_container: container,
    s_os: os,
    s_version: version,
    s_sversion: sdkVersion
  };
}

function parseCondition(condition) {
  var appid = condition.appid,
      container = condition.container,
      os = condition.os,
      version = condition.version,
      hostId = condition.hostId;
  return {
    t_hid: appid || hostId,
    t_container: container,
    t_os: os,
    t_version: version
  };
}

function checkCondition(env, targetCondition, type) {
  if (Array.isArray(targetCondition)) {
    return targetCondition.some(function (item) {
      return checkCondition(env, item, type);
    });
  }

  var _parseEnv = parseEnv(env),
      s_aid = _parseEnv.s_aid,
      s_sid = _parseEnv.s_sid,
      s_os = _parseEnv.s_os,
      s_container = _parseEnv.s_container,
      s_version = _parseEnv.s_version,
      s_sversion = _parseEnv.s_sversion;

  var _parseCondition = parseCondition(targetCondition),
      t_hid = _parseCondition.t_hid,
      t_os = _parseCondition.t_os,
      t_container = _parseCondition.t_container,
      t_version = _parseCondition.t_version;

  if (type === 'sdk' && !s_sid) {
    // 如果是中台sdk，且没设置 sdkId，直接跳过
    return false;
  }

  if (type === 'sdk') {
    // 如果是中台sdk，判断 sid，否则判断 aid
    if (t_hid && t_hid !== '*' && t_hid !== s_sid) {
      return false;
    }
  } else {
    if (t_hid && t_hid !== '*' && t_hid !== s_aid) {
      return false;
    }
  }

  if (t_container !== '*' && t_container !== s_container) {
    return false;
  }

  if (t_os !== '*' && t_os !== s_os) {
    return false;
  }

  if (type === 'sdk') {
    // 如果是中台sdk，判断 sdkVersion，否则判断 version
    if (t_version && t_version !== '*' && !isVersionTargeted(s_sversion, t_version)) {
      return false;
    }
  } else {
    if (t_version && t_version !== '*' && !isVersionTargeted(s_version, t_version)) {
      return false;
    }
  }

  return true;
}

var isBrowser = typeof window !== 'undefined';

var Core = /*#__PURE__*/function () {
  function Core(config) {
    this.bridge = config.bridge;
    this.container = config.container || 'web';
    this.os = config.os;
    this.options = {};
    this.env = null;
    this.context = null;
    this.monitor = config.monitor;
    this.onInvokeStart = null;
    this.onInvokeEnd = null;
  }

  var _proto = Core.prototype;

  _proto.init = function init(config) {
    var _this = this;

    var getRuntimeEnv = config.getRuntimeEnv;
    this.getEnv = new Promise(function (resolve, reject) {
      getRuntimeEnv({
        jsb: _this.bridge,
        bridge: _this.bridge,
        container: _this.container,
        os: _this.os
      }, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(Object.assign({
            container: _this.container,
            os: _this.os
          }, res));
        }
      });
    });
  };

  _proto.on = function on(eventName, callback) {
    var _this2 = this;

    if (this.container === 'lynx') {
      this.bridge.on = this.bridge.on.bind(this.context); // 为lynx绑定this
    }

    var callbackId = this.bridge.on(eventName, function (data) {
      if (callback.length < 2) {
        callback(data);
      } else {
        // 兼容via的调用方式
        callback(null, data);
      }
    });
    return {
      remove: function remove() {
        return _this2.bridge.off(eventName, callbackId);
      }
    };
  };

  _proto.getRuleForMethod = function getRuleForMethod(env, rules) {
    if (rules === void 0) {
      rules = [];
    }

    // 匹配方式，如果没有
    var matchRule = rules.sort(function (a, b) {
      return a.type === 'sdk' ? -1 : 1;
    }).find(function (rule) {
      return checkCondition(env, rule.target, rule.type);
    });

    if (!matchRule && true) {
      logger.warn("no matching rules found");
    }

    return matchRule;
  };

  _proto.transformConfig = /*#__PURE__*/function () {
    var _transformConfig = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(method, params, rules) {
      var env, rule, realMethod, realParams;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = this.env;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return this.getEnv;

            case 4:
              _context.t0 = _context.sent;

            case 5:
              env = _context.t0;
              rule = this.getRuleForMethod(env, rules) || {};
              realMethod = rule.map && rule.map.method || method; // 如果有 rule.map.module 则说明是 lynx 或者是 rn

              if (rule.map && rule.map.module) {
                realMethod = rule.map;
              } else if (rule.map && rule.map.method) {
                realMethod = rule.map.method;
              }

              {
                logger.info('call real method:');
                logger.info(realMethod);
                logger.info('hit target rule:');
                logger.info(rule);
              }

              realParams = rule.preprocess ? rule.preprocess(params, {
                env: env,
                bridge: this.bridge,
                logger: logger
              }) : params;
              return _context.abrupt("return", {
                realMethod: realMethod,
                realParams: realParams,
                rule: rule,
                env: env
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function transformConfig(_x, _x2, _x3) {
      return _transformConfig.apply(this, arguments);
    }

    return transformConfig;
  }();

  _proto.addInternalBridge = function addInternalBridge(bridges) {
    for (var bridge in bridges) {
      this[bridge] = bridges[bridge];
    }
  };

  _proto.globalConfig = function globalConfig(conf) {
    var _this3 = this;

    if (conf === void 0) {
      conf = {};
    }

    var _conf2 = conf,
        env = _conf2.env,
        context = _conf2.context,
        monitor = _conf2.monitor,
        onInvokeStart = _conf2.onInvokeStart,
        onInvokeEnd = _conf2.onInvokeEnd,
        disableLog = _conf2.disableLog;
    logger.disable = disableLog; // 因下面会通过this.env来判断是否初始设置了env，所以不能在constructor中设置

    var defaultEnv = {
      container: this.container,
      os: this.os
    };

    if (this.container === 'lynx' && context) {
      this.bridge.on = this.bridge.on.bind(context); // 为lynx绑定this

      this.bridge.off = this.bridge.off.bind(context); // 为lynx绑定this
    } // 注意！设置了env之后将不会再动态获取env


    if (env) {
      this.env = _extends({}, defaultEnv, env);
    }

    var _conf = {
      context: context,
      monitor: monitor,
      onInvokeStart: onInvokeStart,
      onInvokeEnd: onInvokeEnd
    };
    Object.keys(_conf).forEach(function (key) {
      if (void 0 !== conf[key]) {
        _this3[key] = conf[key];
      }
    });
  };

  _proto.flattenResponse = function flattenResponse(data, env) {
    if (env.os === 'ios' && env.container === 'web' && window.JS2NativeBridge && window.JS2NativeBridge._invokeMethod) {
      return _extends({
        code: data.code
      }, data.data);
    } else {
      return data;
    }
  };

  _proto.caniuse = function caniuse(func, env) {
    var rule = this.getRuleForMethod(_extends({
      container: this.container,
      os: this.os
    }, env), func.rules);
    return !!rule;
  };

  _proto.pipeCall = /*#__PURE__*/function () {
    var _pipeCall = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref, usePromise) {
      var _this4 = this;

      var method, params, callback, rules, options, hookConfig, _yield$this$transform, realMethod, realParams, rule, env, interceptor, startTimestamp;

      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              method = _ref.method, params = _ref.params, callback = _ref.callback, rules = _ref.rules, options = _ref.options;

              if (usePromise === void 0) {
                usePromise = true;
              }

              if (!(!isBrowser && this.container === 'web')) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", Promise.resolve());

            case 4:
              hookConfig = {
                method: method,
                params: params
              };

              if (this.onInvokeStart) {
                hookConfig = this.onInvokeStart(hookConfig);
              }

              _context2.next = 8;
              return this.transformConfig(method, params, rules);

            case 8:
              _yield$this$transform = _context2.sent;
              realMethod = _yield$this$transform.realMethod;
              realParams = _yield$this$transform.realParams;
              rule = _yield$this$transform.rule;
              env = _yield$this$transform.env;
              // 增加拦截器配置
              interceptor = rule.interceptor; // 监控开始时间

              startTimestamp = new Date().getTime(); // 如果有拦截器，忽略所有预处理配置

              if (!(interceptor && typeof interceptor === 'function')) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", new Promise(function (resolve) {
                interceptor(_extends({
                  params: params,
                  bridge: _this4.bridge
                }, env), function (data) {
                  resolve(data);

                  if (typeof callback === 'function') {
                    callback(data);
                  }
                });
              }));

            case 17:
              if (!usePromise) {
                _context2.next = 21;
                break;
              }

              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                _this4.bridge.call(realMethod, realParams, function (realRes) {
                  var res = realRes;

                  try {
                    if (responseProcess && typeof responseProcess === 'function') {
                      res = responseProcess(res, {
                        method: method,
                        params: params,
                        env: env,
                        logger: logger,
                        type: 'call'
                      });
                    }

                    if (rule.postprocess && typeof rule.postprocess === 'function') {
                      res = rule.postprocess(res, {
                        method: method,
                        params: params,
                        env: env,
                        logger: logger,
                        type: 'call'
                      });
                    }
                  } catch (error) {
                    reject(error);
                  }

                  if (typeof callback === 'function') {
                    if (callback.length < 2) {
                      callback(res);
                    } else {
                      // 兼容via的调用方式
                      callback(null, res);
                    }
                  }

                  resolve(res);

                  if (_this4.onInvokeEnd) {
                    _this4.onInvokeEnd({
                      response: res,
                      config: hookConfig
                    });
                  }

                  if (typeof _this4.monitor === 'function') {
                    _this4.monitor(_extends({
                      bridge: _this4.bridge
                    }, env), {
                      method: method,
                      realMethod: realMethod,
                      params: params,
                      realParams: realParams,
                      res: res,
                      realRes: realRes,
                      rules: rules,
                      rule: rule,
                      startTimestamp: startTimestamp
                    });
                  }
                }, Object.assign(_this4.options, options));
              }));

            case 21:
              return _context2.abrupt("return", this.bridge.call(realMethod, realParams, function (realRes) {
                if (rule.postprocess && typeof rule.postprocess === 'function') {
                  rule.postprocess(realRes, {
                    params: params,
                    env: env,
                    logger: logger,
                    type: 'call'
                  });
                }
              }, Object.assign(this.options, options)));

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function pipeCall(_x4, _x5) {
      return _pipeCall.apply(this, arguments);
    }

    return pipeCall;
  }();

  _proto.pipeEvent = function pipeEvent(_ref2) {
    var _this5 = this;

    var event = _ref2.event,
        callback = _ref2.callback,
        rules = _ref2.rules,
        once = _ref2.once;

    if (!isBrowser && this.container === 'web') {
      return {
        remove: function remove() {},
        listener: callback
      };
    }

    var promise = this.transformConfig(event, null, rules);
    var excutor = promise.then(function (_ref3) {
      var realMethod = _ref3.realMethod,
          rule = _ref3.rule,
          env = _ref3.env;
      // 增加拦截器配置
      var interceptor = rule.interceptor; // 如果有拦截器，忽略所有预处理配置

      if (interceptor && typeof interceptor === 'function') {
        return interceptor(_extends({
          bridge: _this5.bridge
        }, env), function (data) {
          if (typeof callback === 'function') {
            callback(data);
          }
        });
      }

      function realCallback(realRes) {
        var res = realRes;

        if (responseProcess && typeof responseProcess === 'function') {
          res = responseProcess(res);
        }

        if (rule.postprocess && typeof rule.postprocess === 'function') {
          res = rule.postprocess(res, {
            event: event,
            realMethod: realMethod,
            env: env,
            logger: logger,
            type: 'on'
          });
        }

        if (rule.postprocess) {
          if (res !== null) {
            // 约定如果返回除null以外的任何数据才调用callback
            callback(res);
          }
        } else {
          callback(res);
        }
      }

      var callbackId = _this5.bridge.on(realMethod, realCallback, once);

      return [realMethod, callbackId];
    });
    return {
      remove: function remove() {
        excutor.then(function (_ref4) {
          var realMethod = _ref4[0],
              callbackId = _ref4[1];

          _this5.bridge.off(realMethod, callbackId);
        });
      },
      listener: callback
    };
  };

  return Core;
}();

var LynxBridge = {
  call: function call(methodMap, params, callback) {
    var module, method;

    if (typeof methodMap === 'object') {
      module = methodMap.module;
      method = methodMap.method;
    } else {
      module = 'bridge';
      method = methodMap;
    }

    NativeModules[module].call(method, {
      containerID: '',
      // 由初始化参数中获取, 暂无
      protocolVersion: '1.0.0',
      // 协议版本号 默认1.0.0
      data: params
    }, callback);
  },
  on: function on(eventName, callback) {
    this.addGlobalEventListener(eventName, callback, this);
  },
  off: function off(eventName, callback) {
    this.getJSModule('GlobalEventEmitter').removeListener(eventName, callback);
  }
};

/**
* 通过 JSBridge 或者 UA 获取当前运行宿主的 ID 与版本号
* @param {object} ctx.jsb  JSBridge API
* @param {function} callback  回调函数, 把执行结果传入其中
*/
function getRuntimeEnv(ctx, callback) {
  callback(null, {
    appid: 990008,
    version: '1.0.0'
  });
}

/**
* 鹊桥 SDK 将在 JSBridge 运行时调用此监控函数, 可以在这里进行数据上报
* 使用指南: https://bytedance.feishu.cn/docs/doccnVaE0RgaBgG5VI6QdoLy0ee
*/
function monitor(ctx, jsbInfo) {
  console.log('[鹊桥 SDK Monitor]: ', jsbInfo);
}

var core = new Core({
  bridge: LynxBridge,
  container: 'lynx',
  os: typeof SystemInfo !== 'undefined' ? SystemInfo.platform && SystemInfo.platform.toLowerCase() || '' : '',
  monitor: monitor
}); // core.init({
//   getRuntimeEnv: (ctx, callback) => {
//     const appNameIdMap = {
//       aweme: 1128,
//       musical_ly: 1233,
//       trill: 1180,
//     }
//     NativeModules.bridge.call(
//       'appInfo',
//       {
//         namespace: 'webcast',
//         containerID: '',
//         protocolVersion: '1.0.0', // 协议版本号 默认1.0.0
//         data: {},
//       },
//       (data = {}) => {
//         callback(null, {
//           container: 'lynx',
//           os: SystemInfo.platform.toLowerCase(),
//           appId: appNameIdMap[data.appName] || 0, 
//           version: data.version || '0.0.0',
//           sdkId: 990001, // todo 需要运行时获取
//           sdkVersion: '9999', // todo 需要运行时获取
//         })
//       },
//     )
//   },
// })

core.init({
  getRuntimeEnv: getRuntimeEnv
});

var rules = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.downloadFile"
  }
}];

function downloadFile(params, callback, options) {
    return core.pipeCall({
        method: "downloadFile",
        params: params,
        callback: callback,
        rules: rules,
        options: options,
    }, true);
}
downloadFile.rules = rules;

var rules$1 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.uploadImage"
  }
}];

function uploadImage(params, callback, options) {
    return core.pipeCall({
        method: "uploadImage",
        params: params,
        callback: callback,
        rules: rules$1,
        options: options,
    }, true);
}
uploadImage.rules = rules$1;

var rules$2 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.request"
  }
}];

function request(params, callback, options) {
    return core.pipeCall({
        method: "request",
        params: params,
        callback: callback,
        rules: rules$2,
        options: options,
    }, true);
}
request.rules = rules$2;

var rules$3 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.previewImages"
  }
}];

function previewImages(params, callback, options) {
    return core.pipeCall({
        method: "previewImages",
        params: params,
        callback: callback,
        rules: rules$3,
        options: options,
    }, true);
}
previewImages.rules = rules$3;

var rules$4 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.share"
  }
}];

function share(params, callback, options) {
    return core.pipeCall({
        method: "share",
        params: params,
        callback: callback,
        rules: rules$4,
        options: options,
    }, true);
}
share.rules = rules$4;

var rules$5 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.bindPhone"
  }
}];

function bindPhone(params, callback, options) {
    return core.pipeCall({
        method: "bindPhone",
        params: params,
        callback: callback,
        rules: rules$5,
        options: options,
    }, true);
}
bindPhone.rules = rules$5;

var rules$6 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.logout"
  }
}];

function logout(params, callback, options) {
    return core.pipeCall({
        method: "logout",
        params: params,
        callback: callback,
        rules: rules$6,
        options: options,
    }, true);
}
logout.rules = rules$6;

var rules$7 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.login"
  }
}];

function login(params, callback, options) {
    return core.pipeCall({
        method: "login",
        params: params,
        callback: callback,
        rules: rules$7,
        options: options,
    }, true);
}
login.rules = rules$7;

var rules$8 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.chooseMedia"
  }
}];

function chooseMedia(params, callback, options) {
    return core.pipeCall({
        method: "chooseMedia",
        params: params,
        callback: callback,
        rules: rules$8,
        options: options,
    }, true);
}
chooseMedia.rules = rules$8;

var rules$9 = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.scanCode"
  }
}];

function scanCode(params, callback, options) {
    return core.pipeCall({
        method: "scanCode",
        params: params,
        callback: callback,
        rules: rules$9,
        options: options,
    }, true);
}
scanCode.rules = rules$9;

var rules$a = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.showModal"
  }
}];

function showModal(params, callback, options) {
    return core.pipeCall({
        method: "showModal",
        params: params,
        callback: callback,
        rules: rules$a,
        options: options,
    }, true);
}
showModal.rules = rules$a;

var rules$b = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.showToast"
  }
}];

function showToast(params, callback, options) {
    return core.pipeCall({
        method: "showToast",
        params: params,
        callback: callback,
        rules: rules$b,
        options: options,
    }, true);
}
showToast.rules = rules$b;

var rules$c = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.hideLoading"
  }
}];

function hideLoading(params, callback, options) {
    return core.pipeCall({
        method: "hideLoading",
        params: params,
        callback: callback,
        rules: rules$c,
        options: options,
    }, true);
}
hideLoading.rules = rules$c;

var rules$d = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.showLoading"
  }
}];

function showLoading(params, callback, options) {
    return core.pipeCall({
        method: "showLoading",
        params: params,
        callback: callback,
        rules: rules$d,
        options: options,
    }, true);
}
showLoading.rules = rules$d;

var rules$e = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.sendSMS"
  }
}];

function sendSMS(params, callback, options) {
    return core.pipeCall({
        method: "sendSMS",
        params: params,
        callback: callback,
        rules: rules$e,
        options: options,
    }, true);
}
sendSMS.rules = rules$e;

var rules$f = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.makePhoneCall"
  }
}];

function makePhoneCall(params, callback, options) {
    return core.pipeCall({
        method: "makePhoneCall",
        params: params,
        callback: callback,
        rules: rules$f,
        options: options,
    }, true);
}
makePhoneCall.rules = rules$f;

var rules$g = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.checkPermission"
  }
}];

function checkPermission(params, callback, options) {
    return core.pipeCall({
        method: "checkPermission",
        params: params,
        callback: callback,
        rules: rules$g,
        options: options,
    }, true);
}
checkPermission.rules = rules$g;

var rules$h = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.reportALog"
  }
}];

function reportALog(params, callback, options) {
    return core.pipeCall({
        method: "reportALog",
        params: params,
        callback: callback,
        rules: rules$h,
        options: options,
    }, true);
}
reportALog.rules = rules$h;

var rules$i = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.reportMonitorLog"
  }
}];

function reportMonitorLog(params, callback, options) {
    return core.pipeCall({
        method: "reportMonitorLog",
        params: params,
        callback: callback,
        rules: rules$i,
        options: options,
    }, true);
}
reportMonitorLog.rules = rules$i;

var rules$j = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.reportADLog"
  }
}];

function reportADLog(params, callback, options) {
    return core.pipeCall({
        method: "reportADLog",
        params: params,
        callback: callback,
        rules: rules$j,
        options: options,
    }, true);
}
reportADLog.rules = rules$j;

var rules$k = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.reportAppLog"
  }
}];

function reportAppLog(params, callback, options) {
    return core.pipeCall({
        method: "reportAppLog",
        params: params,
        callback: callback,
        rules: rules$k,
        options: options,
    }, true);
}
reportAppLog.rules = rules$k;

var rules$l = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getStorageInfo"
  }
}];

function getStorageInfo(params, callback, options) {
    return core.pipeCall({
        method: "getStorageInfo",
        params: params,
        callback: callback,
        rules: rules$l,
        options: options,
    }, true);
}
getStorageInfo.rules = rules$l;

var rules$m = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.removeStorageItem"
  }
}];

function removeStorageItem(params, callback, options) {
    return core.pipeCall({
        method: "removeStorageItem",
        params: params,
        callback: callback,
        rules: rules$m,
        options: options,
    }, true);
}
removeStorageItem.rules = rules$m;

var rules$n = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getStorageItem"
  }
}];

function getStorageItem(params, callback, options) {
    return core.pipeCall({
        method: "getStorageItem",
        params: params,
        callback: callback,
        rules: rules$n,
        options: options,
    }, true);
}
getStorageItem.rules = rules$n;

var rules$o = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.setStorageItem"
  }
}];

function setStorageItem(params, callback, options) {
    return core.pipeCall({
        method: "setStorageItem",
        params: params,
        callback: callback,
        rules: rules$o,
        options: options,
    }, true);
}
setStorageItem.rules = rules$o;

var rules$p = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.close"
  }
}];

function close(params, callback, options) {
    return core.pipeCall({
        method: "close",
        params: params,
        callback: callback,
        rules: rules$p,
        options: options,
    }, true);
}
close.rules = rules$p;

var rules$q = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.open"
  }
}];

function open(params, callback, options) {
    return core.pipeCall({
        method: "open",
        params: params,
        callback: callback,
        rules: rules$q,
        options: options,
    }, true);
}
open.rules = rules$q;

var rules$r = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getContainerID"
  }
}];

function getContainerID(params, callback, options) {
    return core.pipeCall({
        method: "getContainerID",
        params: params,
        callback: callback,
        rules: rules$r,
        options: options,
    }, true);
}
getContainerID.rules = rules$r;

var rules$s = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getSettings"
  }
}];

function getSettings(params, callback, options) {
    return core.pipeCall({
        method: "getSettings",
        params: params,
        callback: callback,
        rules: rules$s,
        options: options,
    }, true);
}
getSettings.rules = rules$s;

var rules$t = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getUserInfo"
  }
}];

function getUserInfo(params, callback, options) {
    return core.pipeCall({
        method: "getUserInfo",
        params: params,
        callback: callback,
        rules: rules$t,
        options: options,
    }, true);
}
getUserInfo.rules = rules$t;

var rules$u = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getAPIParams"
  }
}];

function getApiParams(params, callback, options) {
    return core.pipeCall({
        method: "getApiParams",
        params: params,
        callback: callback,
        rules: rules$u,
        options: options,
    }, true);
}
getApiParams.rules = rules$u;

var rules$v = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getAppInfo"
  }
}];

function getAppInfo(params, callback, options) {
    return core.pipeCall({
        method: "getAppInfo",
        params: params,
        callback: callback,
        rules: rules$v,
        options: options,
    }, true);
}
getAppInfo.rules = rules$v;

var rules$w = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getDebugInfo"
  }
}];

function getDebugInfo(params, callback, options) {
    return core.pipeCall({
        method: "getDebugInfo",
        params: params,
        callback: callback,
        rules: rules$w,
        options: options,
    }, true);
}
getDebugInfo.rules = rules$w;

var rules$x = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.getMethodList"
  }
}];

function getMethodList(params, callback, options) {
    return core.pipeCall({
        method: "getMethodList",
        params: params,
        callback: callback,
        rules: rules$x,
        options: options,
    }, true);
}
getMethodList.rules = rules$x;

var rules$y = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.canIUse"
  }
}];

function canIUse(params, callback, options) {
    return core.pipeCall({
        method: "canIUse",
        params: params,
        callback: callback,
        rules: rules$y,
        options: options,
    }, true);
}
canIUse.rules = rules$y;

var rules$z = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.subscribeEvent"
  }
}];

function subscribeEvent(params, callback, options) {
    return core.pipeCall({
        method: "subscribeEvent",
        params: params,
        callback: callback,
        rules: rules$z,
        options: options,
    }, true);
}
subscribeEvent.rules = rules$z;

var rules$A = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.unsubscribeEvent"
  }
}];

function unsubscribeEvent(params, callback, options) {
    return core.pipeCall({
        method: "unsubscribeEvent",
        params: params,
        callback: callback,
        rules: rules$A,
        options: options,
    }, true);
}
unsubscribeEvent.rules = rules$A;

var rules$B = [{
  target: [{
    hostId: 990008,
    os: "*",
    version: "0.0.0-",
    container: "*"
  }],
  map: {
    method: "x.publishEvent"
  }
}];

function publishEvent(params, callback, options) {
    return core.pipeCall({
        method: "publishEvent",
        params: params,
        callback: callback,
        rules: rules$B,
        options: options,
    }, true);
}
publishEvent.rules = rules$B;

function register(id, config) {
  var match = String(id).match(/^(\w+)\.(\w+)$/);

  if (!match) {
    throw new Error("[bridge]: invalid method id '" + id + "'");
  }

  var scope = match[1];
  var method = match[2];
  this[scope] = this[scope] || {};
  var _config$rules = config.rules,
      rules = _config$rules === void 0 ? [] : _config$rules,
      _config$type = config.type,
      type = _config$type === void 0 ? 'call' : _config$type;

  if (type === 'call') {
    this[scope][method] = function (params, callback) {
      return core.pipeCall({
        method: method,
        params: params,
        callback: callback,
        rules: rules
      });
    };
  } else {
    this[scope][method] = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback, once) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", core.pipeEvent({
                  event: method,
                  callback: callback,
                  rules: rules,
                  once: once
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  }
}

var bridge = core.bridge;
var on = core.on.bind(core);
var util$1 = {
    caniuse: core.caniuse.bind(core)
};
var globalConfig = core.globalConfig.bind(core);
var magpie = {
    downloadFile: downloadFile,
    uploadImage: uploadImage,
    request: request,
    previewImages: previewImages,
    share: share,
    bindPhone: bindPhone,
    logout: logout,
    login: login,
    chooseMedia: chooseMedia,
    scanCode: scanCode,
    showModal: showModal,
    showToast: showToast,
    hideLoading: hideLoading,
    showLoading: showLoading,
    sendSMS: sendSMS,
    makePhoneCall: makePhoneCall,
    checkPermission: checkPermission,
    reportALog: reportALog,
    reportMonitorLog: reportMonitorLog,
    reportADLog: reportADLog,
    reportAppLog: reportAppLog,
    getStorageInfo: getStorageInfo,
    removeStorageItem: removeStorageItem,
    getStorageItem: getStorageItem,
    setStorageItem: setStorageItem,
    close: close,
    open: open,
    getContainerID: getContainerID,
    getSettings: getSettings,
    getUserInfo: getUserInfo,
    getApiParams: getApiParams,
    getAppInfo: getAppInfo,
    getDebugInfo: getDebugInfo,
    getMethodList: getMethodList,
    canIUse: canIUse,
    subscribeEvent: subscribeEvent,
    unsubscribeEvent: unsubscribeEvent,
    publishEvent: publishEvent,
    bridge: bridge,
    on: on,
    util: util$1,
    globalConfig: globalConfig,
};
var register$1 = register.bind(magpie);

export default magpie;
export { bindPhone, bridge, canIUse, checkPermission, chooseMedia, close, downloadFile, getApiParams, getAppInfo, getContainerID, getDebugInfo, getMethodList, getSettings, getStorageInfo, getStorageItem, getUserInfo, globalConfig, hideLoading, login, logout, makePhoneCall, on, open, previewImages, publishEvent, register$1 as register, removeStorageItem, reportADLog, reportALog, reportAppLog, reportMonitorLog, request, scanCode, sendSMS, setStorageItem, share, showLoading, showModal, showToast, subscribeEvent, unsubscribeEvent, uploadImage, util$1 as util };

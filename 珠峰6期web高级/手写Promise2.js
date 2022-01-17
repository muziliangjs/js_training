(function () {
  // 自定义一个Pormise类，实现内置Promise的重写（PromiseAolus）
  // https://promisesaplus.com/
  function Promise(executor) {
    // 必须是一个函数
    if (typeof executor !== "function") {
      throw new TypeError("promise resolver " + executor + "is not a function");
    }

    // self:存储的是promise实例
    var self = this;

    // 执行resolve/reject都是修改当前实例状态的结果
    self.PromiseState = "pending";
    self.PromiseResult = undefined;
    self.onfulfilledCallbacks = [];
    self.onrejectedCallbacks = [];

    var run = function run(state, result) {
      if (self.PromiseState !== "pending") return;
      self.PromiseState = state;
      self.PromiseResult = result;
      setTimeout(function () {
        var arr =
          state == "fulfilled"
            ? self.onfulfilledCallbacks
            : self.onrejectedCallbacks;
        for (var i = 0; i < arr.length; i++) {
          let itemFunc = arr[i];
          if (typeof itemFunc === "function") {
            itemFunc(self.PromiseResult);
          }
        }
      });
    };

    var resolve = function resolve(value) {
      run("fulfilled", value);
      // if (self.PromiseState == "pending") {
      //   self.PromiseState = "";
      //   self.PromiseResult = value;

      //   for (var i = 0; i < self.onfulfilledCallbacks.length; i++) {
      //     let itemFunc = self.onfulfilledCallbacks[i];
      //     if (typeof itemFunc === "function") {
      //       itemFunc(self.PromiseResult);
      //     }
      //   }
      // }
    };
    var reject = function reject(reason) {
      run("rejected", reason);
      // if (self.PromiseState == "pending") {
      //   self.PromiseState = "rejected";
      //   self.PromiseResult = reason;

      //   for (var i = 0; i < self.onrejectedCallbacks.length; i++) {
      //     let itemFunc = self.onrejectedCallbacks[i];
      //     if (typeof itemFunc === "function") {
      //       itemFunc(self.PromiseResult);
      //     }
      //   }
      // }
    };

    // 立即执行 executor 函数
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  // 统一处理then返回新实例的成功和失败
  function resolvePromise(promise, x, resolve, reject) {
    if (x === promise) {
      throw new TypeError("chaning cycle detected for primise");
    }
    if ((x !== null && typeof x === "object") | (x === "function")) {
      try {
        var then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            function (y) {
              reslove(y);
            },
            function (r) {
              reject(r);
            }
          );
        } else {
          reslove(x);
        }
      } catch (err) {
        reject(err);
      }
    } else {
      reslove(x);
    }
  }

  Promise.prototype = {
    // 标记是否为自定义
    customize: true,
    constructor: Promise,
    then: function (onfulfilled, onrejected) {
      // 处理 onfulfilled, onrejected 不传情况
      if (typeof onfulfilled !== "function") {
        onfulfilled = function onfulfilled(value) {
          return value;
        };
      }
      if (typeof onrejected !== "function") {
        onrejected = function onrejected(value) {
          return value;
        };
      }

      var self = this;
      // self: 原始promise实例
      // promise: 新返回的promise实例，resolve/reject执行控制它的成功和失败
      //  + 但是到底执行resolv/reject哪个方法是由onfulfilled/onrejected方法执行是否报错，以及它返回结果是否为新的

      var promise = new Promise(function (resolve, reject) {
        switch (self.PromiseState) {
          case "fulfilled":
            setTimeout(() => {
              try {
                var x = onfulfilled(self.PromiseResult);
                resolvePromise(promise, x, reslove, reject);
              } catch (err) {
                reject(err);
              }
            }, 0);
            break;
          case "rejected":
            setTimeout(() => {
              try {
                var x = onrejected(self.PromiseResult);
                resolvePromise(promise, x, reslove, reject);
              } catch (err) {
                reject(err);
              }
            }, 0);
            break;
          default:
            // 处理方案：向容器中存储一些匿名函数，后期状态改变后，先把匿名函数执行，监听执行是否报错和他们的返回值了
            self.onfulfilledCallbacks.push(function (onrejected) {
              try {
                var x = onfulfilled(onrejected);
                resolvePromise(promise, x, reslove, reject);
              } catch (err) {
                reject(err);
              }
            });
            self.onrejectedCallbacks.push(function (onrejected) {
              try {
                var x = onrejected(onrejected);
                resolvePromise(promise, x, reslove, reject);
              } catch (err) {
                reject(err);
              }
            });
        }
      });
      return promise;
      // 根据状态不同执行不同方法
    },
    catch: function () {
      var self = this;
      return self.then(null, onrejected);
    },
    finally: function () {},
  };

  Promise.resolve = function resolve(value) {
    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function reject(value) {
    return new Promise(function (_, reject) {
      reject(value);
    });
  };

  Promise.all = function all(arr) {
    return new Promise(function (resolve, reject) {
      var index = 0,
        results = [];
      for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!(item instanceof Promise)) continue;
        item
          .then((result) => {
            index++;
            results[i] = result;
            if (index == arr.length) {
              resolve(results);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      }
    });
  };
  Promise.race = function all(value) {};

  window.Promise = Promise;
})();

let p1 = new Promise((resolve, reject) => {});
p1.then(
  (value) => {},
  (reason) => {}
);

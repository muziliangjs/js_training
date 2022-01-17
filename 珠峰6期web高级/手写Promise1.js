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

  Promise.prototype = {
    // 标记是否为自定义
    customize: true,
    constructor: Promise,
    then: function (onfulfilled, onrejected) {
      var self = this;
      // 根据状态不同执行不同方法
      switch (self.PromiseState) {
        case "fulfilled":
          setTimeout(() => {
            onfulfilled(self.PromiseResult);
          }, 0);
          break;
        case "rejected":
          setTimeout(() => {
            onrejected(self.PromiseResult);
          }, 0);
          break;
        default:
          self.onfulfilledCallbacks.push(onfulfilled);
          self.onrejectedCallbacks.push(onrejected);
      }
    },
    catch: function () {},
  };

  window.Promise = Promise;
})();

let p1 = new Promise((resolve, reject) => {});
p1.then(
  (value) => {},
  (reason) => {}
);

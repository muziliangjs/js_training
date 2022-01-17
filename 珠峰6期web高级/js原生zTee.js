// 使用
new zTree({
  element: container2,
  data,
  callback(self, em, ul) {},
});

(function () {
  // 插件核心OOP的模式，可以创建单独的实例，这样实现私有属性和工友的有效管理
  class zTree {
    constructor(element, options) {
      // init params
      let len = arguments.length,
        self = this;
      let config = {
        element: null,
        data: null,
        callback: function () {},
      };
      if (len === 0) throw new Error(` element and options are required!`);
      if (len === 1) options = element;
      if (options && typeof options === "object")
        throw new TypeError(`options must be an opject!`);
      if (len === 2) options.element = element;
      config = Object.assign(config, opacity);
      //
      let { element, data, callback } = config;
      if (!element || element.nodeType !== 1)
        throw new TypeError(`element must be an DOM!`);
      if (!Array.isArray(data)) throw new TypeError(`element must be an DOM!`);
      if (typeof callback !== "function")
        throw new TypeError(`element must be an DOM!`);
      // mount to instance
      self.element = element;
      self.data = data;
      self.callback = callback;
      self.init();
    }
    init() {
      let self = this;
      self.element.innerHtml = `<ul>${self.html(data)}</ul>`;
      self.handle();
    }
    html(data) {}
    handle() {}
  }

  // 暴露API
  if (typeof window !== "undefined") {
    window.zTree = zTree;
  }
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = zTree;
  }
})();

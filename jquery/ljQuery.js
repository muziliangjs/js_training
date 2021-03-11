/**
 * B站 => 李南江」jQuery+Ajax从放弃到知根知底 - JQ基础+案例实战
 *
 * 1.jQuery本质就是一个闭包
 * 2.jquery为什么用闭包实现
 *   为了避免多个框架冲突
 * 3.jquery 如何让外部访问内部定义的局部变量
 *    window.xx = xxx
 * 4.jquery为什么要给自己传递一个window
 *   方便后期压缩代码
 *   为了提升查找效率
 * 5.jQuery为什么接受一个undefined参数？
 *  为了后期方便压缩代码
 *  IE9以下的浏览undefined可以被修改，为了保证内部使用的undefined不被修改，所以需要接受一个undefined
 *
 *
 * speed  102
 * url https://www.bilibili.com/video/BV17W41137jn
 *
 */

(function (window, undefined) {
  var ljQuery = function (selector) {
    return new ljQuery.prototype.init(selector);
  };

  ljQuery.prototype = {
    constructor: ljQuery,
    init: function (selector) {
      // 0 去除字符串2端空格
      selector = ljQuery.trim(selector);

      // 1.传入 “” null undefined nan 0 false
      if (!selector) {
        return this;
      }

      // 2.判断字符串
      else if (ljQuery.isString(selector)) {
        // 2.1 是否是代码片段
        if (ljQuery.isHtml(selector)) {
          // 1.根据代码片段穿件所有的元素
          var temp = document.createElement("div");
          temp.innerHTML = selector;
          // 2.将创建好的片段添加到jq中
          // for(var i = 0; i < temp.children.length; i++){
          //   this[i] = temp.children[i]
          // }
          // 3.给jq对象添加length属性
          // this.length = temp.children.length
          // 简化2 3
          var arr = [];
          arr.push.apply(this, temp.children);
          // 4.返回加工好的this(Jquery)
          // return this;
        }
        // 2.2 是否是选择器
        else {
          // 1. 根据传入的选择器找到对应的元素
          var res = document.querySelectorAll(selector);
          // 2. 找到的元素添加到你jQuery上
          // for(var i = 0; i < res.length; i++){
          //   this[i] = res[i]
          // }
          // this.length = res.length
          [].push.apply(this, res);
          // 3. 返回加工好的this
          // return this;
        }
      }

      // 3.数组
      // else if (typeof selector === 'object' && "length" in selector && selector != window) {
      else if (ljQuery.isArray(selector)) {
        // 3.1 真数组
        // if (({}).toString.apply(selector) == "[object Array]") {
        //   [].push.apply(this, selector);
        //   return this
        // }
        // // 3.2 伪数组
        // else {
        //   // 伪数组转换真数组
        //   var arr = [].slice.call(selector);
        //   // 真数组转换伪数组
        //   [].push.apply(this, arr);
        //   return this
        // }
        var arr = [].slice.call(selector);
        [].push.apply(this, arr);
        // return this;
      }

      // 4. 除上述类型外
      else {
        this[0] = selector;
        this.length = 1;
      }
      return this;
    },
  };

  ljQuery.isString = function (str) {
    return typeof str === "string";
  };

  ljQuery.isHtml = function (str) {
    return (
      str.charAt(0) == "<" &&
      str.charAt(str.length - 1) == ">" &&
      str.length >= 3
    );
  };

  ljQuery.trim = function (str) {
    if (!ljQuery.isString(str)) {
      return str;
    }
    // 兼容性是否支持 trim
    if (str.trim()) {
      return str.trim();
    } else {
      return str.replace(/^\s+|\s+$/g, "");
    }
  };

  ljQuery.isObject = function (selector) {
    return typeof selector === "object";
  };

  ljQuery.isWindow = function (selector) {
    return selector == window;
  };

  ljQuery.isArray = function (selector) {
    if (
      ljQuery.isObject(selector) &&
      !ljQuery.isWindow(selector) &&
      "length" in selector
    ) {
      return true;
    }
    return false;
  };

  ljQuery.isFunction = function (selector){
    return typeof selector === 'function'
  }

  ljQuery.prototype.init.prototype = ljQuery.prototype;
  window.ljQuery = window.$ = ljQuery;
})(window);

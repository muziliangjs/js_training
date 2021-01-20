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
 * 5.jQuery为什么接受一个undefined参数？
 *  为了后期方便压缩代码
 *  IE9以下的浏览undefined可以被修改，为了保证内部使用的undefined不被修改，所以需要接受一个undefined
 * 
 * 
 * speed  98
 * url https://www.bilibili.com/video/BV17W41137jn
 * 
 */

(function (window, undefined) {

  var ljQuery = function (selector) {
    return new ljQuery.prototype.init(selector)
  }

  ljQuery.prototype = {
    constructor: ljQuery,
    init: function (selector) {
      // 0 去除字符串2端空格
      selector = ljQuery.trim(selector)

      // 1.传入 “” null undefined nan 0 false 
      if (!selector) {
        return this
      }

      // 2.判断字符串
      else if (ljQuery.isString(selector)) {
        // 2.1 是否是代码片段
        if (ljQuery.isHtml(selector)) {
          // 1.根据代码片段穿件所有的元素
          var temp = document.createElement('div')
          temp.innerHTML = selector 
          // 2.将创建好的片段添加到jq中
          for(var i = 0; i < temp.children.length; i++){
            this[i] = temp.children[i]
          }
          // 3.给jq对象添加length属性
          this.length = temp.children.length
          // 4.返回加工好的this(Jquery)
          return this
        }
        // 2.2 是否是选择器
      }
    }
  }

  ljQuery.isString = function(str){
    return typeof str === "string"
  }

  ljQuery.isHtml = function(str){
    return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3
  }
   
  ljQuery.trim = function(str){
    // 是否支持 trim
    if(str.trim()){
      return str.trim();
    } else {
      return str.replace(/^\s+|\s+$/g,"");
    }
  }

  ljQuery.prototype.init.prototype = ljQuery.prototype;
  window.ljQuery = window.$ = ljQuery
})(window);
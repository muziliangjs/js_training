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
 */

(function (window, undefined) {

  var ljQuery = function () {
    return new ljQuery.prototype.init()
  }

  ljQuery.prototype = { 
    constructor: ljQuery
  }
  
  ljQuery.prototype.init.prototype = ljQuery.prototype;
  window.ljQuery = window.$ = ljQuery
})(window);
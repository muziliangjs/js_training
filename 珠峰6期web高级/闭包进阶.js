/**
 * JS高级编程技巧[本质：基于“闭包”的机制完成的]
      闭包的特点
        + 保护
        + 保存
        + 弊端：占内存，消耗浏览器的性能（闭包可以用，但是不能滥用）
 */

// 应用一：循环事件绑定或者循环操作中对于闭包的应用
// let xxx = proxy(0) -> proxy 执行户产生闭包，闭包中私有的形参变量存储传递实参信息
/* const proxy = (i) => {
  return () => {
    console.log(i);
  };
};
for (var i = 0; i < 3; i++) {
  setTimeout(proxy(i), (i + 1) * 1000);
} */

// 应用2：基于“闭包”实现早期的“模块化”思想
/* 
  + 单利设计模式（模块化概念）
  + AMD -> require.js
  + CMD -> sea.js
  + CommonJs -> Node本身就是基于这种规范实现的
  + ES6Module
*/
/* 
(function(){
  let name = 1
  let age: 22
  const skill = () => {}
  window.skill
})()
(function(){
  let name = 2
  let age: 21
  const skill = () => {}
  window.skill
})()
*/

/* 
应用三：惰性函数（思想）
  + 懒：能够干一次的绝对不会干第二次（列入检测浏览器是否支持当前方法）
*/
/* function get_css(element, attr) {
  // 第一次执行get_css 根据浏览器兼容情况，对外部的get_css函数进行重构
  if ("getComputedStyle" in window) {
    get_css = function (element, attr) {
      return window.getComputedStyle(element)[attr];
    };
  } else {
    get_css = function (element, attr) {
      return element.currentStyle[attr];
    };
  }
  // 第一次执行也是需要获取到结果的，所有我们把重构的函数执行一次
  return get_css(element, attr);
}
var w = get_css(document.body,'width');
// 后续再次执行get_css，执行的是第一次重重构后的方法，无需再次检测兼容性
var height = get_css(document.body,'height'); */

/* 
应用四：柯里化函数（预处理思想：预先存储，后续拿来直接使用）
*/
/* const fn = (...outerArgs) => {
  return (...innerArgs) => {
    return outerArgs.concat(innerArgs).reduce((result, item) => {
      return result + item;
    });
  };
}; */

/* 
应用五：compose组合函数
  命令式编程
  函数式编程  
*/
/* const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
const compose = (...funcs) => {
  let len = funcs.length;
  if (len == 0) return x;
  if (len == 1) return funcs[0](x);
  return (x) => {
    return funcs.reduceRight((result, item) => {
      return item(result);
    }, x);
  };
};
const operate = compose(div2, mul3, add1); */


/* 
应用六：jQuery中关于闭包的使用
*/



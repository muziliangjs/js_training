/**
 *  this函数的执行主体
 *  + 函数的执行主体：谁把函数执行的
 *  + 函数执行上下文：在哪执行的
 *
 *  规律：
 *  1.事件绑定：给当前元素的某个事件行为绑定方法，当时间触发、方法执行，方法中的this是当前元素本事
 *  2.普通函数执行
 *    + 函数执行前面是否有 .  没有 点 this就是window 或者严格模式下是undefined
 *    + 有.  .前面是是谁this就是谁
 *    + 匿名函数（自执行函数/回调函数）如果经过特殊处理，则this一般都是window/undefined
 *
 */

/// 全局上下文的this 是window； 当前上下文中没有自己的this，所用到的this都是所处上级上下文的this
{
  let m = 12;
  console.log(this);
}


/* 
THIS：函数的执行主体，和执行上下文不是一个概念
  + 全局的this是window,我们研究的都是函数中的this  
  + this是谁和函数在哪执行，以及在哪定义都没有必然的联系

按照以下瑰丽来确定执行的主体是谁：
  1.给当前元素的某个事件行为绑定方法，事件触发，执行对应的方法，方法中的this是当前元素本身
    (排除：IE6-8基于attachEvent实现的dom2事件绑定，绑定的方法中的this，不是操作的元素，而是window)
  2.函数执行，首先看函数名之前是否有”点“，有”点“，”点“前面是谁this就是谁，没有”this“就是window
  （在js的严格模式下，没有”点“，方法中的this就是undefined）
    + 自执行函数中的this一版都是window/undefined
    + 回调函数中this一版也都是window/undefined(除非特殊处理了)
  3. 构造函数中的this是当类的实例
  4. 箭头函数没有自己的this，用到this都是上下文中的this
  5. 基于call/apply/bind可以强制改变this的指向
*/
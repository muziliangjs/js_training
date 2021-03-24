/**
 * 谈谈你对this的了解及应用场景
 *  + this五中情况分析
 *  this执行主体，谁把它执行的 「和在哪创建&在哪执行都没有必然关系」
 *  Q1 函数执行，看方法前面是否有“点”，没有电this指向window 严格模式下是 undefined
 *  Q2 给当前元素的某个事件行为绑定方法，当时间行触发，方法中的this是当前元素本身「排除attachEvent」
 *  Q3 构造函数体中的this是当前类的实例
 *  Q4 箭头函数中没有执行主体，所用到的this都是其所处上下文中的this
 *  Q5 可以基于Function.prototype上的call/apply/bind去改变this执行
 */


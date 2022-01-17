// 优化1：临时给context设置的属性不能喝原始对象中的属性冲突
// 优化2：参数的处理
//    + context 不传递或者传递null，最后要改的this都会是 window
//    + 必须保证context都是引用数据类型值（不论你传递给我的是啥类型的）
Function.prototype.myCall = function myCall(context, ...params) {
  // this -> fn 当前要执行的函数
  // context -> obj 需要改变你的this
  // params -> [10,20] 需要给函数传递的实参信息

  // 判断context 是否等于 null/undefined
  context == null ? (context = window) : null;
  // 判断context 是否是引用数据类型
  !/^(object|function)$/.test(typeof context)
    ? (context = Object(context))
    : null;
  let key = Symbol("KEY"),
    result;
  context[key] = this;
  result = context[key](...params);
  delete context[key]; // 用完后删除临时增加的属性，不改变原始的数据结构
  return result;
};

Function.prototype.myApply = function myApply(context, params) {
  context == null ? (context = window) : null;
  // 判断context 是否是引用数据类型
  !/^(object|function)$/.test(typeof context)
    ? (context = Object(context))
    : null;
  let key = Symbol("KEY"),
    result;
  context[key] = this;
  result = context[key](...params);
  delete context[key]; // 用完后删除临时增加的属性，不改变原始的数据结构
  return result;
};

Function.prototype.myBind = function myBind(context, ...params) {
  context == null ? (context = window) : null;
  // 判断context 是否是引用数据类型
  !/^(object|function)$/.test(typeof context)
    ? (context = Object(context))
    : null;
  let self = this;
  // 原理：闭包“柯理化”
  return function proxy(...args) {
    params = params.concat(args);
    self.myApply(context, params);
  };
};


let obj = {
  name: "11",
};

function fn(x, y) {
  console.log(this);
  return x + y;
}

let result = fn.myCall(obj, 10, 20);
console.log(obj);
console.log(result);

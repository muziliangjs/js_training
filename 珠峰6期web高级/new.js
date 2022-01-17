/* 
模拟new
*/
// function _new(ctor, ...params){
/*   // 1. 创建一个实例对象
  // 实例对象.__proto__ === 所属类的.prototype
  let obj = {};
  obj.__proto__ == ctor.prototype

  // 2. 会把构造函数当做普通函数执行 私有上下文、作用域链、初始this、形参赋值
  // this -> 指向创建的实例对象 基于call方法即可
  let result = ctor.call(obj, ...params)

  // 3. 观察函数执行的返回值，如果没有返回或者返回的是基本数据类型值，默认返回的都是实例对象，否则以自己返回的值为主
  if(/^(object|function)$/.test(typeof result)) return result;
  return obj; */

// -----------

// let obj = {};
// obj.__proto__ == ctor.prototype
// ie下兼容
// let obj = object.create(ctor.prototype)

// let result = ctor.call(obj, ...params)
// if(/^(object|function)$/.test(typeof result)) return result;
// return obj;

// }



// 只考虑pro传递是一个对象
object.create = function (pro) {
  function Proxy(){}
  Proxy.prototype = pro
  return new Proxy
};

function _new(ctor) {
  var params = [].slice.call(arguments, 1);

  var obj = object.create(ctor.prototype);

  var result = ctor.apply(obj, params);

  if (/^(object|function)$/.test(typeof result)) return result;
  return obj;
}

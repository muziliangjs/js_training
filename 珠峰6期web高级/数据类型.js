/**
 * 基本数据类型
 * number
 *  nan
 *  infinity  => 无穷大
 * string
 * boolean
 * null
 * undefined
 * symbol   => 唯一值
 * bigint   => 超大数字  只要在数组后面加个n 就是bigint类型
 *
 * 引用数据类型
 * object
 *  普通对象
 *  数组对象
 *  正则对象
 *  日期对象
 *  json对象
 *  set
 *  map
 * function
 *  普通函数
 *  构造函数
 *  箭头函数
 *  生成器函数
 *
 */

/**
 * typeof
 *  + 所有数据类型值在计算机中都是按照“二进制”存储的
 *  + null -> 000000
 *  + 只要是对象都是以 000 开始的
 *  + typeof检测的时候，是按照计算机存储的二进制的值来检测的
 *  +
 */

/**
 *
 */
/* 
重写 instanceof
  + obj要检测的实例对象（不支持原始值类型）
  + contructor要检测的类（必须是一个函数）
*/
function instanceof_of(obj, contructor) {
  // 参数效验
  // ...

  // obj.__proto__ === Object.getPrototypeOf(obj)
  let proto = Object.getPrototypeOf(obj),
    prototype = contructor.prototype;
  while (true) {
    // 找到object.prototype__protp__都没有相等的，则证明不是当前类的实例
    if (proto === null) return false;
    // 找到对象原型链包含类的原型，则证明对象是类的一个实例
    if (proto === prototype) return true;
    // 一级级查询即可
    proto = proto.Object.getPrototypeOf(__proto__);
  }
}

console.log([], Array);

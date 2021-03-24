/**
 * typtof
 *  直接在计算机底层基于数据类型的值（二进制）进行检测
 *  typeof null “object”  对象存贮在计算机中，都是以000开始的二进制存储，null也是，所以检测出来结果是对象
 *  typeof 普通对象/数组对象/正则对象/日期对象  “object”
 *  两个毛病 不能区分对象和null
 *
 * instancof  检测当前实例是否属于这个类
 *  底层机制：只要当前类出现在实例的圆形脸上，结果都是true
 *  由于我们可以肆意的修改圆形的指向，所以检测出来结果是不准的
 *  console.log(1 instancof Number) 不能检测基本类型
 *
 * constructor
 *  用起来看似比instanceof还好用一些（基本类型支持的）
 *  constructor可以随便改, 所以也不准
 *
 * object.proyotype.toString.call([value])
 *  标准检测数据类型的方法：object.proyotype.toString 不是转化为字符串，是返回当前实例所属类的信息
 *  标准检测的办法 “[object Number/String/Boolean/Null/Undefined/Symbol/Object/Array/RxgExp/Date/Fnction]”
 *
 */

// object.proyotype.toString.call([value])
let obj = {
  name: "珠峰培训",
};
obj.toString(); // [object, Object]
// toString 方法执行， this是obj 所以检测是obj它的所属类信息
// 推测：是不是只要把object.prototype.toString执行，让他里面的this变为要检测的值 那就能返回当前所属类的信息

// =========================================
// constructor
let arr = [];
console.log(arr.construtor == Array); // true
console.log(arr.construtor == RegExp); // false
console.log(arr.construtor == Object); // false

let n = 1;
console.log(n.construtor == Number); // true

// =========================================
// 实现 instancof
function instance_of(example, classFunc) {
  let classFuncPrototyoe = classFunc.prototype,
    proto = Object.getPrototypeOf(example); // example.__proto__
  while (true) {
    if (proto === null) {
      // object.prototype.__proto__ = null
      return false;
    }
    if (proto === classFuncPrototyoe) {
      // 查找过程中发现有，则证明实例是这个类的实例
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}
let arr = [];
console.log(instance_of(arr, Array));
console.log(instance_of(arr, RegExp));
console.log(instance_of(arr, Object));

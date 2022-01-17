// shallowClone function(){

// }

/// 数据合并 merge
let defaults = {
  url: "",
  method: "get",
  headers: {
    "content-Type": "application/json",
  },
  params: {},
  cache: [true],
};
let options = {
  url: "/api/list",
  headers: {
    "x-token": "11",
  },
  params: {
    lx: 0,
    form: "weixin",
  },
  cache: [0],
};
// 实现两个对象合并的
// + obj1对象 obj2对象：依次遍历obj2，把Obj2中的每一项替换obj1中的每一项
// + obj1对象 obj2不是对象：不进行任何处理
// + obj1不是对象 obj是对象：obj2直接替换obj1
// + obj1不是对象 obj2不是对象: obj2直接替换obj1
function merge(obj1, obj2) {
  // isPlainObject
  // 类型判断...
  let isPlain1 = isPlainPbject(obj1); // 判断空对象方法
  let isPlain2 = isPlainPbject(obj2); // 判断空对象方法
  if (!isPlain1) return isPlain2;
  if (!isPlain2) return isPlain1;
  [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)].forEach(
    (key) => {
      obj1[key] = merge(obj1[key], obj2[key]);
    }
  );
  return obj1;
}

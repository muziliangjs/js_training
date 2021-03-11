let ary = [12,33,4,33,55,12,2,5,67,2,4];

// SET
// let arr = Array.from(new Set(ary))
// console.log(arr);

// 拿出当前项和后面内容比较
// let arr = []
// for(var i = 0; i < ary.length; i++){
//   var item = ary[i]
//   var args = ary.slice(i+1)
//   if(args.indexOf(item) == -1){
//     arr.push(item);
//   }
// }
// console.log(arr)
// ------------------
// for(var i = 0; i < ary.length-1; i++){
//   var item = ary[i]
//   var args = ary.slice(i+1)
//   if(args.indexOf(item) > -1){
//     ary.splice(i, 1);
//     i--
//   }
// }
// console.log(ary)  
// ---------------------------
//   
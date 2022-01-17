/* 
函数的防抖（防止老年帕金森）:对于频繁触发某个操作，我们只识别一次(只触发执行一次函数)
  @params
    func[function]:最后要触发执行的函数
    wait[number]:"频繁"设定的界限
    immediate[boolean]:默认多次操作，我们识别的最后一次，但是immediate=true。让其识别第一次
  @return
    可以被掉执行的函数
*/ 
function debounce(func, wait = 300, immediate = false) {
  let timer = null;
  return function (...params) {
    let now = immediate && timer === null;

    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      !immediate ? func.call(this, ...params) : null;
    }, wait);

    // 如果是立即执行
    now ? func.call(this, ...params) : null;
  };
}

function handle() {}

debounce(handle, 500, true);

/*    
函数节流：在一段频繁操作中，可以触发多次，但是触发频率由自己来指定
  @params
    func[function]:最后要触发执行的函数
    wait[number]:触发的频率
  @return
    可以被掉执行的函数
*/
function throttle(func, wait = 300) {
  let timer = null;
  let previous = 0; // 记录上一次操作时间
  return function anonymous(params) {
    let now = new Date(),
      remining = wait - (now - previous); // 记录还差多久达到我们一次触发的频率
    if (remining <= 0) {
      // 两次操作操作间隔的时间，已经超过wait了
      window.clearTimeout(timer);
      timer = null;
      previous = now;
      func.call(this, ...params);
    } else if (!timer) {
      // 两次操作操作间隔的时间还不符合触发频率
      timer = setTimeout(() => {
        timer = null;
        previous = new Date();
        func.call(this, ...params);
      }, remining);
    }
  };
}

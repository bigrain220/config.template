
// 完美懒加载 (节流加防抖)
// 注意点: 在滚动条下拉状态下刷新页面, 页面实现更新渲染之后会立马触发滚动条事件,回到上一次页面的停留点,但是并不是从scrollTop为0的位置出发~


window.onload = function () {

    var scrollTop = window.scrollY;
    var imgs = Array.from(document.querySelectorAll('img'));
    lazyLoad();
    // 采用了节流函数
    window.addEventListener('scroll', throttle(lazyLoad, 500, 1000));

    function throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function () {

            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            console.log(curTime - startTime)
            if (curTime - startTime >= time) {
                fun();
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(fun, delay);
            }
        };
    };
    // 实际想绑定在 scroll 事件上的 handler
    // 需要访问到imgs ,  scroll 
    function lazyLoad() {
        scrollTop = window.scrollY;
        imgs.forEach((item, index) => {
            if (scrollTop === 0 && item.dataset.src !== '' && item.offsetTop < window.innerHeight +
                scrollTop) {
                // alert()
                item.setAttribute('src', item.dataset.src)
                item.setAttribute('data-src', '')
            } else if (item.dataset.src !== '' && item.offsetTop < window.innerHeight + scrollTop &&
                item.offsetTop > scrollTop) {
                item.setAttribute('src', item.dataset.src)
                item.setAttribute('data-src', '')
            }
        })
    }

}
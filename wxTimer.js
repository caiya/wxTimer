var wxTimer = function(initObj) {
  initObj = initObj || {};
  this.leftTime = initObj.leftTime || 0; //开始时间
  this.interval = initObj.interval || 1; //间隔时间
  this.complete = initObj.complete; //结束任务
  this.intervalFn = initObj.intervalFn; //间隔任务
  this.name = initObj.name; //当前计时器在计时器数组对象中的名字

  this.intervarID; //计时ID
};

wxTimer.prototype = {
  dateformat: function(micro_second) {
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);

    // 总小时
    var hr = Math.floor(second / 3600);
    // 小时位
    var hr2 = hr % 24;
    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);
    // 秒位
    var sec = second - hr * 3600 - min * 60; // equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = Math.floor((micro_second % 1000) / 10);
    return hr2;
  },
  dateformat_hur: function(micro_second) {
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);

    // 总小时
    var hr = Math.floor(second / 3600);
    // 小时位
    var hr2 = hr % 24;
    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);
    // 秒位
    var sec = second - hr * 3600 - min * 60; // equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = Math.floor((micro_second % 1000) / 10);
    return min;
  },
  dateformat_tim: function(micro_second) {
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);

    // 总小时
    var hr = Math.floor(second / 3600);
    // 小时位
    var hr2 = hr % 24;
    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);
    // 秒位
    var sec = second - hr * 3600 - min * 60; // equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = Math.floor((micro_second % 1000) / 10);
    return sec;
  },
  dateformats: function(micro_second) {
    // 总秒数
    var second = Math.floor(micro_second);
    var day = Math.floor(second / 3600 / 24);
    // 总小时
    var hr = Math.floor(second / 3600);
    // 小时位
    var hr2 = hr % 24;
    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);
    // 秒位
    var sec = second - hr * 3600 - min * 60; // equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = Math.floor((micro_second % 1000) / 10);
    return day;
  },
  //开始
  start: function(self) {
    var that = this;
    //开始倒计时
    var count = 0; //这个count在这里应该是表示s数，js中获得时间是ms，所以下面*1000都换成ms
    function begin() {
      var collageHour = that.dateformat(that.leftTime); //时
      var collageDay = that.dateformats(that.leftTime); //天
      var collageMin = that.dateformat_hur(that.leftTime); //分
      var collageTim = that.dateformat_tim(that.leftTime); //秒
      var tmpTimeStr = `${collageDay}天${collageHour}时${collageMin}分${collageTim}秒`;
      var wxTimerList = self.data.wxTimerList;

      //更新计时器数组
      wxTimerList[that.name] = {
        wxTimer: tmpTimeStr
      };

      self.setData({
        wxTimer: tmpTimeStr,
        wxTimerList: wxTimerList
      });
      //时间间隔执行函数
      if (0 == that.leftTime-- % that.interval && that.intervalFn) {
        that.intervalFn();
      }
      //结束执行函数
      if (that.leftTime <= 0) {
        if (that.complete) {
          that.complete();
        }
        that.stop();
      }
    }
    begin();
    this.intervarID = setInterval(begin, 1000);
  },
  //结束
  stop: function() {
    clearInterval(this.intervarID);
  }
};

module.exports = wxTimer;

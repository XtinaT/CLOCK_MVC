function Clock() {
  var self = this;
  self.isStopped = false;
  var myView = null;
  var timer=null;

  self.start = function (view) {
    myView = view;
  };

  self.updateTime = function () {
    var currTime = new Date();
    var year = currTime.getFullYear();
    var month = currTime.getMonth();
    var day = currTime.getDate();
    var hours = currTime.getHours();
    var minutes = currTime.getMinutes();
    var seconds = currTime.getSeconds();
    var ms = currTime.getMilliseconds();
    var date = new Date(year, month, day, hours, minutes, seconds, ms);
    return date;
  };

  self.updateView = function () {
    if (self.isStopped == false) {
      myView.update(self.updateTime()); 
      }
      timer = setTimeout(self.updateView, 1020 - self.updateTime().getMilliseconds());
  };

  self.setStop = function (state) {
    self.isStopped = state;
  };
}
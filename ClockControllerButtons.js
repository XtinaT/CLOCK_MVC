function ClockControllerButtons() {
  var self = this;
  var myModel = null;
  var myField = null;
  var stopButton = null;
  var startButton = null;

  self.start = function (model, field) {
    myModel = model;
    myField = field;

    stopButton = myField.querySelector(".STOP");
    stopButton.addEventListener("click", self.stopChanged);
    startButton = myField.querySelector(".START");
    startButton.addEventListener("click", self.startChanged);
  };

  self.stopChanged = function (e) {
    e = e || window.event;
    e.preventDefault;
    if (myModel) {
      myModel.setStop(true);
      myModel.updateView();
    }
  };

  self.startChanged = function (e) {
    e = e || window.event;
    e.preventDefault;
    if (myModel) {
      myModel.setStop(false);
      myModel.updateView();
    }
  };
}

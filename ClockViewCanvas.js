function ClockViewCanvas() {
  var self = this;

  var myModel = null;
  var myField = null;
  var isStopped = null;

  var body = document.getElementsByTagName("body");
  var diametr = 200;
  var radius = diametr / 2;
  var reducedRadius = diametr / 2.5;
  var numbers = 12; //количесвто делений на циферблате
  var unit = 5; //количесвто делений между делениями numbers
  var standartHoursAngle = 360 / numbers; //угол между двумя делениями
  var standartMinutesAngle = 360 / (numbers * unit);
  var standartSecondsAngle = 360 / (numbers * unit);
  var clockCenterX = diametr / 2;
  var clockCenterY = diametr / 2;

  self.start = function (model, field, city, gtm) {
    myModel = model;
    myField = field;

    var buttonStop = document.createElement("input");
    buttonStop.setAttribute("type", "button");
    buttonStop.setAttribute("class", "STOP");
    buttonStop.setAttribute("value", "стоп");
    myField.appendChild(buttonStop);

    var buttonStart = document.createElement("input");
    buttonStart.setAttribute("type", "button");
    buttonStart.setAttribute("class", "START");
    buttonStart.setAttribute("value", "старт");
    myField.appendChild(buttonStart);

    var infoField = document.createElement("div");
    infoField.setAttribute("class", "INFO");
    myField.appendChild(infoField);
    var cvs = document.createElement("canvas");
    cvs.setAttribute("id", "CVS");
    cvs.setAttribute("width", diametr);
    cvs.setAttribute("height", diametr);
    myField.appendChild(cvs);
    myField.querySelector(".INFO").textContent = `${city} (GTM ${
      gtm > 0 ? "+" + gtm : gtm
    })`;

    self.update = function (date) {
      var context = cvs.getContext("2d");
      context.fillStyle = "white";
      context.fillRect(0, 0, cvs.width, cvs.height);

      context.fillStyle = "#fccb66";
      context.beginPath();
      context.arc(clockCenterX, clockCenterY, radius, 0, Math.PI * 2, false);
      context.fill();

      for (var i = 0; i < numbers; i++) {
        context.fillStyle = "#46b483";
        context.beginPath();
        var angle =
          ((standartHoursAngle * i + standartHoursAngle) / 180) * Math.PI;
        var numberCenterX = clockCenterX + reducedRadius * Math.sin(angle);
        var numberCenterY = clockCenterY - reducedRadius * Math.cos(angle);
        context.arc(
          numberCenterX,
          numberCenterY,
          diametr / 15,
          0,
          Math.PI * 2,
          false
        );
        context.fill();
        context.fillStyle = "black";
        context.font = `normal ${diametr / 12}px Arial`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(i + 1, numberCenterX, numberCenterY);
      }

      var hours = date.getUTCHours() + gtm;
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var ratio = standartHoursAngle / 60; //угол поворота часовой стрелки за 1 минуту
      var hoursAngle =
        ((standartHoursAngle * hours + ratio * minutes) / 180) * Math.PI;
      var minutesAngle = ((standartMinutesAngle * minutes) / 180) * Math.PI;
      var secondsAngle = ((standartSecondsAngle * seconds) / 180) * Math.PI;

      context.strokeStyle = "black";
      context.lineCap = "round";

      context.lineWidth = diametr / 37;
      context.beginPath();
      context.moveTo(clockCenterX, clockCenterY);
      context.lineTo(
        clockCenterX + Math.sin(hoursAngle) * reducedRadius * 0.8,
        clockCenterY - Math.cos(hoursAngle) * reducedRadius * 0.8
      );
      context.stroke();

      context.lineWidth = diametr / 60;
      context.beginPath();
      context.moveTo(clockCenterX, clockCenterY);
      context.lineTo(
        clockCenterX + Math.sin(minutesAngle) * reducedRadius,
        clockCenterY - Math.cos(minutesAngle) * reducedRadius
      );
      context.stroke();

      context.lineWidth = diametr / 130;
      context.beginPath();
      context.moveTo(clockCenterX, clockCenterY);
      context.lineTo(
        clockCenterX + Math.sin(secondsAngle) * reducedRadius * 1.1,
        clockCenterY - Math.cos(secondsAngle) * reducedRadius * 1.1
      );
      context.stroke();
    };
  };
}
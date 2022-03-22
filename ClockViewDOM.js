function ClockViewDOM() {
  var self = this;

  var myModel = null;
  var myField = null;
  var isStopped = null;

  var body = document.getElementsByTagName("body");
  var diametr = 200;
  var reducedRadius = diametr / 2.5;
  var numbers = 12; //количесвто делений на циферблате
  var unit = 5; //количесвто делений между делениями numbers
  var standartHoursAngle = 360 / numbers; //угол между двумя делениями
  var standartMinutesAngle = 360 / (numbers * unit);
  var standartSecondsAngle = 360 / (numbers * unit);

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

    var clock = document.createElement("div");
    myField.appendChild(clock);
    clock.style.position = "relative";
    clock.style.backgroundColor = "#fccb66";
    clock.style.borderRadius = "50%";
    clock.style.width = diametr + "px";
    clock.style.height = diametr + "px";
    clock.style.display = "block";
    var clockCenterX = clock.offsetWidth / 2;
    var clockCenterY = clock.offsetHeight / 2;

    for (var i = 0; i < numbers; i++) {
      var number = document.createElement("div");
      number.textContent = i + 1;
      number.style.borderRadius = "50%";
      number.style.position = "absolute";
      number.style.width = diametr / 9 + "px";
      number.style.height = diametr / 9 + "px";
      number.style.textAlign = "center";
      number.style.backgroundColor = "#46b483";
      number.style.fontSize = diametr / 12 + "px";
      clock.appendChild(number);
      var angle =
        ((standartHoursAngle * i + standartHoursAngle) / 180) * Math.PI;
      var numberCenterX = clockCenterX + reducedRadius * Math.sin(angle);
      var numberCenterY = clockCenterY - reducedRadius * Math.cos(angle);
      number.style.left =
        Math.round(numberCenterX - number.offsetWidth / 2) + "px";
      number.style.top =
        Math.round(numberCenterY - number.offsetHeight / 2) + "px";
    }

    var hourHand = document.createElement("div");
    hourHand.setAttribute("class", "HH");
    hourHand.style.position = "absolute";
    var width = diametr / 37;
    var height = diametr / 4;
    hourHand.style.width = width + "px";
    hourHand.style.height = height + "px";
    hourHand.style.left = clockCenterX - width / 2 + "px";
    hourHand.style.bottom = clockCenterY + "px";
    hourHand.style.transformOrigin = "50% 95%";
    hourHand.style.backgroundColor = "black";
    hourHand.style.borderRadius = "5px";
    clock.appendChild(hourHand);

    var minuteHand = document.createElement("div");
    minuteHand.setAttribute("class", "MH");
    minuteHand.style.position = "absolute";
    var width = diametr / 60;
    var height = diametr / 2.5;
    minuteHand.style.width = width + "px";
    minuteHand.style.height = height + "px";
    minuteHand.style.left = clockCenterX - width / 2 + "px";
    minuteHand.style.bottom = clockCenterY + "px";
    minuteHand.style.transformOrigin = "50% 95%";
    minuteHand.style.backgroundColor = "black";
    minuteHand.style.borderRadius = "5px";
    clock.appendChild(minuteHand);

    var secondHand = document.createElement("div");
    secondHand.setAttribute("class", "SH");
    secondHand.style.position = "absolute";
    var width = diametr / 130;
    var height = diametr / 2.2;
    secondHand.style.width = width + "px";
    secondHand.style.height = height + "px";
    secondHand.style.left = clockCenterX - width / 2 + "px";
    secondHand.style.bottom = clockCenterY + "px";
    secondHand.style.transformOrigin = "50% 95%";
    secondHand.style.backgroundColor = "black";
    secondHand.style.borderRadius = "5px";
    clock.appendChild(secondHand);

    myField.querySelector(".INFO").textContent = `${city} (GTM ${
      gtm > 0 ? "+" + gtm : gtm
    })`;

    self.update = function (date) {
      var hours = date.getUTCHours() + gtm;
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var hourHand = myField.querySelector(".HH");
      var minuteHand = myField.querySelector(".MH");
      var secondHand = myField.querySelector(".SH");
      var ratio = standartHoursAngle / 60; //угол поворота часовой стрелки за 1 минуту
      var hoursAngle = standartHoursAngle * hours + ratio * minutes;
      hourHand.style.transform = `rotate(${hoursAngle}deg)`;

      var minutesAngle = standartMinutesAngle * minutes;
      minuteHand.style.transform = `rotate(${minutesAngle}deg)`;

      var secondsAngle = standartSecondsAngle * seconds;
      secondHand.style.transform = `rotate(${secondsAngle}deg)`;
    };
  };
}
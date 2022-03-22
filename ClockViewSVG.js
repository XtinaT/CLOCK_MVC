function ClockViewSVG() {
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
    var container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    container.setAttribute("width", diametr);
    container.setAttribute("height", diametr);
    var clock = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    clock.setAttribute("cx", diametr / 2);
    clock.setAttribute("cy", diametr / 2);
    clock.setAttribute("r", radius);
    clock.setAttribute("fill", "#fccb66");
    myField.appendChild(container);
    container.appendChild(clock);

    for (var i = 0; i < numbers; i++) {
      var number = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      number.setAttribute("r", diametr / 15);
      number.setAttribute("fill", "#46b483");
      container.appendChild(number);
      var angle =
        ((standartHoursAngle * i + standartHoursAngle) / 180) * Math.PI;
      var numberCenterX = clockCenterX + reducedRadius * Math.sin(angle);
      var numberCenterY = clockCenterY - reducedRadius * Math.cos(angle);
      number.setAttribute("cx", numberCenterX);
      number.setAttribute("cy", numberCenterY);

      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", numberCenterX);
      text.setAttribute("y", numberCenterY + diametr / 60);
      text.setAttribute("text-anchor", "middle");
      text.style.fontSize = diametr / 12 + "px";
      text.textContent = i + 1;
      container.appendChild(text);
    }

    var hourHand = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    hourHand.setAttribute("class", "HH");
    hourHand.setAttribute("stroke-width", diametr / 37);
    hourHand.setAttribute("x1", clockCenterX);
    hourHand.setAttribute("y1", clockCenterY);
    hourHand.setAttribute("x2", clockCenterX);
    hourHand.setAttribute("y2", clockCenterY - diametr / 4);
    hourHand.setAttribute("stroke", "black");
    hourHand.setAttribute("stroke-linecap", "round");
    container.appendChild(hourHand);

    var minuteHand = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    minuteHand.setAttribute("class", "MH");
    minuteHand.setAttribute("stroke-width", diametr / 60);
    minuteHand.setAttribute("x1", clockCenterX);
    minuteHand.setAttribute("y1", clockCenterY);
    minuteHand.setAttribute("x2", clockCenterX);
    minuteHand.setAttribute("y2", clockCenterY - diametr / 2.5);
    minuteHand.setAttribute("stroke", "black");
    minuteHand.setAttribute("stroke-linecap", "round");
    container.appendChild(minuteHand);

    var secondHand = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    secondHand.setAttribute("class", "SH");
    secondHand.setAttribute("stroke-width", diametr / 130);
    secondHand.setAttribute("x1", clockCenterX);
    secondHand.setAttribute("y1", clockCenterY);
    secondHand.setAttribute("x2", clockCenterX);
    secondHand.setAttribute("y2", clockCenterY - diametr / 2.2);
    secondHand.setAttribute("stroke", "black");
    secondHand.setAttribute("stroke-linecap", "round");
    container.appendChild(secondHand);

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
      hourHand.setAttribute(
        "transform",
        `rotate(${hoursAngle} ${clockCenterX} ${clockCenterY})`
      );

      var minutesAngle = standartMinutesAngle * minutes;
      minuteHand.setAttribute(
        "transform",
        `rotate(${minutesAngle} ${clockCenterX} ${clockCenterY})`
      );

      var secondsAngle = standartSecondsAngle * seconds;
      secondHand.setAttribute(
        "transform",
        `rotate(${secondsAngle} ${clockCenterX} ${clockCenterY})`
      );
    };
  };
}
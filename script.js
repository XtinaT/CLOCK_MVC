"use strict";
//////////////////////////////////////////////////////////////////////////////
var clock1 = new Clock();
var view1 = new ClockViewSVG();
var controller1 = new ClockControllerButtons();

var containerElem1=document.getElementById('clock1');

clock1.start(view1);
view1.start(clock1, containerElem1, 'Нью-Йорк', -5);
controller1.start(clock1, containerElem1);
clock1.updateView();

//////////////////////////////////////////////////////////////////////////////
var clock2 = new Clock();
var view2 = new ClockViewDOM();
var controller2 = new ClockControllerButtons();

var containerElem2=document.getElementById('clock2');

clock2.start(view2);
view2.start(clock2, containerElem2, 'Лондон', 0);
controller2.start(clock2, containerElem2);
clock2.updateView();

/////////////////////////////////////////////////////////////////////////////
var clock3 = new Clock();
var view3 = new ClockViewSVG();
var controller3 = new ClockControllerButtons();

var containerElem3=document.getElementById('clock3');

clock3.start(view3);
view3.start(clock3, containerElem3, 'Берлин', +1);
controller3.start(clock3, containerElem3);
clock3.updateView();

/////////////////////////////////////////////////////////////////////////////
var clock4 = new Clock();
var view4 = new ClockViewSVG();
var controller4 = new ClockControllerButtons();

var containerElem4=document.getElementById('clock4');

clock4.start(view4);
view4.start(clock4, containerElem4, 'Минск', +3);
controller4.start(clock4, containerElem4);
clock4.updateView();

/////////////////////////////////////////////////////////////////////////////
var clock5 = new Clock();
var view5 = new ClockViewCanvas();
var controller5 = new ClockControllerButtons();

var containerElem5=document.getElementById('clock5');

clock5.start(view5);
view5.start(clock5, containerElem5, 'Токио', +9);
controller5.start(clock5, containerElem5);
clock5.updateView();

/////////////////////////////////////////////////////////////////////////////
var clock6 = new Clock();
var view6 = new ClockViewCanvas();
var controller6 = new ClockControllerButtons();

var containerElem6=document.getElementById('clock6');

clock6.start(view6);
view6.start(clock6, containerElem6, 'Владивосток', +10);
controller6.start(clock6, containerElem6);
clock6.updateView();
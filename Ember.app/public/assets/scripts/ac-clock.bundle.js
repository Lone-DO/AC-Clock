(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./controllers/app.js');
require('./controllers/application.js');
},{"./controllers/app.js":2,"./controllers/application.js":3}],2:[function(require,module,exports){
'use strict';
Acclock.AppController = Ember.Controller.extend({
    actions: {
        isStarted: false,
        hintShowing: false,
        start: function () {
            this.set('isStarted', true);
            require('../phase.js');
//            $.getScript("../phase.js");
//            $('.appNav a').html('Exit');
        },
        end: function () {
            this.set('isStarted', false);
//            $('.appNav a').html('Start');
        }
    }
});
},{"../phase.js":4}],3:[function(require,module,exports){
'use strict';
Acclock.ApplicationController = Ember.Controller.extend({
    actions: {
        showHint: function () {
            this.set('hintShowing', true);
        },
        hideHint: function () {
            this.set('hintShowing', false);
        }
    }
});
},{}],4:[function(require,module,exports){
$(function phases() {
    console.log("Function is running");
    var refresh = 1000, //1 sec interval. multiply by desired seconds.
        lastHr = -1,
        lastMin = -1,
        lastSec = -1;

    setInterval(function () {
        var date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        var img = document.getElementById('clockPhase'),
            iframe = document.getElementById('songPhase'),
            source = "../assets/img/Timeline/",
            vSource = "http://www.youtube.com/embed/",
            imgTag = "", //Tag for img by hour
            vidTag = "", //Tag for vid by hour
            tagHrs = "", //Tracks hour and selects array

            //Array of Generation Playlist
            oSongsID = [
                "As6_i8RoKP0", //12am
                "8qnkNjDAd4k",//1am
                "QdrjrVPAMvQ",//2am
                "nOROAUpqrGU",//3am
                "xTXgAy1TJt8",//4am
                "nXRK1OmRUq4",//5am
                "voceB48hemo",//6am
                "l5285eKta-c",//7am
                "w0uOCxFYq2U",//8am
                "wxd56GLRxa0",//9am
                "Wdvh7PLW0G0",//10am
                "X0FFrjTeWr0",//11am
                "_1YpXECC7MY",//12pm
                "OvhAeNNG-RQ",//1pm
                "uuduck3SJo8",//2pm
                "aGUzuX6cJvc",//3pm
                "uOsads28JTg",//4pm
                "Wqu5UfBFUW8",//5pm
                "FtPwnwHmS9I",//6pm
                "6c7Kgf0d2qk",//7pm
                "NOA89fdYmqw",//8pm
                "RKPjKC8bs14",//9pm
                "KYjFqcTNzM0",//10pm
                "qw8FTCaAFSM" //11pm
            ],
            autoplay = "?autoplay=1",
            extend = "&loop=1&playlist=";

        //Adds 0 on front to avoid single digit time
        if (hours < 10) {hours = "0" + hours; }
        if (minutes < 10) {minutes = "0" + minutes; }
        if (seconds < 10) {seconds = "0" + seconds; }

        //Concatinates time Data & Displays
        var currentTime = hours + ":" + minutes + ":" + seconds;
        $(".clock i").text(currentTime);

        //Updating Seconds
        if (seconds !== lastSec) {
//            console.log(seconds + " seconds");
            lastSec = seconds;
        }//End Sec refresh

        //Updating Minutes
        if (minutes !== lastMin) {
//            console.log(minutes + " minutes");
            lastMin = minutes;
        }//End of Min refresh

        //Updating Hours
        if (hours !== lastHr) {
//            console.log(hours + " hours");

            $(function clockPhase() {
                imgTag = source + "(";
                imgTag += hours;
                imgTag += "00).png";
                img.src = imgTag;
            });

            $(function songPhase() {
                if (hours < 10) {
                    tagHrs = hours.slice(1);
                    vidTag = vSource;
                    vidTag += oSongsID[tagHrs];
                    vidTag += autoplay;
                    vidTag += extend + oSongsID[tagHrs];
                } else {
                    vidTag = vSource;
                    vidTag += oSongsID[hours];
                    vidTag += autoplay;
                    vidTag += extend + oSongsID[hours];
                }
                iframe.src = vidTag;
            });
            lastHr = hours;
        }//end hour refresh
//        console.log("Refresh");
    }, 1000);
}); //End of Strict Script

module.exports.phases = phases;
},{}]},{},[1]);

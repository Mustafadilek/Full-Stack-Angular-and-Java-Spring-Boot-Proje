"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CricketCoach_1 = require("./CricketCoach");
const GolfCoach_1 = require("./GolfCoach");
let myCricketCoach = new CricketCoach_1.CricketCoach();
let myGolfCaoch = new GolfCoach_1.GolfCoach();
let theCoaches = [];
theCoaches.push(myCricketCoach);
theCoaches.push(myGolfCaoch);
for (let temp of theCoaches) {
    console.log(temp.getDailyWorkout());
}

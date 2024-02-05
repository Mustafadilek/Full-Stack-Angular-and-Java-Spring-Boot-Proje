import { Coach } from "./Coach";
import { CricketCoach } from "./CricketCoach";
import { GolfCoach } from "./GolfCoach";

let myCricketCoach= new CricketCoach();
let myGolfCaoch= new GolfCoach();

let theCoaches:Coach[]=[];
theCoaches.push(myCricketCoach);
theCoaches.push(myGolfCaoch);

for(let temp of theCoaches){
    console.log(temp.getDailyWorkout());

}
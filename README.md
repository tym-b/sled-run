# Sled Run
The winner of Intense - [Apptension](https://apptension.com) internal hackathon.

## About
Sled Run is a VR game designed for 2 players. It is controlled by a pair of sledge with a smartphone sticked to each. The virtual racetrack is displayed on a projector or any large screen. Smartphones send gyroscope signal through a socket server to the displaying client. The more you lean the more your santa turns.

![Screen 1](https://raw.githubusercontent.com/tymoteuszb/sled-run/master/github/screen1.png)
Gameplay
![Screen 2](https://raw.githubusercontent.com/tymoteuszb/sled-run/master/github/screen2.png)
Welcome screen

## Tech-stack
* WebGL (three.js)
* Cannon.js
* React
* WebSockets

## Build & play
### Production
**Build** `yarn run build`

**Run** `yarn run production`

Open `localhost:8181/game` to display racetrack. Open `localhost:8181/sensor?player=red` and `localhost:8181/sensor?player=green` on smartphones to run sensors.
### Development
**Run server** `yarn run server`

**Run client** `yarn start`

Open `localhost:3002/game` to display racetrack. Open `localhost:3002/sensor?player=red` and `localhost:3002/sensor?player=green` on smartphones to run sensors.

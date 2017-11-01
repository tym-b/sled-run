import React, { PureComponent } from 'react';
import { map, round } from 'lodash';
import socketio from 'socket.io-client';

const TURNING_MULTIPLE = 0.75;
const MAX_POSITION = 100;
const MIN_POSITION = -100;

export default class Client extends PureComponent {
    state = {
        position: 0,
    };

    componentDidMount() {
        window.addEventListener('deviceorientation', this.handleOrientation, true);
        this.intervalId = setInterval(this.emitControllerPosition, 1000 / 60);
    }

    componentWillUnmount() {
        window.addEventListener('deviceorientation', this.handleOrientation, true);
        clearInterval(this.intervalId);
    }

    handleOrientation = ({ beta }) => {
        this.calculateTurningForceAndDirection(beta);
    };

    calculateTurningForceAndDirection = (angle) => {
        this.setState({ angle });
        // Right move
        if (angle > 2) {
            if (angle > 40) {
                this.turning = 5 * TURNING_MULTIPLE;
            } else if (angle > 30) {
                this.turning = 4 * TURNING_MULTIPLE;
            } else if (angle > 20) {
                this.turning = 3 * TURNING_MULTIPLE;
            } else if (angle > 10) {
                this.turning = 2 * TURNING_MULTIPLE;
            } else if (angle > 2) {
                this.turning = TURNING_MULTIPLE;
            }
        } else if (angle < -2) {
            // Left move
            if (angle < -40) {
                this.turning = -5 * TURNING_MULTIPLE;
            } else if (angle < -30) {
                this.turning = -4 * TURNING_MULTIPLE;
            } else if (angle < -20) {
                this.turning = -3 * TURNING_MULTIPLE;
            } else if (angle < -10) {
                this.turning = -2 * TURNING_MULTIPLE;
            } else if (angle < -2) {
                this.turning = -TURNING_MULTIPLE;
            }
        } else {
            this.turning = 0;
        }

        this.setState({ turning: this.turning });
    };

    calculatePlayerPosition = () => {
        this.newPosition = this.position + this.turning;
        if (this.newPosition > MAX_POSITION) {
            this.position = MAX_POSITION;
            this.newPosition = MAX_POSITION;
        } else if (this.newPosition < MIN_POSITION) {
            this.position = MIN_POSITION;
            this.newPosition = MIN_POSITION;
        } else {
            this.position = this.newPosition;
        }
    };

    emitControllerPosition = () => {
        this.calculatePlayerPosition();
        this.setState({ position: this.position });
        this.socket.emit('devicemove', { position: this.position });
    };

    socket = socketio(`${window.location.hostname}:8181`);
    newPosition = 0;
    position = 0;
    intervalId = 0;
    turning = 0;

    render() {
        return (
            <div>
                {map(this.state, (value, key) => (
                    <h1 key={key}>{key}: {round(value, 3)}</h1>
                ))}
            </div>
        );
    }
}
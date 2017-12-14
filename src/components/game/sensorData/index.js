class SensorData {
  sensors = {};

  getValue = (sensor = 'green') => this.sensors[sensor];

  updateValue(sensor = 'green', value) {
    this.sensors[sensor] = value;
  }
}

export default new SensorData();
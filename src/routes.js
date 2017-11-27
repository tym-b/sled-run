import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sensor from 'components/sensor/sensor.component';
import Game from 'components/game/game.component';

const routes = (
  <BrowserRouter>
    <div>
      <Route path="/game" component={Game} />
      <Route path="/sensor" component={Sensor} />
    </div>
  </BrowserRouter>
);

export default routes;

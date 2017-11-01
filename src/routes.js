import React from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/index';
import Client from 'components/client/client.component';
import Server from 'components/server/server.component';
import Scene from 'components/scene/scene.component';

const routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/server" component={Server} />
      <Route exact path="/client" component={Client} />
      <Route exact path="/scene" component={Scene} />
    </Switch>
  </ConnectedRouter>
);

export default routes;

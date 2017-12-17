import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import classes from './waitingForPlayer.scss';

export default class WaitingForPlayer extends PureComponent {
  static propTypes = {
    player: PropTypes.string.isRequired,
  }

  render = () => (
    <div className={classnames(classes.container, classes[`container--${this.props.player}`])}>
      <div className={classes.spinner}>
        <div className={classes['double-bounce1']} />
        <div className={classes['double-bounce2']} />
      </div>
    </div>
  );
}

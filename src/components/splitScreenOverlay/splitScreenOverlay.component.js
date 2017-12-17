import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classes from './splitScreenOverlay.scss';

export default class SplitScreenOverlay extends PureComponent {
  static propTypes = {
    leftSide: PropTypes.node,
    rightSide: PropTypes.node,
  }

  static defaultProps = {
    leftSide: null,
    rightSide: null,
  }

  render = () => (
    <div className={classes.container}>
      <div className={classes.side}>{this.props.leftSide}</div>
      <div className={classes.side}>{this.props.rightSide}</div>
    </div>
  );
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap/TweenMax';
import { ifElse, propEq, identity } from 'ramda';
import classnames from 'classnames';

import { GREEN_PLAYER } from '../../../server/helpers';
import classes from './finish.scss';

const logo = require('../../../images/logo.svg');
const cupBackground = require('../../../images/cup-background.svg');
const cupGreen = require('../../../images/cup-green.svg');
const cupRed = require('../../../images/cup-red.svg');
const finishEllipseGreen = require('../../../images/finish-ellipse-green.svg');
const finishEllipseRed = require('../../../images/finish-ellipse-red.svg');

const ease = Cubic.easeInOut;
const isGreenPlayer = propEq('player', GREEN_PLAYER);

export default class Start extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    player: PropTypes.string,
    onRestartClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isVisible: false,
    player: GREEN_PLAYER,
    onRestartClick: identity,
  }

  componentDidMount() {
    if (this.props.isVisible) {
      this.animateIn();
      return;
    }

    this.animateOut();
  }

  componentDidUpdate({ isVisible }) {
    if (this.props.isVisible !== isVisible) {
      if (this.props.isVisible) {
        this.animateIn();
        return;
      }

      this.animateOut();
    }
  }

  animateIn = () => {
    TweenMax.fromTo(this.contentRef, 0.3, { autoAlpha: 0 }, { autoAlpha: 1, ease });
    TweenMax.fromTo(this.cupRef, 0.3, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, delay: 0.3, ease });
    TweenMax.fromTo(this.buttonRef, 0.3, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, delay: 0.3, ease });
    TweenMax.fromTo(this.descriptionRef, 0.3, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, delay: 0.3, ease });
  }

  animateOut = () => {
    TweenMax.to(this.contentRef, 0.3, { autoAlpha: 0, ease, delay: 0.8 });
    TweenMax.to(this.cupRef, 0.5, { autoAlpha: 0, scale: 0, ease, delay: 0.3 });
    TweenMax.to(this.buttonRef, 0.5, { autoAlpha: 0, y: 50, ease, delay: 0.3 });
    TweenMax.to(this.descriptionRef, 0.5, { autoAlpha: 0, scale: 0, ease, delay: 0.3 });
  }

  handleContentRef = (ref) => (this.contentRef = ref);
  handleCupRef = (ref) => (this.cupRef = ref);
  handleDescriptionRef = (ref) => (this.descriptionRef = ref);
  handleButtonRef = (ref) => (this.buttonRef = ref);

  getCup = () => ifElse(
    isGreenPlayer,
    () => cupGreen,
    () => cupRed,
  )(this.props);

  getEllipse = () => ifElse(
    isGreenPlayer,
    () => finishEllipseGreen,
    () => finishEllipseRed,
  )(this.props)

  render = () => (
    <div className={classes.container} ref={this.handleContentRef}>
      <div className={classes.content}>
        <div
          ref={this.handleCupRef}
          className={classnames(classes['cup-wrapper'], {
            [classes['cup-wrapper--green']]: isGreenPlayer(this.props),
          })}
        >
          <img alt="" className={classes['cup-background']} src={cupBackground} />

          <div className={classes['cup-content']}>
            <img alt="" className={classes.cup} src={this.getCup()} />
          </div>
        </div>

        <div
          ref={this.handleDescriptionRef}
          className={classnames(classes['description-wrapper'], {
            [classes['description-wrapper--green']]: isGreenPlayer(this.props)
          })}
        >
          <img alt="" className={classes['description-ellipse']} src={this.getEllipse()} />

          <div className={classes['description-content']}>
            <p className={classes['description-paragraph']}>
              the <strong>{this.props.player}</strong> player won the race!
            </p>
          </div>
        </div>
      </div>


      <button onClick={this.props.onRestartClick} ref={this.handleButtonRef} className={classes.button}>Restart</button>
    </div>
  );
}

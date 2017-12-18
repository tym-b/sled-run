import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap/TweenMax';
import TimelineMax from 'gsap/TimelineMax';
import { identity } from 'ramda';

import classes from './start.scss';

const ellipse = require('../../../images/counter-ellipse.svg');
const logo = require('../../../images/logo.svg');

const ease = Cubic.easeInOut;

export default class Start extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onCounterFinish: PropTypes.func.isRequired,
    onStartClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isVisible: false,
    onCounterFinish: identity,
    onStartClick: identity,
  }

  state = {
    counterValue: 3,
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
    this.setState({ counterValue: 3 });
    TweenMax.set(this.counterRef, { autoAlpha: 0 });
    TweenMax.fromTo(this.contentRef, 0.3, { autoAlpha: 0 }, { autoAlpha: 1, ease });
    TweenMax.fromTo(this.logoRef, 0.3, { autoAlpha: 0, y: -50 }, { autoAlpha: 1, delay: 0.3, y: 0, ease });
    TweenMax.fromTo(this.buttonRef, 0.3, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.3, ease });
    TweenMax.fromTo(
      this.ellipseRef,
      0.5,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease, delay: 0.5 }
    );
  }

  animateOut = () => {
    TweenMax.to(this.contentRef, 0.5, { autoAlpha: 0, ease, delay: 0.8 });
    TweenMax.to(this.logoRef, 0.5, { autoAlpha: 0, y: -50, ease, delay: 0.3 });
    TweenMax.to(this.buttonRef, 0.5, { autoAlpha: 0, ease, delay: 0.3 });
    TweenMax.to(
      this.ellipseRef,
      0.3,
      { autoAlpha: 0, scale: 0, delay: 0.3 },
    );
  }

  handleClick = () => {
    this.props.onStartClick();

    new TimelineMax()
      .addLabel('start')
      .fromTo(this.buttonRef, 0.3, { autoAlpha: 1 }, { autoAlpha: 0 })
      .fromTo(this.counterRef, 0.3, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.3 })
      .addCallback(() => this.decreaseCounter(this.state.counterValue));
  };

  decreaseCounter = (counterValue) => {
    const timeline = new TimelineMax()
      .addLabel('start')
      .to(this.counterRef, 0.3, { autoAlpha: 0 }, 'start');

    if (counterValue > 1) {
      timeline
        .addCallback(() => this.setState({ counterValue: counterValue - 1 }))
        .to(this.counterRef, 0.5, { autoAlpha: 1, delay: 0.3 }, 'start')
        .addCallback(() => this.decreaseCounter(counterValue - 1), 'start+=0.8');
      return;
    }

    timeline.addCallback(this.animateOut, 'start');
    timeline.addCallback(this.props.onCounterFinish, 'start+=0.3');
  }

  handleContentRef = (ref) => (this.contentRef = ref);
  handleLogoRef = (ref) => (this.logoRef = ref);
  handleEllipseRef = (ref) => (this.ellipseRef = ref);
  handleButtonRef = (ref) => (this.buttonRef = ref);
  handleCounterRef = (ref) => (this.counterRef = ref);

  render = () => (
    <div className={classes.container} ref={this.handleContentRef}>
      <img alt="" className={classes.logo} src={logo} ref={this.handleLogoRef} />

      <div className={classes['ellipse-wrapper']}>
        <img alt="" className={classes.ellipse} src={ellipse} ref={this.handleEllipseRef} />

        <div className={classes['content-wrapper']}>
          <button onClick={this.handleClick} ref={this.handleButtonRef} className={classes.button}>Start</button>

          <span className={classes.counter} ref={this.handleCounterRef}>{this.state.counterValue}</span>
        </div>
      </div>
    </div>
  );
}

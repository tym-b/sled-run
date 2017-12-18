import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap/TweenMax';

import classes from './waitingForPlayers.scss';

const ellipse = require('../../../images/ellipse.svg');
const logo = require('../../../images/logo.svg');

const ease = Cubic.easeInOut;

export default class WaitingForPlayer extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    gameLoaded: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isVisible: false,
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
    TweenMax.fromTo(this.logoRef, 0.3, { autoAlpha: 0, y: -50 }, { autoAlpha: 1, delay: 0.3, y: 0, ease });
    TweenMax.fromTo(this.copyRef, 0.3, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, delay: 0.3, y: 0, ease });
    TweenMax.fromTo(
      this.ellipseRef,
      0.5,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease, delay: 0.5 }
    );
    TweenMax.fromTo(this.lodaerRef, 0.3, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.5, ease });
  }

  animateOut = () => {
    TweenMax.fromTo(this.contentRef, 0.3, { autoAlpha: 1 }, { autoAlpha: 0, delay: 0.8, ease });
    TweenMax.fromTo(this.logoRef, 0.3, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, delay: 0.5, y: -50, ease });
    TweenMax.fromTo(this.copyRef, 0.3, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, delay: 0.5, y: 50, ease });
    TweenMax.fromTo(this.lodaerRef, 0.3, { autoAlpha: 1 }, { autoAlpha: 0, delay: 0.3, ease });
    TweenMax.fromTo(
      this.ellipseRef,
      0.5,
      { autoAlpha: 1, scale: 1 },
      { autoAlpha: 0, scale: 0, ease, delay: 0.3 }
    );
  }

  handleContentRef = (ref) => (this.contentRef = ref);
  handleLogoRef = (ref) => (this.logoRef = ref);
  handleEllipseRef = (ref) => (this.ellipseRef = ref);
  handleCopyRef = (ref) => (this.copyRef = ref);
  handleLoaderRef = (ref) => (this.lodaerRef = ref);

  render = () => (
    <div className={classes.container} ref={this.handleContentRef}>
      <img alt="" className={classes.logo} src={logo} ref={this.handleLogoRef} />

      <div className={classes['ellipse-wrapper']}>
        <img alt="" className={classes.ellipse} src={ellipse} ref={this.handleEllipseRef} />

        <div className={classes['loader-wrapper']} ref={this.handleLoaderRef}>
          <div className={classes.loader}>
            <div className={classes.roller} />
            <div className={classes.roller} />
          </div>

          <div id="loader2" className={classes.loader}>
            <div className={classes.roller} />
            <div className={classes.roller} />
          </div>

          <div id="loader3" className={classes.loader}>
            <div className={classes.roller} />
            <div className={classes.roller} />
          </div>
        </div>
      </div>

      <span ref={this.handleCopyRef} className={classes.info}>
        {this.props.gameLoaded ? 'waiting for two players to connect...' : 'loading assets...'}
      </span>
    </div>
  );
}

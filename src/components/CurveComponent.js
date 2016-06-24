import React from 'react';
import Bezier from 'bezier-js';
import raf from 'raf';
import './CurveComponent.css';

const fps = 60;
var now;
var then = Date.now();
const interval = 1000/fps;
var delta;

export default class CurveComponent extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    p1x: React.PropTypes.number.isRequired,
    p1y: React.PropTypes.number.isRequired,
    p2x: React.PropTypes.number.isRequired,
    p2y: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      t: 0
    }
  }

  handlePlay = (e) => {
    this.setState({isAnimating:!this.state.isAnimating}, this.draw);
  }

  draw = () => {

    if (!this.state.isAnimating) { return; }

    requestAnimationFrame(this.draw);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);
        const t = this.state.t;

        this.setState({t: t <= 1 ? t+.01 : 0});
    }
  }



  render() {

    const {width, height, p1x, p1y, p2x, p2y} = this.props;
    const bezier = new Bezier(0, height, p1x, p1y, p2x, p2y, width, 0);
    const pt = bezier.get(this.state.t);

    return (
      <svg className="curve-component" {...this.props}>
        <path d={`M${width},0 C${p2x},${p2y} ${p1x},${p1y} 0,${height}`}
              className="curve-component_curve" />
        <circle fill="#F7FF00" r="2.5" cx={pt.x} cy={pt.y} />
        <circle fill="#F7FF00" r="6" cx={width} cy={height/2} onClick={this.handlePlay} />
      </svg>
    );
  }
}

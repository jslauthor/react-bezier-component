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
      t: 0,
      direction: 1
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
        let d = this.state.direction;
        if (t >= 1) { d = -1; }
        if (t <= 0) { d = 1; }

        this.setState({
          t: t+(.01*d),
          direction: d
        });
    }
  }

  render() {

    const {width, height, p1x, p1y, p2x, p2y} = this.props;
    const bezier = new Bezier(0, height, p1x, p1y, p2x, p2y, width, 0);
    const pt = bezier.get(this.state.t);
    const percent = Math.round(this.state.t*100);
    const pLabel = percent < 10 ? "0" + percent : percent;

    const icon = this.state.isAnimating ?
    <svg width="9px" height="11px" x={width+12.5} y={height/2-4} viewBox="0 0 9 11">
        <g lassName="curve-component_pause">
            <polygon fill="#393A39" points="0.124486417 10.2057749 3.00490662 10.2057749 3.00490662 0.185061375 0.124486417 0.185061375"></polygon>
            <polygon fill="#393A39" points="5.48254639 10.2057749 8.3629666 10.2057749 8.3629666 0.185061375 5.48254639 0.185061375"></polygon>
        </g>
      </svg>
      :
      <svg width="20px" height="20px" x={width+7.5} y={height/2-7.5} viewBox="0 0 15 15">
        <g className="curve-component_play">
            <path d="M6.81542969,0.443380605 C3.17408172,0.443380605 0.22267748,3.39478484 0.22267748,7.03613281 C0.22267748,10.6774808 3.17408172,13.628885 6.81542969,13.628885 C10.4567777,13.628885 13.4081819,10.6774808 13.4081819,7.03613281 C13.4081819,3.39478484 10.4567777,0.443380605 6.81542969,0.443380605 L6.81542969,0.443380605 Z M6.81542969,12.896357 C3.57863253,12.896357 0.955205503,10.2721486 0.955205503,7.03613281 C0.955205503,3.79933565 3.57863253,1.17590863 6.81542969,1.17590863 C10.0514455,1.17590863 12.6756539,3.79933565 12.6756539,7.03613281 C12.6756539,10.2721486 10.0514455,12.896357 6.81542969,12.896357 L6.81542969,12.896357 Z" id="Fill-1" fill="#565656"></path>
            <path d="M9.37478493,6.54387398 L7.70520706,5.38784709 L6.26378725,4.38985091 C5.86705007,4.11520174 5.32439331,4.39903193 5.32439331,4.88210974 L5.32439331,9.19015588 C5.32439331,9.6732337 5.86626871,9.95706389 6.26378725,9.68241471 L7.70520706,8.68441853 L9.37537095,7.52839164 C9.71878009,7.2902712 9.71878009,6.78199442 9.37478493,6.54387398 L9.37478493,6.54387398 Z" id="Fill-2" fill="#565656"></path>
        </g>
      </svg>;

    return (
      <svg className="curve-component" {...this.props}>
        {icon}
        <path d={`M${width},0 C${p2x},${p2y} ${p1x},${p1y} 0,${height}`}
              className="curve-component_curve" />
        <circle fill="#F7FF00" r="2.5" cx={pt.x} cy={pt.y} />
        <line stroke="#F7FF00" strokeWidth=".5" x1={pt.x} y1={pt.y} x2={width} y2={pt.y} />
        <rect x={width} y={pt.y-7.5} width="30" height="15" rx="5" ry="5" fill="#466E65" />
        <text x={width+15} y={pt.y+3} width="30" className="curve-component_label">
          {pLabel}<tspan dy="-1" dx="1" className="curve-component_sublabel">%</tspan>
        </text>
      </svg>
    );
  }
}

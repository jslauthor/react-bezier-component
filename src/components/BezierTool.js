import React from 'react';
import ReactDOM from 'react-dom';
import './BezierTool.css';
import range from 'lodash/range';
import reverse from 'lodash/reverse';
import map from 'lodash/map';
import isNull from 'lodash/isNull';
import mapValues from 'lodash/mapValues';
import partial from 'lodash/partial';
import partialRight from 'lodash/partialRight';
import {
  createBorder, calculateCoordinates, interpolatedLines,
  animate
} from '../utils/drawing';
import Point from 'point-geometry';
import {Motion, spring} from 'react-motion'
import BezierHandle from './BezierHandle';
import CurveComponent from './CurveComponent';
import Bezier from 'bezier-js';

const T1 = .25; // point sitting at 25% on curve
const T2 = .75; // point sitting at 75% on curve

export default class BezierTool extends React.Component {

  static propTypes = {
    equation: React.PropTypes.array,
    onEquationUpdate: React.PropTypes.func
  };

  static defaultProps = {
    equation: [0.250, 0.250, 0.750, 0.750], // linear
    onEquationUpdate: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      curveBG: null,
      isDragging: false
    }
  }

  onCurveMount = (curveBG) => {
    this.setState({
      curveBG: ReactDOM.findDOMNode(curveBG)
    });
  }

  handleDrag = (type, e) => {
    function round(num) { return Math.round(num * 1000) / 1000; }
    const { width, height, left, top } = this.state.curveBG.getBoundingClientRect();

    const posX = e.pageX - left;
    const posY = e.pageY - top;
    const idxs = type === 'bez1' ? [0, 1] : [2, 3];
    const eq = this.props.equation.slice(0);
    eq[idxs[0]] = round(posX/width);
    eq[idxs[1]] = round(1-(posY/height));

    this.props.onEquationUpdate(eq);
  }

  handleDragging = (isDragging) => {
    this.setState({isDragging:isDragging});
  }

  render() {

    const { width, height } = !isNull(this.state.curveBG) ? this.state.curveBG.getBoundingClientRect() : { width: 0, height: 0 };
    const points = calculateCoordinates(width, height, this.props.equation);
    const {p1, p2} = points;
    const lines = [{p1:new Point(0, height), p2:points.p1}, {p1:points.p1, p2:points.p2}, {p1:points.p2, p2:new Point(width, 0)}];

    const {isDragging} = this.state;
    const a = partialRight(animate, !isDragging);

    return (
      <svg viewbox="0 0 100 100" className="bezier-tool">
        <svg y="0" width="100%">{ createBorder()}</svg>
        <svg y="76%" width="100%">{ createBorder(-1)}</svg>
        <svg y="25%" width="100%" height="50%" className="bezier-tool__container">
          <rect ref={this.onCurveMount} x="0" width="85%" height="100%" className="bezier-tool_bg" />
          <rect x="85%" width="15%" height="100%" className="bezier-tool_bg-dark" />
          {
            map(points, (p, i) =>
              <Motion key={`c${i}`} style={{x: a(p.x), y: a(p.y)}}>
                {vals => <circle cx={vals.x} cy={vals.y} r="2.5" fill="white" /> }
              </Motion>)
          }
          {
            map(lines, (p, i) =>
              <Motion style={interpolatedLines(p, !isDragging)}>
                {
                  vals => {
                    const w = 8; const h = .5;
                    return <g key={`l${i}`}>
                      <svg x={vals.cp1x-(w/2)} y={vals.cp1y-(h/2)} className="bezier-tool__container">
                        <rect
                          height={`${h}px`} width={`${w}px`} fill="white"
                          style={{transformOrigin: 'center', transform: `rotate(${vals.angle}deg)`}} />
                      </svg>
                      <line x1={vals.p1x} y1={vals.p1y} x2={vals.p2x} y2={vals.p2y} strokeWidth="1" stroke="white" />
                    </g>
                  }
                }
              </Motion>)
          }

          <Motion style={{p1x: a(p1.x), p1y: a(p1.y), p2x: a(p2.x), p2y: a(p2.y)}}>
            {vals => <CurveComponent width={width} p2x={vals.p2x} p2y={vals.p2y} p1x={vals.p1x} p1y={vals.p1y} height={height} />}
          </Motion>

          <Motion style={{bez1x: a(p1.x), bez2x: a(p2.x), bez1y: a(p1.y), bez2y: a(p2.y)}}>
            {vals =>
              <g key="handles">
                <BezierHandle x={vals.bez1x} y={vals.bez1y}
                  className="bezier-tool__container bezier-tool_handle"
                  onDrag={partial(this.handleDrag, 'bez1')}
                  onDragging={this.handleDragging} />
                <BezierHandle x={vals.bez2x} y={vals.bez2y}
                  className="bezier-tool__container bezier-tool_handle"
                  onDrag={partial(this.handleDrag, 'bez2')}
                  onDragging={this.handleDragging} />
              </g>
            }
          </Motion>
        </svg>
      </svg>
    );
  }
}

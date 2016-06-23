import React from 'react';
import ReactDOM from 'react-dom';
import './BezierTool.css';
import range from 'lodash/range';
import reverse from 'lodash/reverse';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import {createBorder, calculateCoordinates} from '../utils/drawing';
import Point from 'point-geometry';
import {Motion, spring} from 'react-motion'

export default class BezierTool extends React.Component {

  static propTypes = {
    equation: React.PropTypes.array,
    onEquationUpdate: React.PropTypes.func
  };

  static defaultProps = {
    equation: [0.250, 0.250, 0.750, 0.750] // linear
  };

  constructor(props) {
    super(props);
    this.state = {
      curveBBox: {width: 0, height: 0}
    }
  }

  onCurveMount = (curveBG) => {
    this.setState({curveBBox: ReactDOM.findDOMNode(curveBG).getBBox()}); // place this in componentDidUpdate to handle resize
  }

  render() {

    const { width, height } = this.state.curveBBox;
    const points = calculateCoordinates(width, height, this.props.equation);
    const {p1, p2} = points;
    const lines = [{p1:new Point(0, height), p2:points.p1}, {p1:points.p1, p2:points.p2}, {p1:points.p2, p2:new Point(width, 0)}];

    function interpolatedLines(p) {
      const center = p.p1.add(p.p2).div(2);
      const angle = Math.round((p.p1.angleTo(p.p2)+Math.PI/2) * (180/Math.PI));
      console.log(angle)
      return {
        p1x: spring(p.p1.x), p1y: spring(p.p1.y), p2x: spring(p.p2.x), p2y: spring(p.p2.y),
        cp1x: spring(center.x), cp1y: spring(center.y), angle: angle
      }
    }

    return (
      <svg viewbox="0 0 100 100" className="bezier-tool">
        <svg y="0" width="100%">{ createBorder()}</svg>
        <svg y="76%" width="100%">{ createBorder(-1)}</svg>
        <svg y="25%" width="100%" className="bezier-tool__container">
          <rect ref={this.onCurveMount} x="0" width="85%" height="50%" className="bezier-tool_bg" />
          <rect x="85%" width="15%" height="50%" className="bezier-tool_bg-dark" />
          {
            map(points, (p, i) =>
              <Motion style={{x: spring(p.x), y: spring(p.y)}}>
                {vals => <circle key={`c${i}`} cx={vals.x} cy={vals.y} r="2.5" fill="white" /> }
              </Motion>)
          }
          {
            map(lines, (p, i) =>
              <Motion style={interpolatedLines(p)}>
                {
                  vals => {
                    const w = 8; const h = 1;
                    return <g>
                      <svg x={vals.cp1x-(w/2)} y={vals.cp1y-(h/2)} className="bezier-tool__container">
                        <rect key={`cl${i}`}
                          height={`${h}px`} width={`${w}px`} fill="white"
                          style={{transformOrigin: 'center', transform: `rotate(${vals.angle}deg)`}} />
                      </svg>
                      <line key={`l${i}`} x1={vals.p1x} y1={vals.p1y} x2={vals.p2x} y2={vals.p2y} strokeWidth="1" stroke="white" />
                    </g>
                  }
                }
              </Motion>)
          }

          <Motion style={{p1x: spring(p1.x), p1y: spring(p1.y), p2x: spring(p2.x), p2y: spring(p2.y)}}>
            {vals => <path d={`M${width},0 C${vals.p2x},${vals.p2y} ${vals.p1x},${vals.p1y} 0,${height}`} className="bezier-tool_curve" />}
          </Motion>

        </svg>
      </svg>
    );
  }
}

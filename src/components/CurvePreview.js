import React from 'react';
import './CurvePreview.css';
import {transform} from '../utils/drawing';

export default class CurvePreview extends React.Component {

  static propTypes = {
    equation: React.PropTypes.array
  };

  static defaultProps = {
    equation: [0.250, 0.250, 0.750, 0.750] // linear
  };

  render() {

    const path = transform(45, 30, this.props.equation);

    return (
      <svg viewBox="0 0 45 30" className="curve-preview" {...this.props}>
        <rect className="curve-preview_bg" width="100%" height="100%" />
        <path d={path} className="curve-preview_curve" />
      </svg>
    );
  }
}

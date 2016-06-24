import React from 'react';

export default class BezierHandle extends React.Component {

  static propTypes = {
    onDrag: React.PropTypes.func,
    onDragging: React.PropTypes.func,
    type: React.PropTypes.number
  };

  static defaultProps = {
    onDrag: () => {},
    onDragging: () => {},
    type: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      isDragging: false
    }
  }

  componentDidUpdate(props, state) {
    if (this.state.isDragging && !state.isDragging) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    } else if (!this.state.isDragging && state.isDragging) {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  }

  // UGH Can't use React DND on SVG components :/

  handleMouseDown = (e) => {
    this.setState({isDragging:true});
    this.props.onDragging(true);
  }

  handleMouseMove = (e) => {
    if (this.state.isDragging) {
      this.props.onDrag(e);
    }
  }

  handleMouseUp = (e) => {
   this.setState({isDragging:false});
   this.props.onDragging(false);
  }

  render() {
    return (
      <svg {...this.props} onMouseDown={this.handleMouseDown}>
        <circle r="9" className={`bezier-tool_type${this.props.type}`} strokeWidth="2" />
        <circle r="5" fill="#BAEBFF" />
      </svg>
    );
  }
}

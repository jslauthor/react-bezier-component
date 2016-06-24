import React from 'react';
import range from 'lodash/range';
import CurvePreview from './CurvePreview';
import ScrollArea  from 'react-scrollbar';
import './CurveList.css';
import partial from 'lodash/partial';

export default class CurveList extends React.Component {

  static propTypes = {
    curves: React.PropTypes.array,
    onEquationSelection: React.PropTypes.func
  };

  static defaultProps = {
    curves: [],
    onEquationSelection: () => {}
  }

  render() {

    const { curves } = this.props;

    const previews = curves.map((c) => {
      return <CurvePreview key={c.type} equation={c.equation}
                           onClick={partial(this.props.onEquationSelection, c.equation)} />
    });

    return (
      <ScrollArea
            speed={0.8}
            className="curve-list"
            horizontal={false}>
        <div>{previews}</div>
      </ScrollArea>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as BezierActions from '../actions'
import BezierTool from '../components/BezierTool'
import CurveList from '../components/CurveList'
import CopyPasteIcon from '../components/CopyPasteIcon'
import CopyToClipboard from 'react-copy-to-clipboard';
import './App.css';

@connect(
  state => ({bezier: state.bezier}),
  dispatch => bindActionCreators(BezierActions, dispatch)
)

export default class App extends React.Component {

  handleEquationUpdate = (e) => {
    this.props.updateEquation(e);
  }

  render() {

    function format(i) { return i.toString().replace(/^0\.+/, '.').replace(/^-0\.+/, '-.'); }
    const { curves, equation } = this.props.bezier;
    const val1 = format(equation[0]);
    const val2 = format(equation[1]);
    const val3 = format(equation[2]);
    const val4 = format(equation[3]);

    return (
      <div className="app">

        <BezierTool
          equation={equation}
          onEquationUpdate={this.handleEquationUpdate} />

        <CopyToClipboard text={`cubic-bezier(${equation.join(", ")});`}>

          <div className="app__css-value">
            <CopyPasteIcon className="app_copyPasteIcon" />
            <span className="app_function">cubic-bezier</span>
            (
              <div className="app_values">
                <span className="app_handle1">{val1}</span>,&nbsp;
                <span className="app_handle1">{val2}</span>,&nbsp;
                <span className="app_handle2">{val3}</span>,&nbsp;
                <span className="app_handle2">{val4}</span>
              </div>
            );
          </div>
        </CopyToClipboard>

        <CurveList
          curves={curves}
          onEquationSelection={this.handleEquationUpdate} />

      </div>
    );
  }

}

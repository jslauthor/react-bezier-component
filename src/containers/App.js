import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as BezierActions from '../actions'
import BezierTool from '../components/BezierTool'
import CurveList from '../components/CurveList'
import './App.css';

@connect(
  state => ({bezier: state.bezier}),
  dispatch => bindActionCreators(BezierActions, dispatch)
)

export default class App extends React.Component {

  handleEquationUpdate = (e) => {

  }

  handleEquationSelection = (e) => {
    this.props.updateEquation(e);
  }

  render() {

    const { curves, equation } = this.props.bezier;

    return (
      <div className="app">

        <BezierTool
          equation={equation}
          onEquationUpdate={this.handleEquationUpdate} />

        <div className="app__css-value">cubic-bezier({equation.join(', ')});</div>

        <CurveList
          curves={curves}
          onEquationSelection={this.handleEquationSelection} />

      </div>
    );
  }

}

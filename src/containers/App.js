import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AudioActions from '../actions'
import './App.css';

@connect(
  state => ({audio: state.audio}),
  dispatch => bindActionCreators(AudioActions, dispatch)
)

export default class App extends React.Component {

  render() {

    return (
      <div className="app">


      </div>
    );
  }

}

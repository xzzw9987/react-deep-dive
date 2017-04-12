/** @jsx createElement **/
// import render from './render';
// render(document.querySelector('#quad-tree'));
// import React from 'react';
// import {render} from 'react-dom';
import {createElement, mount as render} from './myreact';
import App from './app';
render(<App></App>, document.querySelector('.tester'));
/**
 * @jsx createElement
 */
import {createElement, mount as render} from './myreact';
import App from './app';
render(<App/>, document.querySelector('.tester'));

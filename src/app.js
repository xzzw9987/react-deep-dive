/** @jsx createElement **/

/**
 * __test__
 */
import {Component, createElement} from './myreact';
// import React, {Component} from 'react';
// import {findDOMNode} from 'react-dom';

class ComponentA extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            count: 5
        };
        setInterval(() => this.setState({count: parseInt(Math.random() * 5, 10)}), 1000);
    }

    render() {
        return (<ComponentB count={this.state.count}/>);
    }
}

class ComponentB extends Component {
    render() {
       return (<ul>
           {
               Array.from(new Array(this.props.count)).map(()=>(<li>{Math.random()}</li>))
           }
       </ul>)
    }
}

export default class extends Component {
    render() {
        return <ComponentA/>;
    }

    componentDidMount() {

    }
}
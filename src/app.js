/** @jsx createElement **/

/**
 * __test__
 */
import {Component, createElement} from './myreact';
// import React, {Component} from 'react';
// import {findDOMNode} from 'react-dom';

class AComponent extends Component {
    constructor(...args) {
        super(...args);
        this.state = {text: 'HELLO'};
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({text: 'WORLD'});
        }, 1000);
    }
    render() {
        return (
            <div className="a-component">
                Render a ComponentB
                <ComponentB b={this.state.text} />
            </div>);
    }

}

class ComponentB extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="b-component">
                 <span ref='span'>{this.props.b}</span>
            </div>);
    }
    componentDidMount(){
    }

}

export default class extends Component {
    render(){
        return <AComponent ref="a"><span ref="c">abc</span></AComponent>;
    }

    componentDidMount(){
        console.log(this.refs.a);
    }
}
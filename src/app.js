/** @jsx createElement **/

/**
 * __test__
 */
import {Component, createElement} from './myreact';

class ComponentA extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            count: 3
        };
        setInterval(() => {
            this.setState({count: 1 + parseInt(4 * Math.random())});
        }, 1000);
    }

    render() {
        return (<ComponentB count={this.state.count}/>);
    }
}

class ComponentB extends Component {
    render() {
        return (<ul>
                    {
                        Array.from(new Array(this.props.count))
                             .map((v, i)=><li data-a={i} data-b={Math.random()}><ComponentC x={Math.random()}/></li>)
                    }
                </ul>)
    }

    componentDidMount() {
      //  console.log('mount');
    }

    componentWillUpdate() {
       // console.log('xxx');
    }
}

class ComponentC extends Component {
    componentWillUpdate(){
        // console.log('update');
    }

    render() {
        console.log(this.props.x);
        return <span>{this.props.x}</span>
    }
}

export default class extends Component {
    render() {
        return <ComponentA/>;
    }

    componentDidMount() {

    }
}
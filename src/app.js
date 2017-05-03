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
            this.setState({count: 1 + parseInt(5 * Math.random(), 10)});
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
                Array.from(new Array(this.props.count)).map((v, i) => (
                    <li data-k={i} data-index={Math.random()}><div>{Math.random()}</div></li>
                ))
            }
        </ul>)
    }
    componentDidMount(){
        console.log('mount');
    }
    componentWillUpdate(){
        console.log('xxx');
    }
}

export default class extends Component {
    render() {
        return <ComponentA/>;
    }

    componentDidMount() {

    }
}
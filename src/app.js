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
                             .map((v, i)=>(
                                 <li data-a={i} data-b={Math.random()}>
                                     <div>
                                         <ComponentC x={Math.random()}>
                                             <div><ComponentC x={Math.random()}/></div>
                                         </ComponentC>
                                     </div>
                                 </li>
                             ))
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
        return <h3>{this.props.x},{this.props.children}</h3>
    }
}

export default class extends Component {
    render() {
        return <ComponentA/>;
    }

    componentDidMount() {

    }
}
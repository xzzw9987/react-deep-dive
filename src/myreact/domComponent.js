import createElement from './createElement';
import Component from './component';
const cls = {};
export default name => {
    if (cls[name]) return cls[name];
    class R extends Component {
        constructor(...args){
            super(...args);
            this.isDOMNode = true;
        }
        render() {
            return createElement(name, this.props, this.props.children) ;
        }
    }
    cls[name] = R;
    return R;
};
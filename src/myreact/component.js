/**
 * Component class template
 */

import COMPONENT_STATE from './componentState';
import diff from './diff';
import trigger from './utils/trigger';

export default class {
    constructor(props = {}) {
        this.props = props;

        Object.assign(this,
            {
                refs: {},
                state: {},
                __status: COMPONENT_STATE.IDLE,
                __lastRender: null
            });
    }

    setState(obj) {
        switch (this.__status) {
            case COMPONENT_STATE.MOUNT:
                this.state = {...this.state, ...obj};
                break;
            case COMPONENT_STATE.IDLE:
                const newState = {...this.state, ...obj};
                if (this.shouldComponentUpdate(this.props, newState)) {
                    this.__status = COMPONENT_STATE.UPDATE;
                    trigger(this, 'componentWillUpdate', this.props, newState);
                    this.state = newState;
                    const k = this.render();
                    diff(this.__lastRender, k, this.__containerDOM);

                    const __renderComponent = k.__renderedComponent || this.__lastRender.__renderedComponent,
                        __renderDOM = k.__renderDOM || this.__lastRender.__renderDOM,
                        __containerDOM = this.__lastRender.__containerDOM;

                    Object.defineProperties(k, {
                        __renderedComponent: {value: __renderComponent, configurable: true},
                        __containerDOM: {value: __containerDOM, configurable: true},
                        __renderDOM: {
                            get(){
                                return __renderDOM
                            }, configurable: true
                        }
                    });
                    this.__lastRender = k;
                    this.__status = COMPONENT_STATE.IDLE;
                    /**
                     * @todo
                     * Change parameters
                     */
                    trigger(this, 'componentDidUpdate', this.props, newState);
                }
                else {
                    this.state = newState;
                }
                break;
            case COMPONENT_STATE.UPDATE:
                this.state = {...this.state, ...obj};
                break;
            case COMPONENT_STATE.UNMOUNT:
                break;
            default:
                break;
        }
    }

    setProps(obj) {
        this.props = obj;
    }

    render() {
        return null;
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}
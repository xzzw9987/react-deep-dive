// import render from './render';
// render(document.querySelector('#quad-tree'));

import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

// import {createElement, mount as render} from './myreact';
// import App from './app';

class Form extends Component {
    getChildContext = () => {
        return {
            registerValidateMethod: validateMethod => {
                if (!this.validateMethodsList)
                    this.validateMethodsList = [];
                const {validateMethodsList} = this;
                validateMethodsList.push(validateMethod);
                return () => {
                    const idx = validateMethodsList.indexOf(validateMethod);
                    validateMethodsList.splice(idx, 1);
                }
            }
        }
    };

    static childContextTypes = {
        registerValidateMethod: PropTypes.func
    };

    validate() {
        const {validateMethodsList} = this;
        if (!validateMethodsList) return true;
        return validateMethodsList.reduce((result, validate) => result && validate(), true);
    }

    render() {
        return (
            <form onSubmit={e => {
                e.preventDefault();
                this.props.onSubmit && this.props.onSubmit(e);
                console.log(this.validate());
            }}
                  {...this.props}
            >
                {this.props.children}
            </form>);
    }
}

class Input extends Component {
    render() {
        const style = this.props.error ? {border: '10px solid #f00'} : {};
        return (<input type="text" style={style} {...this.props}/>);
    }
}

const NumericInput = withValidMethod(Input, [
    {
        method(value){
            return /^\d+$/.test(value);
        },
        message: '必须是数字'
    },
    {
        method(value) {
            return parseFloat(value) > 10;
        },
        message: '必须大于10'
    }
]);

function withValidMethod(component, validateMethods) {
    return class extends Component {
        state = {
            error: false,
            value: '',
            errorMessage: ''
        };

        static contextTypes = {
            registerValidateMethod: PropTypes.func
        };

        valid = value => {
            let errorMessage = '';
            const result = validateMethods.reduce((result, test) => {
                // @todo
                // test.message
                if (!test.method(value)) {
                    errorMessage = `${errorMessage} ${test.message}`;
                }
                return result && test.method(value);
            }, true);
            this.setState({error: !result, errorMessage});
            return result;
        };

        onBlur = e => {
            this.props.onBlur && this.props.onBlur(e);
            const {value} = e.nativeEvent.target;
            this.setState({value});
            this.valid(value);
        };
        onFocus = e => {
            this.props.onFocus && this.props.onFocus(e);
            this.setState({error: false, errorMessage: ''});
        };
        onChange = e => {
            this.props.onChange && this.props.onChange(e);
            this.setState({value: e.nativeEvent.target.value});
        };

        componentDidMount() {
            const {registerValidateMethod} = this.context;
            this.unRegis = registerValidateMethod(() => this.valid(this.state.value));
        }

        componentWillUnmount() {
            this.unRegis && this.unRegis();
        }

        render() {
            let Component = component;
            return (<div><Component
                {...this.props}
                error={this.state.error}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}/>
                <span>{ this.state.errorMessage }</span>
            </div>);
        }
    }
}

render(<Form><NumericInput/><input type="submit"/></Form>, document.querySelector('.tester'));
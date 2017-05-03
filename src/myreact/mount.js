/**
 * Mount element to dom
 */

import isDOMNode from './utils/isDOMNode';
import trigger from './utils/trigger';
import COMPONENT_STATE from './componentState';
import {REAL_DOM_KEY} from './key';
import setAttributes from './utils/setAttributes';
import Component from './component';
import getDOMComponent from './domComponent';

/**
 * Mount an element to DOM .
 * @param element
 * @param dom
 */
const mount = (element, dom) => {

    const {type} = element;
    switch (typeof type) {
        case 'undefined':
            return mountTextNode(element, dom);
        case 'string':
            return mountNativeElement(element, dom);
        case 'function':
            return mountCustomElement(element, dom);
        default:
            break;
    }
};

const mountNativeElement = (element, dom) => {
    const {type, props, children} = element,
        domElement = document.createElement(type);
    dom.appendChild(domElement);

    /**
     * Add props to domElement
     */
    setAttributes(domElement, props);
    props.children = children;
    /**
     * @todo
     * Add event listener
     */


    const Ctor = getDOMComponent(type),
        c = new Ctor(props),
        r = c.render();

    Object.assign(r, {
        __renderedComponent: c,
        __containerDOM: getRealDOM(dom),
        __renderDOM: domElement
    });
    Object.assign(c, {
        __containerDOM: getRealDOM(dom),
        __lastRender: r
    });
    Object.assign(element, {
        __renderedComponent: c,
        __containerDOM: getRealDOM(dom),
        __renderDOM: domElement
    });
    /**
     * Recursive children
     */
    children.forEach(child => mount(child, domElement));
    return compose(element, c);
};

const mountTextNode = (element, dom) => {
    const textNode = document.createTextNode(element.text);
    dom.appendChild(textNode);
    Object.assign(element, {
        __containerDOM: dom,
        __renderDOM: textNode
    });
    return compose(element, textNode);
};

const mountCustomElement = (element, dom) => {
    if (element instanceof Array) {
        element.forEach(child => mount(child, dom));
        /**
         * @todo
         * return a better value ??
         */
        return null;
    }
    const {type: Ctor, props, children} = element;
    props.children = children;

    const component = new Ctor(props);
    component.__status = COMPONENT_STATE.MOUNT;
    trigger(component, 'componentWillMount');

    const renderedElement = component.render();
    walkEachNode(renderedElement, element => element.ref && (component.refs[element.ref] = element));

    const [mounted, renderedComponent] = mount(renderedElement, dom);
    Object.defineProperties(element, {
        __renderedComponent: {
            value: component,
            configurable: true
        },
        __containerDOM: {
            value: getRealDOM(dom),
            configurable: true
        },
        __renderDOM: {
            get(){
                return mounted.__renderDOM || null;
            },
            configurable: true
        }
    });
    Object.assign(component, {
        __containerDOM: getRealDOM(dom),
        __lastRender: mounted
    });
    trigger(component, 'componentDidMount');
    component.__status = COMPONENT_STATE.IDLE;
    return compose(element, component);
};

const walkEachNode = (element, callback) => {
    (element instanceof Array) ? element.forEach(child => walkEachNode(child, callback)) : callback(element);

    /**
     * Recursive children
     **/
    (element.children instanceof Array) && element.children.forEach(child => walkEachNode(child, callback));
};

const getRealDOM = domOrFragment => domOrFragment instanceof DocumentFragment ? domOrFragment[REAL_DOM_KEY] : domOrFragment;

const compose = (element, component) => ([element, component]);

const getElementFromComposed = ([element, component]) => element;

const getComponentFromComposed = ([element, component]) => component;

export default mount;
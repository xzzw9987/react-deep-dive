import {REAL_DOM_KEY} from  '../key' ;
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

export { walkEachNode, getRealDOM, compose, getElementFromComposed, getComponentFromComposed };

export flattenArray from './flattenArray';
export enqueueCallback from './enqueueCallback';
export convertArray from './convertArray';
export isDOMNode from './isDOMNode';
export setAttributes from './setAttributes';
export trigger from './trigger';
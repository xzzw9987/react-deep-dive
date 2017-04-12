import flatten from './utils/flattenArray';
/**
 * Present Virtual DOM
 * @param type
 * @param props
 * @param children
 * @returns {{type: *, ref: null, props: (*|{}), children: *[]}}
 */

const createElement = (type, props, ...children) => {
    props = props || {};
    for (let i = 0; i < children.length; i++) {
        if (typeof children[i] !== 'object') children[i] = children[i].toString();
        if (typeof children[i] === 'string') children[i] = {type: void 0, text: children[i]};
    }
    children = flatten(children);
    return {type, ref: props.ref || null, props, children};
};

export default createElement;
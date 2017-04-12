/**
 * Find differences between element
 * and then apply patch
 */
import flatten from './utils/flattenArray';
import mount from './mount';
import unmount from './unmount'
import {REAL_DOM_KEY} from  './key' ;
import setAttributes from './utils/setAttributes';
import trigger from './utils/trigger';

const diff = (oldElement, newElement, containerDOM) => {
    if ((oldElement instanceof Array) || (newElement instanceof Array)) {
        oldElement = [].concat(oldElement);
        newElement = [].concat(newElement);
        for (let i = 0; i < oldElement.length || i < newElement.length; i++) {
            diff(oldElement[i], newElement[i], containerDOM);
        }
        return ;
    }

    if (!oldElement && newElement) {
        mount(newElement, containerDOM);
        return;
    }
    if (oldElement && !newElement) {
        unmount(oldElement, containerDOM);
        containerDOM.removeChild(oldElement.__renderDOM);
        return;
    }
    const isChanged = changed(oldElement, newElement);
    if (isChanged) {
        /**
         * We should unmount trigger old element and mount new element
         */
        unmount(oldElement, containerDOM);
        /**
         *  Create a documentFragment which holds all new dom
         */
        const fragment = document.createDocumentFragment();
        fragment[REAL_DOM_KEY] = containerDOM;
        mount(newElement, fragment);
        console.log(containerDOM, oldElement.__renderDOM);
        containerDOM.replaceChild(fragment, oldElement.__renderDOM);
    }
    else {
        if (oldElement.__renderedComponent && oldElement.__renderedComponent.isDOMNode) {
            oldElement.__renderedComponent.setProps && oldElement.__renderedComponent.setProps({
                ...newElement.props,
                children: newElement.children
            });
            const renderElement = oldElement.__renderedComponent.render(),
                lastRender = oldElement.__renderedComponent.__lastRender;
            for (let i = 0; i < renderElement.props.children.length || i < lastRender.props.children.length; i++) {
                diff(lastRender.props.children[i], renderElement.props.children[i], oldElement.__renderDOM);
            }
            /**
             * @todo
             */
            // oldElement.__lastRender = renderElement;
        }
        else if (oldElement.__renderedComponent) {
            /**
             * Compare vdom
             */
            const renderedComponent = oldElement.__renderedComponent,
                newProps = {
                    ...newElement.props,
                    children: newElement.children
                };
            trigger(renderedComponent, 'componentWillReceiveProps', newProps);
            if (renderedComponent.shouldComponentUpdate(newProps, renderedComponent.state)) {
                trigger(renderedComponent, 'componentWillUpdate', newProps, renderedComponent.state);
                renderedComponent.setProps && renderedComponent.setProps(newProps);
                const rendererElement = renderedComponent.render(),
                    lastRender = renderedComponent.__lastRender;
                diff(lastRender, rendererElement, renderedComponent.__containerDOM);
                /**
                 * @todo
                 */
                // trigger(renderedComponent, 'componentDidUpdate', newProps, renderedComponent.state);
            }
            else {
                renderedComponent.setProps && renderedComponent.setProps(newProps);
            }
        }
        else if (typeof oldElement.type === 'string') {
            /**
             * Compare real dom
             */
            console.log(oldElement);
            const attrsNodes = oldElement.__renderDOM.attributes;
            while (attrsNodes.length) {
                oldElement.__renderDOM.removeAttributeNode(attrsNodes[0]);
            }
            setAttributes(oldElement.__renderDOM, newElement.props);
            for (let i = 0; i < oldElement.children.length || i < newElement.children.length; i++) {
                diff(oldElement.children[i], newElement.children[i], oldElement.__renderDOM);
            }
        }
    }
    return isChanged;
};

export default diff;
const changed = (oldElement, newElement) => {
    // console.log(oldElement, newElement);
    return typeof oldElement !== typeof newElement
        || (typeof oldElement.type === 'undefined' && oldElement.text !== newElement.text)
        || oldElement.type !== newElement.type;
};
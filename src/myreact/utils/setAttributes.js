const setProp = (domElement, name, value) => {
    if (typeof value === 'boolean') {
        value ? domElement.setAttribute(name, '') : domElement.removeAttribute(name);
        return;
    }
    domElement.setAttribute(name, value);
};

const transformNativePropName = name => {
    let result = name;
    switch (name) {
        case 'className':
            result = 'class';
            break;
    }
    return result;
};

export default (domElement, props) => {
    Object.keys(props).forEach(name => {
        const value = props[name];
        name = transformNativePropName(name);
        setProp(domElement, name, value);
    });
};
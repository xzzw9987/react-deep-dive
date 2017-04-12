export default  (component, hook, ...args) => {
    component[hook] && component[hook](...args);
};

let list = [],
    timer = null;
export default callback => {
    list.push(callback);
    if (!timer) {
        timer = setTimeout(() => {
            list.forEach(func => func());
            list = [];
            timer = null;
        }, 0);
    }
}
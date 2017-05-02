export default arr => {
    return arr.reduce((prev, now) => prev.concat(now), []);
};
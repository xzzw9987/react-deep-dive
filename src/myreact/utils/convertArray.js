export default arrayLike => {
    return Array.prototype.slice.call(arrayLike, 0);
}
export default (obj, attrToStripe) => {
    attrToStripe.forEach(attr => {
        delete obj[attr];
    });
    return obj;
}
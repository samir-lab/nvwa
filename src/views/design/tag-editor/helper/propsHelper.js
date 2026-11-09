export function createAttrs(obj, ignore, bindArr) {
    var keys = Object.keys(obj);
    if (!keys.length) return '';
    var i, len = keys.length;
    var result = {};

    for (i = 0; i < len; i++) {
        var key = keys[i];
        var val = obj[key];
        if(ignore[key] == val){
            continue;
        }
        if(bindArr.indexOf(key) != -1 && val !== ''){
            result[':' + hyphenate(key)] = val
        } else if(val) {
            result[hyphenate(key)] = val
        }
    }
    return result;
}

export function hyphenate(str) {
    return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}
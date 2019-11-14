const QueryUrlHelper = objectQueryUrl => Object.keys(objectQueryUrl)
    .reduce((accumulator, objectKeyCurrentValue) => {
        if (objectQueryUrl[objectKeyCurrentValue] && objectKeyCurrentValue !== 'totalItems') {
            if (accumulator === '?') {
                return `${accumulator}${objectKeyCurrentValue}=${objectQueryUrl[objectKeyCurrentValue]}`;
            }
            return `${accumulator}&${objectKeyCurrentValue}=${objectQueryUrl[objectKeyCurrentValue]}`;
        }
        return accumulator;
    }, '?');

export default QueryUrlHelper;

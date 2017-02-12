'use strict'; // unnecessary? copy-pasted...

export default () => {
    return new Promise(resolve => {
        require.ensure([], () => {
            resolve({
                test: require('../Test')
            });
        });
    });
};

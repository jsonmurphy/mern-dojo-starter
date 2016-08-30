var pathRX = new RegExp(/\/[^\/]+$/);
var locationPath = location.pathname.replace(pathRX, '');
var dojoConfig = {
    async: true,
    parseOnLoad: true,
    packages: [
        {
            name: 'react',
            location: locationPath + 'js/vendor',
            main: 'react.min'
        }, {
            name: 'react-dom',
            location: locationPath + 'js/vendor',
            main: 'react-dom.min'
        }, {
            name: 'react-router',
            location: locationPath + 'js/vendor',
            main: 'react-router.min'
        }, {
            name: 'redux',
            location: locationPath + 'js/vendor',
            main: 'redux.min'
        }, {
            name: 'react-redux',
            location: locationPath + 'js/vendor',
            main: 'react-redux.min'
        }, {
            name: 'redux-thunk',
            location: locationPath + 'js/vendor',
            main: 'redux-thunk.min'
        }, {
            name: 'app',
            location: locationPath + 'js'
        }],
    deps: ['app/main']
};

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swig from 'swig';
import http from 'http';
import socket from 'socket.io';

// react setup
import {configureStore } from '../client/store'
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';


// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
    }
});

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(function(req, res) {
    match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            const store = configureStore();

            return fetchComponentData(store, renderProps.components, renderProps.params)
                .then(() => {
                    const html = renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>
                    );
                    const finalState = store.getState();
                    var page = swig.renderFile('server/views/index.html', {html});
                    res.set('Content-Type', 'text/html').status(200).send(page);
                })
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});


const server = http.createServer(app);
const io = socket(server)


server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

export default app;
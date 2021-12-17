const express = require('express');
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../data/db');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/mergeResolvers');
const { errorType } = require('./errorHandling/errorsResponse');
const passport = require('passport');
const auth = require('./googleAuth');

require('../config/passport')(passport);

const start = () => {

    const getErrorCode = (errorName) => {
        return errorType[errorName]
    }

    const app = express();

    const store = new KnexSessionStore({
        knex,
        tablename: 'sessions'
    })

    app.use(cors({
        origin: process.env.API_URL,
        credentials: true
    }));

    app.use(cookieParser());
    app.use(express.json());

    app.use(session({
        name: 'sid',
        secret: process.env.SECRET_SESSION_PASS,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            //secure: process.env.NODE_ENV === 'production',
            maxAge: 1 * 60 * 60 * 3600
        },
        store
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', auth);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res }),
        formatError: (err) => {
            const error = getErrorCode(err.message);
            return ({ message: error.message, statusCode: error.statusCode })
        }
    })

    server.applyMiddleware({
        app,
        cors: {
            origin: process.env.API_URL,
            credentials: true
        }
    });

    const httpServer = http.createServer(app);

    server.installSubscriptionHandlers(httpServer);

    const port = process.env.PORT || 4000;

    httpServer.listen({port}, () => {
        console.log(`connection server http://localhost:4000${server.graphqlPath}`);
    });

}

start();
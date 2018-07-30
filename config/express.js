const glob = require('glob');
const chalk = require('chalk');
const path = require('path');
const express = require('express');


const cookieParser = require('cookie-parser');
const logger = require('morgan');

const modelsDir = "models/";
const modulesDir = "modules/";

module.exports = (app) => {
    console.log(chalk.green("loading models...."));
    glob(modelsDir + "**/*.js", (er, files) => {
        if(er) 
            throw new Error(er);
        else {
            files.forEach(file => {
                console.log(file);
                require('../'+file);
            });

            console.log(chalk.green('loading api routes....'));
            glob(modulesDir + "*/index.js", (er, files) => {
                files.forEach(file => {
                    if(er) 
                        throw new Error(er);
                    else {
                        console.log(file);
                        app.use('/api', require('../'+file));

                        // view engine setup
                        app.set('views', path.join(__dirname, 'views'));
                        app.set('view engine', 'ejs');

                        app.use(logger('dev'));
                        app.use(express.json());
                        app.use(express.urlencoded({ extended: false }));
                        app.use(cookieParser());
                        app.use(express.static(path.join(__dirname, 'public')));

                        // catch 404 and forward to error handler
                        app.use(function(req, res, next) {
                            next(createError(404));
                        });

                        // error handler
                        app.use(function(err, req, res, next) {
                            // set locals, only providing error in development
                            res.locals.message = err.message;
                            res.locals.error = req.app.get('env') === 'development' ? err : {};

                            // render the error page
                            res.status(err.status || 500);
                            res.render('error');
                        });

                        console.log('express server has been initialized....');
                    
                    }
                });
            });

        }
    });
}


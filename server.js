const express = require('express'),
    app = express(),
    cors = require('cors'),
    routes = require('./routes'),
    { createMongoDbConnection } = require('./configuration/connection');

require('dotenv').config();



app.use(cors())// Cross Origin Resource Sharing 
    .use(express.json()) // Parse JSON 
    .use(express.urlencoded({ extended: true }))  //Parse urlencoded payloads
    .use(express.static(__dirname + '/public'));  //setting public folder as static


//Router

app.use('/api/v1/admin/',routes)


app.use(function (req, res, next) {
    res.status(404).json("errors/404");
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json("errors/500");
});



try {
    createMongoDbConnection();
    app.listen(process.env.PORT, function () {
        console.log(`Http Service is running on port ${process.env.PORT}`);
    });
} catch (err) {
    // Error Handler function goes here
    console.log(err);
}


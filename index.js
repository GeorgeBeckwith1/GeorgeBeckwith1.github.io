//var express = require('express')
//var path = require('path')
//var request = require('request')

//var app = express()
//var server = require('http').Server(app)
 
//app.use('/public', express.static(path.join(__dirname, 'public')));

//app.use('/word', function(req, res){
    //request('http://beckwith-hangman.tk/').pipe(res)
//}) 

var port = process.env.PORT || 3000;
server.listen(port, error => {
    if (error)
    {
        console.log('Server error: ' + error);
    }

    console.log('Server started. Visit http://localhost:' + port);
})

//request('www.http://watchout4snakes.com/wo4snakes/Random/RandomWord').pipe(res)
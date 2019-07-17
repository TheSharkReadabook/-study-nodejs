var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var express =require('express');


var app = http.createServer(function(request, response){
    var _url = request.url;


    
    if(_url == '/'){


        response.writeHead(200);
        response.end('_index');

    }else if(_url == '/?id=sign_in'){



        response.writeHead(200);
        response.end('success');
    }
    
    
    else{
        response.writeHead(404);
        response.end('failed');
    }

    



    
});


app.listen(3000);
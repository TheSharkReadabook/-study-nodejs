var http = require('http');
var cookie = require('cookie');
http.createServer( (req, res) =>{
    console.log(req.headers.cookie);
    var cookies = {};
    if(req.headers.cookie != undefined){
        cookies = cookie.parse(req.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    res.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco',
            'tasty_cookie=strawberry', //session cookie

            `Permanent=cookies; Max-Age=${60*60*24*30}`, // permanent cookie
            
            'Secure = Secure; Secure', // https
            'HttpOnly=HttpOnly; HttpOnly', // javascript cookie id secure

            'Path=Path; Path=/cookie', // cookie and sub directory
            'Domain=Domain; Domain=localhost' // work witch domain
        ]
    });
    res.end('cookie!');
}).listen(3000);


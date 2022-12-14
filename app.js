const http = require('http');
const https = require('https');
const url = require('url');
const PORT = 80;
const HOST = "45.76.158.107";

var httpServer = http.createServer(function (req, res) {
    const path = url.parse(req.url, true).pathname;
    const search = url.parse(req.url, true).search;
    const urlPath = path.concat(search);

    console.log("Request received");

    const options = {
        hostname: 'api.binance.com',
        path: urlPath,
        method: 'DELETE',
        headers: {
          'X-MBX-APIKEY': 'd8vhaBkoetNfsRXfVW7rLKoNOrBWIr5BpYlcFlDmyOymMn52zL5cZrcZYs0XTXOy'
        }
      }
      
    const request = https.request(options, (response) => {
        response.setEncoding('utf8');
        console.log(`statusCode: ${response.statusCode}`)
        
        response.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });

        if(response.statusCode == 200){
            res.writeHead(200);
            res.end('Binance Delete All Orders Success');
        } else {
            res.writeHead(404);
            res.end('Binance Delete All Orders Error');
        }
    })
    
    request.on('error', (error) => {
        console.error(error)
    })

    request.write('delete')
    request.end()

});

httpServer.listen(PORT, HOST, () => {
    console.log("Server is running at port 80");
});
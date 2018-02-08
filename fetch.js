const fs = require('fs'),
    request = require('request'),
    parseCsv = require("csv-to-array"),
    Papa = require('papaparse');

const apiKey ='x_SjkhJeP6sge5mL1yCf'

var NSEtickers = [];
var data = [];



function Ticker(tickerCode,compName) {

    this.ticker = tickerCode;
    this.Company = compName;
    
};

var fileContents = fs.readFileSync('./data/NSE-datasets-codes.csv');
var lines = fileContents.toString().split('\n');

for (var i = 0; i < lines.length; i++) {
    NSEtickers.push(lines[i].toString().split(','));
}

console.log(NSEtickers)

ticker = NSEtickers[1][0]
/* 
//https://www.quandl.com/api/v3/datasets/NSE/OSWALAGRO?api_key=x_SjkhJeP6sge5mL1yCf
var url = 'https://www.quandl.com/api/v3/datasets/' + ticker + '/data.json?api_key=' + apiKey
console.log(url)

proxyUrl = 'http://proxy.intra.bt.com:8080'
options = {
    url: url,
    proxy: proxyUrl,
    headers: {
        'User-Agent': "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/527  (KHTML, like Gecko, Safari/419.3) Arora/0.6 (Change: )"
    }
}
var file = fs.createWriteStream("./Data/data.json");
request(options,function (err,resp,body) {
   console.log(body)
}).pipe(file) */

function fetchTickerData(ticker) {
    //ticker = NSEtickers[1][0]

    //https://www.quandl.com/api/v3/datasets/NSE/OSWALAGRO?api_key=x_SjkhJeP6sge5mL1yCf
    var url = 'https://www.quandl.com/api/v3/datasets/' + ticker + '/data.json?api_key=' + apiKey
    console.log(url)

    proxyUrl = 'http://proxy.intra.bt.com:8080'
    options = {
        url: url,
        proxy: proxyUrl,
        headers: {
            'User-Agent': "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/527  (KHTML, like Gecko, Safari/419.3) Arora/0.6 (Change: )"
        }
    }
    var file = fs.createWriteStream("./Data/data.json");
    var process = request(options, function (err, resp, body) {
        //console.log(body)
    }).pipe(file)

    
}

//fetchTickerData(NSEtickers[5][0])

/* fetchTickerData(NSEtickers[5][0],function () {
    var dataContents = fs.readFileSync('./data/data.json');
    data = JSON.parse(dataContents)
    console.log(data.dataset_data.data)
})
 */

function getChartData() {
    var dataContents = fs.readFileSync('./data/data.json');
    data = JSON.parse(dataContents)
    console.log(data.dataset_data.data)

    return data
}

getChartData()
console.log(data.dataset_data.data.length)

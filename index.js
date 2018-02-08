const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')

const apiKey = 'x_SjkhJeP6sge5mL1yCf'

// set the view engine to ejs
app.set('view engine', 'ejs')
//app.all('/', routes.index)





app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// set the static resources (css/js) to public folder
app.use('/public',express.static(path.join(__dirname, 'public')));

// blog home page
app.get('/', (req, res) => {
    // render `home.ejs` with the list of posts
    data = fetchTickers()
    res.render('home', {tickers: data })
    
})

// blog post
/* app.get('/post/:id', (req, res) => {
    // find the post in the `posts` array
    const post = posts.filter((post) => {
        return post.id == req.params.id
    })[0]

    // render the `post.ejs` template with the post content
    res.render('post', {
        author: post.author,
        title: post.title,
        body: post.body
    })
}) */
app.get('/tickerlist',(req,res)=>{  
    var NSEtickers = [];
    NSEtickers = fetchTickers();
    res.json(NSEtickers)
})

app.post('/getticker',(req,res)=>{
    data = req.body.ticker
    ticker = data.toString().substr(0, data.indexOf('-')).trim()
    if (ticker){
        //res.send('Selected ticker: ' + ticker)
        console.log(req.body.ticker)
        //res.redirect('/')
        fetchTickerData(ticker,function () {
            //res.send(JSON.stringify(getChartData()))
            //console.log(getChartData())
            var labels=[],cdata = [];
            data = getChartData()
            data = data.dataset_data.data
            l = data.length
            for(i=0;i<l;i++){
                labels[i] = data[i][0] //dates
                cdata[i]= data[i][5] //closing data
            }
            
            res.render('analysis',{labels:labels,data:cdata})
        })
    }
    else{
        res.send('it\'s not working!')
    }
    //res.redirect('tickerlist')
})


app.listen(8180)

console.log('listening on port 8180')


//helper functions can be exported to a different file later
function fetchTickers() {
    var NSEtickers = [];
    var fileContents = fs.readFileSync('./data/NSE-datasets-codes.csv');
    var lines = fileContents.toString().split('\n');

    for (var i = 0; i < lines.length; i++) {
        NSEtickers.push(lines[i].toString().split(','));
    }
    return NSEtickers;
}

function fetchTickerData(ticker,callback) {
    ticker = 'NSE/' + ticker
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
    var file = fs.createWriteStream("./data/data.json");
    var fetchprocess = request(options, function (err, resp, body) {
        console.log(resp)
    }).pipe(file)

    fetchprocess.on('finish',function () {
        console.log('piping finished!')
        callback()
    })
}

function getChartData() {
    var dataContents = fs.readFileSync('./data/data.json');
    data = JSON.parse(dataContents)
    console.log(data.dataset_data.data)

    return data
}
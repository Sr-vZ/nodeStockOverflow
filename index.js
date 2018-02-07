const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


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
    res.end()
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
    if (req.body.ticker){
        //res.send('Selected ticker: ' + req.body.ticker)
        console.log(req.body.ticker)
        //res.redirect('/')
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


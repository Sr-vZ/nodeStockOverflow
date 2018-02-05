const app = require('express')()

// set the view engine to ejs
app.set('view engine', 'ejs')

// blog home page
app.get('/', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('home', { })
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

app.listen(8180)

console.log('listening on port 8180')

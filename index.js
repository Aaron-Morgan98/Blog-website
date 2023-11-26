import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    const redirectUrl = "/create";
    res.render('index.ejs', { pageTitle: 'Home', redirectUrl, posts});
    
});

app.get("/create", (req,res) => {
    res.render("create.ejs");
})

app.post("/submit", (req,res) => {
    const blogTitle = req.body["title"]; 
    const blogBody = req.body["blogBody"];
    const author = req.body["author"]
    const blogComplete = {title: blogTitle, body: blogBody, author: author};

    posts.push(blogComplete);

    const redirectUrl = "/create";

    res.render("index.ejs", {blogComplete, blogTitle, blogBody, author, redirectUrl, posts});
});


app.post("/delete/:index", (req,res) => {
    const indexToDelete = req.params.index;

    if(indexToDelete >= 0 && indexToDelete < posts.length) {
        posts.splice(indexToDelete, 1);
    };

    const redirectUrl ="/create";
    
    res.render("index.ejs", {redirectUrl, posts});
});

app.get("/edit/:index", (req,res) => {
    const indexToEdit = req.params.index;

    if(indexToEdit >= 0 && indexToEdit < posts.length) {
        const postToEdit = posts [indexToEdit];
        res.render("edit.ejs", {postToEdit, indexToEdit});
    } else {
        res.redirect("/");
    }
});

app.post("/update/:index", (req,res) => {
    const indexToUpdate = req.params.index;

    if(indexToUpdate >= 0 && indexToUpdate < posts.length) {
        posts[indexToUpdate] = {
            title: req.body.title,
            author: req.body.author,
            body: req.body.blogBody
        };
    }

    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
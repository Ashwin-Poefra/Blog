// // node_modules
// const express = require("express");
// // const path = require("path");

// // setups
// // const { backendSetup, databaseSetup } = require("./setup");

// const app = express();

// // databaseSetup(() => {
// //     backendSetup(app);
// // });

// // console.log(path.join(__dirname, "../", "public"));
// // app.use(express.static(path.join(__dirname, "../", "public")))
// //     .set("views", path.join(__dirname, "../", "views"))
// //     .set("view engine", "ejs")
// //     .get("/", (req, res) => res.render("pages/index"));

// // app.listen(8080, () => {
// //     console.info("SUCCESS");
// // });

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.listen(8080, () => {
//     console.log(`App listening at http://localhost:${8080}`);
// });

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

/* 
    Incase you are using mongodb atlas database uncomment below line
    and replace "mongoAtlasUri" with your mongodb atlas uri.
*/
// mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true})

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

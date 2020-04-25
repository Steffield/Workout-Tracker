const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan"); //http request logger middleware
const compression = require("compression"); 

const PORT = process.env.PORT || 1234;

const app = express();

//middleware
app.use(logger("dev"));
//compress all responses
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true //added useUnifiedTopology due to terminal error message
})
.then(()=> console.log(`connected to database`));

app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});



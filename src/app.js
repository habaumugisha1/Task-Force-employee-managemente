import express from "express";
import bodyParser from "body-parser";
import db from "./models/index";
import routes from "./routes/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am using babel in NodeJS",
    status: "success",
  });
});


// db connection check
const { sequelize } = db;
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));
  
app.use('/api/v1', routes);

app.all('*', function (req, res, next) {
  var err = res.status(404).json({
    status: 404,
    error: 'Url Requested not found'
  });
  next(err);
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log("server up and running ...");
});
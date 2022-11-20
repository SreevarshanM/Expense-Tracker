const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./Routes/crudRoutes");

///////////////////////////////////////////////////

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//DB CONNECTION
mongoose
  .connect(
    "mongodb+srv://sreevarshan:abishega@cluster0.pvmlmxi.mongodb.net/Expenses?retryWrites=true&w=majority",
    {
      keepAlive: true,
    }
  )
  .then((con) => {
    console.log("DB Connection sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", router);

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});

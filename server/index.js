const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet")
const clientRoutes = require("./routes/client");
const generalRoutes = require("./routes/general");
const managementRoutes = require("./routes/management");
const salesRoutes = require("./routes/sales");
const OverallStat = require("./models/overallStat");
const ramandepRoutes = require("./routes/ramandeep");
//const AffiliateStat = require("./models/affiliateStat")
const {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
  }  = require ("./data/index.js");

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use("/ramandeep", ramandepRoutes);
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes)

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, {

}).then(()=>{
    console.log("Database connected successfully");
    app.listen(PORT, ()=>{
        //AffiliateStat.insertMany(dataAffiliateStat);
        console.log("Connected on port ", PORT);
    })
    
}).catch((err)=>{
    console.log("Database connection failed");
})
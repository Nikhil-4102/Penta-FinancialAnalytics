
const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {console.log("DB connected successfully")

        console.log("Connected to DB:", mongoose.connection.name);
    }

)
    

    .catch( (err) => {
        console.log("DB CONNECTION ISSUES");
        console.error(err);
        process.exit(1);
    } );
}
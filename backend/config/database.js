const mongoose = require("mongoose");
const { connect } = require("../app");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,
        {
            useUnifiedTopology: true,
        }
    ).then((data) => {
        console.log(`Mongodb connected with server : ${data.connection.host}`)
    })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectDatabase


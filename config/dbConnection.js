const mongoose = require('mongoose');

const database = (module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.e8qapbd.mongodb.net/?retryWrites=true&w=majority`,
            connectionParams
        );
        console.log('database connected 🚀');
    } catch (error) {
        console.log(error);
        console.log("Database not connected❌")
    }
})
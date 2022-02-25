const mongoose = require('mongoose');

// DATABASE CONNECTION
// const URL = 'mongodb://localhost:27017/dbLandlord';
// const URL = 'mongodb+srv://dbLandlord:dbLandlord@123@cluster0.gm4hw.mongodb.net/dbLandlord?retryWrites=true&w=majority'
const URL = 'mongodb://brain1uMMong0User:PL5qnU9nuvX0pBa@nodeserver.mydevfactory.com:27017/FindMyFight?authSource=admin';

getConnection = async (req, res) => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log("Findmyfight Database Connected to the MongoDB Atlus");
  } catch (error) {
    return res.status(400).json({
      message: "Failed in Database Connection",
      status: false,
      error: error
    })
  }
}

getConnection();

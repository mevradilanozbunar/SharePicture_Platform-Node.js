import mongoose from 'mongoose';

const conn = async() => {
    try{
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

          });
          console.log('Connected to the DB succesully');
    }

      catch(err) {
        console.log(`DB connection err:, ${err}`);
        process.exit(1);
      };
  };
  
  export default conn;
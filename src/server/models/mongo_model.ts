const mongoose = require('mongoose');
import 'dotenv';

console.log('===================URI', process.env.MONGO_URI);

mongoose
  .connect(
    'mongodb+srv://kyle:kyle@cluster0.sjorjx7.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err: any) => console.log(err));

const Schema = mongoose.Schema;

const documentsSchema = new Schema({
  _id: String,
  data: Object,
});

const Documents = mongoose.model('documents', documentsSchema);

export default Documents;

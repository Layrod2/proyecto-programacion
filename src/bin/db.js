const mongoose = require('mongoose');
const {Schema} = mongoose;
const remote = 'mongodb+srv://demon258:j28*Sojo@cluster0.haig3y0.mongodb.net/node-mongodb-apirest?retryWrites=true&w=majority'
const local = 'mongodb://localhost/animales';

try {
	mongoose.connect(local);
	console.log('Db is connected')
} catch(e) {
	console.log(e);
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/fp', function (err){
    if (err) { console.log('errror may indicate your should start the database, dummio') }
    else { 	console.log('mongodb connected at mongodb://127.0.0.1/fp');
};
})

//may need to bring in authapi users model somehow

module.exports = mongoose;

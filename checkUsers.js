const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/emailRegistration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Fetch and display users
async function fetchUsers() {
    try {
        const users = await User.find({});
        console.log('Registered Users:');
        console.log(users);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
}

// Call the function to fetch users
fetchUsers();

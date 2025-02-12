const express = require('express');
const app = express();

const PORT = 3000;

const API_URL = 'https://jsonplaceholder.typicode.com/users';

app.get('/users', async (req, res) => {
    try {
        const searchName = req.query.name;
        
        const response = await fetch(API_URL);
        let users = await response.json();
        
        if (searchName) {
            users = users.filter(user => 
                user.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }
            res.json({
            success: true,
            users: users
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Something went wrong getting the users' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}/users`);
});
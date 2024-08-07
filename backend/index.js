const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;
const userModel = require('./model/userData');
const eventModel = require('./model/eventData'); 
const emailRoutes = require('./emailRoutes');
require('./connection');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', emailRoutes); // Use the email routes

// Check if email already exists
app.get('/check-email', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).send('Email is required');
        }

        const existingUser = await userModel.findOne({ email });
        res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Signup
app.post('/newuser', async (req, res) => {
    try {
        const { userName, email, phoneNumber, address, password } = req.body;

        if (!userName || !email || !phoneNumber || !address || !password) {
            return res.status(400).send('All fields are required');
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send('Email already exists');
        }

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send('User signed up successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

// Add a new event
app.post('/events', async (req, res) => {
    try {
        const { eventName, description, startDate, endDate, timings, days, venue, picture } = req.body;

        if (!eventName || !description || !startDate || !endDate || !timings || !days || !venue) {
            return res.status(400).send('All fields are required');
        }

        const newEvent = new eventModel({ eventName, description, startDate, endDate, timings, days, venue, picture });
        await newEvent.save();
        res.status(201).send('Event created successfully');
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
});

// Get all users (Admin only)
app.get('/user', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all events (Admin only)
app.get('/events', async (req, res) => {
    try {
        const events = await eventModel.find({});
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get a user by email
app.get('/user/:email', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Get a event by id
app.get('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log('Fetching event with ID:', eventId);

        if (!eventId || eventId === 'undefined') {
            return res.status(400).send('Invalid event ID');
        }

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).send('Invalid event ID format');
        }

        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Internal Server Error');
    }
});




// Delete a user (Admin only)
app.delete('/api/admin/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        await userModel.deleteOne({ email });
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete an event (Admin only)
app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;

    // Debugging line to verify the ID
    console.log('Event ID for deletion:', id);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
        }

        const result = await eventModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Event not found');
        }
        res.status(200).send('Event deleted successfully');
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).json({
            message: 'Login successful',
            isAdmin: user.userName.toLowerCase() === 'admin'
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, phoneNumber, address, profilePicture } = req.body;

        const updatedData = { userName, phoneNumber, address };
        if (profilePicture) {
            updatedData.profilePicture = profilePicture;
        }

        const user = await userModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }

        console.log('User updated successfully:', updatedData);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update event by ID
app.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, description, startDate, endDate, timings, days, venue, picture } = req.body;
        // Log incoming data
        console.log('Incoming data:', req.body);
        // Validate the presence of required fields
        if (!eventName || !description || !startDate || !endDate || !timings || !days || !venue) {
            return res.status(400).send('Required fields are missing');
        }
        // Prepare the update object
        const updatedEvent = {
            eventName,
            description,
            startDate,
            endDate,
            timings,
            days,
            venue
        };
        // Include optional picture field if provided
        if (picture) {
            updatedEvent.picture = picture;
        }
        // Find event by ID and update
        const event = await eventModel.findByIdAndUpdate(id, updatedEvent, { new: true });
        if (!event) {
            return res.status(404).send('Event not found');
        }
        console.log('Event updated successfully:', updatedEvent);
        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send('Internal Server Error');
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

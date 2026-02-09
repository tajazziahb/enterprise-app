// server.js
// Dance Studio Operations Dashboard

const express = require('express');
const path = require('path');

// Route modules
const dashboardRoutes = require('./routes/dashboard');
const classesRoutes = require('./routes/classes');
const instructorsRoutes = require('./routes/instructors');
const announcementsRoutes = require('./routes/announcements');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.use('/dashboard', dashboardRoutes);
app.use('/classes', classesRoutes);
app.use('/instructors', instructorsRoutes);
app.use('/announcements', announcementsRoutes);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Dance Studio Dashboard running on port ${port}`);
});

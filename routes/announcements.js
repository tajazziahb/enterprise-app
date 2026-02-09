// routes/announcements.js
const express = require('express');
const router = express.Router();
const { addAnnouncement } = require('../lib/dataStore');

router.post('/', (req, res) => {
  try {
    if (!req.body.message || !req.body.message.trim()) {
      return res.redirect('/dashboard?error=' + encodeURIComponent('Announcement message is required'));
    }
    
    addAnnouncement({
      message: req.body.message.trim()
    });
    res.redirect('/dashboard?success=Announcement created successfully');
  } catch (error) {
    res.redirect('/dashboard?error=' + encodeURIComponent(error.message));
  }
});

module.exports = router;

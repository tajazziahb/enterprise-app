// routes/instructors.js
const express = require('express');
const router = express.Router();
const { getInstructors, addInstructor } = require('../lib/dataStore');

router.get('/', (req, res) => {
  const instructors = getInstructors();
  
  res.render('instructors', {
    instructors,
    error: req.query.error,
    success: req.query.success
  });
});

router.post('/', (req, res) => {
  try {
    // Handle availabilityDays - could be array from checkboxes or single value
    const availabilityDays = Array.isArray(req.body.availabilityDays)
      ? req.body.availabilityDays
      : (req.body.availabilityDays ? [req.body.availabilityDays] : []);

    addInstructor({
      fullName: req.body.fullName,
      styles: req.body.styles,
      availabilityDays: availabilityDays
    });
    res.redirect('/instructors?success=Instructor created successfully');
  } catch (error) {
    res.redirect('/instructors?error=' + encodeURIComponent(error.message));
  }
});

module.exports = router;

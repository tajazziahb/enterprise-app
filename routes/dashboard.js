// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { getClasses, getInstructors, getAnnouncements } = require('../lib/dataStore');

router.get('/', (req, res) => {
  const allClasses = getClasses();
  const assignedCount = allClasses.filter(c => c.instructorId !== null).length;
  const unassignedCount = allClasses.length - assignedCount;
  
  const instructors = getInstructors();
  const announcements = getAnnouncements();

  res.render('dashboard', {
    classesSummary: {
      total: allClasses.length,
      assigned: assignedCount,
      unassigned: unassignedCount
    },
    instructors,
    announcements,
    error: req.query.error,
    success: req.query.success
  });
});

module.exports = router;

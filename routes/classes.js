// routes/classes.js
const express = require('express');
const router = express.Router();
const { getClasses, addClass, getClassById, assignInstructorToClass, getInstructors } = require('../lib/dataStore');
const { hasScheduleConflict } = require('../lib/scheduler');

router.get('/', (req, res) => {
  const classes = getClasses();
  const instructors = getInstructors();
  
  res.render('classes', {
    classes,
    instructors,
    error: req.query.error,
    success: req.query.success
  });
});

router.post('/', (req, res) => {
  try {
    addClass({
      name: req.body.name,
      style: req.body.style,
      dayOfWeek: req.body.dayOfWeek,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      room: req.body.room,
      capacity: req.body.capacity
    });
    res.redirect('/classes?success=Class created successfully');
  } catch (error) {
    res.redirect('/classes?error=' + encodeURIComponent(error.message));
  }
});

router.post('/:classId/assign', (req, res) => {
  const classId = req.params.classId;
  const instructorId = req.body.instructorId || null;
  
  const classItem = getClassById(classId);
  if (!classItem) {
    return res.redirect('/classes?error=' + encodeURIComponent('Class not found'));
  }

  // If assigning an instructor, check for conflicts
  if (instructorId) {
    const allClasses = getClasses();
    const conflict = hasScheduleConflict(
      allClasses,
      instructorId,
      classItem.dayOfWeek,
      classItem.startTime,
      classItem.endTime,
      classId // Ignore the current class when checking
    );

    if (conflict) {
      return res.redirect('/classes?error=' + encodeURIComponent('Instructor has a scheduling conflict'));
    }
  }

  assignInstructorToClass(classId, instructorId);
  res.redirect('/classes?success=' + encodeURIComponent(instructorId ? 'Instructor assigned successfully' : 'Instructor unassigned'));
});

module.exports = router;

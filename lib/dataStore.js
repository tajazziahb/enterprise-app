// lib/dataStore.js
// In-memory data store for dance studio operations

let classes = [];
let instructors = [];
let announcements = [];

let nextClassId = 1;
let nextInstructorId = 1;
let nextAnnouncementId = 1;

// Classes functions
function getClasses() {
  return [...classes];
}

function getClassById(id) {
  return classes.find(c => c.id === parseInt(id));
}

function addClass(classData) {
  const newClass = {
    id: nextClassId++,
    name: classData.name,
    style: classData.style,
    dayOfWeek: classData.dayOfWeek,
    startTime: classData.startTime,
    endTime: classData.endTime,
    room: classData.room,
    capacity: parseInt(classData.capacity) || 0,
    instructorId: classData.instructorId || null
  };
  classes.push(newClass);
  return newClass;
}

function assignInstructorToClass(classId, instructorId) {
  const classItem = getClassById(classId);
  if (classItem) {
    classItem.instructorId = instructorId ? parseInt(instructorId) : null;
    return classItem;
  }
  return null;
}

// Instructors functions
function getInstructors() {
  return [...instructors];
}

function getInstructorById(id) {
  return instructors.find(i => i.id === parseInt(id));
}

function addInstructor(instructorData) {
  const styles = typeof instructorData.styles === 'string' 
    ? instructorData.styles.split(',').map(s => s.trim()).filter(s => s)
    : (instructorData.styles || []);
  
  const availabilityDays = Array.isArray(instructorData.availabilityDays)
    ? instructorData.availabilityDays
    : (instructorData.availabilityDays ? [instructorData.availabilityDays] : []);

  const newInstructor = {
    id: nextInstructorId++,
    fullName: instructorData.fullName,
    styles: styles,
    availabilityDays: availabilityDays
  };
  instructors.push(newInstructor);
  return newInstructor;
}

// Announcements functions
function getAnnouncements() {
  return [...announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function addAnnouncement(announcementData) {
  const newAnnouncement = {
    id: nextAnnouncementId++,
    message: announcementData.message,
    createdAt: new Date().toISOString()
  };
  announcements.push(newAnnouncement);
  return newAnnouncement;
}

module.exports = {
  getClasses,
  getClassById,
  addClass,
  assignInstructorToClass,
  getInstructors,
  getInstructorById,
  addInstructor,
  getAnnouncements,
  addAnnouncement
};

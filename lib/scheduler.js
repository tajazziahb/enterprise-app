// lib/scheduler.js
// Scheduling conflict detection logic

/**
 * Check if assigning an instructor to a class would create a scheduling conflict.
 * A conflict occurs when an instructor is already assigned to another class
 * on the same day with overlapping time ranges.
 * 
 * @param {Array} existingClasses - All existing classes
 * @param {number} instructorId - The instructor ID to check
 * @param {string} dayOfWeek - Day of the week (e.g., "Monday")
 * @param {string} startTime - Start time (HH:MM format)
 * @param {string} endTime - End time (HH:MM format)
 * @param {number} [classIdToIgnore] - Optional class ID to exclude from conflict check (for updates)
 * @returns {boolean} - true if conflict exists, false otherwise
 */
function hasScheduleConflict(existingClasses, instructorId, dayOfWeek, startTime, endTime, classIdToIgnore = null) {
  if (!instructorId) {
    return false; // No instructor assigned, no conflict
  }

  const instructorIdNum = parseInt(instructorId);
  const ignoreId = classIdToIgnore ? parseInt(classIdToIgnore) : null;

  // Find all classes assigned to this instructor on the same day
  const instructorClasses = existingClasses.filter(c => {
    if (c.instructorId !== instructorIdNum) return false;
    if (ignoreId && c.id === ignoreId) return false;
    return c.dayOfWeek === dayOfWeek;
  });

  if (instructorClasses.length === 0) {
    return false; // No other classes for this instructor on this day
  }

  // Convert time strings to minutes for easier comparison
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  // Check for overlap with any existing class
  for (const existingClass of instructorClasses) {
    const existingStart = timeToMinutes(existingClass.startTime);
    const existingEnd = timeToMinutes(existingClass.endTime);

    // Check for overlap: new class starts before existing ends AND new class ends after existing starts
    if (newStart < existingEnd && newEnd > existingStart) {
      return true; // Conflict found
    }
  }

  return false; // No conflicts
}

module.exports = {
  hasScheduleConflict
};

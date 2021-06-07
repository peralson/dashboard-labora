export const getTotalHours = (schedules) => {
  let timeInSeconds = 0;
  schedules.forEach((sche) => {
    sche.shifts.forEach((shift) => {
      const shiftTimeInSeconds = shift.end._seconds - shift.start._seconds;
      timeInSeconds = timeInSeconds + shiftTimeInSeconds;
    });
  });
  return timeInSeconds;
};
export const hasConsecutiveShifts = (schedules) => {
  let shiftsArePositive = true;
  let shiftsAreConsecutive = true;
  schedules.forEach((sche) => {
    sche.shifts.forEach((shift) => {
      const shiftTimeInSeconds = shift.end._seconds - shift.start._seconds;
      if (shiftTimeInSeconds <= 0) {
        shiftsArePositive = false;
      }
    });
    if (sche.shifts.length > 1) {
      sche.shifts.forEach((item, index) => {
        if (index !== 0) {
          if (item.start._seconds <= sche.shifts[index - 1].end._seconds) {
            shiftsAreConsecutive = false;
          }
        }
      });
    }
  });
  return shiftsArePositive && shiftsAreConsecutive;
};
export const getParsedSalary = (salary) => {
  let parsedSalary;
  if (salary.includes(",")) {
    parsedSalary = parseFloat(salary.split(",").join(".")).toFixed(2);
  } else {
    parsedSalary = parseFloat(salary).toFixed(2);
  }
  if (isNaN(parsedSalary)) {
    parsedSalary = 0;
  }
  return parsedSalary;
};

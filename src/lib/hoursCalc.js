const getShiftDuration = (start, end) => {
  const subtract = new Date(end).getTime() - new Date(start).getTime();
  return {
    hours: parseInt(subtract / 60 / 60),
    minutes: (subtract / 60) % 60,
  };
};

export const shiftsHoursCalc = (shifts) => {
  let hours = 0;
  let minutes = 0;

  shifts.forEach((shift) => {
    const duration = getShiftDuration(shift.start._seconds, shift.end._seconds);

    hours = hours + duration.hours;
    minutes = minutes + duration.minutes;
  });

  return {
    hours,
    minutes,
  };
};

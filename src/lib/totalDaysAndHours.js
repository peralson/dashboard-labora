import moment from "moment";
import "moment/locale/es";

export const daysAndHoursFromHistory = (history) => {
  let totalDaysWorked = 0;
  let totalHoursInSeconds = 0;
  history.forEach((job) => {
    job.data.schedule.forEach((day) => {
      totalDaysWorked = totalDaysWorked + 1;
      day.shifts.forEach((shift) => {
        totalHoursInSeconds =
          totalHoursInSeconds + (shift.end._seconds - shift.start._seconds);
      });
    });
  });

  return { totalDaysWorked, totalHoursInSeconds };
};

export const daysAndHoursFromOffer = (offerSchedules) => {
  let totalDaysWorked = 0;
  let totalHoursAndMins = { hours: 0, mins: 0 };

  offerSchedules.forEach((day) => {
    totalDaysWorked = totalDaysWorked + 1;
    day.shifts.forEach((shift) => {
      const period = moment((shift.end._seconds - shift.start._seconds) * 1000)
        .format("HH:mm")
        .split(":");
      totalHoursAndMins = {
        hours: totalHoursAndMins.hours + parseInt(period[0]) - 1,
        mins: totalHoursAndMins.mins + parseInt(period[1]),
      };
    });
  });

  return { totalDaysWorked, totalHoursAndMins };
};

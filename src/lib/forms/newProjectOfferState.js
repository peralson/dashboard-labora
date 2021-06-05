const HOUR_IN_SECONDS = 3600;

export const initialState = {
  name: "",
  category: "",
  description: "",
  schedule: [],
  extras: [],
  qty: 1,
  salary: 0,
  extraSalary: 0,
  contractId: "",
  tags: [],
};

export const validateForm = (state) => {
  return true;
};

export const validateNameDescCat = (state) => {
  const hasName = state.name !== "";
  const isNameLong = state.name.length >= 3;
  const hasCategory = state.category.length > 0;

  return {
    isNameDescCatValid: hasName && isNameLong && hasCategory,
    hasName: hasName,
    isNameLong: isNameLong,
    hasCategory: hasCategory,
  };
};

const getTotalHours = (schedules) => {
  let timeInSeconds = 0;
  schedules.forEach((sche) => {
    sche.shifts.forEach((shift) => {
      const shiftTimeInSeconds = shift.end._seconds - shift.start._seconds;
      timeInSeconds = timeInSeconds + shiftTimeInSeconds;
    });
  });
  return timeInSeconds;
};

const hasConsecutiveShifts = (schedules) => {
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

export const validateSchedule = (state) => {
  const hasSchedule = state.schedule.length !== 0;
  const shiftsLongerThanHour =
    hasSchedule && getTotalHours(state.schedule) >= HOUR_IN_SECONDS;
  const allConsecutiveShifts =
    hasSchedule && hasConsecutiveShifts(state.schedule);

  return {
    isScheduleValid:
      hasSchedule && shiftsLongerThanHour && allConsecutiveShifts,
    hasSchedule: hasSchedule,
    shiftsLongerThanHour: shiftsLongerThanHour,
    allConsecutiveShifts: allConsecutiveShifts,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "editName":
      return {
        ...state,
        name: action.payload,
      };

    case "editDescription":
      return {
        ...state,
        description: action.payload,
      };

    case "setCategory":
      return {
        ...state,
        category: action.payload,
      };

    case "addDate":
      return {
        ...state,
        schedule: [
          ...state.schedule,
          {
            day: action.payload,
            shifts: [
              {
                start: {
                  _seconds: action.payload._seconds + HOUR_IN_SECONDS * 9,
                }, // 9 hours
                end: {
                  _seconds: action.payload._seconds + HOUR_IN_SECONDS * 14.5,
                }, // 14:30 hours
              },
            ],
          },
        ],
      };

    case "removeDate":
      const updatesDates = state.schedule.filter(
        (sche) => sche.day !== action.payload,
      );
      return {
        ...state,
        schedule: updatesDates,
      };

    case "addShift":
      let dateToBePushed = state.schedule.find(
        (sche) => sche.day === action.date,
      );
      const totalShifts = dateToBePushed.shifts.length;
      const lastTime = dateToBePushed.shifts[totalShifts - 1].end._seconds;
      dateToBePushed.shifts.push({
        start: { _seconds: lastTime + HOUR_IN_SECONDS },
        end: { _seconds: lastTime + HOUR_IN_SECONDS * 2 },
      });
      return { ...state };

    case "setShift":
      const updatedSche = state.schedule.find(
        (sche) => sche === action.payload.day,
      );
      if (action.payload.type === "start") {
        updatedSche.shifts[action.payload.index].start._seconds =
          action.payload.shift / 1000;
      } else {
        updatedSche.shifts[action.payload.index].end._seconds =
          action.payload.shift / 1000;
      }
      return { ...state };

    case "removeShift":
      state.schedule[action.index].shifts.splice(-1, 1);
      return { ...state };

    default:
      return state;
  }
};
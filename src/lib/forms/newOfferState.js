import { EXTRAS, HOUR_IN_SECONDS } from "../Constants";
import { getParsedSalary, getTotalHours, hasConsecutiveShifts } from "./utils";

export const initialState = {
  projectData: {
    name: null,
    location: {
      lat: null,
      lng: null,
      address: "",
    },
    description: "",
    dates: [],
  },
  offerData: {
    name: "",
    category: "",
    description: "",
    schedule: [],
    extras: EXTRAS,
    qty: 1,
    salary: null,
    extraSalary: null,
    contractId: "",
    tags: [],
    totalWorkers: null,
  },
};

export const validateForm = (state) => {
  return (
    validateNameDescCatDates(state) &&
    validateSchedule(state) &&
    validateLegalPayrolls(state) &&
    validateQtyTags(state)
  );
};

export const validateNameDescCatDates = (state) => {
  const hasName = state.offerData.name !== "";
  const isNameLong = state.offerData.name.length >= 3;
  const hasCategory = state.offerData.category.length > 0;
  const hasAddress =
    state.projectData.location.address !== "" &&
    state.projectData.location.lat !== null &&
    state.projectData.location.lng !== null;
  const hasDates = state.projectData.dates.length !== 0;

  return {
    isNameDescCatDatesValid:
      hasName && isNameLong && hasCategory && hasAddress && hasDates,
    hasName: hasName,
    hasAddress: hasAddress,
    hasCategory: hasCategory,
    hasDates: hasDates,
    isNameLong: isNameLong,
  };
};

export const validateSchedule = (state) => {
  const hasSchedule = state.offerData.schedule.length !== 0;
  const shiftsLongerThanHour =
    hasSchedule && getTotalHours(state.offerData.schedule) >= HOUR_IN_SECONDS;
  const allConsecutiveShifts =
    hasSchedule && hasConsecutiveShifts(state.offerData.schedule);

  return {
    isScheduleValid:
      hasSchedule && shiftsLongerThanHour && allConsecutiveShifts,
    hasSchedule: hasSchedule,
    shiftsLongerThanHour: shiftsLongerThanHour,
    allConsecutiveShifts: allConsecutiveShifts,
  };
};

export const validateLegalPayrolls = (state) => {
  const hasSalary = state.offerData.salary && state.offerData.salary > 0;
  const hasSalaryOverMin =
    state.offerData.salary && state.offerData.salary > 5.75;
  const hasExtraSalary =
    state.offerData.extraSalary && state.offerData.extraSalary > 0;
  const hasExtraSalaryOverMin =
    state.offerData.salary &&
    state.offerData.extraSalary &&
    state.offerData.extraSalary >= state.offerData.salary * 1.1;
  const hasContract = state.offerData.contractId.length !== 0;

  return {
    isLegalPayrollValid:
      hasSalary &&
      hasSalaryOverMin &&
      hasExtraSalary &&
      hasExtraSalaryOverMin &&
      hasContract,
    hasSalary: hasSalary,
    hasSalaryOverMin: hasSalaryOverMin,
    hasExtraSalary: hasExtraSalary,
    hasExtraSalaryOverMin: hasExtraSalaryOverMin,
    hasContract: hasContract,
  };
};

export const validateQtyTags = (state) => {
  const hasQty = state.offerData.qty >= 1;
  const hasEnough = state.offerData.qty <= state.offerData.totalWorkers;

  return {
    isQtyTagsValid: hasQty && hasEnough,
    hasQty: hasQty,
    hasEnough: hasEnough,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "editName":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          name: action.payload,
        },
      };

    case "setCategory":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          category: action.payload,
        },
      };

    case "setAddress":
      return {
        ...state,
        projectData: {
          ...state.projectData,
          location: action.payload,
        },
      };

    case "editDescription":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          description: action.payload,
        },
      };

    case "setDates":
      const formattedDates = action.payload.map((date) => ({
        _seconds: date / 1000,
      }));
      return {
        ...state,
        projectData: {
          ...state.projectData,
          dates: formattedDates,
        },
      };

    case "addDate":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          schedule: [
            ...state.offerData.schedule,
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
        },
      };

    case "removeDate":
      const updatesDates = state.offerData.schedule.filter(
        (sche) => sche.day !== action.payload,
      );
      return {
        ...state,
        offerData: {
          ...state.offerData,
          schedule: updatesDates,
        },
      };

    case "addShift":
      let dateToBePushed = state.offerData.schedule.find(
        (sche) => sche.day === action.date,
      );
      const totalShifts = dateToBePushed.shifts.length;
      const lastShiftTime = dateToBePushed.shifts[totalShifts - 1].end._seconds;
      dateToBePushed.shifts.push({
        start: { _seconds: lastShiftTime + HOUR_IN_SECONDS },
        end: { _seconds: lastShiftTime + HOUR_IN_SECONDS * 2 },
      });
      return { ...state };

    case "setShift":
      const updatedSche = state.offerData.schedule.find(
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
      state.offerData.schedule[action.index].shifts.splice(-1, 1);
      return { ...state };

    case "editSalary":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          salary: getParsedSalary(action.payload),
        },
      };

    case "editExtraSalary":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          extraSalary: getParsedSalary(action.payload),
        },
      };

    case "editExtraItem":
      const extraItem = state.offerData.extras.find(
        (item) => item.id === action.id,
      );
      extraItem.amount = parseFloat(getParsedSalary(action.payload));
      return { ...state };

    case "setContract":
      const isSameContract = state.offerData.contractId === action.payload;
      return {
        ...state,
        offerData: {
          ...state.offerData,
          contractId: isSameContract ? "" : action.payload,
        },
      };

    case "setTotalWorker":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          totalWorkers: action.payload,
        },
      };

    case "addQty":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          qty: state.offerData.qty + 1,
        },
      };

    case "subtractQty":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          qty: state.offerData.qty - 1,
        },
      };

    case "setTags":
      return {
        ...state,
        offerData: {
          ...state.offerData,
          tags: action.payload,
        },
      };

    default:
      return state;
  }
};

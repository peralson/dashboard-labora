import { EXTRAS, HOUR_IN_SECONDS } from "../Constants";
import { getParsedSalary, getTotalHours, hasConsecutiveShifts } from "./utils";

export const initialState = {
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
};

export const validateForm = (state) => {
  return (
    validateNameDescCat(state) &&
    validateSchedule(state) &&
    validateLegalPayrolls(state) &&
    validateQtyTags(state)
  );
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

export const validateLegalPayrolls = (state) => {
  const hasSalary = state.salary && state.salary > 0;
  const hasSalaryOverMin = state.salary && state.salary > 5.75;
  const hasExtraSalary = state.extraSalary && state.extraSalary > 0;
  const hasExtraSalaryOverMin =
    state.salary &&
    state.extraSalary &&
    state.extraSalary >= state.salary * 1.1;
  const hasContract = state.contractId.length !== 0;

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
  const hasQty = state.qty >= 1;
  const hasEnough = state.qty <= state.totalWorkers;

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
      const lastShiftTime = dateToBePushed.shifts[totalShifts - 1].end._seconds;
      dateToBePushed.shifts.push({
        start: { _seconds: lastShiftTime + HOUR_IN_SECONDS },
        end: { _seconds: lastShiftTime + HOUR_IN_SECONDS * 2 },
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

    case "editSalary":
      return {
        ...state,
        salary: getParsedSalary(action.payload),
      };

    case "editExtraSalary":
      return {
        ...state,
        extraSalary: getParsedSalary(action.payload),
      };

    case "editExtraItem":
      const extraItem = state.extras.find((item) => item.id === action.id);
      extraItem.amount = getParsedSalary(action.payload);
      return { ...state };

    case "setContract":
      const isSameContract = state.contractId === action.payload;
      return { ...state, contractId: isSameContract ? "" : action.payload };

    case "setTotalWorker":
      return { ...state, totalWorkers: action.payload };

    case "addQty":
      return { ...state, qty: state.qty + 1 };

    case "subtractQty":
      return { ...state, qty: state.qty - 1 };

    case "setTags":
      return { ...state, tags: action.payload };

    default:
      return state;
  }
};

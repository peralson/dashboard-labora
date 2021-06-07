export const formattedSalary = (salary) => {
  let salaryArray =
    typeof salary === "string"
      ? salary.toString().split(".")
      : salary.toFixed(2).toString().split(".");

  if (salaryArray.length === 2) {
    if (salaryArray[1].length === 1) {
      salaryArray[1] = salaryArray[1] + "0";
    }
  }

  return salaryArray.join(",");
};

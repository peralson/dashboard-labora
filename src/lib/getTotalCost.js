import { daysAndHoursFromOffer } from "./totalDaysAndHours";

export const getTotalExtras = (offerData) => {
  let extras = offerData.extraSalary;
  offerData.extras.forEach((extra) => {
		extras += extra.amount;
	});
  return extras;
}

export const getTotalOffer = (offerData) => {
	let total =
		offerData.salary *
		daysAndHoursFromOffer(offerData.schedule).totalHoursAndMins.hours;

	return (total + getTotalExtras(offerData)) * offerData.qty;
};

export const getTotalProject = (projectOffers) => {
	let total = 0;
	projectOffers.forEach((offer) => {
		total += getTotalOffer(offer.offerData);
	});

	return total;
};

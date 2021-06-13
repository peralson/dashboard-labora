import { daysAndHoursFromOffer } from './totalDaysAndHours';

export const getTotalCost = (projectOffers) => {
  let total = 0;
  projectOffers.forEach((offer) => {
    const hours = daysAndHoursFromOffer(offer.offerData.schedule)
      .totalHoursAndMins.hours;
    total += (offer.offerData.salary * offer.offerData.qty * hours);
  });

  return total;
};
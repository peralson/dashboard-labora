export const countApplications = offers => {
    let count = 0
    offers.forEach(offer => {
      offer.offerApplications.map(() => count++)
    })
    return count
  }
  
export const getApplicationFilter = projectOffers => {
    let filters = []
    projectOffers.forEach(offer => {
        filters.push(offer.offerData.name);
    })
    return filters
}

export const getAllApplications = projectOffers => {
    let allApplications = []
    projectOffers.forEach(({ offerApplications, offerData }) => {
        let offerName = offerData.name
        let offerCategory = offerData.category
        offerApplications.forEach(item => {
            allApplications.push({
                ...item,
                offerName: offerName,
                offerCategory: offerCategory,
                tags: ['Bajo', 'Trabajador']
            })
        })
    })
    return allApplications
}
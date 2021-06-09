const sortByDate = (datesArray, direction = 'DES') => {
    const sortedArray = datesArray.sort((a, b) => {
        if (a.projectData.dates[0]._seconds < b.projectData.dates[0]._seconds) {
            return direction === 'DES' ? -1 : 1
        }
        if (a.projectData.dates[0]._seconds > b.projectData.dates[0]._seconds) {
          return direction === "DES" ? 1 : -1;
        }
        return 0
    })

    return sortedArray
}

export default sortByDate
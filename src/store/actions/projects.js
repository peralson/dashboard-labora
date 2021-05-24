import sortByDate from '../../lib/sortByDate'
export const FETCH_PROJECTS = "FETCH_PROJECTS"

export const fetchProjects = () => {
	return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/event/fullEvents',
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    if (!response.ok && response.status === 404) return dispatch({ type: FETCH_PROJECTS, projects: [] })
    if (!response.ok) throw new Error('Ha ocurrido un error.')

    let projects = []
    const resData = await response.json()

    resData.body.forEach(project => {
      projects.push(project)
    })

    const projectsSortByDate = sortByDate(projects)

		dispatch({
			type: FETCH_PROJECTS,
			projects: projectsSortByDate
		})
	} 
}
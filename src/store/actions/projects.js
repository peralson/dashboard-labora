export const FETCH_PROJECTS = "FETCH_PROJECTS"

export const fetchProjects = () => {
	return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/event/fullEvents',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
      }
    )

    if (!response.ok && response.status === 404) {
      dispatch({ type: FETCH_PROJECTS, projects: [] })
      return
    }
    if (!response.ok) throw new Error('Ha ocurrido un error.')

    let projects = []
    const resData = await response.json()

    console.log(resData);

    resData.body.forEach(project => {
      projects.push(project)
    })

		dispatch({
			type: FETCH_PROJECTS,
			projects: projects
		})
	} 
}
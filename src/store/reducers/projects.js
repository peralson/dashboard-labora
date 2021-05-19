/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PROJECTS } from '../actions/projects'

const initialState = {
    allProjects: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS:
            return {
                allProjects: action.projects,
            }
        
        default:
            return state
    }
}
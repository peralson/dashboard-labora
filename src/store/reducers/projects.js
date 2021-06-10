/* eslint-disable import/no-anonymous-default-export */
import sortByDate from '../../lib/sortByDate';
import {
  FETCH_PROJECTS,
  FETCH_PAST_PROJECTS,
  CREATE_NEW_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT_OFFER,
  DELETE_PROJECT_OFFER,
  EDIT_OFFER,
  EDIT_PROJECT
} from '../actions/projects';

import { HANDLE_APPLICATION } from "../actions/applications";

const initialState = {
  allProjects: [],
  pastProjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        allProjects: action.projects,
      };

    case FETCH_PAST_PROJECTS:
      return {
        ...state,
        pastProjects: action.pastProjects,
      };

    case CREATE_NEW_PROJECT:
      return {
        ...state,
        allProjects: sortByDate([...state.allProjects, action.payload]),
      };

    case DELETE_PROJECT:
      return {
        ...state,
        allProjects: state.allProjects.filter(
          (project) => project.id !== action.id,
        ),
      };

    case CREATE_PROJECT_OFFER:
      const project = state.allProjects.find((p) => p.id === action.projectId);
      project.projectOffers.push({
        id: action.offerId,
        offerData: action.data,
        offerApplications: [],
      });
      return { ...state };

    case DELETE_PROJECT_OFFER:
      const updatedProject = state.allProjects.find(
        (p) => p.id === action.projectId,
      );
      const updatedOffers = updatedProject.projectOffers.filter(
        (offer) => offer.id !== action.offerId,
      );
      updatedProject.projectOffers = updatedOffers;
      return { ...state };

    case EDIT_OFFER:
      const updatedOfferProject = state.allProjects.find(
        (p) => p.id === action.payload.projectId,
      );
      const updatedOffer = updatedOfferProject.projectOffers.find(
        (offer) => offer.id === action.payload.updatedOffer.id,
      );
      updatedOffer.offerData = action.payload.updatedOffer;
      return { ...state };

    case EDIT_PROJECT:
      const editedProject = state.allProjects.find((p) => p.id === action.id);
      editedProject.projectData = action.projectData;
      return { ...state };

    case HANDLE_APPLICATION:
      const appProject = state.allProjects.find(
        (p) => p.id === action.projectId,
      );
      const appOffer = appProject.projectOffers.find(
        (p) => p.id === action.offerId,
      );
      const newOfferApplications = appOffer.offerApplications.filter(
        (app) => app.id !== action.applicationId,
      );
      if (action.action === "accept") {
        appProject.projectData.jobs += 1
        appOffer.offerData.already_assigned += 1
      }
      appOffer.offerData.number_applies -= 1
      newOfferApplications.offerApplications = newOfferApplications;
      return { ...state };

    default:
      return state;
  }
};
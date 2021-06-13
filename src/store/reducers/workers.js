/* eslint-disable import/no-anonymous-default-export */
import { FETCH_WORKERS } from '../actions/workers';
import { EDIT_TAGS } from '../actions/tags';
import { EDIT_CATEGORIES } from '../actions/categories';


const initialState = {
  allWorkers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKERS:
      return {
        allWorkers: action.workers,
      };
    case EDIT_TAGS:
      state.allWorkers.forEach((worker) => {
        if (action.payload.userList.includes(worker.id)) {
          if (action.payload.action === 'update') {
            action.payload.tagList.forEach((tag) => {
              if (!worker.tags.includes(tag)) {
                worker.tags.push(tag);
              }
            });
          } else {
            action.payload.tagList.forEach((tag) => {
              if (worker.tags.includes(tag)) {
                const index = worker.tags.indexOf(tag);
                worker.tags.splice(index, 1);
              }
            });
          }
        }
      });

      return {
        ...state,
      };
      case EDIT_CATEGORIES:
        state.allWorkers.forEach((worker) => {
          if (action.payload.userList.includes(worker.id)) {
            if (action.payload.action === 'update') {
              action.payload.categoryList.forEach((cat) => {
                if (!worker.categories.includes(cat)) {
                  worker.categories.push(cat);
                }
              });
            } else {
              action.payload.categoryList.forEach((cat) => {
                if (worker.categories.includes(cat)) {
                  const index = worker.categories.indexOf(cat);
                  worker.categories.splice(index, 1);
                }
              });
            }
          }
        });
  
        return {
          ...state,
        };
    default:
      return state;
  }
};

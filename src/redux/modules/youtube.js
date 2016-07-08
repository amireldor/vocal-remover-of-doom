import {YOUTUBE_SEARCH, YOUTUBE_SEARCH_RESULTS} from 'constants/ActionTypes';

const [PENDING, DONE] = ['PENDING', 'DONE'];

const initialState = {
  searchTerm: '',
  searchResults: [],
  searchStatus: DONE
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case YOUTUBE_SEARCH:
      return {
        ...state,
        searchStatus: PENDING,
        searchTerm: action.searchTerm
      };
    case YOUTUBE_SEARCH_RESULTS:
      return {
        ...state,
        searchStatus: DONE,
        searchResults: action.items
      };
    default:
      return state;
  }
}


const YOUTUBE_SEARCH = 'vocal-doom/youtube/YOUTUBE_SEARCH';
const YOUTUBE_SEARCH_RESULTS = 'vocal-doom/youtube/YOUTUBE_SEARCH_RESULTS';
const [PENDING, DONE] = ['PENDING', 'DONE'];

const initialState = {
  searchTerm: '',
  searchResults: [],
  searchStatus: DONE
};

export default function reducer(state = initialState, action) {
  switch (action) {
    case YOUTUBE_SEARCH:
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    case YOUTUBE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.results
      };
    default:
      return state;
  }
}

export function search(searchTerm) {
  console.log('in redeucer', searchTerm);
  return (dispatch) => {
    // Dispatch the initiation of the search
    dispatch({
      type: YOUTUBE_SEARCH,
      searchTerm,
      status: PENDING
    });

    // Do the search!
    console.log('YOUTUBE RESULTS');
  };
}

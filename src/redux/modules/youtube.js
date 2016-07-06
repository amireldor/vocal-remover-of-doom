const YOUTUBE_SEARCH = 'vocal-doom/youtube/YOUTUBE_SEARCH';
const YOUTUBE_SEARCH_RESULTS = 'vocal-doom/youtube/YOUTUBE_SEARCH_RESULTS';
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

export function search(searchTerm) {
  console.log('in redeucer', searchTerm);
  return (dispatch) => {
    // Dispatch the initiation of the search
    dispatch({
      type: YOUTUBE_SEARCH,
      searchTerm
    });

    // Do the search!
    gapi.client.youtube.search.list({
      part: 'snippet',
      type: 'video',
      maxResults: 50,
      order: 'relevance',
      safeSearch: 'none',
      q: searchTerm
    }).then((result) => {
      console.log('results!', result.result.items);
      dispatch({
        type: YOUTUBE_SEARCH_RESULTS,
        items: result.result.items
      });
    }, (err) => {
      console.error('There was some error with the YouTube search', err);
      // TODO: dispatch error message
    });
    console.log('YOUTUBE RESULTS');
  };
}

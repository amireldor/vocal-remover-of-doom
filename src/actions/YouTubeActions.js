/**
 * Actions with YouTube, hopefully. If you want to play a song from YouTube, go to SongActions, I think.
 */

import {YOUTUBE_SEARCH, YOUTUBE_SEARCH_RESULTS} from 'constants/ActionTypes';

export function search(searchTerm) {
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
      // Dispatch the results...
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

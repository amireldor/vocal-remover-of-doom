import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

// import auth from './auth';
// import counter from './counter';
// import {reducer as form} from 'redux-form';
import info from './info';
// import widgets from './widgets';

import song from './song';
import playerControls from './playerControls';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  info,
  song,
  playerControls
});

// export default combineReducers({
//   routing: routerReducer,
//   reduxAsyncConnect,
//   auth,
//   form,
//   multireducer: multireducer({
//     counter1: counter,
//     counter2: counter,
//     counter3: counter
//   }),
//   info,
//   widgets
// });

import { combineReducers } from 'redux';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import dataTable from './data-filter/reducers';

const rootReducers = combineReducers({
  message: readMessageReducer,

  notification: readNotificationReducer,
  auth: authReducer,
  ChangeLayoutMode,
  dataTable,
});

export default rootReducers;

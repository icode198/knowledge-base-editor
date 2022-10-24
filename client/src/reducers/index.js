import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import disease from './disease';

export default combineReducers({
  alert,
  auth,
  profile,
  disease
});

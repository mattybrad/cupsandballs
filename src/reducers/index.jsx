import { combineReducers } from 'redux';
import Background from './Background';
import SoundToy from './SoundToy';

const rootReducer = combineReducers({
  Background,
  SoundToy
});

export default rootReducer;

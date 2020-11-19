import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth, * as authSelectors from './auth';
import users, * as usersSelectors from './users';


const reducer = combineReducers({
    auth,
    users,
    form: formReducer,
});

export default reducer;

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
// export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
// export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
// export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

export const getUser = (state, id) => usersSelectors.getUser(state.users, id);
export const getUsers = state => usersSelectors.getUsers(state.users);
export const isFetchingUsers = state => usersSelectors.isFetchingUsers(state.users);
export const getUsersError = state => usersSelectors.getUsersError(state.users);
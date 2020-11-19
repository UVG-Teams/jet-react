import {
    call,
    takeEvery,
    put,
    select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as http from '../utils/http';
import * as selectors from '../reducers';
import * as actions from '../actions/users';
import * as types from '../types/users';
import * as schemas from '../schemas/users';
import {
    API_BASE_URL,
} from '../settings';


function* fetchUsers(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
            fetch,
            `${API_BASE_URL}/users/`,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JET ${token}`,
                },
            },
        );

        if (http.isSuccessful(response.status)) {
            const jsonResult = yield response.json();
            const {
                entities: { users },
                result,
            } = normalize(jsonResult, schemas.users);
            yield put(actions.completeFetchingUsers(users, result));
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.failFetchingUsers(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failFetchingUsers('Connection failed!'));
    }
}
    
export function* watchFetchUsers() {
    yield takeEvery(
        types.FETCH_USERS_STARTED,
        fetchUsers,
    );
}


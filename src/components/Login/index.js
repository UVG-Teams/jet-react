import React, { useState } from 'react'
import {connect} from 'react-redux'

import * as selectors from '../../reducers'
import * as actions from '../../actions/auth'
import * as actionsUsers from '../../actions/users'

import './styles.css';

const Login = ({
    onSubmit,
    getUsers,
    logout,
    refresh,
    users,
    token,
    isLoading,
    error = null,
    isAuthenticated = false
}) => {
    const [username, changeUsername] = useState()
    const [password, changePassword] = useState()

    return (
        <div className="page">
            <div className="loginForm">
                <div className="user">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => changeUsername(e.target.value)}
                    />
                </div>

                <div className="pass">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => changePassword(e.target.value)}
                    />
                </div>
                <div>
                    {
                        isLoading ? (
                            <label>{'Cargando...' }</label>
                        ) : (
                            <button onClick={() => onSubmit(username, password)}>Ingresar</button>
                        )
                    }

                    <button className="btnLogout" onClick={() => logout()}>Cerrar sesion</button>
                </div>
            </div>
            <div className="usersContainer">
                <div>
                    <button className="btnShow" onClick={() => getUsers()}>Mostrar usuarios</button>
                </div>
                <div className="usersTable">
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        {
                            users.length > 0 && !isLoading && (
                                <tbody>
                                  {
                                        users.map(user =>
                                            <tr>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                            </tr>
                                        )
                                  }
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
            <div className="tokenContainer">
                <div>
                    <button className="btnRefresh" onClick={() => refresh()}>Refresh</button>
                </div>
                <div className="token">
                    {
                        <p>{token}</p>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => ({
        isLoading: selectors.getIsAuthenticating(state),
        error: selectors.getAuthenticatingError(state),
        isAuthenticated: selectors.isAuthenticated(state),
        users: selectors.getUsers(state),
        token: selectors.getAuthToken(state),
    }),
    dispatch => ({
        onSubmit(username, password) {
            dispatch(actions.startLogin(username, password));
        },
        getUsers(){
          dispatch(actionsUsers.startFetchingUsers());
        },
        logout(){
            dispatch(actions.logout());
        },
        refresh(){
            dispatch(actions.startTokenRefresh());
        }

    }),

)
(Login);

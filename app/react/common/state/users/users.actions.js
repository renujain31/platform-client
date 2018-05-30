import UserEndpoints from "react/common/endpoints/users";

export const SAVE_NEW_USER = "SAVE_NEW_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const HANDLE_REQUEST_FAILURE = "HANDLE_REQUEST_FAILURE";

export function receiveUser(user) {
    return { type: RECEIVE_USER, user };
}

export function handleRequestFailure(error) {
    return { type: HANDLE_REQUEST_FAILURE, error };
}

export function saveNewUser(user) {
    return function action(dispatch) {
        dispatch({ type: SAVE_NEW_USER });
        return UserEndpoints.saveUser(user)
            .then(userResponse => dispatch(receiveUser(userResponse)))
            .catch(error => dispatch(handleRequestFailure(error)));
    };
}

export function userReducer(state = 'jao', action) {
    switch(action.type) {
        case 'LOGIN' :
            return action.payload
        default:
            return state
    }
}
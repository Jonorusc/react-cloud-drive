export default function contentReducer(state, action) {
    switch(action.type) {
        case 'CONTENT_REQUEST':
            return {
                ...state, 
                loading: true, 
                fail: false,
            }
        case 'CONTENT_SUCCESS': 
            return {
                ...state,
                loading: false,
                content: action.payload,
                fail: false,
            }
        case 'CONTENT_FAIL': 
            return {
                ...state,
                loading: false,
                fail: true,
            }
        default: return state
    }
}
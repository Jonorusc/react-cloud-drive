export default function contentReducer(state = {}, action) {
  switch (action.type) {
    case "CONTENT_REQUEST":
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

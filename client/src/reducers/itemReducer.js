const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "get-items":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "get-articlecount":
      return {
        ...state,
        articlecount: action.payload,
        loading: false,
      };
    case "get-genrecount":
      return {
        ...state,
        genrecount: action.payload,
        loading: false,
      };
    case "delete-item":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case "add-item":
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case "update-item":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "items-loading":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

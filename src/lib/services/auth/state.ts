import type { AuthReducerAction, AuthReducerState } from "./type";

export const AuthReducer = (
  state: AuthReducerState,
  action: AuthReducerAction,
): AuthReducerState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        status: "AUTHENTICATED",
        token: action.props.token,
        user: action.props.user,
      };

    case "SIGN_OUT":
      return {
        status: "UNAUTHENTICATED",
        token: undefined,
        user: undefined,
      };

    case "PENDING": {
      return {
        ...state,
        status: "PENDING",
      };
    }

    default:
      return state;
  }
};

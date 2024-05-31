import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, actions) {
      state.isLoggedIn = actions.payload.isLoggedIn;
      state.token = actions.payload.token;
      state.user = actions.payload.user;
      state.isLoading = actions.payload.isLoading;
    },
    signOut(state, actions) {
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;
      state.isLoading = false;
    },
    registerUser(state, actions) {
      state.isLoggedIn = false;
      state.user = actions.payload.user;
      state.isLoading = actions.payload.isLoading;
      state.token = "";
    },
  },
});

export default slice.reducer;

export function UserLogin(formValues) {
  return async (dispatch) => {
    try {
      dispatch(
        slice.actions.logIn({
          isLoading: true,
          isLoggedIn: false,
          user: null,
          token: "",
        })
      );

      let response = await fetch(`http://localhost:4000/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      let result = await response.json();

      console.log(result);

      if (result?.success) {
        dispatch(
          slice.actions.logIn({
            isLoading: false,
            isLoggedIn: true,
            user: result.user,
            token: result.user.token,
          })
        );

        return {
          success: true,
          token: result.user.token,
          user: result.user,
        };
      } else {
        dispatch(
          slice.actions.logIn({
            isLoading: false,
            isLoggedIn: false,
            user: null,
            token: "",
          })
        );
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.log(error);
      dispatch(
        slice.actions.logIn({
          isLoading: false,
          isLoggedIn: false,
          user: null,
          token: "",
        })
      );
      return { success: false, error };
    }
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    try {
      console.log("Registering user", JSON.stringify(formValues));
      dispatch(slice.actions.registerUser({ isLoading: true, user: null }));
      let response = await fetch(`http://localhost:4000/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      let result = await response.json();

      if (result?.success) {
        dispatch(
          slice.actions.logIn({
            user: result?.user,
            isLoading: false,
          })
        );

        return { success: true, user: result?.user };
      }
    } catch (error) {
      console.log(error);
      return { success: false, error: error };
    }
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
  };
}

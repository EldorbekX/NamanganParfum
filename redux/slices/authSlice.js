import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { TOKEN, USER } from "@/constants";
import { request } from "@/server/request";

const initialState = {
  isAuth: getCookie(TOKEN) ? true : false,
  user: JSON.parse(localStorage.getItem(USER)) || null,
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ user: userData, router }) => {
    let {
      data: { accesstoken, user },
    } = await request.post("auth/login", userData);

    setCookie(TOKEN, accesstoken);
    localStorage.setItem(USER, JSON.stringify(user));

    if (user?.role) {
      router.push("/admin");
    } else {
      router.push("/");
    }

    request.defaults.headers.Authorization = `Bearer ${accesstoken}`;

    return user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state, { payload: router }) => {
      deleteCookie(TOKEN);
      localStorage.removeItem(USER);
      state.isAuth = false;
      state.user = false;
      router.push("/");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { name, reducer, actions } = authSlice;

export const { setAuth, setUser, logout } = actions;

export default reducer;

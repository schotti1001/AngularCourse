import { AppState } from "../../store/app.reducer";
import { AuthState } from "./auth.reducer";

export const user = (state: AppState) => state.auth.user;

export const auth = (state: AppState) => state.auth;
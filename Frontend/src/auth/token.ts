import store from "../Redux/store";
import { logout, setAccessToken } from "../Redux/userAuthSlice";


// export function setAccessToken(token: string | null) {
//   if (token) {
//     store.dispatch(login({ accessToken: token }));
//   } else {
//     store.dispatch(logout());
//   }
// }

export function setAccessTokenAction(token: string | null) {
  if (token) {
    // ✅ Only update accessToken, keep userId intact
    store.dispatch(setAccessToken(token));
  } else {
    store.dispatch(logout());
  }
}


export function getAccessToken(): string | null {
  return store.getState().userStatus.accessToken; 
}

export function clearAccessToken() {
  store.dispatch(logout());
}

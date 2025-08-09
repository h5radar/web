import { UserManager, WebStorageStateStore } from "oidc-client-ts";

import { AUTHORITY, CLIENT_ID } from "@/constants/application";

export const userManager = new UserManager({
  authority: AUTHORITY,
  client_id: CLIENT_ID,
  redirect_uri: `${window.location.origin}`,
  post_logout_redirect_uri: `${window.location.origin}/welcome`,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true, // this allows cross tab login/logout detection
});

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

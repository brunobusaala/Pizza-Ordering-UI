import AuthService from "./AuthService";

export default function AuthHeader() {
  const user = AuthService.getCurrentUser();

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

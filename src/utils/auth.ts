import { JwtPayload, jwtDecode } from "jwt-decode";

export const confirmToken = async (token: string | null | undefined) => {
  if (!token) {
    console.log("No token found");
    return false;
  }

  let decodedToken: JwtPayload | undefined;
  try {
    decodedToken = jwtDecode(token);
  } catch (error: any) {
    console.log("Token does not have expiration information or is malformed.");
    return false;
  }

  if (decodedToken && decodedToken.exp) {
    const currentDate = new Date().getTime();
    return decodedToken.exp * 1000 < currentDate;
  }

  console.log("Something went wrong");
  return false;
};

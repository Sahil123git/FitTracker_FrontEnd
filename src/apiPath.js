let path = "https://events-api.vosmos.live"; //for development

if (process.env.NODE_ENV === "development") {
  path = "http://localhost:8080/api";
}
export const apiPath = path;
export const signUpApi = "auth/signup";
export const signInApi = "auth/signin";
export const dashboardApi = "dashboard";
export const todayWorkoutApi = "workout";
export const blogApi = "blogs";
export const userApi = "user";
export const uploadApi = "upload";

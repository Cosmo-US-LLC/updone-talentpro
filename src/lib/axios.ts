import { default as axios, AxiosResponse } from "axios";
import store from "@/store/store";

const axiosCall = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_BASE_URL_UPDONE}`,
});

axiosCall.interceptors.request.use((config) => {
  //   const authToken = Cookies.get("authToken");
  const state = store.getState(); // ✅ Get Redux state
  const authToken = state.auth.token;

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axiosCall.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response; // ✅ Return the response directly
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Handle unauthorized access
      //   console.log("Unauthorized access");
      //   const newToken = null;
      // const newToken = await refreshToken();
      //   Cookies.set("authToken", newToken);
      // Retry the original request
      //   return axios(error.config);
    } else if (status === 404) {
      // Handle not found errors
      console.log("Post not found");
    }
    // else {
    //   // Handle other errors
    //   console.error("An error occurred:", error);
    // }

    return error;
    //   return Promise.reject(error);
  }
);

export default axiosCall;

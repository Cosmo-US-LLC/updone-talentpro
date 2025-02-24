"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "../_components/ui/dashboard-loader";
import { apiRequest } from "../lib/services";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectAuth, setAuth } from "../lib/store/features/authSlice";
import Cookies from "js-cookie";
import { useAppSelector } from "../lib/store/hooks";

function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { auth: storedData } = useAppSelector(selectAuth);

  async function storeUser() {
    if (token) {
      await apiRequest(`/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {},
      }).then((res) => {
        console.log(res?.user);
        dispatch(setAuth({ token, user: res?.user }));
        Cookies.set("authToken", token);
        Cookies.set("authData", JSON.stringify(res?.user));
        // router.push("/")
      });
    }
  }

  useEffect(() => {
    console.log("res", token);
    storeUser();
  }, []);

  useEffect(() => {
    console.log("res", storedData);
    // storeUser();
    if (storedData?.token && storedData?.user?.id) {
      router.push("/");
    }
  }, [storedData]);

  return (
    <div>
      {/* {token?.split(".")[0]} */}
      <Loader />
    </div>
  );
}

export default page;

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { saveToken } from "@/store/slice/auth";
import Loader from "@/components/Loader";

function Auth() {
  let navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(saveToken(token));
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default Auth;

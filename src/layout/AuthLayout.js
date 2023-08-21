import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const AuthLayout = () => {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Yükleniyor...
          </span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/anasayfa" replace />;
  }
  return <Outlet />;
};
export default AuthLayout;

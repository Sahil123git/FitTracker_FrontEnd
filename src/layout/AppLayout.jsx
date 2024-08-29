import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import { useGetUser } from "../hooks";

const AppLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getUser = useGetUser();

  useLayoutEffect(() => {
    if (!localStorage.getItem("fittrack-app-token")) {
      navigate("/");
    } else {
      if (currentUser === null) {
        const decoded = jwtDecode(localStorage.getItem("fittrack-app-token"));
        getUser(decoded.id);
      }
    }
  }, [navigate]);
  return (
    <>
      <Navbar currentUser={currentUser} />
      <Outlet />
    </>
  );
};

export default AppLayout;

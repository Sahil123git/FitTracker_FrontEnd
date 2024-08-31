import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("fittrack-app-token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;

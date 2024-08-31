import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "../utils/Themes";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../pages/Dashboard";
import Workouts from "../pages/Workouts";
import CustomToast from "../components/CustomToast";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import { useSelector } from "react-redux";
import { useGetUser } from "../hooks";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Layout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const getUser = useGetUser();
  useEffect(() => {
    if (localStorage.getItem("fittrack-app-token")) {
      if (currentUser === null) {
        const decoded = jwtDecode(localStorage.getItem("fittrack-app-token"));
        getUser(decoded.id);
      }
    }
  }, [currentUser]);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <CustomToast />
        <Container>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="signup" element={<SignUp />} />
              <Route index element={<SignIn />} />
            </Route>
            <Route path="/app" element={<AppLayout />}>
              <Route path="workouts" element={<Workouts />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Layout;

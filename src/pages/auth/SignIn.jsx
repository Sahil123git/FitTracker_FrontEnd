import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "sonner";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { UserSignIn } from "../../api";
import { fetchData } from "../../redux/reducers/userSlice";
import { signInApi } from "../../apiPath";
import { useDispatch, useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    console.log({ currentUser });
    if (currentUser && localStorage.getItem("fittrack-app-token")) {
      setLoading(false);
      setButtonDisabled(false);
      navigate("/app/dashboard");
    }
  }, [currentUser]);
  const loginUser = async (data) => {
    dispatch(
      fetchData({
        keyName: "currentUser",
        url: signInApi,
        method: "post",
        data,
        toastSuccess: true,
        toastError: true,
      })
    );
  };
  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      loginUser({ email, password });
      // await UserSignIn({ email, password })
      //   .then((res) => {
      //     localStorage.setItem("fittrack-app-token", res.data.token);
      //     setLoading(false);
      //     setButtonDisabled(false);
      //     navigate("/app/dashboard");
      //     toast.success("Success", {
      //       className: "my-classname",
      //       description: res.data.message,
      //       duration: 1000,
      //     });
      //   })
      //   .catch((err) => {
      //     toast.error("Error", {
      //       className: "my-classname",
      //       description: err.response.data.message,
      //       duration: 3000,
      //     });
      //     setLoading(false);
      //     setButtonDisabled(false);
      //   });
    }
  };

  return (
    <>
      <Container>
        <div>
          <Title>Welcome to Fittrack 👋</Title>
          <Span>Please login with your details here</Span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            handelChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            handelChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text="SignIn"
            onClick={handelSignIn}
            isLoading={loading}
            isDisabled={buttonDisabled}
          />
        </div>
      </Container>
      <Text>
        Don't have an account?{" "}
        <TextButton onClick={() => navigate("/signUp")}>SignUp</TextButton>
      </Text>
    </>
  );
};

export default SignIn;

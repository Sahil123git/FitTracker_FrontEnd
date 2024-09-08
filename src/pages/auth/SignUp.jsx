import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { signUpApi } from "../../apiPath";
import { fetchData } from "../../redux/reducers/userSlice";
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

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (localStorage.getItem("fittrack-app-token")) {
      navigate("/app/dashboard");
    }
  }, [currentUser]);

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };
  const handleSignUp = async () => {
    if (validateInputs()) {
      const data = { name, email, password };
      dispatch(
        fetchData({
          keyName: "currentUser",
          url: signUpApi,
          method: "post",
          data,
          toastSuccess: true,
          toastError: true,
        })
      );
    }
  };
  // const handelSignUp = async () => {
  //   setLoading(true);
  //   setButtonDisabled(true);
  //   if (validateInputs()) {
  //     await UserSignUp({ name, email, password })
  //       .then((res) => {
  //         // localStorage.setItem("fittrack-app-token", res.data.token);
  //         setLoading(false);
  //         setButtonDisabled(false);
  //         toast.success("Success", {
  //           className: "my-classname",
  //           description: res.response.data.message,
  //           duration: 5000,
  //         });
  //       })
  //       .catch((err) => {
  //         toast.error("Error", {
  //           className: "my-classname",
  //           description: err.response.data.message,
  //           duration: 5000,
  //         });
  //         setLoading(false);
  //         setButtonDisabled(false);
  //       });
  //   }
  // };
  return (
    <>
      <Container>
        <div>
          <Title>Create New Account 👋</Title>
          <Span>Please enter details to create a new account</Span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <TextInput
            label="Full name"
            placeholder="Enter your full name"
            value={name}
            handelChange={(e) => setName(e.target.value)}
          />
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
            text="SignUp"
            onClick={handleSignUp}
            isLoading={loading}
            isDisabled={loading}
          />
        </div>
      </Container>
      <Text>
        Already have an account?{" "}
        <TextButton onClick={() => navigate("/")}>SignIn</TextButton>
      </Text>
    </>
  );
};

export default SignUp;

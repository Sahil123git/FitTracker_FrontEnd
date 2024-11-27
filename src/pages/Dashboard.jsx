import { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { EmptyChild } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/reducers/userSlice";
import { dashboardApi, todayWorkoutApi } from "../apiPath";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData, todayWorkoutData, extra, error } = useSelector(
    (state) => state.user
  );
  const [buttonLoading, setButtonLoading] = useState(false);
  const [workout, setWorkout] = useState(null);
  useEffect(() => {
    if (extra?.keyName === "todayWorkoutData") {
      setWorkout(null);
      setButtonLoading(false);
      getDashboardData();
      getTodaysWorkout();
    }
  }, [extra]);
  useEffect(() => {
    if (error === "todayWorkoutData") {
      setButtonLoading(false);
    }
  }, [error]);
  useEffect(() => {
    getDashboardData();
    getTodaysWorkout();
  }, []);
  const getDashboardData = async () => {
    dispatch(
      fetchData({
        keyName: "dashboardData",
        url: dashboardApi,
        method: "get",
        toastSuccess: false,
        toastError: true,
      })
    );
  };
  const getTodaysWorkout = async () => {
    dispatch(
      fetchData({
        keyName: "todayWorkoutData",
        url: todayWorkoutApi,
        method: "get",
        toastSuccess: false,
        toastError: true,
      })
    );
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    dispatch(
      fetchData({
        keyName: "todayWorkoutData",
        data: { workout },
        url: todayWorkoutApi,
        method: "post",
        toastSuccess: true,
        toastError: true,
      })
    );
  };

  const handleChange = (type, value) =>
    setWorkout({ ...workout, [type]: value });
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} data={dashboardData} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={dashboardData} />
          <CategoryChart data={dashboardData} />
          <AddWorkout
            workout={workout}
            handleChange={handleChange}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todayWorkoutData?.todaysWorkouts?.length > 0 ? (
              todayWorkoutData?.todaysWorkouts.map((excercise) => (
                <WorkoutCard workout={excercise} />
              ))
            ) : (
              <EmptyChild />
            )}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;

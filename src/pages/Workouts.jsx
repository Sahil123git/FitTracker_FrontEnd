import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import dayjs from "dayjs";
import { fetchData, updateStoreData } from "../redux/reducers/userSlice";
import WorkoutCard from "../components/cards/WorkoutCard";
import { EmptyChild } from "../assets/icons";
import { getWorkouts } from "../api";
import { todayWorkoutApi } from "../apiPath";

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
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Right = styled.div`
  flex: 1;
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
const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const Workouts = () => {
  const dispatch = useDispatch();
  const { todayWorkoutData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const getTodaysWorkout = async () => {
    setLoading(true);
    dispatch(
      fetchData({
        keyName: "todayWorkoutData",
        url: `${todayWorkoutApi}/?date=${date}`,
        method: "get",
        toastSuccess: false,
        toastError: true,
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    date && getTodaysWorkout();
  }, [date]);
  useEffect(() => {
    if (todayWorkoutData === null) getTodaysWorkout();
  }, []);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={
                todayWorkoutData?.date ? dayjs(todayWorkoutData?.date) : dayjs()
              }
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Todays Workout</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {todayWorkoutData?.todaysWorkouts?.length > 0 ? (
                  todayWorkoutData?.todaysWorkouts.map((workout) => (
                    <WorkoutCard
                      key={crypto.randomUUID()}
                      workout={workout}
                      getTodaysWorkout={getTodaysWorkout}
                    />
                  ))
                ) : (
                  <EmptyChild />
                )}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;

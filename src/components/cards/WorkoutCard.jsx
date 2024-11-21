import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Box from "@mui/material/Box";
import { fetchData } from "../../redux/reducers/userSlice";
import { todayWorkoutApi } from "../../apiPath";
import EditModal from "../modals/EditModal";
const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;
const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 10px;
  border-radius: 8px;
`;
const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;
const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;
const WorkoutCard = ({ workout }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteWorkout = async () => {
    dispatch(
      fetchData({
        keyName: "todayWorkoutData",
        data: null,
        url: `${todayWorkoutApi}/${workout._id}`,
        method: "delete",
        toastSuccess: true,
        toastError: true,
      })
    );
  };
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Category>#{workout?.category}</Category>
        <Box>
          <IconButton
            aria-label="check"
            className="icon"
            sx={{ mr: "5px" }}
            onClick={() => setOpen(true)}
          >
            <EditIcon className="checkIcon" />
          </IconButton>
          <IconButton aria-label="check" className="icon">
            <DeleteTwoToneIcon className="checkIcon" onClick={deleteWorkout} />
          </IconButton>
        </Box>
      </Box>
      <Name>{workout?.workoutName}</Name>
      <Sets>
        Count: {workout?.sets} sets X {workout?.reps} reps
      </Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </Details>
      </Flex>
      {open && <EditModal open={open} setOpen={setOpen} workout={workout} />}
    </Card>
  );
};

export default WorkoutCard;

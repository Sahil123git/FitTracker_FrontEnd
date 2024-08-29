import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "./Button";
const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const InputField = styled(TextField)`
  & > div {
    border-radius: 0px;
  }
`;

const AddWorkout = ({
  workout,
  handleChange,
  addNewWorkout,
  buttonLoading,
  isEdit,
}) => {
  return (
    <Card>
      <Title>{isEdit ? "Edit your Workout" : "Add New Workout"}</Title>
      <InputField
        sx={{ marginBottom: "10px", marginTop: "10px" }}
        id="outlined-basic"
        label="Category"
        variant="outlined"
        placeholder="Enter Category"
        value={workout?.category ?? ""}
        onChange={(e) => handleChange("category", e.target.value)}
      />
      <InputField
        sx={{ marginBottom: "10px" }}
        id="outlined-basic"
        label="Excercise"
        variant="outlined"
        placeholder="Enter Excercise"
        value={workout?.workoutName ?? ""}
        onChange={(e) => handleChange("workoutName", e.target.value)}
      />
      <Box sx={{ display: "flex", marginBottom: "10px" }}>
        <InputField
          label="Excercise Sets"
          placeholder="Enter sets"
          type="number"
          variant="outlined"
          fullWidth
          value={workout?.sets ?? ""}
          onChange={(e) => handleChange("sets", e.target.value)}
        />
        <InputField
          label="Excercise reps"
          placeholder="Enter reps"
          type="number"
          variant="outlined"
          fullWidth
          value={workout?.reps ?? ""}
          onChange={(e) => handleChange("reps", e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", marginBottom: "10px" }}>
        <InputField
          label="Weight"
          placeholder="Enter weight"
          type="number"
          variant="outlined"
          fullWidth
          value={workout?.weight ?? ""}
          onChange={(e) => handleChange("weight", e.target.value)}
        />
        <InputField
          label="Duration"
          placeholder="Enter Duration in minutes"
          type="number"
          variant="outlined"
          fullWidth
          value={workout?.duration ?? ""}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
      </Box>
      <Button
        text={isEdit ? "Edit Workout" : "Add Workout"}
        small
        onClick={addNewWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkout;

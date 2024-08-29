import { useDispatch } from "react-redux";
import { getUserDetails } from "../api";
import { updateStoreData } from "../redux/reducers/userSlice";

const useGetUser = () => {
  const dispatch = useDispatch();
  const getUser = async (id) => {
    const token = localStorage.getItem("fittrack-app-token");
    const data = await getUserDetails(token, id);
    dispatch(updateStoreData({ payload: data.data.data, meta: "currentUser" }));
  };
  return getUser;
};
export default useGetUser;

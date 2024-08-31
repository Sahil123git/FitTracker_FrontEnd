import { useDispatch } from "react-redux";
import { getUserDetails } from "../api";
import { fetchData } from "../redux/reducers/userSlice";
import { userApi } from "../apiPath";

const useGetUser = () => {
  const dispatch = useDispatch();
  const getUser = async (id) => {
    // const data = await getUserDetails(token, id);
    // dispatch(updateStoreData({ payload: data.data.data, meta: "currentUser" }));
    dispatch(
      fetchData({
        keyName: "currentUser",
        url: `${userApi}/${id}`,
        method: "get",
        toastSuccess: false,
        toastError: true,
      })
    );
  };
  return getUser;
};
export default useGetUser;

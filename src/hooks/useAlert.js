import { pushAlert } from "redux-store/alert/alert.slice";
import { useDispatch } from "react-redux";

const useAlert = () => {
  const dispatch = useDispatch();
  const error = (values) => {
    dispatch(pushAlert({ type: "error", ...values }));
  };
  const info = (values) => {
    dispatch(pushAlert({ type: "info", ...values }));
  };
  const success = (values) => {
    dispatch(pushAlert({ type: "success", ...values }));
  };
  const warning = (values) => {
    dispatch(pushAlert({ type: "warning", ...values }));
  };
  return {
    error,
    info,
    success,
    warning,
  };
};

export default useAlert;

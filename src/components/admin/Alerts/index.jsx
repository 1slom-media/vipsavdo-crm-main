import ErrorAlert from "components/admin/Alerts/Error";
import WarningAlert from "components/admin/Alerts/Warning";
import InfoAlert from "components/admin/Alerts/Info";
import SuccessAlert from "components/admin/Alerts/success";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "redux-store/alert/alert.slice";
import { useEffect } from "react";

const AlertContainer = () => {
  const timer = () => {
    return setTimeout(() => {
      onClose();
    }, 5000);
  };
  const dispatch = useDispatch();
  const { type, text, title } = useSelector((state) => state.alert);
  const onClose = () => {
    dispatch(clearAlert());
  };

  const audioLink = () => {
    switch (type) {
      case "error":
        return "/sounds/error.wav";
      case "success":
        return "/sounds/success.mp3";
      case "warning":
        return "/sounds/warning.wav";
      case "info":
        return "/sounds/info.wav";
      default:
        break;
    }
  };

  const notificationSound = () => {
    const audio = new Audio(audioLink());
    audio.load();
    audio.play();
  };

  useEffect(() => {
    if (type) {
      notificationSound();
      timer();
    }
  }, [type]);

  return (
    <>
      {type === "success" ? (
        <SuccessAlert handleClose={onClose} title={title} text={text} />
      ) : null}
      {type === "warning" ? (
        <WarningAlert handleClose={onClose} title={title} text={text} />
      ) : null}
      {type === "error" ? (
        <ErrorAlert handleClose={onClose} title={title} text={text} />
      ) : null}
      {type === "info" ? (
        <InfoAlert handleClose={onClose} title={title} text={text} />
      ) : null}
    </>
  );
};

export default AlertContainer;

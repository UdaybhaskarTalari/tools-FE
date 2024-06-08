import { toast } from "react-toastify";

export const notify = (message, type) => {
  console.log(message, type);
  switch (type) {
    case true:
      return toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
      });

    case false:
      return toast.warn(message, {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
      });

    default:
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
      });
      
  }

};

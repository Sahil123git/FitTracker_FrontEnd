import { Toaster } from "sonner";

const CustomToast = () => {
  return (
    <Toaster
      position="top-right"
      closeButton
      visibleToasts={5}
      duration={6000}
      richColors
    />
  );
};

export default CustomToast;

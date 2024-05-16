import { Stack } from "@mui/material";
import loader from "../../assets/loader.svg";
import success from "../../assets/success.svg";

export const UploadFileLoader = (props: {
  width: string;
  height: string;
  type: string;
}) => {
  const getImage = () => {
    switch (props.type) {
      case "loader":
        return loader;
      case "success":
        return success;
    }
  };
  return (
    <Stack sx={{ width: props?.width, height: props?.height }}>
      <img src={getImage()} alt="loader" />
    </Stack>
  );
};

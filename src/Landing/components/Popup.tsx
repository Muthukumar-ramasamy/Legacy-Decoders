import {
  Dialog,
  DialogContentText,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import close from "../../assets/close.svg";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Popup = (props: any) => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props?.closePopup && props?.closePopup();
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
        },
        "& .MuiPaper-root": {
          marginTop: "100px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "98%",
          padding: "12px",
          ml: 2,
        }}
      >
        <Stack>
          <Typography sx={{ color: "" }} variant="h6" component="div">
            {props?.header}
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            mr: 2,
          }}
          onClick={() => handleClose()}
        >
          <Stack sx={{ marginRight: "5px" }}>
            <img src={close} alt="close" />
          </Stack>
          <Typography sx={{ color: "black", textSize: "3px" }} component="div">
            close
          </Typography>
        </Stack>
      </Stack>
      <Stack>{props.element}</Stack>
    </Dialog>
  );
};

export default Popup;

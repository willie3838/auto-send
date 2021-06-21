import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Card, CardContent, Typography } from "@material-ui/core";

const InputField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#7C3AED",
      },

      "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-input": {
          color: "white",
        },
        "& fieldset": {
          borderColor: "#9CA3AF",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#7C3AED",
        },
        "&.Mui-disabled fieldset": {
            borderColor: "#9CA3AF",
        },
      },
      "& .MuiInputLabel-root": {
        color: "white",
      },
      
    },
  })(TextField);

  const CustomCard = withStyles({
    root: {
      backgroundColor: "#242424",
      height: "100%",
      borderRadius: "15 px",
    },
  })(Card);

  const ActionButton = withStyles({
    root: {
      backgroundColor: "#7C3AED",
      color: "white",
      width: "100 px",

      "&:hover": {
        backgroundColor: "#4C1D95",
      },
    },
  })(Button);

  const Text = withStyles({
    root: {
      color: "#7C3AED"
    }
  })(Typography);

  const EmailPreview = withStyles({
      root: {
          height: "100%"
      }
  })(CardContent);

  export {
      InputField,
      CustomCard,
      ActionButton,
      Text,
      EmailPreview
  }
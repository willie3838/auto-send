import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Card, CardContent, Typography, Dialog } from "@material-ui/core";
import Help from "@material-ui/icons/Help";

const InputField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#7C3AED",
      },

      "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-input": {
          color: "#D1D5DB",
        },
        "& fieldset": {
          borderColor: "#9CA3AF",
        },
        "&:hover fieldset": {
          borderColor: "#D1D5DB",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#7C3AED",
        },
        "&.Mui-disabled fieldset": {
            borderColor: "#9CA3AF",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#D1D5DB",
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
      color: "#D1D5DB",
      width: "100 px",

      "&:hover": {
        backgroundColor: "#4C1D95",
      },
    },
  })(Button);

  const Title = withStyles({
    root: {
      color: "#7C3AED"
    }
  })(Typography);

  const EmailPreview = withStyles({
      root: {
          height: "100%",
      }
  })(CardContent);

  const Text = withStyles({
    root: {
        color: "#D1D5DB"
    }
    })(Typography);
  
  const HelpIcon = withStyles({
    root: {
      color:"#D1D5DB",
      marginLeft: "5px",
      marginBottom: "5px",
    }
  })(Help);

  const HelpDialog = withStyles({
    root: {
      "& .MuiDialog-paper":{
        backgroundColor: "#242424",
        color: "#D1D5DB",
      }
    }
  })(Dialog);

  const ErrorDialog = withStyles({
    root: {
      "& .MuiDialog-paper":{
        backgroundColor: "#242424",
        color: "#D1D5DB",
        width: "50%",
      }
    }
  })(Dialog);

  export {
      InputField,
      CustomCard,
      ActionButton,
      Title,
      Text,
      HelpIcon,
      EmailPreview,
      HelpDialog,
      ErrorDialog
  }
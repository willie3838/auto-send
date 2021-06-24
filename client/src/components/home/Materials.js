import { Typography, Button, TextField, Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const Title = withStyles({
    root: {
      color: "#7C3AED"
    }
  })(Typography);

const LoginTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#7C3AED',
      },
      '& .MuiOutlinedInput-root': {

        '& .MuiOutlinedInput-input':{
          color: '#D1D5DB',
        },
        '& fieldset': {
          borderColor: '#9CA3AF',
        },
        '&:hover fieldset': {
          borderColor: '#D1D5DB',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#7C3AED',
        },
        
      },
      '& .MuiInputLabel-root': {
        color: '#D1D5DB'
      }

    },
  })(TextField);

const LoginButton = withStyles({
    root:{
      backgroundColor: '#7C3AED',
      color: '#D1D5DB',
      width: '100 px',

      '&:hover':{
        backgroundColor:'#4C1D95'
      },
    },
  })(Button)

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
    Title,
    LoginTextField,
    LoginButton,
    ErrorDialog
};
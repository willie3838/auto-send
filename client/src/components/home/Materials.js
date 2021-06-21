import { Typography, Button, TextField } from "@material-ui/core";
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
          color: 'white',
        },
        '& fieldset': {
          borderColor: '#9CA3AF',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#7C3AED',
        },
        
      },
      '& .MuiInputLabel-root': {
        color: 'white'
      }

    },
  })(TextField);

const LoginButton = withStyles({
    root:{
      backgroundColor: '#7C3AED',
      color: 'white',
      width: '100 px',

      '&:hover':{
        backgroundColor:'#4C1D95'
      },
    },
  })(Button)

export {
    Title,
    LoginTextField,
    LoginButton
};
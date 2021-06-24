import React, { useContext, useState, useEffect } from "react";
import {
  CircularProgress,
  CardContent,
  Divider,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  InputField,
  CustomCard,
  ActionButton,
  Title,
  Text,
  EmailPreview,
  HelpIcon,
  HelpDialog,
  ErrorDialog,
  PromptDialog,
  CredentialsDialog
} from "./Materials";
import EmailService from "../../services/EmailService";
import UserProfile from "../../contexts/UserProfile";
import { useHistory } from "react-router-dom";

const Email = () => {
  const history = useHistory();

  const [profile, setProfile] = useContext(UserProfile);
  const [openError, setOpenError] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [openCredentials, setOpenCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const subjectRef = React.createRef();
  const ccRef = React.createRef();
  const bccRef = React.createRef();
  const recipientsRef = React.createRef();
  const namesRef = React.createRef();
  const positionsRef = React.createRef();
  const messageRef = React.createRef();
  const previewRef = React.createRef();
  const [helpOpen, setHelpOpen] = useState(false);

  const intro = ` To get started make sure you input an email subject, the list of recipients, and the message you want to send.`;

  const fieldInfoTitle = "Field Information";
  const fieldInfoDesc = `- Recipients represent the emails of the people you want to send to
  - Names represents the names of the people you want to send to
  - Positions represents the positions that the people applied for`;

  const howTitle = "Filling out Fields:";
  const howDesc = `- BCC, CC, Recipients, Names, and position should be separated by a comma if there are several people. Make sure you list them out in the same order
  (Example:
   Recipients: jane.doe@gmail.com, john@gmail.com
   Names: Jane, John
   Position: Cookie, Monster)
   
   - If you want to personalize your emails, be sure to input a name and/or the position the person applied to and fill out the message input using {name} and {position} variables to indicate where you want their names/position to be
   (Example:
    Message: Hi {name}, thanks for applying to {position}!)`;

  let emailContent = {};

  useEffect(() => {
    if(!profile.email || !profile.password){
      closeCredentialsDialog();
    }

    setTimeout(() => setLoading(false), 700);
  }, []);

  function handleClick() {
    emailContent["email"] = profile.email;
    emailContent["password"] = profile.password;
    emailContent["subject"] = subjectRef.current.children[1].children[0].value;
    emailContent["cc"] = ccRef.current.children[1].children[0].value;
    emailContent["bcc"] = bccRef.current.children[1].children[0].value;
    emailContent["recipients"] =
      recipientsRef.current.children[1].children[0].value;
    emailContent["names"] = namesRef.current.children[1].children[0].value;
    emailContent["positions"] =
      positionsRef.current.children[1].children[0].value;
    emailContent["message"] = messageRef.current.children[1].children[0].value;

    (async () => {
      setLoading(true);
      const error = await EmailService.sendEmail(JSON.stringify(emailContent));
      setLoading(false);
      if (!error.data) {
        setErrorMessage(
          "One or more of your recipients' emails are invalid, please check them over before sending an email again"
        );
        closeErrorDialog();
      }
      else{
        closePromptDialog();
      }
    })();
  }

  function handleChange() {
    let name = namesRef.current.children[1].children[0].value.split(",")[0];
    let position =
      positionsRef.current.children[1].children[0].value.split(",")[0];
    let message = messageRef.current.children[1].children[0].value
      .replace("{name}", name)
      .replace("{position}", position);
    previewRef.current.innerText = message;
  }

  function errorHandling() {
    let subject = subjectRef.current.children[1].children[0].value;
    let recipients = recipientsRef.current.children[1].children[0].value;
    let message = messageRef.current.children[1].children[0].value;

    if (subject === "" || recipients === "" || message === "") {
      setErrorMessage(
        "One of the required fields have not been filled out, please complete them in order to send an email"
      );
      setOpenError(!openError);
    } else {
      handleClick();
    }
  }

  function openHelpDialog() {
    setHelpOpen(!helpOpen);
  }

  function closeErrorDialog() {
    setOpenError(!openError);
  }

  function closePromptDialog() {
    setOpenPrompt(!openPrompt);
  }

  function closeCredentialsDialog() {
    setOpenCredentials(!openCredentials);
  }

  function login(){
    closeCredentialsDialog();
    history.goBack();
  }


  return (
    <div class="h-full">
      <div class="px-2">
        <CredentialsDialog open={openCredentials}>
          <DialogTitle>Message</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>Your email and password have been lost, please login again</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={login.bind(this)}>
              Login
            </Button>
          </DialogActions>
        </CredentialsDialog>

        <PromptDialog open={openPrompt}>
          <DialogTitle>Message</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>Your emails have finished sending, would you like to send another batch?</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={closePromptDialog.bind(this)}>
              No
            </Button>
            <Button color="primary" onClick={closePromptDialog.bind(this)}>
              Yes
            </Button>
          </DialogActions>
        </PromptDialog>

        <ErrorDialog open={openError}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>{errorMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={closeErrorDialog.bind(this)}>
              Close
            </Button>
          </DialogActions>
        </ErrorDialog>

        <HelpDialog open={helpOpen}>
          <DialogTitle>Guide</DialogTitle>
          <Divider style={{ background: "#7E7E7E" }} />
          <DialogContent style={{ whiteSpace: "pre-line" }} dividers>
            <Typography variant="body1" gutterBottom paragraph>
              {intro}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              {fieldInfoTitle}
            </Typography>
            <Typography variant="body1" gutterBottom paragraph>
              {fieldInfoDesc}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              {howTitle}
            </Typography>
            <Typography variant="body1" gutterBottom paragraph>
              {howDesc}
            </Typography>
          </DialogContent>
          <Divider style={{ background: "#7E7E7E" }} />
          <DialogActions dividers>
            <Button color="primary" onClick={openHelpDialog.bind(this)}>
              Close
            </Button>
          </DialogActions>
        </HelpDialog>
      </div>
      {loading === false ? (
        <div class="flex content-center p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div class="flex-none h-full px-2 py-2">
            <CustomCard>
              <CardContent>
                <div class="px-2">
                  <Title display="inline" variant="h6">
                    Email Information
                  </Title>
                  <HelpIcon onClick={openHelpDialog.bind(this)} />
                </div>
                <div class="grid grid-cols-1">
                  <form noValidate autoComplete="off">
                    <div class="mt-6 px-2">
                      <InputField
                        required
                        ref={subjectRef}
                        label="Subject"
                        variant="outlined"
                        fullWidth={true}
                      ></InputField>
                    </div>
                  </form>
                </div>

                <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  <form noValidate autoComplete="off">
                    <div class="mt-6 px-2">
                      <InputField
                        ref={bccRef}
                        label="BCC"
                        variant="outlined"
                        fullWidth={true}
                      ></InputField>
                    </div>
                  </form>
                  <form noValidate autoComplete="off">
                    <div class="mt-6 px-2">
                      <InputField
                        ref={ccRef}
                        label="CC"
                        variant="outlined"
                        fullWidth={true}
                      ></InputField>
                    </div>
                  </form>
                </div>

                <div class="grid grid-cols-1">
                  <form noValidate autoComplete="off">
                    <div class="mt-6 px-2">
                      <InputField
                        required
                        ref={recipientsRef}
                        label="Recipients"
                        variant="outlined"
                        fullWidth={true}
                      ></InputField>
                    </div>
                  </form>
                </div>

                <div class="grid grid-cols-1">
                  <form noValidate autoComplete="off">
                    <div class="mt-6 px-2">
                      <InputField
                        ref={namesRef}
                        label="Names"
                        variant="outlined"
                        fullWidth={true}
                      ></InputField>
                    </div>
                  </form>
                </div>

                <div class="grid grid-cols-1">
                  <form noValidate autoComplete="off">
                    <div class="mt-6 px-2">
                      <InputField
                        ref={positionsRef}
                        label="Positions"
                        variant="outlined"
                        fullWidth={true}
                      ></InputField>
                    </div>
                  </form>
                </div>

                <div class="grid grid-cols-1">
                  <form noValidate autoComplete="off">
                    <div class="mt-5 px-2">
                      <InputField
                        required
                        ref={messageRef}
                        onChange={handleChange.bind(this)}
                        label="Message"
                        variant="outlined"
                        fullWidth={true}
                        multiline
                        rows={10}
                      ></InputField>
                    </div>
                  </form>
                </div>

                <div class="grid grid-cols-1 px-2 mt-6">
                  <ActionButton onClick={errorHandling.bind(this)}>
                    Send Messages
                  </ActionButton>
                </div>
              </CardContent>
            </CustomCard>
          </div>

          <div class="flex-none h-full px-2 sm:grid-cols-1 py-2">
            <CustomCard>
              <EmailPreview style={{ whiteSpace: "pre-line" }}>
                <div class="px-2">
                  <Title variant="h6">Email Preview</Title>
                </div>
                <div class="h-full flex flex-wrap content-center justify-center py-5">
                  <Text ref={previewRef}>Type a message to see me update</Text>
                </div>
              </EmailPreview>
            </CustomCard>
          </div>
        </div>
      ) : (
        <div class="h-full flex flex-wrap content-center justify-center">
          <CircularProgress size={100} />
        </div>
      )}
    </div>
  );
};

export default Email;

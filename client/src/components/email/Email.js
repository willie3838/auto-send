import React, { useContext, useEffect }  from "react";
import { CardContent } from "@material-ui/core";
import { InputField, CustomCard, ActionButton, Text, EmailPreview } from "./Materials";
import EmailService from "../../services/EmailService"
import UserProfile from "../../contexts/UserProfile";

const Email = () => {
  const [profile, setProfile] = useContext(UserProfile);
  const subjectRef = React.createRef();
  const ccRef = React.createRef();
  const bccRef = React.createRef();
  const recipientsRef = React.createRef();
  const namesRef = React.createRef();
  const positionsRef = React.createRef();
  const messageRef = React.createRef();

  let emailContent = {};

  function handleClick(){
    emailContent['email'] = profile;
    emailContent['subject'] = subjectRef.current.children[1].children[0].value;
    emailContent['cc'] = ccRef.current.children[1].children[0].value;
    emailContent['bcc'] = bccRef.current.children[1].children[0].value;
    emailContent['recipients'] = recipientsRef.current.children[1].children[0].value;
    emailContent['names'] = namesRef.current.children[1].children[0].value;
    emailContent['positions'] = positionsRef.current.children[1].children[0].value;
    emailContent['message'] = messageRef.current.children[1].children[0].value;
    console.log("clicked")
    EmailService.sendEmail(JSON.stringify(emailContent));
  }

  return (
    <div class="flex content-center p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div class="flex-none h-full px-2 py-2">
        <CustomCard>
          <CardContent>
            <div class="px-2">
              <Text variant="h6">Email Information</Text>
            </div>
            <div class="grid grid-cols-1">
              <form noValidate autoComplete="off">
                <div class="mt-3 px-2">
                  <InputField
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
                <div class="mt-3 px-2">
                  <InputField
                    ref={bccRef}
                    label="BCC"
                    variant="outlined"
                    fullWidth={true}
                  ></InputField>
                </div>
              </form>
              <form noValidate autoComplete="off">
                <div class="mt-3 px-2">
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
                <div class="mt-3 px-2">
                  <InputField
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
                <div class="mt-3 px-2">
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
                <div class="mt-3 px-2">
                  <InputField
                    ref={positionsRef}
                    label="Positions"
                    variant="outlined"
                    fullWidth={true}
                  ></InputField>
                </div>
              </form>
            </div>

            <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-6">
              <form
                class="lg:col-span-5 md:col-span-4"
                noValidate
                autoComplete="off"
              >
                <div class="mt-3 px-2">
                  <InputField
                    disabled={true}
                    label="Attachments"
                    variant="outlined"
                    fullWidth={true}
                  ></InputField>
                </div>
              </form>
              <form class="lg:col-span-1" noValidate autoComplete="off">
                <div class="mt-6 px-2">
                  <ActionButton variant="contained" component="label">
                    Browse
                    <input type="file" hidden />
                  </ActionButton>
                </div>
              </form>
            </div>

            <div class="grid grid-cols-1">
              <form noValidate autoComplete="off">
                <div class="mt-3 px-2">
                  <InputField
                    ref={messageRef}
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
              <ActionButton onClick={handleClick.bind(this)}>Send Messages</ActionButton>
            </div>
          </CardContent>
        </CustomCard>
      </div>

      <div class="flex-none h-full px-2 sm:grid-cols-1 py-2">
        <CustomCard>
          <EmailPreview>
            <div class="px-2">
              <Text variant="h6">Email Preview</Text>
            </div>
            <div class="h-full flex flex-wrap content-center justify-center">
              <Text>Hello testing</Text>
            </div>
          </EmailPreview>
        </CustomCard>
      </div>
    </div>
  );
};

export default Email;


import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./ChangeEmail.css";

export default function ChangeEmail() {
  const history = useHistory();
  const [codeSent, setCodeSent] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    code: "",
    email: "",
  });
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateEmailForm() {
    return fields.email.length > 0;
  }

  function validateConfirmForm() {
    return fields.code.length > 0;
  }

  async function handleUpdateClick(event) {
    event.preventDefault();
    setIsSendingCode(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: fields.email });
      setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();
    setIsConfirming(true);
    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.code);
      history.push("/settings");
    } catch (error) {
      onError(error);
      setIsConfirming(false);
    }
  }

  function renderUpdateForm() {
    return (
      <Form onSubmit={handleUpdateClick}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          isLoading={isSendingCode}
          disabled={!validateEmailForm()}
        >
          Update Email
        </LoaderButton>
      </Form>
    );
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmClick}>
        <FormGroup controlId="code">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            value={fields.code}
            onChange={handleFieldChange}
          />
          <Form.Text>Please check your email ({fields.email}) for the confirmation code.</Form.Text>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          isLoading={isConfirming}
          disabled={!validateConfirmForm()}
        >
          Confirm
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="ChangeEmail">
      {!codeSent ? renderUpdateForm() : renderConfirmationForm()}
    </div>
  );
}
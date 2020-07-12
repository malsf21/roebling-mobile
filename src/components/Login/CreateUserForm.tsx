import React from "react";

import {Text} from 'react-native';

type CreateUserFormProps = {
    toggleForm: () => void,
    tryCreateUser: (email: string, password: string) => void
};
type CreateUserFormState = { 
    inputEmail: string,
    inputPassword: string,
    inputConfirmPassword: string,
    invalidEmail: boolean,
    invalidInput: boolean,
    loggingIn: boolean,
};

class CreateUserForm extends React.Component<CreateUserFormProps, CreateUserFormState> {
    state = {
        inputEmail: "",
        inputPassword: "",
        inputConfirmPassword: "",
        invalidEmail: false,
        invalidInput: false,
        loggingIn: false
    }
    handleEmailChange = (e: React.SyntheticEvent): void => {
        // TODO: check if email is valid with regex
        // TODO: check if email is taken; or just let firebase handle this one?
        let target = e.target as HTMLInputElement;
        this.setState({inputEmail: target.value});
    }
    handlePasswordChange = (e: React.SyntheticEvent): void => {
        // TODO: password length checker
        let target = e.target as HTMLInputElement;
        this.setState({inputPassword: target.value});
    }
    handleConfirmPasswordChange = (e: React.SyntheticEvent): void => {
        // TODO: check if password and confirm password don't match up
        let target = e.target as HTMLInputElement;
        this.setState({inputConfirmPassword: target.value});
    }
    handleCreateUserSubmit = (): void => {
        // TODO: re-perform all checks
        // TODO: feedback/erroring
        this.props.tryCreateUser(this.state.inputEmail, this.state.inputPassword);
    }
    render = () => {
        return (
            <Text>Create User Form!</Text>
        );
    }
}

export default CreateUserForm;
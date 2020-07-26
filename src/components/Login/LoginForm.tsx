import React from "react";

import { Button, TextInput } from 'react-native-paper';
import { View } from "react-native";

type LoginFormProps = {
    toggleForm: () => void,
    tryLogin: (email: string, password: string) => void
};
type LoginFormState = { 
    inputEmail: string,
    inputPassword: string,
    invalidEmail: boolean,
    invalidInput: boolean,
    loggingIn: boolean,
};

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    state = {
        inputEmail: "",
        inputPassword: "",
        invalidEmail: false,
        invalidInput: false,
        loggingIn: false
    }
    handleEmailChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        this.setState({inputEmail: target.value});
    }
    handlePasswordChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        this.setState({inputPassword: target.value});
    }
    handleLoginSubmit = (): void => {
        // TODO: feedback/erroring
        this.props.tryLogin(this.state.inputEmail, this.state.inputPassword);
    }
    render = () => {
        return (
            <View>
                <TextInput
                    label="Email"
                    placeholder="email@roe.bling"
                    value={this.state.inputEmail}
                    onChangeText={(text:string) => this.setState({inputEmail: text})}
                />
                <TextInput
                    label="Password"
                    placeholder="password" 
                    value={this.state.inputPassword}
                    onChangeText={(text:string) => this.setState({inputPassword: text})} 
                />
                <Button onPress={this.handleLoginSubmit}>sign in</Button>
                <Button onPress={this.props.toggleForm}>or, sign up</Button>
            </View>
        );
    }
}

export default LoginForm;
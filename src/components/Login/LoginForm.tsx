import React from "react";

import { Block, Button, Input } from 'galio-framework';
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
            <Block>
                <Input 
                    placeholder="email@roe.bling"
                    value={this.state.inputEmail}
                    onChangeText={(text:string) => this.setState({inputEmail: text})} 
                    type="email-address"
                />
                <Input 
                    placeholder="password" 
                    onChangeText={(text:string) => this.setState({inputPassword: text})} 
                    password viewPass 
                />
                <Button onPress={this.handleLoginSubmit}>sign in</Button>
                <Button onPress={this.props.toggleForm}>or, sign up</Button>
            </Block>
        );
    }
}

export default LoginForm;
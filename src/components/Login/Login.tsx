import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CreateUserForm from './CreateUserForm';
import LoginForm from './LoginForm';

type LoginProps = {
    tryCreateUser: (email: string, password: string) => void,
    tryLogin: (email: string, password: string) => void
};
type LoginState = { 
    showCreate: boolean,
};

class Login extends React.Component<LoginProps,LoginState> {
    state = {
        showCreate: false,
    }
    toggleForm = () => {
        this.setState((prevState: LoginState) => {
            return ({showCreate: !prevState.showCreate})
        });
    }
    render = () => {
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.titleText}>roebling</Text>
            <Text>your favourite dumb home assistant</Text>
            {
                this.state.showCreate ? 
                    <CreateUserForm toggleForm={this.toggleForm} tryCreateUser={this.props.tryCreateUser}/> :
                    <LoginForm toggleForm={this.toggleForm} tryLogin={this.props.tryLogin} />
            }
            <StatusBar style="auto" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    }
  });

export default Login;
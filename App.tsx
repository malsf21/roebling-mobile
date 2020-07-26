import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';
import config from './src/lib/firebase';

import Home from './src/components/Home/Home';
import Login from './src/components/Login/Login';

type AppProps = {};

type AppState = { 
  checkedAuth: boolean,
  loggedIn: boolean,
  displayName: string,
  homeName: string,
  selectedHome: string,
  user: string,
  onboarded: boolean
};

type User = {
  name: string,
  selectedHome: string,
  homes: number,
  email: string
};

firebase.initializeApp(config);
const Stack = createStackNavigator();

export default class App extends React.Component<AppProps, AppState> {

  db: firebase.firestore.Firestore;
  authListener: any;
  unsubscribeUser: any;

  constructor(props: AppProps){
    super(props);
    this.state = {
      checkedAuth: false,
      loggedIn: false,
      displayName: "",
      homeName: "",
      selectedHome: "",
      user: "",
      onboarded: false,
    }
    this.authListener = () => {return;};
    this.unsubscribeUser = () => {return;};

    this.db = firebase.firestore();
  }

  componentDidMount = () => {
    this.authListener = firebase.auth().onAuthStateChanged(async (user) => {
      await this.onAuthHandler(user);
    });
  }; 

  componentWillUnmount = () => {
    this.authListener();
    this.unsubscribeUser();
  }


  onAuthHandler = async (user: any) => {
    if (user) {
      let userRef = this.db.collection("users").doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists){
          // user already exists, let's load them into state
          let currentUser = doc.data() as User;
          this.setState({ 
            checkedAuth: true, 
            loggedIn: true,
            user: user.uid,
            displayName: currentUser.name,
            selectedHome: currentUser.selectedHome
          });
        }
        else{
          // the user doesn't exist yet; let's pre-fill some stuff:
          // TODO: standardize default values
          // TODO: somehow get email and display name? might want to instead shift logic to user creation
          userRef.set({
            homes: 0,
            name: "owo uwu",
            selectedHome: ""
          }).then(() => {
            this.setState({ 
              checkedAuth: true, 
              loggedIn: true,
              user: user.uid,
              displayName: "owo uwu",
              selectedHome: ""
            });
          })
          .catch(function(error) {
            console.error(`Error code: ${error.code}. Error message: ${error.message}`)
          });
        }
        this.unsubscribeUser = this.db.collection("users").doc(user.uid).onSnapshot((doc) => {
          let currentUser = doc.data() as User;
          this.setState({
            displayName: currentUser.name,
            selectedHome: currentUser.selectedHome,
            onboarded: currentUser.homes !== 0
          })
        });
      })
    } else {
      this.setState({ checkedAuth: true, loggedIn: false });
    }
  };

  tryCreateUser = (email: string, password: string) => {
    this.setState({ checkedAuth: false });
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      // want to do user ops here, but no way to consistently query UID outside of auth handler
      console.log('user created');
    })
    .catch((error) => {
      // Handle Errors here.
      this.setState({ checkedAuth: true });
      console.error(`Error code: ${error.code}. Error message: ${error.message}`)
    });
  }

  tryLogin = (email: string, password: string) => {
    this.setState({ checkedAuth: false });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      this.setState({ checkedAuth: true });
      console.error(`Error code: ${error.code}. Error message: ${error.message}`)
    });
  }

  render = () => {
    // if (!this.state.checkedAuth){
    //   return <LoadingPage />;
    // }
    if (!this.state.loggedIn){
      return (
      <PaperProvider>
        <Login tryCreateUser={this.tryCreateUser} tryLogin={this.tryLogin} />
      </PaperProvider>
      )
    }
    // if (!this.state.onboarded){
    //   return <Onboard tryCreateHome={this.tryCreateHome} user={this.state.user} />
    // }
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
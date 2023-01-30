import {Alert, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp, StackActions} from '@react-navigation/native';
import {Input} from '@rneui/themed';
import {Button} from '@rneui/base';
import auth from '@react-native-firebase/auth';
const LoginScreen: React.FC<{navigation: NavigationProp<any>}> = ({
  navigation,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    const unsub = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.dispatch(StackActions.replace('HomeScreen'));
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        Alert.alert(err.message);
      });
  };
  const register = () => {
    navigation.navigate('RegisterScreen');
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/900px-Signal-Logo.svg.png?20201126050550',
        }}
        style={{width: 200, height: 200, borderRadius: 30}}
      />
      <View>
        <Input
          containerStyle={styles.inputContainer}
          value={email}
          placeholder="Email"
          autoFocus
          textContentType="emailAddress"
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <Input
          containerStyle={styles.inputContainer}
          value={password}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          onChangeText={text => {
            setPassword(text);
          }}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={register}
        type="outline"
        title="Register"
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {width: 200, marginTop: 10},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
});

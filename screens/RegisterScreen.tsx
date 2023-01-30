import {
  Alert,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Button, Input, Text} from '@rneui/themed';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
const RegisterScreen: React.FC<{navigation: NavigationProp<any>}> = ({
  navigation,
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // console.log(val);
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        });
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back toLogin',
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Text h3 style={{marginBottom: 50}}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          value={name}
          placeholder="Full Name"
          autoFocus
          textContentType="name"
          onChangeText={text => setName(text)}
        />
        <Input
          value={email}
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={text => setEmail(text)}
        />
        <Input
          value={password}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          onChangeText={text => setPassword(text)}
        />
        <Input
          value={imageUrl}
          placeholder="Profile Picture URL(optional)"
          textContentType="URL"
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});

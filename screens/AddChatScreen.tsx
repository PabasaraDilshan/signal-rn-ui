import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Button, Icon, Input} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
const AddChatScreen: React.FC<{navigation: NavigationProp<ParamListBase>}> = ({
  navigation,
}) => {
  const [input, setInput] = React.useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });

    return () => {};
  }, [navigation]);
  const createNewChat = async () => {
    firestore()
      .collection('chats')
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={text => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button title="Create a new chat" onPress={createNewChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});

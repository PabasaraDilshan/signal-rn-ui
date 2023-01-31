import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {Avatar, Icon} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const ChatScreen: React.FC<{
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}> = ({navigation, route}) => {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<any[]>([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerBackVisible: false,
      headerTitle: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              rounded
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
              }}
            />
            <Text style={{marginLeft: 10, fontWeight: '700', color: 'white'}}>
              {route.params?.chatName}
            </Text>
          </View>
        );
      },
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
          <Icon type="antdesign" name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 80,
              marginRight: 20,
            }}>
            <TouchableOpacity style={{marginHorizontal: 15}}>
              <Icon
                type="font-awesome"
                name="video-camera"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon color="white" type="font-awesome" size={24} name="phone" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  const sendMessage = () => {
    Keyboard.dismiss();
    firestore()
      .collection('chats')
      .doc(route.params?.id)
      .collection('messages')
      .add({
        timeStamp: firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth().currentUser?.displayName,
        email: auth().currentUser?.email,
        photoURL: auth().currentUser?.photoURL,
      });
    setInput('');
  };
  React.useLayoutEffect(() => {
    const unsub = firestore()
      .collection('chats')
      .doc(route.params?.id)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot(snap => {
        setMessages(
          snap.docs.map(d => {
            return {
              id: d.id,
              data: d.data(),
            };
          }),
        );
      });
  }, [route]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{paddingTop: 15}}>
              {messages.map(({id, data}) => {
                return data.email !== auth().currentUser?.email ? (
                  <>
                    <View key={id} style={styles.reciever}>
                      <Avatar
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                        rounded
                        size={30}
                        source={{uri: data.photoURL}}
                      />
                      <Text style={styles.recieverText}>{data.message}</Text>
                      <Text style={styles.recieverName}>
                        {data.displayName}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View key={id} style={styles.sender}>
                      <Avatar
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                        rounded
                        size={30}
                        source={{uri: data.photoURL}}
                      />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  </>
                );
              })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={text => {
                  setInput(text);
                }}
                onSubmitEditing={sendMessage}
                placeholder="Signal Message"
                style={styles.textInput}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Icon name="send" type="ionicons" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    padding: 10,
    color: 'gray',
    borderRadius: 30,
  },
  sender: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 20,
    marginRight: 15,
    position: 'relative',
  },
  senderText: {},
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },

  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 20,
    marginRight: 15,
    position: 'relative',
  },
  recieverText: {},
  recieverName: {left: 10, paddingRight: 10, fontSize: 10, color: 'white'},
});

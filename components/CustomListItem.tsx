import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
const CustomListItem: React.FC<{
  id: string;
  chatName: string;
  enterChat: (id: string, chatName: string) => void;
}> = ({id, chatName, enterChat}) => {
  const [chatMessages, setChatMessages] = React.useState<any[]>([]);
  React.useEffect(() => {
    console.log(id);
    const unsub = firestore()
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot(snap => {
        setChatMessages(snap.docs.map(d => d.data()));
      });

    return unsub;
  }, []);
  console.log(chatMessages);
  return (
    <ListItem
      onPress={() => {
        enterChat(id, chatName);
      }}
      key={id}
      bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: '800'}}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

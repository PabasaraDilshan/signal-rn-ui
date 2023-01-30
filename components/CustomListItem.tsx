import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, ListItem} from '@rneui/themed';

const CustomListItem: React.FC<{
  id: string;
  chatName: string;
  enterChat: string;
}> = ({id, chatName, enterChat}) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: '800'}}>
          Youtube Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a test subtitle.This is a test subtitle. This is a test
          subtitle.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

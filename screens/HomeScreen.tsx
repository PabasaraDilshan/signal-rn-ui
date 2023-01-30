import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomListItem from '../components/CustomListItem';
import {NavigationProp, StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Avatar, Icon} from '@rneui/themed';
const HomeScreen: React.FC<{navigation: NavigationProp<any>}> = ({
  navigation,
}) => {
  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace('LoginScreen'));
      });
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{marginHorizontal: 20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{uri: auth()?.currentUser?.photoURL!}} />
          </TouchableOpacity>
        </View>
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
            <TouchableOpacity activeOpacity={0.5}>
              <Icon name="camerao" size={24} type="antdesign" color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddChatScreen');
              }}
              activeOpacity={0.5}>
              <Icon
                name="pencil"
                size={24}
                type="simple-line-icon"
                color="black"
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
    return () => {};
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView>{/* <CustomListItem /> */}</ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

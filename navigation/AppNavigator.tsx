import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Foundation';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {
  Drawer,
  Text,
  Switch,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';

import AddMessage from '../screens/AddMessage';
import MessageList from '../screens/MessageList';
import Scheduled from '../screens/Scheduled';
import Settings from '../screens/Settings';
import Tips from '../screens/Tips';
import Contacts from '../screens/Contacts';
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';


export type RootStackParamList = {
  AddMessage?: { selectedContacts: string[] };
  MessageList: undefined;
  Scheduled: undefined;
  Tips: undefined;
  Settings: undefined;
  Contacts: undefined;
};

// SCHEDULE NAV OPTIONS
type ScheduledScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scheduled'
>;
type ScheduledScreenRouteProp = RouteProp<RootStackParamList, 'Scheduled'>;

// ADD MESSAGE NAV OPTIONS
export type AddMessageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMessage'>
export type AddMessageScreenRouteProp = RouteProp<RootStackParamList, 'AddMessage'>

// SELECT CONTACT NAV OPTIONS
type SelectContactScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Contacts'>
type SelectContactsScreenRouteProp = RouteProp<RootStackParamList, 'Contacts'>

export type ScheduledProps = {
  navigation: ScheduledScreenNavigationProp;
  route: ScheduledScreenRouteProp;
};

export type AddMessageProps = {
  navigation: AddMessageScreenNavigationProp;
  route: AddMessageScreenRouteProp
}

export type ContactsProps = {
  navigation: SelectContactScreenNavigationProp,
  route: SelectContactsScreenRouteProp
}

const defaultNavOptions = (theme: any) => {
  return {
    headerStyle: {
      backgroundColor: theme.dark ? 'black' : Colors.primary,
    },
    headerTintColor: theme.dark ? theme.colors.onBackground : 'white',
  };
};

const ScheduleStackNavigator = createStackNavigator();
const MessageListStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();
const TipsStackNavigator = createStackNavigator();

export const ScheduleNavigator = () => {
  const theme = useTheme();
  return (
    <ScheduleStackNavigator.Navigator initialRouteName="Scheduled">
      <ScheduleStackNavigator.Screen
        name="Scheduled"
        component={Scheduled}
        options={({navigation}) => {
          return {
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            ...defaultNavOptions(theme),
          };
        }}
      />
      <ScheduleStackNavigator.Screen
        name="AddMessage"
        component={AddMessage}
        options={({navigation}) => {
          return {
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Back"
                  iconName="arrow-back"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item 
                  title="Save"
                  iconName="checkmark"
                  onPress={() => { console.log("SAVED!!!")}}
                />
              </HeaderButtons>
            ),
            ...defaultNavOptions(theme),
          };
        }}
      />
      <ScheduleStackNavigator.Screen
        name="Contacts"
        component={Contacts}
        options={({navigation}) => {
          return {
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Back"
                  iconName="arrow-back"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item 
                  title="Search"
                  iconName="search"
                  onPress={() => { console.log("SAVED!!!")}}
                />
              </HeaderButtons>
            ),
            ...defaultNavOptions(theme),
            headerTitle: "Select Contacts"
          };
        }}
      />
    </ScheduleStackNavigator.Navigator>
  );
};

const MessageListNavigator = () => {
  return (
    <MessageListStackNavigator.Navigator
      screenOptions={({navigation}) => {
        const theme = useTheme();
        return {
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          ...defaultNavOptions(theme),
        };
      }}>
      <MessageListStackNavigator.Screen
        name="MessageList"
        component={MessageList}
      />
    </MessageListStackNavigator.Navigator>
  );
};

const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator
      screenOptions={({navigation}) => {
        const theme = useTheme();
        return {
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          ...defaultNavOptions(theme),
        };
      }}>
      <SettingsStackNavigator.Screen name="Settings" component={Settings} />
    </SettingsStackNavigator.Navigator>
  );
};

const TipsNavigator = () => {
  return (
    <TipsStackNavigator.Navigator
      screenOptions={({navigation}) => {
        const theme = useTheme();
        return {
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          ...defaultNavOptions(theme),
        };
      }}>
      <TipsStackNavigator.Screen name="Tips" component={Tips} />
    </TipsStackNavigator.Navigator>
  );
};

const AppDrawer = createDrawerNavigator();

const AppNavigation = (idxProps: any) => {
  const paperTheme = useTheme();
  return (
    <AppDrawer.Navigator
      initialRouteName="AddMessage"
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <SafeAreaView>
            <DrawerItemList {...props} />
            <Drawer.Section title="preferences">
              <TouchableRipple onPress={idxProps.toggleTheme}>
                <View style={styles.preference}>
                  <Text>Dark Theme</Text>
                  <View pointerEvents="none">
                    <Switch value={paperTheme.dark} />
                  </View>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.preference}>
                  <Text>RTL</Text>
                  <View pointerEvents="none">
                    <Switch value={false} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </SafeAreaView>
        </DrawerContentScrollView>
      )}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}>
      <AppDrawer.Screen
        name="Scheduled"
        component={ScheduleNavigator}
        options={{
          drawerIcon: (props) => (
            <Icon name="notifications" size={30} color={Colors.primary} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="MessageList"
        component={MessageListNavigator}
        options={{
          drawerIcon: (props) => (
            <Icon name="list-circle" size={30} color={Colors.primary} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerIcon: (props) => (
            <Icon name="settings-sharp" size={30} color={Colors.primary} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="Tips"
        component={TipsNavigator}
        options={{
          drawerIcon: (props) => (
            <FIcon name="lightbulb" size={30} color={Colors.primary} />
          ),
        }}
      />
    </AppDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default AppNavigation;

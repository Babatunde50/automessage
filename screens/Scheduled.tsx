import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import {FAB, Button, Text, IconButton, Avatar, Badge } from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import dayjs from 'dayjs';

import Colors from '../constants/Colors';
import {ScheduledProps} from '../navigation/AppNavigator';
import Realm from '../utils/db';
import {Results} from 'realm';

// interface Message {
//   id: number;

// }

const Scheduled = ({route, navigation}: ScheduledProps) => {
  const [currentScreen, setCurrentScreen] = useState<'awaiting' | 'completed'>(
    'awaiting',
  );
  const {dark} = useTheme();
  const [messages, setMessages] = useState<Results<Object>>();
  const [showActions, setShowActions] = useState();

  console.log(messages);

  useEffect(() => {
    Realm.then((realm) => {
      let messages = realm.objects('Message');
      setMessages(messages);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const onSwipe = (gestureName: string) => {
    console.log(gestureName);
    if (gestureName === 'SWIPE_RIGHT') {
      setCurrentScreen('completed');
    } else if (gestureName === 'SWIPE_LEFT') {
      setCurrentScreen('awaiting');
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction) => onSwipe(direction)}
      config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
      style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => setShowActions(undefined)}>
        <View style={styles.screen}>
          <View style={styles.action}>
            <View>
              <Button
                icon="bookmark"
                mode="text"
                style={currentScreen === 'awaiting' && styles.active}
                color={!dark ? 'black' : undefined}
                compact={true}
                contentStyle={{height: 50, width: '65%'}}
                onPress={() => setCurrentScreen('awaiting')}>
                Awaiting
              </Button>
              <Badge ref={null} style={{position: "absolute", top: 10, right: 35, backgroundColor: Colors.primary}}> {messages?.length} </Badge>
            </View>
            <Button
              icon="check"
              mode="text"
              color={!dark ? 'black' : undefined}
              style={currentScreen === 'completed' && styles.active}
              compact={true}
              onPress={() => setCurrentScreen('completed')}
              contentStyle={{height: 50, width: '65%'}}>
              Completed
            </Button>
          </View>
          <View style={styles.messages}>
            {messages?.map((message: any) => (
              <View style={{paddingBottom: 4, borderBottomWidth: .5, borderBottomColor: "#ccc"}} key={message.id}>
                <View style={styles.messageIcons}>
                  <View style={styles.messageText}>
                    {/* <Text style={styles.messageTime}> { message.sendingTime.toISOString()}  </Text> */}
                    <Text style={styles.messageTime}>
                      {' '}
                      {dayjs(message.sendingTime).format('dddd (hh:mm a)')}{' '}
                    </Text>
                    <IconButton icon="clock" />
                  </View>
                  <IconButton
                    icon="dots-vertical"
                    style={{display: showActions && 'none'}}
                    onPress={() => {
                      setShowActions(message.id);
                    }}
                  />
                </View>
                <View style={styles.messageDetails}>
                  <Avatar.Icon size={30} icon="head" style={{marginRight: 9}} />
                  <View>
                    <Text style={styles.telNumber}>
                      {' '}
                      {message.mobileNumbers[0]}{' '}
                    </Text>
                    <Text>{message.messages[0]}</Text>
                  </View>
                </View>
                {message.id === showActions && (
                  <View style={styles.actionsContainer}>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        console.log('how far');
                      }}>
                      <View style={styles.actionContainer}>
                        <IconButton icon="pause" />
                        <Text>Pause</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        console.log('how far');
                      }}>
                      <View style={styles.actionContainer}>
                        <IconButton icon="pencil" />
                        <Text>Edit</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        console.log('how far');
                      }}>
                      <View style={styles.actionContainer}>
                        <IconButton icon="delete-alert" />
                        <Text>Delete</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        console.log('how far');
                      }}>
                      <View style={styles.actionContainer}>
                        <IconButton icon="send" />
                        <Text>Send now</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        console.log('how far');
                      }}>
                      <View style={styles.actionContainer}>
                        <IconButton icon="checkbox-marked-circle" />
                        <Text>Mark completed</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                )}
              </View>
            ))}
          </View>
          <FAB
            style={styles.fab}
            color="white"
            icon="plus"
            onPress={() => {
              navigation.navigate('AddMessage');
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    margin: 16,
    right: 0,
    bottom: 0,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  active: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.accent,
  },
  messageIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageTime: {
    color: Colors.primary,
    fontWeight: '600',
  },
  messageDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  telNumber: {
    fontWeight: '900',
    paddingBottom: 4,
    color: 'black',
  },
  actionsContainer: {
    padding: 5,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 200,
    top: 15,
    right: 0,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messages: {
    padding: 8
  }
});

export default Scheduled;

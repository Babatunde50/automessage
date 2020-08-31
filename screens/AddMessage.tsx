import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  TextInput,
  IconButton,
  Headline,
  Text,
  Divider,
  Chip,
  Button,
  Switch,
} from 'react-native-paper';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-community/voice';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as short from 'short-uuid';
import Icon from 'react-native-vector-icons/Entypo';

import Colors from '../constants/Colors';
import Listening from '../components/Modal/Listening';
import Template from '../components/Modal/Template';
import Repeat from '../components/Modal/Repeat';
import RepeatUntil from '../components/Modal/RepeatUntil';
import {
  AddMessageScreenNavigationProp,
  AddMessageScreenRouteProp,
} from '../navigation/AppNavigator';
import {TouchableHighlight} from 'react-native-gesture-handler';
import TimeDayDate from '../components/Modal/TimeDayDate';
import Custom from '../components/Modal/Custom';
import RepeatTimes from '../components/Modal/RepeatTimes';
// import CarrierInfo from 'react-native-carrier-info';

type Props = {
  navigation: AddMessageScreenNavigationProp;
  route: AddMessageScreenRouteProp;
};
type State = {
  message: string;
  contact: string;
  visible: boolean;
  modalType: string;
  results: string[];
  sendingDate?: Date;
  sendingTime?: Date;
  mode?: 'date' | 'time' | 'datetime';
  showDateTimePicker: boolean;
  messages: {id: string; message: string}[];
  selectedContacts: any;
  isMessageError: boolean;
  showMenu: boolean;
  repeatOption: string;
  repeatUntilOption: string;
  showMoreOptions: boolean;
  countDown: boolean;
  askMe: boolean;
  notify: boolean;
  chosedDayTime: {time: Date | null; selected: boolean; id: string}[];
  customTime: {day?: number; time?: string; skipWeekends?: boolean};
  note: string;
};

class AddMessage extends Component<Props, State> {
  state = {
    message: '',
    contact: '',
    visible: false,
    results: [],
    selectedContacts: new Set(),
    modalType: '',
    sendingDate: undefined,
    sendingTime: undefined,
    mode: undefined,
    showDateTimePicker: false,
    messages: [],
    isMessageError: false,
    showMenu: false,
    repeatOption: 'Does not repeat',
    repeatUntilOption: 'Forever',
    showMoreOptions: false,
    countDown: false,
    askMe: false,
    notify: false,
    chosedDayTime: [],
    customTime: {},
    note: '',
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.route.params?.selectedContacts !==
      prevProps.route.params?.selectedContacts
    ) {
      this.setState((prevState) => {
        const selectedContacts = new Set(prevState.selectedContacts);
        this.props.route.params?.selectedContacts.forEach((contact) => {
          selectedContacts.add(contact);
        });
        return {
          selectedContacts,
        };
      });
    }
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    this._showModal('listening');
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    if (e.isFinal) {
      this._hideModal();
      this.setState((prevState) => ({
        message: prevState.message + ' ' + prevState.results[0],
      }));
    }
  };

  onSpeechEnd = (e: any) => {
    console.log('Speech Ended!!!');
    this._hideModal();
    this.setState((prevState) => ({
      message: prevState.message + ' ' + prevState.results[0],
    }));
  };

  // To be handled later!!!
  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value as string[],
    });
  };

  _startRecognizing = async () => {
    this.setState({
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    this._hideModal();
    try {
      const res = await Voice.cancel();
      console.log('CANCEL', res);
    } catch (e) {
      console.error(e);
    }
  };

  _hideModal = () => {
    this.setState({
      visible: false,
      modalType: '',
    });
  };

  _showModal = (type: string) => {
    this.setState({
      visible: true,
      modalType: type,
    });
  };

  _showMode = (currentMode: 'date' | 'time' | 'datetime' | undefined) => {
    this.setState({
      showDateTimePicker: true,
      mode: currentMode,
    });
  };

  // sendSMS = () => {
  //   SendSMS.send({
  //     body: messages[0],
  //     recipients: contacts,
  //     successTypes: Array.from(selectedContacts),
  //   }, (completed, cancelled, error) => {
  //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
  //   });
  // }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{paddingBottom: 16}}>
            <Modal isVisible={this.state.visible}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {this.state.modalType === 'listening' && (
                  <Listening
                    cancel={this._cancelRecognizing}
                    stop={this._stopRecognizing}
                    results={this.state.results[0]}
                  />
                )}
                {this.state.modalType === 'template' && (
                  <Template cancel={this._hideModal} />
                )}
                {this.state.modalType === 'repeatOptions' && (
                  <Repeat
                    showCustomModal={() => this.setState({modalType: 'custom'})}
                    showDayTimeModal={() =>
                      this.setState({modalType: 'repeatingTime'})
                    }
                    cancel={this._hideModal}
                    chosedOption={this.state.repeatOption}
                    getChosedOption={(val) => {
                      this.setState({repeatOption: val});
                    }}
                  />
                )}
                {this.state.modalType === 'repeatUntil' && (
                  <RepeatUntil
                    cancel={this._hideModal}
                    chosedOption={this.state.repeatUntilOption}
                    showRepeatTimesModal={() =>
                      this.setState({modalType: 'repeatTimes'})
                    }
                    getChosedOption={(val) =>
                      this.setState({repeatUntilOption: val})
                    }
                  />
                )}
                {this.state.modalType === 'custom' && (
                  <Custom
                    getChosedOption={(val) => {
                      this.setState({
                        customTime: val,
                      });
                    }}
                    cancel={this._hideModal}
                  />
                )}
                {this.state.modalType === 'repeatingTime' && (
                  <TimeDayDate
                    cancel={this._hideModal}
                    getChosedOption={(val) => {
                      console.log(val);
                      this.setState({chosedDayTime: val});
                    }}
                  />
                )}
                {this.state.modalType === 'repeatTimes' && (
                  <RepeatTimes
                    cancel={this._hideModal}
                    getChosedOption={(val) => {
                      this.setState({repeatUntilOption: val});
                    }}
                  />
                )}
              </View>
            </Modal>
            <DateTimePickerModal
              isVisible={this.state.showDateTimePicker}
              minimumDate={new Date()}
              mode={this.state.mode}
              onConfirm={(date: Date) => {
                if (this.state.mode === 'date') {
                  this.setState({sendingDate: date, showDateTimePicker: false});
                } else {
                  this.setState({sendingTime: date, showDateTimePicker: false});
                }
              }}
              onCancel={() => {
                this.setState({showDateTimePicker: false});
              }}
            />
            <View style={{marginVertical: 8}}>
              <Headline> MESSAGE </Headline>
              <Divider />
              <View style={styles.messageIcons}>
                <IconButton
                  icon="chat-plus"
                  size={20}
                  onPress={() => {
                    if (this.state.message.trim().length < 1) {
                      return this.setState({
                        isMessageError: true,
                      });
                    }
                    this.setState((prevState) => ({
                      messages: [
                        {id: short.generate(), message: prevState.message},
                        ...prevState.messages,
                      ],
                      message: '',
                    }));
                  }}
                />
                <IconButton
                  icon="microphone"
                  size={20}
                  onPress={this._startRecognizing}
                />
                <IconButton
                  icon="notebook"
                  size={20}
                  onPress={() => {
                    this._showModal('template');
                  }}
                />
              </View>
              <TextInput
                label="Message"
                value={this.state.message}
                error={this.state.isMessageError}
                multiline={true}
                selectionColor={Colors.primary}
                placeholder="Type a message"
                onChangeText={(text) =>
                  this.setState({message: text, isMessageError: false})
                }
              />
              {this.state.isMessageError && (
                <Text style={{color: 'red'}}> No Message was provided </Text>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 8,
                  flexWrap: 'wrap',
                }}>
                {this.state.messages.map(
                  (messageData: {id: string; message: string}) => (
                    <Chip
                      key={messageData.id}
                      icon="close-circle"
                      onPress={() => {
                        this.setState((prevState) => ({
                          messages: prevState.messages.filter(
                            (m) => m.id !== messageData.id,
                          ),
                        }));
                      }}>
                      {messageData.message.substring(0, 10)}{' '}
                    </Chip>
                  ),
                )}
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Headline> WHEN </Headline>
              <Divider />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingRight: 8,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 24}}>
                    {' '}
                    {!!this.state.sendingDate
                      ? (this.state.sendingDate! as Date).toLocaleDateString()
                      : 'Set Date'}{' '}
                  </Text>
                  <IconButton
                    icon="calendar-month"
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                      this._showMode('date');
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 24}}>
                    {' '}
                    {!!this.state.sendingTime
                      ? (this.state.sendingTime! as Date).toLocaleTimeString(
                          [],
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )
                      : 'Set Time'}{' '}
                  </Text>
                  <IconButton
                    icon="clock"
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                      this._showMode('time');
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.contactsContainer}>
              <Headline> SEND TO </Headline>
              <Divider />
              <View>
                <View style={styles.messageIcons}>
                  <IconButton
                    icon="account-plus"
                    size={20}
                    onPress={() => {
                      if (this.state.contact.trim().length < 1) {
                        console.log('Invalid Contact');
                        return;
                      }
                      this.setState((prevState) => ({
                        selectedContacts: prevState.selectedContacts.add(
                          prevState.contact,
                        ),
                        contact: '',
                      }));
                    }}
                  />
                </View>
                <TextInput
                  label="Recipient Number"
                  value={this.state.contact}
                  mode="outlined"
                  style={{borderColor: Colors.primary, color: Colors.primary}}
                  selectionColor={Colors.primary}
                  placeholder="Enter recipient mobile number"
                  onChangeText={(text) => this.setState({contact: text})}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 8,
                    flexWrap: 'wrap',
                  }}>
                  {(Array.from(this.state.selectedContacts) as string[]).map(
                    (contact) => (
                      <Chip
                        key={contact}
                        icon="close-circle"
                        onPress={() => {
                          this.setState((prevState) => {
                            const newSelectedContact = new Set(
                              prevState.selectedContacts,
                            );
                            newSelectedContact.delete(contact);
                            return {selectedContacts: newSelectedContact};
                          });
                        }}>
                        {contact}
                      </Chip>
                    ),
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginVertical: 12,
                  }}>
                  <Button
                    color={Colors.primary}
                    style={{borderColor: Colors.primary, marginHorizontal: 4}}
                    icon="contacts"
                    mode="outlined"
                    onPress={() => this.props.navigation.push('Contacts')}>
                    My Contacts
                  </Button>
                  <Button
                    color={Colors.primary}
                    style={{borderColor: Colors.primary, marginHorizontal: 4}}
                    icon="account-group"
                    mode="outlined"
                    onPress={() => console.log('Pressed')}>
                    My Groups
                  </Button>
                </View>
              </View>
            </View>
            <View>
              <Button
                color={Colors.primary}
                onPress={() =>
                  this.setState((prevState) => ({
                    showMoreOptions: !prevState.showMoreOptions,
                  }))
                }>
                {this.state.showMoreOptions
                  ? 'Hide Options'
                  : 'Show More Options'}
              </Button>
              {this.state.showMoreOptions && (
                <View>
                  <TouchableHighlight
                    underlayColor="#DDD"
                    activeOpacity={0.25}
                    onPress={() => {
                      this._showModal('repeatOptions');
                    }}>
                    <View style={{...styles.options, paddingVertical: 9}}>
                      <Icon
                        style={{paddingRight: 12}}
                        name="loop"
                        size={30}
                        color={Colors.primary}
                      />
                      <View>
                        <Text style={{fontWeight: '900'}}>Repeat</Text>
                        <Text> {this.state.repeatOption} </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                  {this.state.repeatOption &&
                    this.state.repeatOption !== 'Does not repeat' && (
                      <TouchableHighlight
                        underlayColor="#DDD"
                        activeOpacity={0.25}
                        onPress={() => {
                          this._showModal('repeatUntil');
                        }}>
                        <View style={{...styles.options, paddingVertical: 9}}>
                          <Icon
                            style={{paddingRight: 12}}
                            name="ccw"
                            size={30}
                            color={Colors.primary}
                          />
                          <View>
                            <Text style={{fontWeight: '900'}}>
                              Repeat until
                            </Text>
                            <Text> {this.state.repeatUntilOption} </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    )}
                  <View style={styles.optionsSwitch}>
                    <View style={styles.options}>
                      <Icon
                        style={{paddingRight: 12}}
                        name="clock"
                        size={30}
                        color={Colors.accent}
                      />
                      <Text style={{fontWeight: '900'}}>
                        Count down before sending
                      </Text>
                    </View>
                    <Switch
                      color={Colors.primary}
                      value={this.state.countDown}
                      onValueChange={() => {
                        this.setState((prevState) => ({
                          countDown: !prevState.countDown,
                        }));
                      }}
                    />
                  </View>
                  <View style={styles.optionsSwitch}>
                    <View style={styles.options}>
                      <Icon
                        style={{paddingRight: 12}}
                        name="help"
                        size={30}
                        color={Colors.accent}
                      />
                      <Text style={{fontWeight: '900'}}>
                        Ask me before sending
                      </Text>
                    </View>
                    <Switch
                      color={Colors.primary}
                      value={this.state.askMe}
                      onValueChange={() => {
                        this.setState((prevState) => ({
                          askMe: !prevState.askMe,
                        }));
                      }}
                    />
                  </View>
                  <View style={styles.optionsSwitch}>
                    <View style={styles.options}>
                      <Icon
                        style={{paddingRight: 12}}
                        name="bell"
                        size={30}
                        color={Colors.accent}
                      />
                      <Text style={{fontWeight: '900'}}>
                        Notify me when completed
                      </Text>
                    </View>
                    <Switch
                      color={Colors.primary}
                      value={this.state.notify}
                      onValueChange={() => {
                        this.setState((prevState) => ({
                          notify: !prevState.notify,
                        }));
                      }}
                    />
                  </View>
                  <View>
                    <View style={{...styles.options, paddingBottom: 8}}>
                      <Icon
                        style={{paddingRight: 12}}
                        name="book"
                        size={30}
                        color={Colors.accent}
                      />
                      <Text style={{fontWeight: '900'}}>Note</Text>
                    </View>
                    <TextInput
                      label="Add a note for rememberance"
                      value={this.state.note}
                      onChangeText={(text) => this.setState({note: text})}
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
    paddingBottom: 30,
  },
  messageIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeContainer: {
    marginVertical: 18,
  },
  contactsContainer: {
    marginVertical: 18,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
});

export default AddMessage;

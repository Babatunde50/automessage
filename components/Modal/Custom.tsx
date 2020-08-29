import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Checkbox, Button} from 'react-native-paper';
//@ts-ignore
import SelectInput from 'react-native-select-input-ios';

import Colors from '../../constants/Colors';

type Props = {
    cancel: () => void;
    getChosedOption: (chosedOption: { day: number, time: string, skipWeekends: boolean}  ) => void;
  };

const Custom = ({cancel, getChosedOption}: Props) => {
  const [interval, setInterval] = useState('1');
  const [time, setTime] = useState('week');
  const [skipWeekends, setSkipWeekends] = useState(false);
  const options = [
    {value: 'minute', label: 'minute'},
    {value: 'hour', label: 'hour'},
    {value: 'day', label: 'day'},
    {value: 'week', label: 'week'},
    {value: 'month', label: 'month'},
  ];
  const [weekdays, setWeekdays] = useState([
    {name: 'Sunday', selected: false},
    {name: 'Monday', selected: false},
    {name: 'Tuesday', selected: false},
    {name: 'Wednesday', selected: false},
    {name: 'Thursday', selected: false},
    {name: 'Friday', selected: false},
    {name: 'Saturday', selected: false},
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Repeat every</Text>
      <View style={styles.actions}>
        <TextInput
          keyboardType="number-pad"
          value={interval}
          style={{width: 65, height: 40}}
          onChangeText={(text) => setInterval(text)}
        />
        <SelectInput
          style={styles.selectInput}
          value={time}
          options={options}
          onValueChange={(value: string) => setTime(value)}
        />
      </View>
      { time === 'week' && <View style={styles.actions}>
        {weekdays.map((day,idx) => (
          <Text
            key={idx}
            onPress={() => {
                setWeekdays(prev => {
                    const transformedPrev = [...prev]
                    transformedPrev[idx].selected = !transformedPrev[idx].selected
                    return transformedPrev;
                })
            } }
            style={{
              ...styles.weekText,
              backgroundColor: day.selected ? Colors.primary : '',
            }}>
            {day.name[0]}{' '}
          </Text>
        ))}
      </View>}
      {time === 'day' && (
        <View style={styles.actions}>
          <Checkbox.Android
            color={Colors.primary}
            status={skipWeekends ? 'checked' : 'unchecked'}
            onPress={() => {
              setSkipWeekends(!skipWeekends);
            }}
          />
          <Text>Skip Weekends</Text>
        </View>
      )}
      <Text style={styles.selected}> {`Every ${interval} ${time}`} </Text>
      <View style={styles.actionButtons}>
        <Button style={{marginHorizontal: 4}} color="red" onPress={cancel}>
          CANCEL
        </Button>
        <Button
          style={{marginHorizontal: 4}}
          color={Colors.primary}
          mode="text"
          onPress={() => {
            getChosedOption({
                day: +interval,
                time: time,
                skipWeekends: skipWeekends,
            });
            cancel();
          }}>
          SAVE
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectInput: {
    width: 75,
    height: 40,
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    borderRadius: 5,
  },
  header: {
    color: Colors.primary,
    fontWeight: '900',
    paddingVertical: 15,
  },
  selected: {
    color: '#ccc',
    fontWeight: '400',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  weekText: {
    marginHorizontal: 12,
    marginVertical: 12,
    color: Colors.accent,
    fontWeight: '800',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});

export default Custom;

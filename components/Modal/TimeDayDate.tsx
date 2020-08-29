import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Switch, Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Colors from '../../constants/Colors';
import {uuid} from 'short-uuid';

type Props = {
  cancel: () => void;
  getChosedOption: (
    chosedOption: {time: Date | null; selected: boolean; id: string}[],
  ) => void;
};

const TimeDayDate = ({cancel, getChosedOption}: Props) => {
  const [timeData, setTimeData] = useState<
    {time: Date | null; selected: boolean; id: string}[]
  >([
    {time: null, selected: false, id: uuid()},
    {time: null, selected: false, id: uuid()},
    {time: null, selected: false, id: uuid()},
    {time: null, selected: false, id: uuid()},
    {time: null, selected: false, id: uuid()},
    {time: null, selected: false, id: uuid()},
  ]);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selected, setSelected] = useState<number>(1000);

  const showDatePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Several times a day</Text>
      <Text style={styles.subheader}>Today</Text>
      {timeData.map((time, idx) => {
        return (
          <View key={time.id} style={styles.timeContainer}>
            <Text> {`Time ${idx + 1}`} </Text>
            <View style={styles.timeAction}>
              <Text style={styles.timeText}>
                {' '}
                {!!time.time
                  ? time.time.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '---'}{' '}
              </Text>
              <Switch
                color={Colors.primary}
                value={time.selected}
                onValueChange={(e) => {
                  setSelected(idx);
                  if (e.valueOf()) {
                    showDatePicker();
                    setTimeData((prev) => {
                      prev[idx].selected = true;
                      return prev;
                    });
                  } else {
                    setTimeData((prev) => {
                      const newData = [...prev];
                      newData[idx].selected = false;
                      newData[idx].time = null;
                      return newData;
                    });
                  }
                }}
                style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
              />
            </View>
          </View>
        );
      })}
      <View style={styles.actionButtons}>
        <Button style={{marginHorizontal: 4}} color="red" onPress={cancel}>
          CANCEL
        </Button>
        <Button
          style={{marginHorizontal: 4}}
          color={Colors.primary}
          mode="text"
          onPress={() => {
            getChosedOption(timeData);
            cancel();
          }}>
          SAVE
        </Button>
      </View>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(date: Date) => {
          console.log(selected);
          setTimeData((prev) => {
            const newData = [...prev];
            newData[selected].time = date;
            newData[selected].selected = true;
            return newData;
          });
          hideDatePicker();
        }}
        onCancel={() => {
          setTimeData((prev) => {
            console.log(selected, 'from cancel');
            const newData = [...prev];
            newData[selected].selected = false;
            newData[selected].time = null;
            return newData;
          });
          hideDatePicker();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    width: '100%',
  },
  header: {
    color: Colors.primary,
    fontWeight: '900',
    paddingVertical: 8,
  },
  subheader: {
    color: Colors.accent,
    fontWeight: '500',
    paddingTop: 8,
    paddingBottom: 24,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    alignItems: 'center',
  },
  timeAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    paddingRight: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default TimeDayDate;

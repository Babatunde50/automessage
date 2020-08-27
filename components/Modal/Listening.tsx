import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  IconButton,
  Button,
  Headline,
  Text,
  withTheme,
} from 'react-native-paper';

import Colors from '../../constants/Colors';

type Props = {
  results: string;
  stop: () => void;
  cancel: () => void;
};

const Listening = ({results, stop, cancel}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.showcase}>
        <IconButton icon="microphone" size={75} onPress={() => {}} />
        <Headline>Listening...</Headline>
        <Text> {results} </Text>
      </View>
      <View style={styles.actions}>
        <Button mode="text" color={Colors.primary} onPress={stop}>
          {' '}
          DONE{' '}
        </Button>
        <Button mode="text" color="red" onPress={cancel}>
          {' '}
          CANCEL{' '}
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
  showcase: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Listening;

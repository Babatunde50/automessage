import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  IconButton,
  Button,
  Headline,
  Text,
  Divider,
} from 'react-native-paper';

import Colors from '../constants/Colors';

type Props = {
  cancel: () => void;
};

const Listening = ({cancel}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.showcase}>
        <Headline>Template</Headline>
        <View style={{flexDirection: 'row'}}>
          <IconButton
            icon="plus"
            color={Colors.primary}
            size={20}
            onPress={() => {}}
          />
          <IconButton
            icon="folder-text"
            color={Colors.accent}
            size={20}
            onPress={() => {}}
          />
        </View>
      </View>
      <Divider />
      <View style={{marginTop: 12}}>
        {['Hope you are good', 'Hope you are fine', 'Hello, how are you'].map(
          (message) => (
            <>
              <View
                key={message}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text> {message} </Text>
                <View style={{flexDirection: 'row'}}>
                  <IconButton
                    icon="pencil"
                    color={Colors.accent}
                    size={20}
                    onPress={() => {}}
                  />
                  <IconButton
                    icon="delete"
                    color="red"
                    size={20}
                    onPress={() => {}}
                  />
                </View>
              </View>
              <Divider />
            </>
          ),
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginVertical: 8,
        }}>
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
    width: '100%'
  },
  showcase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Listening;

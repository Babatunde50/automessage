import React from 'react';
import {
  View, Text
} from 'react-native';

type AppProps = {
  name: string;
  stuff: number;
}

const MessageList: React.FunctionComponent<{}> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Message List </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
  
// });

export default MessageList
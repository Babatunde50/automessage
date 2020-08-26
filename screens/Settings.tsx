import React from 'react';
import {
  View, Text
} from 'react-native';

type AppProps = {
  name: string;
  stuff: number;
}

const Settings: React.FunctionComponent<{}> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Settings </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
  
// });

export default Settings
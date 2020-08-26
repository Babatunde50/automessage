import React from 'react';
import {
  View, Text
} from 'react-native';

type AppProps = {
  name: string;
  stuff: number;
}

const Tips: React.FunctionComponent<{}> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Tips </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
  
// });

export default Tips
import React, { useState } from 'react';
import {
  View, StyleSheet
} from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';

import Colors from '../constants/Colors';
import { ScheduledProps } from '../navigation/AppNavigator'


const Scheduled = ({ route, navigation }: ScheduledProps) => {
  const [ currentScreen, setCurrentScreen ] = useState<"awaiting" | "completed">("awaiting")
  const { dark } = useTheme();

  const onSwipe = (gestureName: string) => {
    console.log(gestureName)
    if(gestureName === "SWIPE_RIGHT") {
      setCurrentScreen("completed")
    } else if(gestureName === "SWIPE_LEFT") {
      setCurrentScreen("awaiting")
    } 
  }

  return (
    <GestureRecognizer 
    onSwipe={(direction) => onSwipe(direction)}
    config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
    style={styles.screen}>
        <View style={styles.action}>
          <Button 
            icon="bookmark" 
            mode="text" 
            style={currentScreen === "awaiting" && styles.active}
            color={!dark ? "black" : undefined }
            compact={true} 
            contentStyle={{height: 50, width: "65%"}} 
            onPress={() => setCurrentScreen("awaiting") }>
              Awaiting
          </Button>
          <Button 
            icon="check" 
            mode="text" 
            color={!dark ? "black" : undefined }
            style={currentScreen === "completed" && styles.active}
            compact={true}
            onPress={() => setCurrentScreen("completed")} 
            contentStyle={{height: 50, width: "65%"}} >
            Completed
          </Button>
        </View>
        <FAB
          style={styles.fab}
          color="white"
          icon="plus"
          onPress={() => { navigation.navigate("AddMessage", ["NAME", "SCHOOL"]) } }
        />
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1
    },
    fab: {
      position: 'absolute',
      backgroundColor: Colors.primary,
      margin: 16,
      right: 0,
      bottom: 0,
    },
    action: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    active: {
      borderBottomWidth:  3, 
      borderBottomColor: Colors.accent
    }
});

export default Scheduled
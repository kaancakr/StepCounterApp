import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import RingProgress from '../src/components/RingProgress';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

function WaterTracker() {
  const [waterGoal, setWaterGoal] = useState(2000);
  const [currentWater, setCurrentWater] = useState(0);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    // Reset the water goal and current water every day (24 hours)
    const resetInterval = setInterval(() => {
      setWaterGoal(2000);
      setCurrentWater(0);
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => {
      clearInterval(resetInterval);
    };
  }, []);

  const getRingColor = () => {
    // Change the color based on currentWater progress
    if (currentWater < waterGoal / 2) {
      return 'rgb(78, 159, 61)'; // Green color
    } else {
      return 'rgb(78, 159, 61)'; // Another color when progress is >= 50%
    }
  };

  useEffect(() => {
    if (currentWater == waterGoal) {
      // Send a notification when the water goal is achieved
      sendNotification();
    }
  }, [currentWater]);

  const sendNotification = async () => {
    try {
      // Request permission to display notifications (if not already granted)
      const settings = await Notifications.getPermissionsAsync();
      if (!settings.granted) {
        await Notifications.requestPermissionsAsync();
      }

      // Create a notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Water Goal Achieved!',
          body: `Congratulations! You've reached your water goal of ${waterGoal} ml.`,
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  };

  const addQuarterWater = () => {
    if (currentWater + (waterGoal / 4) <= waterGoal) {
      setCurrentWater((prevWater) => prevWater + (waterGoal / 4));
    } else {
      setCurrentWater(waterGoal);
    }
  };

  const deleteQuarterWater = () => {
    if (currentWater - (waterGoal / 4) <= waterGoal) {
      setCurrentWater((prevWater) => prevWater - (waterGoal / 4));
    } else {
      setCurrentWater(waterGoal);
    }
  };

  const resetWaterGoal = () => {
    setWaterGoal(2000);
    setCurrentWater(0);
  };

  const Separator = () => <View style={styles.separator} />;

  return (
    <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <RingProgress
            radius={170}
            strokeWidth={50}
            progress={currentWater / waterGoal}
            color={getRingColor()} // Get the color based on progress dynamically
          />

          <View style={styles.listView}>
            <Text style={styles.info}>Water Goal: {waterGoal} ml</Text>
            <View style={styles.textSeparator} /> 
            <Text style={styles.info}>Current Water: {currentWater} ml</Text>
          </View>

          <View style={styles.buttons}>
              <View style={[styles.buttonContainer, {marginRight: 10}]}>
                <Button
                    onPress={addQuarterWater}
                    title="Add Water"
                    color="white"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={deleteQuarterWater}
                  title="Delete Water"
                  color="white"
                />
              </View>
          </View>

          <View style={styles.buttons}>
              <View style={[styles.buttonContainer, {marginRight: 10}]}>
                  <Button
                      onPress={resetWaterGoal}
                      title="Reset Water"
                      color="white"
                  />
              </View>
              <View style={styles.buttonContainer}>
                  <Button
                      onPress={() => setShowPicker(true)}
                      title="Choose Goal"
                      color="white"
                      style={styles.goalButton}
                  />
              </View>
          </View>
          <View style={styles.pickerContainer}>
            {showPicker && (
                <Picker
                selectedValue={waterGoal}
                onValueChange={(itemValue) => {
                    setWaterGoal(itemValue);
                    setShowPicker(false);
                }}
                style={styles.picker}
                >
                <Picker.Item label="500 ml" value={500} />
                <Picker.Item label="1000 ml" value={1000} />
                <Picker.Item label="1500 ml" value={1500} />
                <Picker.Item label="2000 ml" value={2000} />
                </Picker>
            )}
          </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop: 50
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: '#fff',
    marginLeft: 10
  },
  picker: {
    width: 150,
    backgroundColor: '#fff'
  },
  mainContainer: {
    backgroundColor: '#000'
  },
  buttonContainer: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#1E5128',
    marginVertical: 10,
    backgroundColor: '#212121',
    width: 150
  },  
  buttons: {
    display: 'flex',
    flexDirection: 'row'
  },
  listView: {
    backgroundColor: '#212121',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: 250,
    borderWidth: 3,
    borderColor: '#1E5128'
  },
  textSeparator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export default WaterTracker;

import React, {useState, useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    FlatList,
    SafeAreaView,
    Image,
    ScrollView,
} from 'react-native';
import RingProgress from '../src/components/RingProgress';
import useHealthData from '../src/hooks/useHealthData';
import Value from '../src/components/Value';
import { Pedometer } from 'expo-sensors';

const STEPS_GOAL = 10_000;
const DISTANCE_GOAL = 5000;

function HomeScreen() {

  const STYLES = ['light-content'];

  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

  const Separator = () => <View style={styles.separator} />;

  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date)

  const DATA = [
    {
        id: '1',
        title: 'Nike Run Club: Running Coach',
        middleTitle: 'Nike, Inc',
        imageSource: require('../assets/nike.png'),
      },
      {
        id: '2',
        title: 'Gentler Streak Workout Tracker',
        middleTitle: 'Gentler Stories LLC',
        imageSource: require('../assets/gentler.jpg'),
      },
      {
        id: '3',
        title: 'Personal Best - Workouts',
        middleTitle: 'Codakuma Ltd',
        imageSource: require('../assets/codakuma.jpg'),
      },
  ];

    const Item = ({title,middleTitle,imageSource}) => (
        <View style={styles.itemContainer}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.middleTitle}>{middleTitle}</Text>
            </View>
        </View>
    );

    const getRingColor = () => {
      const percentage = ((stepCount / STEPS_GOAL) + (distance / DISTANCE_GOAL)) * 100;
  
      if (percentage >= 100) {
        return 'rgb(78, 159, 61)'; // Green color when 100% or more
      } else if (percentage >= 50) {
        return 'rgb(78, 159, 61)'; // Light green color between 50% and 100%
      } else {
        return 'gray'; // Gray color for less than 50%
      }
    };

    return (
      <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor="#4E9F3D"
            barStyle={statusBarStyle}
          />
          <ScrollView>
          <View style={styles.topContainer}>
            <RingProgress
              size={180}
              progress={
                ((stepCount / STEPS_GOAL) + (distance / DISTANCE_GOAL)) * 50
              } // Adjust the formula as needed
              color={getRingColor()}
              strokeWidth={50}
            />
          </View>  
          
          <View style={styles.bottomContainer}>
            <View style={styles.values}>
              <View style={styles.steps}>
                <Value label="Steps" value={stepCount.toString()} />
              </View>
              <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />

              <Value label="Flights Climbed" value={flights.toString()} />
            </View>
            <View style={styles.buttonText}>
              <Button
                onPress={() => Alert.alert('Simple Button pressed')}
                title="Learn More"
                color="#4E9F3D"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <View>
              <Text style={styles.bottomText1}>Halkalarınıza Ekleyin</Text>
            </View>
            <View>
              <Text style={styles.bottomText2}>Antrenman Uygulamaları</Text>
            </View>
            <View style={styles.listView}>
              <FlatList
                data={DATA}
                renderItem={({ item }) => (
                  <Item
                    title={item.title}
                    middleTitle={item.middleTitle}
                    imageSource={item.imageSource}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
          </ScrollView>
          <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  datePicker: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
    marginTop: -30
  },
  valueContainer: {
    marginRight: 50,
    marginVertical: 10,
  },
  itemHeading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  },
  item: {
    fontSize: 35,
    color: '#4E9F3D',
    fontWeight: '500',
  },
  buttonText: {
    borderWidth: 2,
    backgroundColor: '#212121',
    borderRadius: 10,
    borderColor: '#1E5128'
  },
  bottomText1: {
    color: 'white',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '500',
    marginTop: 20
  },
  bottomText2: {
    color: 'white',
    fontWeight: '500'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listView: {
    backgroundColor: '#212121',
    marginTop: 5,
    padding: 15,
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  item2: {
    marginTop: 10
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 10
  },
  middleTitle: {
    fontSize: 14,
    color: '#666',
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
  },
});

export default HomeScreen;

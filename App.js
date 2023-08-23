import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import WaterTracker from './screens/WaterTracker';
import CustomDrawerContent from './src/components/CustomDrawerContent'; 

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function StepCounter({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-fitness' : 'ios-fitness-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black', // Background color of the tab bar
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: 'black', // Background color of the header for HomeScreen,
          },
          headerShown: false,
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerIcon}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu-outline" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerStyle: {
            backgroundColor: 'black', // Background color of the header for SettingsScreen
          },
          headerShown: false,
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerIcon}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu-outline" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="MainTabs"
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Use your custom drawer component
        screenOptions={{
          drawerLabelStyle: {
            color: 'white', // Set the desired text color for the drawer tab labels
            fontSize: 16,   // Adjust the font size if needed
          },
        }}
      >
        <Drawer.Screen 
        name="Step Counter" 
        component={StepCounter} 
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 24
          },
        }}/>
        <Drawer.Screen 
        name="Water Tracker" 
        component={WaterTracker} 
        options={{
          headerStyle: {
            backgroundColor: 'black', // Change the background color here
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 24
          },
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 10,
  },
});

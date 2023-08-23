import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Counter App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#fff'
  },
  drawerContainer: {
    backgroundColor: "#000" ,
  }
});

export default CustomDrawerContent;

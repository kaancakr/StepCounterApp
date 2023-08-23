import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView,
  StyleSheet,
  ImageBackground,
  SafeAreaView,} from 'react-native';

const headerImage = {
  uri: 'https://www.mapfre.com.tr/blog/media/2022/01/fitness-faydalari-nelerdir.jpg'
};
const notification = require('../assets/Notification.png');
const banner = require('../assets/BG.png');
const model = require('../assets/model.png');


const AccountScreen = () => {
  return (
  <SafeAreaView style={styles.container}>
  <Header />
  <ScrollView style={styles.screen}>
    <Banner />
  </ScrollView>


    
  </SafeAreaView>
  );
};

const Header = () => (
  <View style={styles.header}>
    <ImageContainer image={headerImage} />
    <HeaderTitle />
    <ImageContainer image={notification} height={'50%'} width={'50%'} />
  </View>
);

const Banner = () => (
  <><ImageBackground style={styles.banner} source={banner}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Limited offer</Text>
      <Text>30% Discount</Text>
      <Text>Flash sales</Text>
    </View>
  </ImageBackground><Image
      source={model}
      style={styles.model} 
      resizeMode="contain"
      
      /></>
  
);



const ImageContainer = ({ image, height = '100%', width = '100%' }) => (
  <View style={styles.imageContainer}>
    <Image source={image} style={[{ height, width }]} />
  </View>
);

const HeaderTitle = () => (
  <View style={styles.title}>
    <Text style={styles.bigtitle}>UBD</Text>
    <Text style={styles.smalltitle}>21 Yaşındayım</Text>
  </View>
);



const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#000'
  },
  header: { 
    paddingHorizontal: 15, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  title: { 
    paddingHorizontal: 10, 
    flex: 1, 
    justifyContent: 'center',
    marginTop: 20
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  bigtitle: { 
    fontSize: 16, 
    fontFamily: 'poppins-medium',
    color: '#fff'
  },
  smalltitle: { 
    fontSize: 10, 
    fontFamily: 'poppins-regular', 
    opacity: 0.6 ,
    color: '#ff0'
  },
  image: { 
    height: '100%', 
    width: '100%', 
  },
  banner: { 
    overflow: 'hidden',
    marginTop: 10, 
    padding: 30, 
    resizeMode: 'contain',
    borderRadius: 20, 
    overflow: 'hidden',
    lexDirection: 'row', 
  },
  model:{
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 10,
    height: '100%',
    width: '40%',
    transform: [{rotateY: '180deg'}],
  },
  screen: {
    margin: '4%',
  },
});

export default AccountScreen;
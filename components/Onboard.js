import * as React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import colors from '../Assets/fonts/colors/colors';
import onboardData from '../Assets/data/onboardData';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';

const Onboard = props => {
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  const keyExtractor = item => item.key;

  const renderDoneButton = () => {
    return (
      <LinearGradient
        colors={['#A5C8FF', '#23286B']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.doneButtonWrapper}>
        <Text style={styles.doneButtonText}>Done</Text>
      </LinearGradient>

      // <View style={styles.doneButtonWrapper}>
      //   <Text style={styles.doneButtonText}>Done</Text>
      // </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Next</Text>
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Prev</Text>
      </View>
    );
  };

  /*const handleDone = () => {
        props.handleDone();
    }*/

  const handleDone = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <ScrollView>
        <AppIntroSlider
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          renderPrevButton={renderPrevButton}
          showPrevButton
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          data={onboardData}
          // onDone = {handleDone}
          onDone={handleDone}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 60,
    marginBottom: 210,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    color: colors.textDark,
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 50,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  rightText: {
    color: colors.blue,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  leftText: {
    color: colors.blue,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  dotStyle: {
    backgroundColor: colors.blueFaded,
    height: 10,
    width: 10,
  },
  activeDotStyle: {
    backgroundColor: colors.blue,
    height: 11,
    width: 11,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 50,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: -40,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    color: colors.white,
  },
});

export default Onboard;

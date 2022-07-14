import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import categoriesData from '../Assets/data/categoriesData';
import popularData from '../Assets/data/popularData';
import colors from '../Assets/fonts/colors/colors';
import apisauce from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

Feather.loadFont();
MaterialCommunityIcons.loadFont();
FontAwesome.loadFont();

const EditProfile = ({navigation, route}) => {
  const {user_id} = route.params;
  const {first_name} = route.params;
  const {last_name} = route.params;
  const {phone_numb} = route.params;
  const [phoneNumber, setPhoneNumber] = React.useState(phone_numb);

  /*const getPhone = async () => {
    const token = await AsyncStorage.getItem('token');

    console.log(token);
    fetch(`http://192.168.18.41/api/users/${user_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data?.Courses_detail ?? []);
        setSubjects(data?.Courses_detail ?? []);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };*/

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append('phone_no', phoneNumber);
    let student = {
      phone_no: phoneNumber,
    };
    const api = apisauce.create({baseURL: 'http://192.168.100.5:80'});
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      console.log(user_id);
      console.log(phoneNumber);
      api
        .put(`/api/users/${user_id}`, student, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(resp => {
          console.log(resp.data);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          if (item.id == 1) navigation.navigate('Home');
          else if (item.id == 2) navigation.navigate('RegisterationCard');
          else if (item.id == 3) navigation.navigate('EditProfile');
        }}>
        <View
          style={[
            styles.categoriesItemWrapper,
            {
              backgroundColor: item.id == 3 ? colors.primary : colors.white,
            },
          ]}>
          <Image source={item.image} style={styles.categoriesItemImage} />
          <Text style={styles.categoriesItemTitle}>{item.title}</Text>
          <View
            style={[
              styles.categoriesSelectWrapper,
              {
                backgroundColor:
                  item.id == 3 ? colors.secondary : colors.textLight,
              },
            ]}>
            <Feather
              name="chevron-right"
              size={16}
              style={styles.categoriesSelectIcon}
              color={item.id == 3 ? colors.white : colors.black}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View styles={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Go-Back  */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather
                  name="chevron-left"
                  size={12}
                  color={colors.textDark}
                />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {/* header section include image and icon  
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Image
              source={require('../Assets/images/profile.png')}
              style={styles.profileImage}
            />
            {/* Icons
            <Feather name="menu" size={24} color={colors.textDark} />
          </View>
        </SafeAreaView>
        */}

        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <Text style={styles.cateoriesTitle}>Student's Screens</Text>
          <View style={styles.categoriesListWrapper}>
            <FlatList
              data={categoriesData}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        {/*Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.titlesTitle}>Edit Profile</Text>
        </View>

        {/* Edit parameters */}

        <View style={{margin: 20}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={require('../Assets/images/profile.png')}
                style={{height: 100, width: 100, marginBottom: 20}}
                imageStyle={{borderRadius: 15}}></ImageBackground>
            </View>
            <Text
              style={
                styles.cateoriesTitle
              }>{`${first_name} ${last_name}`}</Text>
            <Text style={styles.cateoriesTitle}>FA18-BCS-{`${user_id}`}</Text>
          </View>

          <View>
            <Text style={styles.titleSubtitle}>Edit Phone Number:</Text>
          </View>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#333333" size={20} />
            <TextInput
              placeholder="Phone Number" //{phone}
              placeholderTextColor="#666666"
              value={phoneNumber}
              onChangeText={e => setPhoneNumber(e)}
              autoCorrect={false}
              keyboardType="number-pad"
              // value={'hs'}
              // onChangeText={}
              style={styles.textInput}
            />
          </View>

          {/* <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#333333" size={20} />
            <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                autoCorrect={false}
                keyboardType = "email-address"
                // value={'hs'}
                // onChangeText={}
                style={styles.textInput}
            />
        </View> */}

          <View>
            <TouchableOpacity
              style={styles.commandButton}
              onPress={updateProfile}>
              <Text style={styles.panelButtonTitle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  titleWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
    marginTop: 20,
  },
  titlesTitle: {
    marginBottom: 15,
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
  },
  categoriesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cateoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    color: colors.textDark,
    fontSize: 16,
    justifyContent: 'center',
    marginBottom: 5,
  },
  categoriesListWrapper: {
    paddingTop: 15, //if we use argin, we wont be able to see drop shadow
    paddingBottom: 20,
  },
  categoriesItemWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    marginRight: 20,
    marginBottom: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoriesItemImage: {
    width: 60,
    height: 60,
    marginTop: 24,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  categoriesItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginTop: 10,
    marginHorizontal: 20,
  },
  categoriesSelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  categoriesSelectIcon: {
    alignSelf: 'center',
  },
  categoriesIcon: {
    height: 18,
    width: 18,
    color: colors.primary,
    borderRadius: 5,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 60,
    alignItems: 'center',
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfile;

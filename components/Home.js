import * as React from 'react';
import {
  Linking,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import categoriesData from '../Assets/data/categoriesData';
import popularData from '../Assets/data/popularData';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../Assets/fonts/colors/colors';
import apisauce from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

export default Home = ({navigation, route}) => {
  const {id} = route.params;
  const {first_name} = route.params;
  const {last_name} = route.params;
  const {phone_numb} = route.params;

  const [subjects, setSubjects] = React.useState([]);

  /*let name, id;

  try {
    if ('params' in route) {
      if (
        route != null &&
        route.params != null &&
        'name' in route?.params &&
        'id' in route?.params
      ) {
        name = route?.params.name;
        id = route?.params.id;
      }
    } else {
      getCredentials();
    }
  } catch (error) {
    console.error('err route.params in Home.js', error);
  }

  const getCredentials = async () => {
    const temp = await AsyncStorage.getItem('credentials');
    id = JSON.parse(temp).id;
    name = JSON.parse(temp).name;
  };*/

  const [qr, setQR] = React.useState('');
  const [class_id, setClassID] = React.useState('');
  const [courseName, setCourseName] = React.useState('');

  // const getSubjects = async () => {
  //   const token = await AsyncStorage.getItem('token');

  //   console.log(token);
  //   const api = apisauce.create({baseURL: 'http://192.168.18.41/'});
  //   api
  //     .get(`/api/show_course/${id}/`, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //         'content-type': 'application/json',
  //       },
  //     })
  //     .then(response => {
  //       console.log(response);
  //       //response.data
  //       //const [courseName, setCourseName] = React.useState('');
  //       //setName(response.data.name)
  //     })
  //     .catch(error => console.log(error.message));
  // };

  const getSubjects = async () => {
    const token = await AsyncStorage.getItem('token');

    console.log(token);
    fetch(`http://192.168.100.5/api/show_course/1`, {
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
  };

  const [showqr, setshowqr] = React.useState(false);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
    alert('Signed Out successfully');
  };

  const renderCategoryItem = ({item}) => {
    // jb ham {item} bracket k andar lkhte to hm is object ki properties ko individually access kr skte hn
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          if (item.id == 1) navigation.navigate('Home');
          else if (item.id == 2) navigation.navigate('RegisterationCard');
          else if (item.id == 3)
            navigation.push('EditProfile', {
              user_id: id,
              first_name: first_name,
              last_name: last_name,
              phone_numb: phone_numb,
            });
        }}>
        <View
          style={[
            styles.categoriesItemWrapper,
            {
              //backgroundColor: item.selected ? colors.primary : colors.white,
              backgroundColor: item.id == 1 ? colors.primary : colors.white,
              // marginLeft: item.id == 1 ? 20 : 0,
            },
          ]}>
          <Image source={item.image} style={styles.categoriesItemImage} />
          <Text style={styles.categoriesItemTitle}>{item.title}</Text>
          <View
            style={[
              styles.categoriesSelectWrapper,
              {
                //backgroundColor: item.selected
                backgroundColor:
                  item.id == 1 ? colors.secondary : colors.textLight,
              },
            ]}>
            <Feather
              name="chevron-right"
              size={16}
              style={styles.categoriesSelectIcon}
              // color={item.selected ? colors.black : colors.white}
              color={item.id == 1 ? colors.white : colors.black}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRead = e => {
    //console.log(e);
    //console.log(e?.data);
    console.log(JSON.parse(e?.data).course_name);
    //console.log(e.data["course_name"]);
    //console.log(Object.keys(e.data))
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );

    setCourseName(JSON.parse(e?.data).course_name);

    /*setTimeout(() => {
      console.log(e?.data.course_name);
      
    }, 500);*/
    setQR(e.data);
    //setClassID(e)
    setshowqr(false);

    qrPostAttendance();
  };

  const qrPostAttendance = async () => {
    const qrDetails = {
      attendance_status: '1',
      student_id: id,
      //class_id: response.data.department_name
      class_id: '1',
      //course_name: courseName,
    };
    const token = await AsyncStorage.getItem('token');
    //console.log(token);
    const api = apisauce.create({baseURL: 'http://10.135.89.126:80'});
    api
      .post('/api/add_attendance/', qrDetails, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      })
      .then(async response => {
        if (response.status == 200) {
          alert('Attendance Added Successfully');
          //console.log(response.data.details.class_id);
        } else alert(response.data.message);
      })
      .catch(error => alert('Attendance already submitted'));
  };

  const QR = () => {
    return (
      <QRCodeScanner
        onRead={onRead}
        topContent={<Text>" "</Text>}
        bottomContent={
          <TouchableOpacity>
            <Text>" "</Text>
          </TouchableOpacity>
        }
      />
    );
  };

  const getRandomAttendance = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  React.useEffect(() => {
    getSubjects();
  }, []);

  return (
    <View styles={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* header section include image and icon  */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Image
              source={require('../Assets/images/profile.png')}
              style={styles.profileImage}
            />
            {/* Icons 
              <Feather name = "menu" size ={24} color = {colors.textDark} />    */}
          </View>
        </SafeAreaView>

        {/*Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.titleSubtitle}>
            CUI Roll: FA18-BCS-{`${id}`}{' '}
          </Text>
          <Text style={styles.titlesTitle}>{`${first_name} ${last_name}`}</Text>
        </View>
        {/*Search Icon 
          <View style = {styles.searchWrapper}>
            <Feather name = 'search' size = {16} color = {colors.textDark}/>
            <View style = {styles.search}>
              {/*<Text style = {styles.searchText}>Search</Text> 
              <TextInput/>
            </View>
          </View>
          */}

        {/*Categories */}
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

        {/* Logout */}
        <View>
          <TouchableOpacity style={styles.commandButton} onPress={logout}>
            <Text style={styles.panelButtonTitle}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/*Popular Section */}

        <View style={[styles.popularWrapper]}>
          <Text style={styles.popularTitle}>Registered Courses</Text>
          {subjects.map(item => {
            popularData[item.id]['courseName'] = item.subject_name;
            popularData[item.id]['courseNo'] = item.id;
            popularData[item.id]['attendance'] = item.id;
            return (
              <>
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('Details', {
                      item: popularData[item.id],
                      data: 1,
                    })
                  }>
                  <View
                    style={[
                      styles.popularCardWrapper,
                      {
                        marginTop: item.id == 1 ? 10 : 20,
                      },
                    ]}>
                    <View>
                      <View>
                        <View style={styles.popularTopWrapper}>
                          <MaterialCommunityIcons
                            name="crown"
                            size={12}
                            color={colors.primary}
                          />
                          <Text style={styles.popularTopText}>
                            Course ID: {item?.id ?? null}
                          </Text>
                        </View>

                        <View style={styles.popularTitlesWrapper}>
                          <Text style={styles.popularTitlesTitle}>
                            {item?.subject_name ?? ''}
                          </Text>
                          <Text style={styles.popularTitlesWeight}>
                            Teacher Name: {item?.teacherName ?? 'Haseeb'}
                          </Text>
                        </View>
                      </View>

                      {/* Credit Hour */}
                      <View style={styles.popularCardBottom}>
                        <View style={styles.addPizzaButton}>
                          <Text>Credit Hours</Text>
                        </View>
                        <View style={styles.ratingWrapper}>
                          <MaterialCommunityIcons
                            name="star"
                            size={10}
                            color={colors.textDark}
                          />
                          <Text style={styles.rating}>
                            {item?.credits ?? 3}
                          </Text>
                        </View>
                      </View>

                      {/* Class */}
                      <View style={styles.popularCardBottom}>
                        <View style={styles.addPizzaButton}>
                          <Text>Class Name</Text>
                        </View>
                        <View style={styles.ratingWrapper}>
                          <Text style={styles.rating}>
                            {item?.class ?? 'FA18-BCS-D'}
                          </Text>
                        </View>
                      </View>

                      {/* Attendance */}
                      <View style={styles.popularCardBottom}>
                        <View
                          style={[
                            styles.addPizzaButton,
                            {
                              backgroundColor:
                                item.attendance > 80
                                  ? colors.green
                                  : colors.secondary,
                            },
                          ]}>
                          <Text>Attendance</Text>
                        </View>
                        <View style={styles.ratingWrapper}>
                          <Text style={styles.rating}>
                            {item?.attendance ?? getRandomAttendance()}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.popularCardRight}>
                      <Image
                        source={
                          item?.image ?? require('../Assets/images/sub_1.png')
                        }
                        style={styles.popularCardImage}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
        </View>

        <>
          {!showqr ? (
            <>
              <View>
                <TouchableOpacity
                  style={{
                    margin: 30,
                    elevation: 8,
                    backgroundColor: '#009688',
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    alignItems: 'center',
                  }}
                  onPress={() => setshowqr(true)}>
                  <Text style={styles.panelButtonTitle}>QRCodeScanner</Text>
                </TouchableOpacity>
              </View>

              {/*<SafeAreaView>
                <ScrollView></ScrollView>
                <View>
                  <Text>{qr}</Text>
                </View>
              </SafeAreaView>*/}
            </>
          ) : (
            <QR />
          )}
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containr: {
    flex: 1,
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
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  titlesTitle: {
    marginTop: 5,
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.textLight,
    fontSize: 14,
    marginBottom: 5,
  },
  categoriesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cateoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    color: colors.textDark,
    fontSize: 16,
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
    width: 50,
    height: 50,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
    resizeMode: 'contain',
  },
  categoriesItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginTop: 20,
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
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.textDark,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
  },
  popularTitlesWeight: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 5,
  },
  popularCardBottom: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -23,
  },
  addPizzaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    marginLeft: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textDark,
  },
  popularCardRight: {
    marginLeft: 0.1,
  },
  popularCardImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain', //it is use to resize all images with the given width and height
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    margin: 20,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

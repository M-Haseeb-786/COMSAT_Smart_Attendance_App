import * as React from 'react';
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
} from 'react-native';
import categoriesData from '../Assets/data/categoriesData';
import popularData from '../Assets/data/popularData';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../Assets/fonts/colors/colors';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

const RegisterationCard = ({navigation}) => {
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
              backgroundColor: item.id == 2 ? colors.primary : colors.white,
            },
          ]}>
          <Image source={item.image} style={styles.categoriesItemImage} />
          <Text style={styles.categoriesItemTitle}>{item.title}</Text>
          <View
            style={[
              styles.categoriesSelectWrapper,
              {
                backgroundColor:
                  item.id == 2 ? colors.secondary : colors.textLight,
              },
            ]}>
            <Feather
              name="chevron-right"
              size={16}
              style={styles.categoriesSelectIcon}
              color={item.id == 2 ? colors.white : colors.black}
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

        {/*Titles 
        <View style={styles.titleWrapper}>
          <Text style={styles.titleSubtitle}>CUI</Text>
          <Text style={styles.titlesTitle}>Student profile</Text>
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

        {/*Popular Section */}

        <View style={styles.popularWrapper}>
          <Text style={styles.popularTitle}>Registeration Card</Text>
          {popularData.map(item => (
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
                      Course Number: {item.courseNo}
                    </Text>
                  </View>

                  <View style={styles.popularTitlesWrapper}>
                    <Text style={styles.popularTitlesTitle}>
                      {item.courseName}
                    </Text>
                    <Text style={styles.popularTitlesWeight}>
                      Teacher Name: {item.teacherName}
                    </Text>
                  </View>
                </View>

                <View style={styles.popularCardBottom}>
                  <View style={styles.ratingWrapper}>
                    <MaterialCommunityIcons
                      name="star"
                      size={10}
                      color={colors.textDark}
                    />
                    <Text style={styles.rating}>
                      Credit Hours: {item.credits}
                    </Text>
                    <Text style={styles.rating}> Class: {item.class}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.popularCardRight}>
                <Image source={item.image} style={styles.popularCardImage} />
              </View>
            </View>
          ))}
        </View>
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
    marginTop: 10,
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
    width: 60,
    height: 60,
    marginTop: 24,
    alignItems: 'center',
    marginHorizontal: 35,
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
    marginLeft: 0,
  },
  popularCardImage: {
    width: 210,
    height: 125,
    resizeMode: 'contain', //it is use to resize all images with the given width and height
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

export default RegisterationCard;

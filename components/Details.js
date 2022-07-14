import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import popularData from '../Assets/data/popularData';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../Assets/fonts/colors/colors';
import NativePushNotificationManagerIOS from 'react-native/Libraries/PushNotificationIOS/NativePushNotificationManagerIOS';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

export default Details = ({route, navigation}) => {
  const {item} = route.params;

  // const {data} = route.params; // we can get as many static params as we want
  // console.log('this is data: ' + data);
  // console.log(item); // we can print out the whole object
  // console.log(item.rating); // we can print out the value of an object

  {
    /* const renderIngredientsItem = ( {item} ) => { // jb ham {item} bracket k andar lkhte to hm is object ki properties ko individually access kr skte hn
        return(
            <View style = {[styles.ingredientImageWrapper,
            {
                marginLeft: item.id=== 1 ? 20 : 0,
            }]}>
                <Image source = {item.image} style = {styles.ingredientImage}/> 
                 // here item = item.ingredients, so ite,iamge = item.ingredients.image 
            </View>
        );};
    */
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              {/* if we use this navigation.navigate("Home"), then it will jump straight to Home but we need to go back*/}
              <View style={styles.headerLeft}>
                <Feather
                  name="chevron-left"
                  size={12}
                  color={colors.textDark}
                />
              </View>
            </TouchableOpacity>
            {/*<View style = {styles.headerRight} >
                     <MaterialCommunityIcons name = "star" size = {12} color = {colors.white}/>
                 </View>
                 */}
          </View>
        </SafeAreaView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={item.image} style={styles.pizzaImage} />
        </View>

        {/* Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{item.courseName}</Text>
        </View>

        {/* Prices */}
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>Course No. {item.courseNo}</Text>
        </View>

        {/* Pizza Info */}
        <View style={styles.pizzaWrapper}>
          <View style={styles.pizzaLeftWrapper}>
            <View style={styles.pizzaItemWrapper}>
              <Text style={styles.pizzainfoTitle}>TeacherName</Text>
              <Text style={styles.pizzainfoText}>{item.teacherName}</Text>
            </View>
            <View style={styles.pizzaItemWrapper}>
              <Text style={styles.pizzainfoTitle}>Credit Hours</Text>
              <Text style={styles.pizzainfoText}>{item.credits}</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Marks', {
                  item: item,
                  data: 1000000,
                })
              }>
              <View style={styles.pizzaItemWrapper}>
                <Text style={styles.pizzainfoTitle}>Marks</Text>
                <Text style={styles.pizzainfoText}>{item.attendance}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Attendance', {
                  item: item,
                  data: 1000000,
                })
              }>
              <View style={styles.pizzaItemWrapper}>
                <Text style={styles.pizzainfoTitle}>Attendance</Text>
                <Text style={styles.pizzainfoText}>{item.attendance}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ingredients 
         <View style = {styles.ingredientWrapper}>
            <Text style = {styles.ingredientTitle}>Ingredients</Text>
            <View style = {styles.ingredientsListWrapper}>
            <FlatList
                data = {item.ingredients}
                renderItem={renderIngredientsItem}
                keyExtractor={item => item.id}
                horizontal = {true}
                showsHorizontalScrollIndicator={false}
                />
            </View>
         </View>
         */}

        {/* Button
        <TouchableOpacity onPress={logout}>
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>LogOut</Text>
            <Feather name="chevron-right" size={16} color={colors.black} />
          </View>
        </TouchableOpacity>
        */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // yhn bracket ka mtlb ye h k hm direct object bna rhe hn nche like container or phr os k andar jo b ho wo hm access kr skte. jb k popularData ki array mn hm index k zrye . lga kr chzen access krte
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 50,
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
  headerRight: {
    height: 40,
    width: 40,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: colors.textDark,
    fontSize: 32,
    width: '100%',
  },
  priceWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  price: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.price,
    fontSize: 32,
  },
  pizzaWrapper: {
    flexDirection: 'row',
    marginTop: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pizzaLeftWrapper: {
    paddingLeft: 20,
  },
  pizzaItemWrapper: {
    marginBottom: 20,
  },
  pizzainfoTitle: {
    fontFamily: 'Montserrat-Medium',
    color: colors.price,
    fontSize: 14,
  },
  pizzainfoText: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.textDark,
    fontSize: 16,
  },
  pizzaImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    //marginLeft: 50
  },
  ingredientWrapper: {
    marginTop: 40,
  },
  ingredientTitle: {
    fontFamily: 'Montserrat-Bold',
    color: colors.textDark,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  ingredientsListWrapper: {
    paddingVertical: 20,
  },
  ingredientImageWrapper: {
    backgroundColor: colors.white,
    width: 100,
    height: 80,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 2,
  },
  ingredientImage: {
    resizeMode: 'contain',
  },
  orderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
    marginBottom: 50,
    backgroundColor: colors.primary,
    paddingVertical: 25,
    borderRadius: 50,
  },
  orderText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.textDark,
    fontSize: 14,
    marginRight: 10,
  },
});

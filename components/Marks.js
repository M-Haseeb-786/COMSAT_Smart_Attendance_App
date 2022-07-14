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
import Feather from 'react-native-vector-icons/Feather';
import colors from '../Assets/fonts/colors/colors';

Feather.loadFont();

const Marks = ({route, navigation}) => {
  const {item} = route.params;
  const {data} = route.params;

  const renderAssignment = ({item}) => {
    return (
      <View
        style={[
          styles.ingredientImageWrapper,
          {
            marginTop: item.id === 1 ? 20 : 0,
          },
        ]}>
        <Text style={styles.popularTopText}>{item.title}</Text>
        <Text style={styles.popularMarksText}>
          Total Marks: {item.totalMarks}
        </Text>
        <Text style={styles.popularMarksText}>
          Obtain Marks: {item.obtainMarks}
        </Text>
        <Text>End Time: {item.dateTime}</Text>
      </View>
    );
  };

  const renderQuiz = ({item}) => {
    return (
      <View
        style={[
          styles.ingredientImageWrapper,
          {
            marginTop: item.id === 1 ? 20 : 0,
          },
        ]}>
        <Text style={styles.popularTopText}>{item.title}</Text>
        <Text style={styles.popularMarksText}>
          Total Marks: {item.totalMarks}
        </Text>
        <Text style={styles.popularMarksText}>
          Obtain Marks: {item.obtainMarks}
        </Text>
        <Text>End Time: {item.dateTime}</Text>
      </View>
    );
  };

  const renderMidTerm = ({item}) => {
    return (
      <View
        style={[
          styles.ingredientImageWrapper,
          {
            marginTop: item.id === 1 ? 20 : 0,
          },
        ]}>
        <Text style={styles.popularTopText}>{item.title}</Text>
        <Text style={styles.popularMarksText}>
          Total Marks: {item.totalMarks}
        </Text>
        <Text style={styles.popularMarksText}>
          Obtain Marks: {item.obtainMarks}
        </Text>
        <Text>End Time: {item.dateTime}</Text>
      </View>
    );
  };

  const renderFinal = ({item}) => {
    return (
      <View
        style={[
          styles.ingredientImageWrapper,
          {
            marginTop: item.id === 1 ? 20 : 0,
          },
        ]}>
        <Text style={styles.popularTopText}>{item.title}</Text>
        <Text style={styles.popularMarksText}>
          Total Marks: {item.totalMarks}
        </Text>
        <Text style={styles.popularMarksText}>
          Obtain Marks: {item.obtainMarks}
        </Text>
        <Text>End Time: {item.dateTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        {/* Header */}
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

        {/* Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{item.courseName}</Text>
        </View>

        {/* Prices */}
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>Marks</Text>
        </View>

        {/* Attendance List */}
        <View style={styles.ingredientWrapper}>
          <Text style={styles.ingredientTitle}>Assignments</Text>

          <View style={styles.ingredientsListWrapper}>
            <ScrollView horizontal={true}>
              <FlatList
                data={item.assignments}
                renderItem={renderAssignment}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={true}
              />
            </ScrollView>
          </View>
        </View>

        {/* Quizzes List */}
        <View style={styles.ingredientWrapper}>
          <Text style={styles.ingredientTitle}>Quizzes</Text>

          <View style={styles.ingredientsListWrapper}>
            <ScrollView horizontal={true}>
              <FlatList
                data={item.quizzes}
                renderItem={renderQuiz}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={true}
              />
            </ScrollView>
          </View>
        </View>

        {/* MidTerm List */}
        <View style={styles.ingredientWrapper}>
          <Text style={styles.ingredientTitle}>Midterm Marks</Text>

          <View style={styles.ingredientsListWrapper}>
            <ScrollView horizontal={true}>
              <FlatList
                data={item.midterm}
                renderItem={renderMidTerm}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={true}
              />
            </ScrollView>
          </View>
        </View>

        {/* Final List */}
        <View style={styles.ingredientWrapper}>
          <Text style={styles.ingredientTitle}>Final Marks</Text>

          <View style={styles.ingredientsListWrapper}>
            <ScrollView horizontal={true}>
              <FlatList
                data={item.finalterm}
                renderItem={renderFinal}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={true}
              />
            </ScrollView>
          </View>
        </View>
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
    marginTop: 20,
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
    marginTop: 5,
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
    color: colors.textLight,
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
    paddingVertical: 5,
  },
  ingredientImageWrapper: {
    backgroundColor: colors.white,
    marginRight: 35,
    marginLeft: 35,
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
    marginBottom: 10,
    padding: 20,
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
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 10,
  },
  popularMarksText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.price,
    marginBottom: 10,
  },
});

export default Marks;

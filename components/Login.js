import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import apisauce from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../Assets/images/Logo_1.png';
import CustomInput from '../components/CustomInput/CustomInput';

import CustomButton from '../components/CustomInput/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

import colors from '../Assets/fonts/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

export default Login = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let role_name = 'student';

  const onSignInPress = async () => {
    //navigation.navigate('Home');
    // navigation.navigate('Home');
    const formData = new FormData();
    const signin = {
      email: username,
      password: password,
    };
    // formData.append('email', username);
    // formData.append('password', password);
    // console.log(formData)
    const api = apisauce.create({baseURL: 'http://192.168.100.5:80'});
    api
      .post('/api/login/', signin)
      .then(async response => {
        console.log(signin);
        if (response.status === 200) {
          await AsyncStorage.setItem('token', response.data.token);

          if (role_name == response.data.user.role_name) {
            navigation.push('Home', {
              first_name: response.data.user.first_name,
              last_name: response.data.user.last_name,
              id: response.data.user.id,
              phone_numb: response.data.user.phone_no,
            });
          } else {
            alert('Login with student id only');
          }
        } else {
          alert(response.data.message);
        }
        /*await AsyncStorage.setItem(
          'credentials',
          JSON.stringify({
            name: response.data.user.first_name,
            id: response.data.user.id,
          }),
        );*/
      })
      .catch(error => console.error(error));
  };

  const onForgotPasswordPressed = () => {
    //navigation.navigate('Home');
    Linking.openURL(
      'https://cuonline.cuilahore.edu.pk:8091/ResetPassword/Request',
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Logo icon  */}

        <SafeAreaView>
          <View style={styles.root}>
            <Text style={styles.title}>COMSATS Smart Attendance App</Text>
            <Image
              source={Logo}
              style={[styles.logo, {height: height * 0.2}]}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>

        {/* login Body */}
        <View>
          <Text style={styles.titleSubtitle}>Enter Your Email:</Text>
        </View>
        <View style={styles.action}>
          {/*<FontAwesome name="user-o" color="#333333" size={20} />*/}
          <TextInput
            name="username"
            placeholder="Username"
            value={username}
            onChangeText={e => setUsername(e)}
            // control={control}
            // rules={{required: 'Username is required'}}
          />
        </View>

        {/* Password Body */}
        <View>
          <Text style={styles.titleSubtitle}>Enter Your Password:</Text>
        </View>

        <View style={styles.action}>
          {/*<FontAwesome name="lock" color="#333333" size={20} />*/}
          <TextInput
            name="password"
            placeholder="Password"
            value={password}
            onChangeText={e => setPassword(e)}
            secureTextEntry={true}
            //control={control}
            /*rules={{
                  required: 'Password is required',
                  minLength: {
                  value: 3,
                  message: 'Password should be minimum 3 characters long',
                  },
              }} */
          />
        </View>

        <View>
          {/*<TouchableOpacity
            style={{backgroundColor: 'blue'}}
            onPress={onSignInPress}>
            <Text>Login</Text>
            </TouchableOpacity>*/}
          <CustomButton
            text="Login"
            onPress={onSignInPress}
            type="TERTIARY"
            fgColor="#3B71F3"
            bgColor="#e8e8e8"
          />
          <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
            fgColor="#DD4D44"
            bgColor="#FAE9EA"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    color: colors.price,
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 30,
  },
  logo: {
    width: '50%',
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 50,
  },
  action: {
    flexDirection: 'row',

    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginHorizontal: 15,
  },
  titleSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.price,
    marginTop: 15,
    marginHorizontal: 10,
  },
});

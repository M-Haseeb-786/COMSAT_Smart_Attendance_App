import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import {Controller} from 'react-hook-form';

const CustomInput = ({
    control,
    name,
    value,
    setValue,
    rules = {},
    placeholder,
    secureTextEntry,
}) => {
  return (
    <View
    style={styles.container}>
            <TextInput
              value={value}
              onChangeText={setValue}
              // onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
  )
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '90%',
      flexDirection: "row",
  
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
  
      paddingHorizontal: 10,
        
    },
    input: {},
  });

export default CustomInput
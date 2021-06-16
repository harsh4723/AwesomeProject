import React ,{useState} from 'react';
import {View, Text,StyleSheet} from 'react-native'

const Headuur = (props) =>{
 
  return (
    <View style={styles.header}>
      <Text style = {styles.text}>{props.title}</Text>
    </View>
  );
};

Headuur.defaultProps ={
  title:'Shopping'
}
const styles = StyleSheet.create({
  header:{
    height : 60,
    padding :15,
    backgroundColor :'blue',
  },

  text:{
    color:'white', 
    fontSize:30,
    textAlign :'center'
  },
});

export default Headuur;
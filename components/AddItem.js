import React ,{useState} from 'react';
import {View, Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
const AddItem = ({title,addItem}) =>{
    const [text,setText] = useState('');

    const onChange = textVal => setText(textVal);
  return (
    <View>
      <TextInput 
        keyboardType='numeric'
        maxLength={10}
        placeholder ="Add Number" 
        style = {styles.input} 
        onChangeText ={onChange}/>
      <TouchableOpacity style ={styles.btn} onPress ={() => addItem(text)}>
          <Text styles={styles.btnTxt}><Icon name="plus" size ={20}/>
            Check WhatsApp
          </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    input:{
        height:60,
        padding :8,
        fontSize:16,
    },
    btn:{
        backgroundColor :'#c2bad8',
        padding : 9,
        margin:5,
        alignItems:'center'
    },
    btnText:{
        color :'darkslateblue',
        fontSize:20,
        textAlign :'center'
    }
});

export default AddItem;
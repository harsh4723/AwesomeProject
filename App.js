import React ,{useState,useEffect} from 'react';
import {View, Text,Image,StyleSheet,FlatList, NativeModules} from 'react-native';
import Headuur from './components/Headuur';
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'
const App = () =>{
  const [items,setItems] = useState([
    {id:1, text:'Input Number '},
    {id:2, text:'To Check is Whatsapp'},
  ]);

  const { WhatsAppCheckModule } = NativeModules;


  const deleteItem = (id) => {
    setItems(prevItems =>{
      return prevItems.filter(item => item.id !=id);
    });
  }

  const getJavaCallback =(error, value)=>{
    if(error){
      console.log("Harsh ",error);
    }
    else{
      console.log("Harsh ", value);

      if(value){
        setItems(prevItems => {
          return [{id:Math.random(),text:"Is WhatsApp Installed True"}, ...prevItems]
        });
      }
      else{
        setItems(prevItems => {
          return [{id:Math.random(),text:"Is WhatsApp Installed False"}, ...prevItems]
        });
      }
      
    }
  }

  const addItem =(text)=>{

    WhatsAppCheckModule.checkIsWhatsapp('testName', text,getJavaCallback);
    // setItems(prevItems => {
    //   return [{id:Math.random(),text}, ...prevItems]
    // });
  }
  return (
    <View style={styles.container}>
      <Headuur title ='WhatsApp Check'/>
      <AddItem addItem ={addItem}/>
      <FlatList
      data ={items}
      renderItem ={({item})=> <ListItem item ={item} deleteItem ={deleteItem}/>}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})

export default App;
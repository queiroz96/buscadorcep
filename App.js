import React, {useState, useRef} from "react";
 import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,Keyboard } from "react-native";
 import api from "./scr/services/api";

 export default function App(){

  const [ValorCep, setValorcep] = useState('')
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null)

  function limpar(){
    setValorcep('');
    inputRef.current.focus();
    setCepUser(null)
  };

  async function Consultar(){
    if(ValorCep === ''){
      alert('Por favor digite um CEP valido')
      setValorcep('')
    }
    try{
      const response = await api.get(`/${ValorCep}/json`)
      setCepUser(response.data)
      Keyboard.dismiss();

    } catch(error){
console.log('ERROR: ' + error)

    }
    
  }

  



  return(
    <SafeAreaView style={styles.container}>

      <Text style={{fontSize:18, fontWeight:'bold'}}>
        BUSCADOR DE CEP
      </Text>
      <TextInput style={styles.inputCep}
      placeholder='DIGITE O CEP QUE DESEJA BUSCAR'
      placeholderTextColor={'#A9A9A9'}
      keyboardType='numeric'
      value={ValorCep}
      onChangeText={(text) => setValorcep(text)}
      ref={inputRef}
      >
      </TextInput>
      <View style={styles.areaBotoes}>

        <TouchableOpacity style={styles.Botoes}
        onPress={Consultar}
        >
          <Text>BUSCAR CEP</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.Botoes}
        onPress={limpar}
        >
          <Text>LIMPAR</Text>
        </TouchableOpacity>

      </View>

      { cepUser &&

      <View style={styles.areaResultado}>

      <Text style={styles.textoResultado}>CEP: {cepUser.cep}</Text>
      <Text style={styles.textoResultado}>Logradouro: {cepUser.logradouro}</Text>
      <Text style={styles.textoResultado}>Bairro: {cepUser.bairro}</Text>
      <Text style={styles.textoResultado}>Cidade: {cepUser.localidade}</Text>
      <Text style={styles.textoResultado}>Estado: {cepUser.uf}</Text>

      </View>
      
      }
    
    </SafeAreaView>
  )
 }

 const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:60

  },

  inputCep:{
    width:'85%',
    height:50,
    borderWidth:1,
    borderRadius:6,
    marginTop:10,
    paddingLeft:10,
    fontSize:15
  },

  areaBotoes:{
 
    flexDirection:'row',
    width:'85%',
    alignItems:'center',
    justifyContent:'space-around',
    height:40,
    marginTop:30
  },
  Botoes:{
    backgroundColor:'#FFD700',
    width:'45%',
    alignItems:'center',
    height:50,
    justifyContent:'center',
    borderRadius:5,

  },
  areaResultado:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  textoResultado:{
    fontSize:18,
    padding:5
    
  }

 })
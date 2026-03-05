import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform } from 'react-native';

export default function App() {
  const [expressao, setExpressao] = useState('');
  const [resultado, setResultado] = useState('');

  const acao_toque = (valor) => {
    if (valor === 'C') {
      setExpressao('');
      setResultado('');
    } else if (valor === 'DEL') {
      setExpressao(prev => prev.slice(0, -1));
    } else if (valor === '=') {
      funcao_calcular();
    } else {
      setExpressao(prev => prev + valor);
    }
  };

  const funcao_calcular = () => {
    try {
      let processado = expressao
        .replace(/X/g, '*')
        .replace(/,/g, '.');

      let res = eval(processado);

      if (!isNaN(res) && isFinite(res)) {
        setResultado(String(res).replace(/\./g, ','));
      } else {
        setResultado('Erro');
      }
    } catch{
      setResultado('Erro');
    }
  };

  const Botao = ({ titulo, branco, largo }) => (
    <TouchableOpacity
      style={[
        styles.botao,
        branco ? styles.botaoBranco : styles.botaoCinza,
        largo && styles.botaoLargo,
      ]}
      onPress={() => acao_toque(titulo)}
    >
      <Text style={[styles.textoBotao, branco ? styles.textoPreto : styles.textoBranco]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.displayContainer}>
        <Text style={styles.textoExpressao} numberOfLines={1} adjustsFontSizeToFit>
          {expressao}
        </Text>
        <Text style={styles.textoResultado} numberOfLines={1} adjustsFontSizeToFit>
          {resultado}
        </Text>
      </View>

      <View style={styles.tecladoContainer}>
        <View style={styles.linha}>
          <Botao titulo="C" branco />
          <Botao titulo="," />
          <Botao titulo="√" />
          <Botao titulo="DEL" branco />
        </View>
        <View style={styles.linha}>
          <Botao titulo="7" />
          <Botao titulo="8" />
          <Botao titulo="9" />
          <Botao titulo="/" />
        </View>
        <View style={styles.linha}>
          <Botao titulo="4" />
          <Botao titulo="5" />
          <Botao titulo="6" />
          <Botao titulo="X" />
        </View>
        <View style={styles.linha}>
          <Botao titulo="1" />
          <Botao titulo="2" />
          <Botao titulo="3" />
          <Botao titulo="-" />
        </View>
        <View style={styles.linha}>
          <Botao titulo="0" />
          <Botao titulo="=" branco largo />
          <Botao titulo="+" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  displayContainer: {
    flex: 2,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 10,
  },
  textoExpressao: {
    color: '#888888',
    fontSize: 28,
    marginBottom: 10,
    width: '100%',
    textAlign: 'right',
  },
  textoResultado: {
    color: '#ffffff',
    fontSize: 54,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'right',
  },
  tecladoContainer: {
    flex: 3,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 10,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botao: {
    height: 75,
    width: 78,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCinza: {
    backgroundColor: '#5D5D5D',
  },
  botaoBranco: {
    backgroundColor: '#FFFFFF',
  },
  botaoLargo: {
    width: 171,
  },
  textoBotao: {
    fontSize: 28,
    fontWeight: '500',
  },
  textoBranco: {
    color: '#ffffff',
  },
  textoPreto: {
    color: '#000000',
  },
});
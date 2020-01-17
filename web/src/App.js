import React, { useEffect, useState } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css'
import './services/api'
import api from './services/api';
import DevItem from './components/DevItem/'
import DevForm from './components/DevForm/'

// 3 conceitos principais
// Componente --> função que retorna um conteudo html, css, js --> exemplo: timeline do facebook, cada post do facebook é um componente, bloco isolado de html, css e js o qual não interfere no restante da aplicação
// Estado / state --> Informação que o componente vai manipular, mantida pelo componente, que vai ser lida e atualizada pelo componente
// Estado / state --> Informações mantidas pelo componente (lembrar: imutabilidade)
// Propriedade / props --> é quando vc estiver passando um atributo para um componente,como exemplo<Header title=""/>
// propriedades: São informações que o componente pai passa para o componente filho
// <> fragments
//desestruturação é pegar um vetor e dividir ele em variaveis
//imutabilidade: eu nunca vou mudar um dado, vou sempre criar um novo dado apartir de um valor anterior dele
//use effect disparar uma função toda vez que uma função alterar
//onChange={e=> setLatitude(e.target.value)} /> --> armazenar um valor de um input dentro do estado

//Componente App
function App() {
 
  const [devs, setDevs] = useState([])
  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }
    loadDevs()
  }, [])

  //função que vai ser disparada quando o usuario clicar no onclick
  async function handleAddDev(data) {
   // e.preventDefault(); //previnindo o comportamento padrão do formulario igual no html

    //primeira chamada na api
    const response = await api.post('/devs', data)
     
    console.log(response.data)

    setDevs([...devs, response.data]) //...devs está copiando a variavel devs para response.data


  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>


      <main>
        <ul>
         {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
          
        </ul>
      </main>
    </div>
  );
}

export default App;

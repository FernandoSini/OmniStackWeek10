
import { createAppContainer } from 'react-navigation'
import { CreateStackNavigatior, createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'


const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: { //opções especificas daquela tela
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no github'
            }
        },
    }, {
        defaultNavigationOptions: { // mesmas navigations options de main e profile só que default padrão aplicado a todas as telas
            headerTintColor: '#fff', // faz o texto do titulo do navbar ser branco
            headerBackTitleVisible:false, // desativando o nome do app para dar um roll back para a tela anterior
            headerStyle: {
                backgroundColor: '#7D40E7',

            }
        }
    })

) // precisa estar por fora

export default Routes
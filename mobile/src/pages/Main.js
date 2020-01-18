import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { MarkerAnimated, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'
import socket from '../services/socket'
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

function Main({ navigation }) { //pegando somente a propriedade navigation

    const [devs, setDevs] = useState([]) //pq são varios devs, armazenando uma busca da api em algum estado

    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            //verificando se o usuário deu ou não permissão para utilizar a localização dele
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true, //pegando a localização mais proxima
                })
                //pegando a latidude e longitude das coordenadas
                const { latitude, longitude } = coords

                setCurrentRegion({
                    //objetos javascript
                    latitude,
                    longitude,
                    latitudeDelta: 0.04, // calculos navais para obter o zoom no mapa
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition()
    }, [])

    useEffect(() => {
        subscribeToNewDevs(dev=> setDevs([...devs, dev]))
    }, [devs])// monitorar a variavel devs, toda vez que ela alterar vai executar a funç~so subscibetonewdevs

    function setupWebSocket() {
        //regra de negocios
        disconnect() // disconnectar do socket caso esteja conectado

        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            techs,
        )
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        setDevs(response.data.devs)

        setupWebSocket();
    }

    function handleRegionChanged(region) {
        console.log(region)
        setCurrentRegion(region);
    }

    if (!currentRegion) { // enquanto a localização não existir devemos retornar nulo para nao renderizar nada  na tela até pegar a localização
        return null
    }
    //passando para o mapView a propriedade initialRegion
    return (
        <>
            <MapView
                onRegionCHangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.map}>
                {devs.map(dev => ( // é () pq é o retorno de alguma coisa e não o conteudo da função
                    <MarkerAnimated
                        key={dev._id}
                        coordinate={{
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0]
                        }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: dev.avatar_url }}></Image>


                        <Callout onPress={() => {
                            // função que irá executar a navegação
                            navigation.navigate('Profile', { github_username: dev.github_username })
                        }}>
                            <View style={styles.Callout}>

                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>

                        </Callout>
                    </MarkerAnimated>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    )//{{}} primeira chave declara pra incluir um objeto javascript e o segundo é pra declarar que é um objeto javascript
    //o callout vai mostrar as infos do usuario quando ele clickar no avatar
}


const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    Callout: {
        width: 260,
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5,

    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5, // forçar o form ficar em cima do mapa,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2 //sombra no android, elevando um elemento a uma camada a mais até verificar a sombra
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})



export default Main

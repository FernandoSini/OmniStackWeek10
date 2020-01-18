import React from 'react'
import { View, Text } from 'react-native'
import {WebView} from 'react-native-webview'

function Profile({navigation}) {
    const githubUsername = navigation.getParam('github_username')//pegando o parametro da rota
    return <WebView style={{ flex:1 }} source={{uri: `https://github.com/${githubUsername}`}}/>
}

export default Profile

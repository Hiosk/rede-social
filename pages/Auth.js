import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import axios from 'axios';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

function Auth({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://rede-social-api-tan.vercel.app/auth/login', { email, password });
            await AsyncStorage.setItem('session_token', response.data.token);
            navigation.navigate('perfil');
        } catch (error) {
            alert('Erro no login');
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('session_token');
            if (token) {
                navigation.navigate('perfil');
            }
        };
        checkToken();
    }, []);

    return (
        <ImageBackground source={require('../assets/images/gym-wallpaper-3.jpg')} style={styles.image}>
            <View style={styles.shadowOverlay}>
                <Image source={require('../assets/images/ancestors.png')} style={styles.logo} />
                <Text style={styles.titulo}>Rede Social</Text>
                <Input
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputText}
                />
                <Input
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.inputText}
                />
                <TouchableHighlight onPress={handleLogin}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('register')}>
                    <View>
                        <Text style={styles.buttonText}>Você não tem uma conta? Inscrever-se</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    shadowOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
        alignItems: 'center'
    },
    titulo: {
        color: 'rgb(255,255,255)',
        fontSize: 42,
        textAlign: 'center',
    },
    logo: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'rgba(93, 173, 226, 0)',
        borderWidth: 2,
        borderColor: 'rgb(93, 173, 226)',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 64,
        marginVertical: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    inputText: {
        color: '#FFF'
    }

});


export default Auth;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from '../components/VideoPlayer';

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const token = await AsyncStorage.getItem('session_token');
                const response = await fetch(`https://rede-social-api-tan.vercel.app/posts`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                const data = await response.json();
                if(data.error) {
                    console.log(data.error)
                }
                
                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar posts: ', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDeslogar = async () => {
        try {
            await AsyncStorage.removeItem('session_token');
            navigation.navigate('auth');
        } catch (error) {
            alert('Erro no login' + error);
        }
    };

    return (
        <>
            <FlatList
                data={posts}
                style={{ marginTop: 48 }}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <View style={styles.header}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.date}>{item.date}</Text>
                            </View>
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                        {item.image && <VideoPlayer videoUri={item.image} />}
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => { }} style={styles.actionButton}>
                                <Icon name="heart-outline" size={18} color="#4F8EF7" />
                                <Text style={styles.actionCount}>{item.likes}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => { }} style={styles.postPage}>
                    <Icon name="account-outline" size={32} color="#4F8EF7" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={styles.postPage}>
                    <Icon name="plus-box-outline" size={32} color="#4F8EF7" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeslogar} style={styles.postPage}>
                    <Icon name="door-open" size={32} color="#4F8EF7" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    postPage: {
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    post: {
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    date: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
    },
    description: {
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 18,
        color: '#3b5998',
    },
    actionCount: {
        fontSize: 18,
        marginLeft: 5,
    },
});

export default HomeScreen;
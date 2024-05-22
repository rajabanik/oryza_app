import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const SignUpScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState('')

    const showToast = (type, text1, text2) => {
        if (type === 'success') {
            Toast.show({
                render: (props) => <BaseToast {...props} />,
                type: 'success',
                position: 'bottom',
                text1: text1,
                text2: text2,
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: (10)
            });
        } else if (type === 'error') {
            Toast.show({
                render: (props) => <ErrorToast {...props} />,
                type: 'error',
                position: 'bottom',
                text1: text1,
                text2: text2,
                visibilityTime: 3000,
                autoHide: true,
                text2Style: {
                    fontSize: responsiveFontSize(1.5),
                    color: '#343434'
                },
                text1Style: {
                    fontSize: responsiveFontSize(1.8)
                }
            });
        }
    };

    const handleRegister = async () => {
        try {
            setLoading(true);

            const response = await fetch('https://oryza-technologies.onrender.com/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email_address: email,
                }),
            });

            const responseJson = await response.json();
            console.log(responseJson);

            if (responseJson.status === 400) {
                showToast('error', 'Error', 'Username or email already registered');
            } if (responseJson.error == 'Username already exists') {
                showToast('error', 'Error', "Username is already taken")
            } else if (responseJson.error == 'Email address already exists') {
                showToast('error', 'Error', 'Email is already taken')
            } else {
                const response1 = await fetch('https://oryza-technologies.onrender.com/api/generic-email-service', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: [email],
                        subject: 'Oryza Sign Up Confirmation',
                        body: `<html><body><p>Dear ${username},</p><p>Congratulations on signing up with Oryza!</p><p>Thanks & Regards,</p><p>Team Oryza</p><p>Oryza Technologies India</p></body></html>`,
                    }),
                });
                console.log(response1);
                showToast('success', 'Congrats', 'Sign Up successful');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('error', 'Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.4), marginTop: responsiveHeight(2), color: '#3bb530' }}> O<Text style={{ color: '#000' }}>ryza asks you for a quick Sign Up</Text> </Text>
                        <Card.Cover source={require('../../oryza/assets/animation.jpg')} />
                    </View>
                    <Card.Content>
                        <TextInput style={styles.input}
                            placeholder='Username'
                            value={username}
                            onChangeText={Text => setUsername(Text)}
                            label='Username'
                            mode='outlined'
                            activeOutlineColor='#3bb530' />
                        <TextInput style={styles.input}
                            placeholder='Email'
                            value={email}
                            onChangeText={Text => setEmail(Text)}
                            label='Email'
                            mode='outlined'
                            activeOutlineColor='#3bb530'
                        />
                    </Card.Content>
                    <Card.Actions style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            icon="account-plus"
                            mode="contained"
                            buttonColor='#3bb530'
                            loading={loading}
                            onPress={handleRegister}
                            labelStyle={{ fontSize: responsiveFontSize(2.2) }} >
                            {loading ? 'Signing Up' : 'Sign Up'}
                        </Button>
                    </Card.Actions>
                    <Text style={{ fontSize: responsiveFontSize(2.5), padding: 10, textAlign: 'center' }}>Already have an account?
                        <Text style={{ color: '#3bb530', fontSize: responsiveFontSize(2.5) }}> Sign In</Text>
                    </Text>
                </Card>
            </View>
            <Toast config={showToast} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: responsiveWidth(87),
        height: responsiveHeight(65),
        backgroundColor: '#fff'
    },
    input: {
        marginVertical: responsiveHeight(1),
        fontSize: responsiveFontSize(2.5)
    },
});

export default SignUpScreen
import { useEffect, useState } from "react";
import { Image, Modal, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Gap from "../../components/atoms/Gap";
import BottomSheet from "../../components/molecules/BottomSheet";
import { colors } from "../../utils/constants";
import styles from "./styles";
import ReactNativeBiometrics from 'react-native-biometrics';
import { checkAuthExist, checkPasswordExist, createAuth, createAuthTable } from "../../services/auth.service";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux"
import { setAuth } from "../../redux/reducers/authReducer";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isBiometric, setIsBiometric] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [hasPassword, setHasPassword] = useState<boolean>(true);
    const [firstTimePw, setFirstTimePw] = useState<string>('');

    const navigationUse = useNavigation<any>();
    // const rnBiometrics = new ReactNativeBiometrics()

    const checkPassword = () => {
        checkPasswordExist({ password: CryptoJS.SHA256(password).toString(), type: !isBiometric ? 'password' : 'biometric' }).then((dt) => {
            console.log(dt, 'dtnya');
            if (dt <= 0) setIsError(true);
            else {
                setIsModalActive(false);
                setIsError(false);
                dispatch(setAuth({ secret: password }))
                navigationUse.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
            }
        })
    }

    const createPassword = () => {
        createAuth({ password: CryptoJS.SHA256(firstTimePw).toString(), type: 'password' }).then(() => {
            setHasPassword(true);
        })
    }

    useEffect(() => {
        createAuthTable().then(() => {
            checkAuthExist({ type: 'password' }).
                then((dt: number) => { setHasPassword(dt > 0) }).
                catch((e) => { console.log(e) });
        });
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={colors.primary} />
            <View style={styles.backgroundContainer}>
                <View style={styles.backgroundInner1} />
                <View style={styles.backgroundInner2} />
            </View>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignContent: 'center' }}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logoImage} />
                <Text style={styles.logoTextTitle}>Znote App</Text>
                <Text style={styles.logoTextSubtitle}>write your note easily !</Text>
                <TouchableOpacity style={styles.btnMainContainer} onPress={() => setIsModalActive(true)} >
                    <Text style={styles.btnMainTextContainer}>Getting Started</Text>
                </TouchableOpacity>
            </View>
            {/* first time password */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={!hasPassword}
                onRequestClose={() => { }}>
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { }} style={{ position: 'absolute', opacity: 0.2, backgroundColor: 'black', flex: 1, height: '100%', width: '100%' }}>
                    </TouchableOpacity>
                    <View style={{ opacity: 1, backgroundColor: 'white', padding: 25, borderRadius: 10, ...styles.shadow }}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Please input Your First time password</Text>
                        <Gap h={20} />
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <Text style={styles.textInputLabel}> Create Password</Text>
                            <View style={styles.textInputInnerContainer}>
                                <TextInput style={{ minHeight: 40 }} secureTextEntry={true} placeholder="your first time password" onChangeText={(pw) => { setFirstTimePw(pw) }} />
                            </View>
                            <Text style={styles.textInputError}>{isError ? 'failed to authenticate' : ''}</Text>
                        </View>
                        <TouchableOpacity style={{ paddingHorizontal: 10, borderRadius: 10, backgroundColor: colors.secondary }} onPress={() => createPassword()} >
                            <View>
                                <Text style={{ color: 'white', textAlign: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>Create Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <BottomSheet visible={isModalActive} onRequestClose={setIsModalActive} onDismiss={setIsModalActive} transparent={true}>
                <View style={styles.bottomSheetContainer}>
                    {isBiometric ?
                        <View style={styles.bodyContainer} >
                            <Text style={styles.textTitle}>Authenticate using biometrics</Text>
                            <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/images/biometrics.png')} style={styles.imageContainer} />
                                    <Text style={{ textAlign: 'center', color: 'red' }}>{isError ? 'failed to authenticate' : ''}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ ...styles.textTitle, textAlign: 'center' }}>OR</Text>
                                <Gap h={10} />
                                <View>
                                    <TouchableOpacity style={{ borderColor: colors.secondary, borderWidth: 1, paddingHorizontal: 10, borderRadius: 10 }} onPress={() => setIsBiometric(false)} >
                                        <View>
                                            <Text style={{ color: colors.secondary, paddingHorizontal: 20, paddingVertical: 10 }}>USING PASSWORD</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> :
                        <View style={styles.bodyContainer}>
                            <Text style={styles.textTitle}>Authenticate using password</Text>
                            <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.textInputContainer}>
                                    <View style={styles.textInputInnerContainer}>
                                        <TextInput value={password} style={{ minHeight: 40 }} secureTextEntry={true} placeholder="your first time password" onChangeText={(pw) => { setPassword(pw) }} />
                                    </View>
                                    <Text style={styles.textInputError}>{isError ? 'failed to authenticate' : ''}</Text>
                                </View>
                                <TouchableOpacity style={{ paddingHorizontal: 10, borderRadius: 10, backgroundColor: colors.secondary }} onPress={() => checkPassword()} >
                                    <View>
                                        <Text style={{ color: 'white', textAlign: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>LOGIN</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Gap h={10} />
                                <Text style={{ ...styles.textTitle, textAlign: 'center' }}>OR</Text>
                                <Gap h={10} />
                                <TouchableOpacity style={styles.btnContainer} onPress={() => { setIsBiometric(true); setIsError(false); setPassword('') }} >
                                    <Text style={styles.btnText}>USING BIOMETRIC</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </BottomSheet>
        </SafeAreaView>
    )
}

export default LoginScreen;
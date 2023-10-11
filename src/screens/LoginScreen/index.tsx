import { Dimensions, Image, Text, TouchableOpacity, View, TextInput, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../utils/constants";
import BottomSheet from "../../components/molecules/BottomSheet";
import { useEffect, useState } from "react";
import styles from "./styles";
import Gap from "../../components/atoms/Gap";

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [isModalActive, setIsModalActive] = useState<Boolean>(false);
    const [isBiometric, setIsBiometric] = useState<Boolean>(true);
    const [isError, setIsError] = useState<Boolean>(false);
    // const [password, setPassword] = useState<String>('');

    const checkPassword = (pw: string) => {
        console.log(pw);
        if (pw.length > 3) {
            if (pw === 'test') {
                setIsModalActive(false);
                navigation.navigate('HomeScreen');
            } else {
                setIsError(true);
            }
        } else {
            setIsError(false);
        }
    }

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
                                    <Text style={styles.textInputLabel}>Password</Text>
                                    <View style={styles.textInputInnerContainer}>
                                        <TextInput style={{ minHeight: 40 }} secureTextEntry={true} placeholder="your first time password" onChangeText={(pw) => { checkPassword(pw) }} />
                                    </View>
                                    <Text style={styles.textInputError}>{isError ? 'failed to authenticate' : ''}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ ...styles.textTitle, textAlign: 'center' }}>OR</Text>
                                <Gap h={10} />
                                <TouchableOpacity style={styles.btnContainer} onPress={() => setIsBiometric(true)} >
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
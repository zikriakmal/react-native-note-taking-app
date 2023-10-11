import { Dimensions, Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../utils/constants";
import BottomSheet from "../../components/molecules/BottomSheet";
import { useState } from "react";

const LoginScreen = () => {
    const [isModalActive, setIsModalActive] = useState<Boolean>(false);
    const [isBiometric, setIsBiometric] = useState<Boolean>(true);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ position: 'absolute', top: 0 }}>
                <View style={{ backgroundColor: colors.primary, height: Dimensions.get('window').height / 2.5, width: '100%' }} />
                <View style={{
                    width: '100%',
                    borderTopWidth: 150,
                    borderTopColor: colors.primary,
                    borderLeftWidth: 500,
                    borderLeftColor: 'transparent',
                    borderStyle: 'solid'
                }} />
            </View>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignContent: 'center' }}>
                <Image source={require('../../assets/images/logo.png')} style={{ marginLeft: 25, height: 100, width: 112 }} />
                <Text style={{ marginTop: 10, fontSize: 18, fontWeight: '600' }}>Znote App</Text>
                <Text style={{ marginVertical: 5, fontSize: 14, fontWeight: '300' }}>write your note easily !</Text>
                <View>
                    <TouchableOpacity style={{ marginTop: 30, backgroundColor: colors.secondary, padding: 15, borderRadius: 10 }} onPress={() => setIsModalActive(true)} >
                        <View>
                            <Text style={{ color: 'white', paddingHorizontal: 10, }}>Getting Started</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomSheet visible={isModalActive} onRequestClose={setIsModalActive} onDismiss={setIsModalActive} transparent={true}>
                <View style={{ minHeight: 350, alignContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                    {isBiometric ?
                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>Authenticate using biometrics</Text>
                            <View>
                                <Image source={require('../../assets/images/biometrics.png')} style={{ marginVertical: 20, width: 100, height: 100 }} />
                                <Text style={{ color: 'red', fontSize: 10, textAlign: 'center' }}>error message</Text>
                            </View>
                            <Text style={{ marginTop: 15, fontSize: 14, fontWeight: '800', color: '#000' }}>OR</Text>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={{ borderColor: colors.secondary, borderWidth: 1, paddingHorizontal: 10, borderRadius: 10 }} onPress={() => setIsBiometric(false)} >
                                    <View>
                                        <Text style={{ color: colors.secondary, paddingHorizontal: 20, paddingVertical: 10 }}>USING PASSWORD</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View style={{ alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>Authenticate using password</Text>
                            <View style={{ marginVertical: 10, width: 200 }}>
                                <Text style={{ marginVertical: 2, color: 'black', fontSize: 12, fontWeight: '500' }}>Password</Text>
                                <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
                                    <TextInput secureTextEntry={true} placeholder="*****" />
                                </View>
                                <Text style={{ marginTop: 2, color: 'red', fontSize: 10 }}>error message</Text>
                            </View>
                            <Text style={{ marginTop: 15, fontSize: 14, fontWeight: '800', color: '#000' }}>OR</Text>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={{ borderColor: colors.secondary, borderWidth: 1, paddingHorizontal: 10, borderRadius: 10 }} onPress={() => setIsBiometric(true)} >
                                    <View>
                                        <Text style={{ color: colors.secondary, paddingHorizontal: 20, paddingVertical: 10 }}>USING BIOMETRIC</Text>
                                    </View>
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
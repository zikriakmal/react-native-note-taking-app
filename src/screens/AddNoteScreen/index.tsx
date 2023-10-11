import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { colors } from "../../utils/constants";
import CryptoJS from 'crypto-js';
// import { SafeAreaView } from "react-native-safe-area-context";

const AddNoteScreen = () => {
    const [note, setNote] = useState<string>('')
    const [subnote, setSubnote] = useState<string>('')
    const [noteError, setNoteError] = useState('')

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onSubmitNotes = () => {
        const key = 'oke';
        const payload = {
            note: CryptoJS.AES.encrypt(note, key).toString(),
            subnote: CryptoJS.AES.encrypt(subnote, key).toString(),
            date: new Date()
        }
        console.log(payload);
    }
    const isButtonDisable = (note === '')
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.backgroundContainer}>
                <View style={styles.backgroundInner2} />
                <View style={styles.backgroundInner1} />
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: 40, marginVertical: 10 }}>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>Notes</Text>
                        <View style={styles.textInputInnerContainer}>
                            <TextInput style={{ minHeight: 40 }} placeholder="Your Notes" onChangeText={(note) => { setNote(note) }} />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>Additional notes</Text>
                        <View style={styles.textAreaInputInnerContainer}>
                            <TextInput style={{ minHeight: 150, textAlignVertical: 'top' }} multiline={true} numberOfLines={4} secureTextEntry={true} placeholder="Your additional notes here" onChangeText={(subnote) => { setSubnote(subnote) }} />
                        </View>
                    </View>
                    <TouchableOpacity style={{ ...styles.btnMainContainer, backgroundColor: isButtonDisable ? 'lightgrey' : colors.secondary }} disabled={isButtonDisable} onPress={() => onSubmitNotes()} >
                        <Text style={styles.btnMainTextContainer}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
                onRequestClose={() => { }}>
                <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            </Modal>
        </SafeAreaView>
    )

}

export default AddNoteScreen;
import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import { colors } from "../../utils/constants";
import CryptoJS from 'crypto-js';
import { createNote, listNotes, updateNotes } from "../../services/notes.service";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../../redux/reducers/notesReducer";
import { RootState } from "../../redux/store";

const AddNoteScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const [note, setNote] = useState<string>(route.params?.note ?? '')
    const [subnote, setSubnote] = useState<string>(route.params?.subnote ?? '')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noteError, setNoteError] = useState('')

    const { auth } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();

    const onSubmitNotes = () => {
        const key = auth.secret;
        const payload = {
            note: CryptoJS.AES.encrypt(note, key).toString(),
            subnote: CryptoJS.AES.encrypt(subnote, key).toString(),
            date: new Date()
        }
        
        if (route.params?.from !== 'edit') {
            createNote({ note: payload.note, subnote: payload.subnote }).then(() => {
                listNotes().then((dt: any) => {
                    dispatch(setNotes(dt.map(
                        (datum: any) => {
                            return {
                                id: datum.id,
                                note: CryptoJS.AES.decrypt(datum.note, key).toString(CryptoJS.enc.Utf8),
                                subnote: CryptoJS.AES.decrypt(datum.subnote, key).toString(CryptoJS.enc.Utf8),
                                date: datum.date
                            }
                        }
                    )))
                });
                navigation.navigate('HomeScreen');
            })
        } else {
            updateNotes({ note: payload.note, subnote: payload.subnote, id: route.params?.id }).then((dt) => {
                listNotes().then((dt: any) => {
                    dispatch(setNotes(dt.map(
                        (datum: any) => {
                            return {
                                id: datum.id,
                                note: CryptoJS.AES.decrypt(datum.note, key).toString(CryptoJS.enc.Utf8),
                                subnote: CryptoJS.AES.decrypt(datum.subnote, key).toString(CryptoJS.enc.Utf8),
                                date: datum.date
                            }
                        }
                    )))
                });
                navigation.navigate('HomeScreen');
            })
        }
        setIsLoading(true);
        setTimeout((() => {
            setIsLoading(false);
        }), 1000)
    }
    const isButtonDisable = (note === '' || isLoading)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.backgroundContainer}>
                <View style={styles.backgroundInner2} />
                <View style={styles.backgroundInner1} />
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: 40, marginVertical: 10 }}>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>Notes</Text>
                        <View style={styles.textInputInnerContainer}>
                            <TextInput value={note} style={{ minHeight: 40 }} placeholder="Your Notes" onChangeText={(note) => { setNote(note) }} />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>Additional notes</Text>
                        <View style={styles.textAreaInputInnerContainer}>
                            <TextInput value={subnote} style={{ minHeight: 150, textAlignVertical: 'top' }} multiline={true} numberOfLines={4} secureTextEntry={true} placeholder="Your additional notes here" onChangeText={(subnote) => { setSubnote(subnote) }} />
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

import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { Image, Modal, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Gap from "../../components/atoms/Gap";
import { setNotes } from "../../redux/reducers/notesReducer";
import { RootState } from "../../redux/store";
import { deleteNote, listNotes } from "../../services/notes.service";
import { colors } from "../../utils/constants";
import styles from "./styles";


const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const { notes } = useSelector((state: RootState) => state.notes)
    const { auth } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch();
    const key = auth.secret;

    useEffect(() => onRefresh(), [auth?.secret])

    const onRefresh = () => {
        setRefreshing(true)
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
            setRefreshing(false);
        });
    }

    const deleteAction = () => {
        deleteNote({ id: deleteId }).then(() => {
            onRefresh();
            setDeleteModalShow(false)
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={colors.primary} />
            <View style={styles.backgroundContainer}>
                <View style={styles.backgroundInner1} />
                <View style={styles.backgroundInner2} />
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 10, minHeight: 100, marginBottom: 40 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}> All{'\n'}Notes </Text>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={{ marginHorizontal: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
                {notes?.map((notes: any) => {
                    return <NoteComponent key={notes.id} setDeleteId={setDeleteId} setDeleteModalShow={setDeleteModalShow} navigation={navigation} id={notes?.id} note={notes?.note} subnote={notes?.subnote} date={notes?.date} />
                })}
                <Gap h={10} />
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('AddNoteScreen') }}>
                    <View style={{ backgroundColor: 'white', ...styles.shadow, padding: 20, borderRadius: 10 }}>
                        <Image source={require('../../assets/images/icon/plus.png')} style={{ height: 20, width: 20 }}></Image>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={deleteModalShow}
                onRequestClose={() => { }}>
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { setDeleteModalShow(false) }} style={{ position: 'absolute', opacity: 0.2, backgroundColor: 'black', flex: 1, height: '100%', width: '100%' }}>
                    </TouchableOpacity>
                    <View style={{ opacity: 1, backgroundColor: 'white', paddingHorizontal: 30, paddingVertical: 20, borderRadius: 10, ...styles.shadow }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>Are you sure want to delete{'\n'}selected note ?</Text>
                        <Gap h={20} />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => deleteAction()}><Text style={{ color: 'red', fontWeight: '800', padding: 10, fontSize: 16 }}>Yes</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setDeleteModalShow(false)}><Text style={{ padding: 10, fontSize: 16 }}>No</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>)
}

const NoteComponent = ({ navigation, id, note, subnote, date, setDeleteModalShow, setDeleteId }: { navigation: any, id: number, note: string, subnote: string, date: string, setDeleteModalShow: any, setDeleteId: any }) => {
    return (
        <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5, padding: 10, paddingHorizontal: 15, minHeight: 40, backgroundColor: 'white', borderRadius: 10, ...styles.shadow }}>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 2, paddingRight: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', paddingVertical: 2, }} numberOfLines={1}>{note}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '300', paddingVertical: 2, }} numberOfLines={1}>{subnote}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', paddingVertical: 2 }}>{new Date(date).toDateString()}</Text>
                </View>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 5, ...styles.shadow }} onPress={() => navigation.navigate('AddNoteScreen', { from: 'edit', id: id, note: note, subnote: subnote })}>
                        <View >
                            <Image source={require('../../assets/images/icon/edit.png')} style={{ height: 15, width: 15, margin: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <Gap w={10} />
                    <TouchableOpacity onPress={() => { setDeleteModalShow(true); setDeleteId(id); }} style={{ backgroundColor: 'white', borderRadius: 5, ...styles.shadow }}>
                        <View >

                            <Image source={require('../../assets/images/icon/delete.png')} style={{ height: 15, width: 15, margin: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default HomeScreen;
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import styles from "./styles";
import Gap from "../../components/atoms/Gap";
import { colors } from "../../utils/constants";


const HomeScreen = ({ navigation }: { navigation: any }) => {

    return (<SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.backgroundContainer}>
            <View style={styles.backgroundInner1} />
            <View style={styles.backgroundInner2} />
        </View>
        <View style={{ marginHorizontal: 20, marginVertical: 10, minHeight: 100, marginBottom: 40 }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}> All{'\n'}Notes </Text>
        </View>
        <ScrollView style={{ marginHorizontal: 20, paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={{ color: "#000", fontSize: 24, marginVertical: 10 }}>Today</Text>
            <NoteComponent navigation={navigation} />
            <NoteComponent navigation={navigation} />
            <NoteComponent navigation={navigation} />
            <Gap h={10} />
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('AddNoteScreen') }}>
                <View style={{ backgroundColor: 'white', ...styles.shadow, padding: 20, borderRadius: 10 }}>
                    <Image source={require('../../assets/images/icon/plus.png')} style={{ height: 20, width: 20 }}></Image>
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>)
}

const NoteComponent = ({ navigation }: { navigation: any }) => {
    return (
        <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5, padding: 10, paddingHorizontal: 15, minHeight: 40, backgroundColor: 'white', borderRadius: 10, ...styles.shadow }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', }}>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: '600', paddingVertical: 2 }}>Title</Text>
                    <Text style={{ fontSize: 12, fontWeight: '300', paddingVertical: 2 }}>No additional notes...</Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', paddingVertical: 2 }}>11/09/23</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 5, ...styles.shadow }} onPress={() => navigation.navigate('AddNoteScreen', { from: 'edit', id: 1, title: 'Edit Notes' })}>
                        <View >
                            <Image source={require('../../assets/images/icon/edit.png')} style={{ height: 15, width: 15, margin: 10 }} />
                        </View>
                    </TouchableOpacity>
                    <Gap w={10} />
                    <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 5, ...styles.shadow }}>
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
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';

const DEBUG = true

const Item = ({ item }) => {
    const { title, body, timestamp } = item
    return (<View style={{ backgroundColor: "lightgrey", paddingTop: 5, paddingBottom: 5, paddingLeft: 3, paddingRight: 3 }}>
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 5 }}>{title}</Text>
        <Text style={{ textAlign: "justify" }}>{body}</Text>
        <Text style={{ fontSize: 20, fontStyle: "italic", marginTop: 5 }}>{new Date(timestamp).toLocaleString("en-US")}</Text>
    </View>)
}

const Separator = () => {
    return <View style={{ height: 10 }} />
}
let debug_data = [
    { "title": "Title of the recap", "body": "Body of the recap, going in depper details on how this works", "timestamp": "2025-03-12T12:00:00Z" },
    { "title": "This is... The future", "body": "Look to the future, shape the future. Here we go now, on the offense. I know you're gonna dig this!", "timestamp": "2025-03-21T00:59:00Z" },
    { "title": "From the past", "body": "A while ago", "timestamp": "2025-03-01T00:00:00Z" }]

debug_data = debug_data.concat(debug_data)
debug_data = debug_data.concat(debug_data)
debug_data.sort((a, b) => (new Date(b.timestamp) - new Date(a.timestamp)))
const HomeScreen = ({ navigation, route: { params } }) => {
    const [data, setData] = useState(DEBUG ? debug_data : [])


    async function fetchData() {
        const url = "192.168.1.14:8000/" // Needs to be updated every wifi connection
        let response = await fetch(url)
        console.log("Await done")
        if (!response.ok) {
            return
        }
        console.log(response)
        let data = await response.json()
        setData(data.sort((a, b) => (new Date(b.timestamp) - new Date(a.timestamp))))
    }

    useEffect(() => {
        setInterval(() => { fetchData() }, 1000);
    }, [])
    return (
        <SafeAreaView>
            <FlatList data={data} renderItem={Item} ItemSeparatorComponent={Separator} />
        </SafeAreaView>
    )
}

export default HomeScreen;

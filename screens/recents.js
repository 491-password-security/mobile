import AsyncStorage from '@react-native-async-storage/async-storage';

import '../globals'


const recentItemFromPair = (_name, _url, _id) => {
    return {
        name : _name,
        url : _url,
        id : _id,
    };
}

export const addRecent = async (userName, url) => {
    // dont let empty string values
    if(userName === '' || url === ''){
        return;
    }
    var allRecents = global.recents;
    //check if item exists in the list
    for(var i = 0; i < allRecents.length; i++){
        const item = allRecents[i];
        if(item.name === userName && item.url === url){
            return;
        }
    }
    console.log('a1');
    //construct new item and add it to the storage
    const item = recentItemFromPair(userName, url, allRecents.length);
    const dataKey = "recents:" + item.id;
    await AsyncStorage.setItem(dataKey, JSON.stringify(item));
    global.recents.push(item);
    console.log('added ' + userName + " " + url)

}

export const getRecentItems = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    var keys = [];
    allKeys.forEach((key) => {
        if(key.startsWith("recents:")){
            keys.push(key);
        }
    })
    var result = await AsyncStorage.multiGet(keys);
    for(var i = 0; i < result.length; i++){
        result[i] = JSON.parse(result[i][1]);//remove dataKey and convert it to json object
    }

    //console.log(result)
    return result;

}


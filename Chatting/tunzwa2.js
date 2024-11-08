import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EndPoint } from '../Constant/links';

const AllChattingScreen = ({ navigation, route }) => {
  const { id, Title } = route.params;
  const post_id = id;

  const [queryset, setQueryset] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [message, setMessage] = useState('');
  const [isPending2, setIsPending2] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token);
      getItems(token); // Fetch items on mount
    });
  }, []);

  const getItems = async (token) => {
    const url = `${EndPoint}/GetChatMessagesView/?post_id=${post_id}`;
    try {
      const res = await axios.get(url);
      
      // Set messages in the correct nested format
      setQueryset(res.data.queryset);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    setIsPending2(true);
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      const formData = new FormData();
      formData.append('message', message);
      if (replyMessage) formData.append('replyTo', replyMessage.id);

      try {
        const response = await axios.post(`${EndPoint}/AddChatMessageView/${post_id}/`, formData, {
          headers: { Authorization: `Token ${token}`, 'Content-Type': 'multipart/form-data' }
        });

        // Update local state with the new message
        if (replyMessage) {
          setQueryset(prev => 
            prev.map(msg => 
              msg.id === replyMessage.id 
              ? { ...msg, replies: [...(msg.replies || []), response.data] } 
              : msg
            )
          );
        } else {
          setQueryset(prev => [...prev, { ...response.data, replies: [] }]);
        }

        setMessage('');
        setReplyMessage(null);
      } catch (error) {
        console.log("Message not sent:", error);
      } finally {
        setIsPending2(false);
      }
    }
  };

  const handleReply = (message) => {
    setReplyMessage(message);
  };

  const renderReply = (reply) => (
    <View key={reply.id} style={{ flexDirection: 'row', marginVertical: 5, marginLeft: 30 }}>
      <Image
        source={{ uri: EndPoint + '/' + (reply.SenderImage || 'assets/profile.jpg') }}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text>{reply.sender}</Text>
        <Text>{reply.message}</Text>
        <Text style={{ fontSize: 12, color: 'grey' }}>{new Date(reply.created_at).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  const renderMessage = ({ item }) => (
    <View style={{ flexDirection: 'column', marginVertical: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: EndPoint + '/' + (item.SenderImage || 'assets/profile.jpg') }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>{item.sender}</Text>
          <Text>{item.message}</Text>
          <Text style={{ fontSize: 12, color: 'grey' }}>{new Date(item.created_at).toLocaleDateString()}</Text>
        </View>
        <TouchableOpacity onPress={() => handleReply(item)}>
          <Text style={{ color: 'blue' }}>Reply</Text>
        </TouchableOpacity>
      </View>
      {item.replies && item.replies.map(renderReply)}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={queryset}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />
      {replyMessage && (
        <View style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text>Replying to: {replyMessage.message}</Text>
          <TouchableOpacity onPress={() => setReplyMessage(null)}>
            <Text style={{ color: 'red' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
        />
        <TouchableOpacity onPress={sendMessage} disabled={isPending2}>
          {isPending2 ? <ActivityIndicator /> : <Text style={{ marginLeft: 10 }}>Send</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllChattingScreen;

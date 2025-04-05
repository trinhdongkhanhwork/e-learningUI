import { ref} from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';
import { getStompClient } from '@/service/socket/socket'

export default function messagesService(){
    const store = useStore();
    const user = ref(store.state.userInfo);
    const messages = ref([]);
    const friend = ref({});

    const fetchMessages =  async (idUserFrom) => {
        try {
            const response = await baseApi.request({
                url: '/message/get',
                method:'POST',
                data: {
                    idUser: user.value.id,
                    idFriend: idUserFrom
                }
            })
            messages.value = response.data ? response.data.messages : [];
            friend.value = response.data ? response.data.friend : null;
            receiveMessage(friend.value);
        } catch (error){
            // console.error('Lỗi khi tải tin nhắn:', error);
        }
    }

    const sendMessage = async (textMessage, friendId, urlImage, urlFile) => {
        const stompClient = getStompClient()
        const message = {
            userId: user.value.id,
            friendId: friendId,
            message: textMessage,
            urlFile: urlFile,
            urlImage: urlImage
        }
        stompClient.publish({
            destination: "/app/message/send",
            body: JSON.stringify(message)
        })
    }

    let unsubsribeMessage = null
    const receiveMessage = async(friend) => {
        if(unsubsribeMessage) unsubsribeMessage.unsubscribe();
        const stompClient = getStompClient()
        unsubsribeMessage = stompClient.subscribe(`/message/${friend.id}/private`, (messageResponse) => {
            try {
                const messageData = JSON.parse(messageResponse.body);
                messages.value.push(messageData);
            } catch (error) {
                console.log("Lỗi gửi tin nhắn: ", error);
            }
        })
    }

    return {
        messages,
        friend,
        fetchMessages,
        sendMessage,
        receiveMessage
    }
}

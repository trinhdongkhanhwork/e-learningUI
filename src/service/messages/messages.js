import { ref} from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';

export default function messagesService(){
    const store = useStore();
    const user = ref(store.state.userInfo);
    const message = ref({});
    const messages = ref([]);
    const friends = ref([]);

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
            messages.value = response.data;
        } catch (error){
            console.error('Lỗi khi tải tin nhắn:', error);
        }
    }

    const fetchFriends =  async () => {
        try {
            const response = await baseApi.request({
                url: '/friend/get',
                method:'POST',
                data: {
                    idUser: user.value.id,
                    idFriend: null
                }
            })
            friends.value = response.data;
        } catch (error){
            console.error('Lỗi khi tải bản bè:', error);
        }
    }

    return {
        messages,
        friends,
        fetchMessages,
        fetchFriends
    }
}

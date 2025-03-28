import { ref} from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';

export default function friendService(){
    const store = useStore();
    const user = ref(store.state.userInfo);
    const friends = ref([]);
    const friendsSearch = ref([]);
    const invitations = ref([]);

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

    const searchFriend = async (keyword) => {
        try {
            const response = await baseApi.request({
                url: '/friend/search',
                method:'POST',
                data: {
                    idUser: user.value.id,
                    idFriend: keyword
                }
            })
            friendsSearch.value = response.data;
        } catch (error) {
            console.error('Lỗi khi tìm bạn bè:', error);
        }
    }

    const sendInvitation = async (idFriend) => {
        try {
            const response = await baseApi.request({
                url: '/friend/invitation',
                method:'POST',
                data: {
                    idUser: user.value.id,
                    idFriend: idFriend
                }
            })
        } catch (error) {
            console.error('Lỗi gửi yêu cầu kết bạn:', error);
        }
    }

    const confirmInvitaiton = async (idFriend) => {
        let confrim = "FRIEND"
         try {
            const response = await baseApi.request({
                url: `/friend/${confrim}`,
                method:'PUT',
                data: {
                    idUser: user.value.id,
                    idFriend: idFriend
                }
            })
        } catch (error) {
            console.error('Lỗi xác nhận yêu cầu kết bạn:', error);
        }
    }

    const loadInvitation = async () => {
        try {
            const response = await baseApi.request({
                url: `/friend/invitation/${user.value.id}`,
                method:'Get'
            })
            invitations.value = response.data;
        } catch (error) {
            console.error('Lỗi tải yêu cầu kết bạn:', error);
        }
    }

    return {
        friends,
        friendsSearch,
        searchFriend,
        fetchFriends,
        sendInvitation,
        confirmInvitaiton,
        loadInvitation,
        invitations
    }
}

import { ref} from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';
import { getStompClient } from '@/service/socket/socket'


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
        const stompClient = getStompClient();
        const invitation = {
            idUser: user.value.id,
            idFriend: idFriend
        }
        stompClient.publish({
            destination: "/app/friend/invitation",
            body: JSON.stringify(invitation)
        })
    }

    let unsubscribeInvitation = null;
    const receiveInvitation = async () => {
        if(unsubscribeInvitation) unsubscribeInvitation.unsubscribe();
        const stompClient = getStompClient()
        unsubscribeInvitation = stompClient.subscribe(`/friend/${user.value.id}/private`, (invitationResponse) => {
            try {
                const invitation = JSON.parse(invitationResponse.body);
                invitations.value.push(invitation);
            } catch (error) {
                console.error("Lỗi gửi lời mới kết bạn: ", error);
            }
        })
    }

    let unsubscribeConfirmInvitation = null;
    const receiveComfirmInvitation = async () => {
        if(unsubscribeConfirmInvitation) unsubscribeConfirmInvitation.unsubscribe();
        const stompClient = getStompClient()
        unsubscribeConfirmInvitation = stompClient.subscribe(`/friend/${user.value.id}/confirm/private`, (confirmResponse) => {
            try {
                const confirm = JSON.parse(confirmResponse.body);
                friends.value.push(confirm);
            } catch (error) {
                console.error("Lỗi xác nhận kết bạn: ", error);
            }
        })
    }

    const confirmInvitaiton = async (idFriend) => {
        const stompClient = getStompClient();
        const confirm = {
            idUser: user.value.id,
            idFriend: idFriend
        }
        stompClient.publish({
            destination: "/app/friend/confirm",
            body: JSON.stringify(confirm)
        })
        
      setTimeout(() => {
        loadInvitation();
        fetchFriends();
      }, 500);
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
        receiveInvitation,
        receiveComfirmInvitation,
        invitations
    }
}

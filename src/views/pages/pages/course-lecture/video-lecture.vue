<template>
    <div v-if="lecture?.type === 'video'">
        <!-- Video -->
        <div>
            <video v-if="lecture && lecture.videos && lecture.videos.length > 0" ref="videoRef"
                :src="lecture.videos[0].videoUrl" controls style="width: 100%; height: 100%;"
                @timeupdate="checkIfWatchedToEnd" @loadedmetadata="seekToStartSecond"></video>
        </div>
        <!-- /Video -->
        <!-- Post comment -->
        <div class="instructor-wrap" style="border: none; margin: 20px 0 20px 0">
            <div class="comment-sec"
                style=" margin: 0; display: flex; align-items: start; width: 100%; flex-wrap: nowrap;">
                <div class="abt-instructor-img" style="flex: 0 0 50px">
                    <router-link to="#">
                        <img :src="user?.avatarUrl" alt="img" class="img-fluid"/>
                    </router-link>
                </div>
                <form style="flex-grow: 1" @submit.prevent="postCommentInVideo">
                    <div class="form-group" style="margin-bottom: 10px">
                        <textarea rows="4" class="form-control" placeholder="Your Comments" style="width: 100%"
                            v-model="commentText"></textarea>
                    </div>
                    <button class="submit-btn" type="button" style="height: 30px; padding: 0"
                        @click="postCommentInVideo()">Submit</button>
                </form>
            </div>
        </div>
        <!-- Post comment -->
        <!-- List comment -->
        <ul style="max-width: 100%; display: flex; flex-direction: column-reverse">
        <li style="margin: 10px 0; width: 100%"
            v-for="commentParent in filterCommentParent" :key="commentParent.id">
            <div class="instructor-wrap hoverComment"
                style=" border: none; margin: 0 0 10px 0;width: 100%; display: flex; align-items: flex-start; justify-content: start; flex-wrap: nowrap;">
                <div class="abt-instructor-img" style="flex: 0 0 50px">
                    <router-link to="#">
                    <img :src="commentParent?.avatarUserComment" alt="img" class="img-fluid"/>
                    </router-link>
                </div>
                <div style=" margin: 0; display: flex; justify-content: space-between; flex-wrap: nowrap; flex-grow: 1;">
                    <div class="instructor-detail" style="width: 100%">
                        <h5>
                            <router-link to="#">{{
                                commentParent?.fullnameUserComment
                            }}</router-link>
                        </h5>
                        <p style="font-size: 16px; margin: 5px 0 0 0; white-space: normal; overflow-wrap: break-word; word-break: break-word;"
                            v-if="!viewEditCommentToggle[commentParent.id]">{{ commentParent.commentText }}</p>
                        
                        <!-- Edit comment -->
                        <div class="comment-sec"
                            style="display: flex"
                            v-if="viewEditCommentToggle[commentParent.id]">
                            <form style="flex-grow: 1; margin: 10px 0 20px 0">
                                <div class="form-group" style="margin-bottom: 10px">
                                    <textarea rows="4"
                                    class="form-control"
                                    placeholder="Your Comments"
                                    style="width: 100%"
                                    v-model="editCommentText[commentParent.id]"></textarea>
                                </div>
                                <div style="display: flex; gap: 10px; flex-wrap: wrap">
                                    <button class="submit-btn" type="button" style="height: 30px; padding: 0"
                                    @click="putCommentFu({id: commentParent.id, commentText: editCommentText[commentParent.id]})">Edit</button>
                                    <button class="submit-btn" type="button"
                                            style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                                            @click="viewEditCommentTogglefu(commentParent.id)">Cancel</button>
                                </div>
                            </form>
                        </div>
                        <!-- Edit comment -->
                        
                        <!-- Post reply -->
                        <a href="javascript:;"
                            style="font-size: 14px"
                            @click="viewPostReplyTogglefu(commentParent.id)"
                            class="rev-info">
                            <i class="feather-corner-up-left"></i>Reply</a>
                        <div class="comment-sec"
                                style="display: flex"
                                v-if="viewPostReplyToggle[commentParent.id]">
                            <form style="flex-grow: 1; margin: 10px 0 0 0">
                                <div class="form-group" style="margin-bottom: 10px">
                                    <textarea rows="4"
                                    class="form-control"
                                    placeholder="Your Comments"
                                    style="width: 100%"
                                    v-model="replyText[commentParent.id]"></textarea>
                                </div>
                                <div style="display: flex; gap: 10px; flex-wrap: wrap">
                                    <button class="submit-btn"
                                            type="button"
                                            style="height: 30px; padding: 0"
                                            @click=" postReplyInVideo(commentParent.id)">Reply</button>
                                        <button class="submit-btn" type="button"
                                            style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                                            @click="viewPostReplyTogglefu(commentParent.id)">Cancel</button>
                                </div>
                            </form>
                        </div>
                        <!-- Post reply --> 
                    </div>
                </div>

                <div class="hoverMenu" v-if="commentParent.idUserComment === user.id">
                    <a href="javascript:;" class="listenComment">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </a>
                    <div class="popupStyle">
                        <a href="javascript:;"
                            @click=" viewEditCommentTogglefu( commentParent.id, commentParent.commentText)">
                            <p>Edit</p>
                        </a>
                        <a href="javascript:;"
                            @click="deleteComment(commentParent.id, commentParent.idUserComment)">
                            <p>Delete</p>
                        </a>
                    </div>
                </div>
            </div>
            <!-- List reply -->
            <ul style="margin: 15px 0 0 35px">
                <li style="margin: 10px 0 0 0"
                    v-for="(commentChild, index) in getReplyOfComment(commentParent.id)" :key="index">
                    <div class="instructor-wrap hoverReply"
                        style=" margin: 0; border: none; width: 100%;  display: flex; align-items: flex-start; justify-content: start; flex-wrap: nowrap;">
                        <div class="abt-instructor-img" style="flex: 0 0 40px">
                            <router-link to="#">
                                <img :src="commentChild?.avatarUserComment" style="width: 40px; height: 40px" alt="img" class="img-fluid"/>
                            </router-link>
                        </div>
                        <div style="margin: 0; display: flex; justify-content: space-between; flex-wrap: nowrap; flex-grow: 1;">
                            <div class="instructor-detail" style="width: 100%">
                                <h5>
                                    <router-link to="#">{{ commentChild?.fullnameUserComment }}</router-link>
                                </h5>
                                <p style="color: gray">@{{ commentChild?.fullnameUserCommentParent }}</p>
                            
                                <p style=" font-size: 16px; margin: 5px 0 0 0; white-space: normal; overflow-wrap: break-word; word-break: break-word; padding-right: 20px;"
                                    v-if="!viewEditCommentToggle[commentChild.id]">{{ commentChild.commentText }}</p>
                                
                                <!-- Edit reply -->
                                <div class="comment-sec"
                                    style="display: flex"
                                    v-if="viewEditCommentToggle[commentChild.id]">
                                    <form style="flex-grow: 1; margin: 10px 0 20px 0">
                                        <div class="form-group" style="margin-bottom: 10px">
                                            <textarea rows="4"
                                            class="form-control"
                                            placeholder="Your Comments"
                                            style="width: 100%"
                                            v-model="editCommentText[commentChild.id]"></textarea>
                                        </div>
                                        <div style="display: flex; gap: 10px; flex-wrap: wrap">
                                            <button class="submit-btn" type="button" style="height: 30px; padding: 0"
                                            @click="putCommentFu({id: commentChild.id, commentText: editCommentText[commentChild.id]})">Edit</button>
                                            <button class="submit-btn" type="button"
                                                    style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                                                    @click="viewEditCommentTogglefu(commentChild.id)">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                                <!-- Edit reply -->
                                
                                <!-- Post reply to reply-->
                                <a href="javascript:;"
                                    style="font-size: 14px"
                                    @click="viewPostReplyTogglefu(commentChild.id)"
                                    class="rev-info">
                                    <i class="feather-corner-up-left"></i>Reply</a>
                                <div class="comment-sec"
                                        style="display: flex"
                                        v-if="viewPostReplyToggle[commentChild.id]">
                                    <form style="flex-grow: 1; margin: 10px 0 0 0">
                                        <div class="form-group" style="margin-bottom: 10px">
                                            <textarea rows="4"
                                            class="form-control"
                                            placeholder="Your Comments"
                                            style="width: 100%"
                                            v-model="replyText[commentChild.id]"></textarea>
                                        </div>
                                        <div style="display: flex; gap: 10px; flex-wrap: wrap">
                                            <button class="submit-btn"
                                                    type="button"
                                                    style="height: 30px; padding: 0"
                                                    @click=" postReplyInVideo(commentChild.id)">Reply</button>
                                            <button class="submit-btn" type="button"
                                                    style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                                                    @click="viewPostReplyTogglefu(commentChild.id)">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                                <!-- Post reply to reply-->
                            </div>
                        </div>
                        <div class="hoverMenu" v-if="commentChild.idUserComment === user.id">
                            <a href="javascript:;" class="listenReply">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                </svg>
                            </a>
                            <div class="popupStyle">
                                <a href="javascript:;"
                                    @click=" viewEditCommentTogglefu( commentChild.id, commentChild.commentText)">
                                    <p>Edit</p>
                                </a>
                                <a href="javascript:;"
                                    @click="deleteComment(commentChild.id, commentChild.idUserComment)">
                                    <p>Delete</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- List reply -->
        </li>
        </ul>
        <!-- List comment -->
    </div>
</template>
<script setup>
import { ref, watch, computed, onUnmounted } from 'vue';
import commentService from '@/service/comment/comment';
import { number } from 'yup';

const {user, comments, fetchComment, receiveComment, postComment, postReply, deleteComment, putComment} = commentService();

const commentText = ref("");
const viewPostReplyToggle = ref({});
const viewEditCommentToggle = ref({});
const editCommentText = ref({})
const replyText = ref({});

const props = defineProps({
    lecture: {
        type: Object,
        required: true
    },
    startSecond: {
    type: Number,
    default: 0
  }
})

const videoRef = ref(null);
const hasWatchedToLast5Seconds = ref(false);
const updateInterval = ref(null);

const sendProgress = async (currentSecond, completed = false) => {
    const token = localStorage.getItem("token");
    const lectureId = props.lecture?.id;
    console.log(lectureId);
    try {
        const response = await fetch("http://localhost:8080/api/progress/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                lectureId: lectureId,
                currentSecond: currentSecond,
                completed: completed
            })
        });

        if (!response.ok) {
            throw new Error("Err response status " + response.status);
        }
        console.log("SENED:", currentSecond, completed);
    } catch (error) {
        console.error("ERR send progress:", error);
    }
};

const checkIfWatchedToEnd = (event) => {
    const video = event.target;

    // tạo interval
    if (!updateInterval.value) {
        updateInterval.value = setInterval(() => {
            const currentSecond = Math.floor(video.currentTime);
            sendProgress(currentSecond);

            if (
                video.currentTime >= video.duration - 5

            ) {
                hasWatchedToLast5Seconds.value = true;
                sendProgress(currentSecond, true);
            }
        }, 1000);
    }
};

// Tua video đến thời gian nhận từ cha
const seekToStartSecond = () => {
  if (videoRef.value && props.startSecond > 0) {
    videoRef.value.currentTime = props.startSecond;
  }
};

// Clear interval khi component bị huỷ
onUnmounted(() => {
    if (updateInterval.value) {
        clearInterval(updateInterval.value);
    }
});



// const { comments, fetchComment, receiveComment, postComment, postReply } = commentService();

// const commentText = ref("");
// const viewPostReplyToggle = ref({});
// const replyText = ref({});


watch(() => props.lecture, (newLecture) => {
    if (newLecture && newLecture.videos && newLecture.videos.length > 0) {
        fetchComment(newLecture.videos[0].id);
        receiveComment(newLecture.videos[0].id);
    }
}, { immediate: true }
);

const postCommentInVideo = async () => {
    if (!commentText.value) return
    await postComment(commentText.value, props.lecture.videos[0].id, null);
    commentText.value = "";
}

const postReplyInVideo = async (idParent) => {
    if (!replyText.value[idParent]) return
    await postReply(replyText.value[idParent], props.lecture.videos[0].id, idParent);
    viewPostReplyToggle.value[idParent] = false
    replyText.value[idParent] = ""
}

const filterCommentParent = computed(() => {
    return comments.value.filter(comment => comment.idCommentParent == null);
})

const getReplyOfComment = (idParent) => {
    const replys = [];
    const getRepliesRecursively = (parentId) => {
        let childComments = findCommentChild(parentId);
        childComments.forEach((element) => {
            replys.push(element);
            getRepliesRecursively(element.id);
        });
    }
    getRepliesRecursively(idParent);
    replys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return replys;
}

const putCommentFu = (comment) => {
    putComment(comment);
    viewEditCommentToggle.value[comment.id] = false;
    editCommentText.value[comment.id] = ""
}

const findCommentChild = (parentId) => {
    return comments.value.filter((comment) => comment.idCommentParent === parentId);
}

const viewPostReplyTogglefu = (idComment) => {
    viewPostReplyToggle.value[idComment] = !viewPostReplyToggle.value[idComment];
}

const viewEditCommentTogglefu = (idComment) => {
    viewEditCommentToggle.value[idComment] = !viewEditCommentToggle.value[idComment]
}
</script>

<style>
.green {
  color: rgba(0, 0, 0, 0.848);
}
.listenComment {
  display: none;
}

.hoverComment:hover .listenComment {
  display: block;
}

.listenReply {
  display: none;
}

.hoverReply:hover .listenReply {
  display: block;
}

.hoverMenu {
  height: 50px;
  width: 50px;
  position: relative;
  padding: 0 10px 0 15px;
}

.popupStyle {
  position: absolute;
  right: 20px;
  top: 30px;
  background-color: white;
  box-shadow: 0 0 1px rgb(111, 111, 111);
  border-radius: 10px;
  padding: 5px 0;
  display: none;
}

.popupStyle a > p {
  margin: 0;
  padding: 5px 20px;
}
.popupStyle a > p:hover {
  background-color: rgb(235, 235, 235);
}

.popupStyle a {
    font-size: 13px !important;
    color: #22100d !important;
}

.hoverMenu:hover > .popupStyle {
  display: block;
}
</style>
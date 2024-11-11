<template>
	<layouts-login></layouts-login>

	<!-- Course Lesson -->
	<section class="page-content course-sec course-lesson">
		<div class="container" style="margin-top: 20px;">
			<div class="progress-stip" style="margin-bottom: 10px">
				<div
					class="progress-bar bg-success progress-bar-striped active-stip"
				></div>
			</div>
			<div class="row">
				<div class="col-lg-4">
					<!-- Course Lesson -->
					<div class="lesson-group" v-for="(section, index) in courses.sections" :key="index">
						<div class="course-card">
							<h6 class="cou-title">
								<a
									class="collapsed"
									data-bs-toggle="collapse"
									aria-expanded="false"
									@click="viewSectionToggle(section.id)"
								>{{ section.title }} <span>{{ section.lectures.length }} Lessons</span>
								</a>
							</h6>
							<div class="card-collapse" v-if="viewSection[section.id]">
								<ul>
									<li v-for="(lecture, index) in section.lectures" :key="index"
											@click="viewLectureUser(lecture.id)">
										<p class="play-intro">{{ lecture.title }}</p>
										<div>
											<img src="@/assets/img/icon/play-icon.svg" alt="" />
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- /Course Lesson -->
				</div>
				<div class="col-lg-8" v-if="lecture != null">
					<!-- Video and comment -->
					<div>
						<!-- Video -->
						<div class="student-widget lesson-introduction">
							<div class="lesson-widget-group">
								<h4 class="tittle">Introduction</h4>
								<div class="introduct-video">
									<a
										href="https://www.youtube.com/embed/1trvO6dqQUI"
										class="video-thumbnail"
										data-fancybox=""
									>
										<div class="play-icon">
											<i class="fa-solid fa-play"></i>
										</div>
										<img class="" src="@/assets/img/video-img-01.jpg" alt="" />
									</a>
								</div>
							</div>
						</div>
						<!-- /Video -->

						<div class="card" style="width: 100%; margin-top: 10px; padding: 20px;">
							<!-- Post comment -->
							<div class="instructor-wrap" style="border: none; margin: 0 0 20px 0;">
								<div class="comment-sec" style="margin: 0; display: flex; align-items: start; width: 100%; flex-wrap: nowrap;">
									<div class="abt-instructor-img" style="flex: 0 0 50px;">
										<router-link to="/instructor/instructor-profile">
											<img src="@/assets/img/user/user1.jpg"
														alt="img"
														class="img-fluid"/>
										</router-link>
									</div>
									<form style="flex-grow: 1;">
										<div class="form-group" style="margin-bottom: 10px;">
                    <textarea rows="4"
															class="form-control"
															placeholder="Your Comments"
															style="width: 100%;"
															v-model="postComment"></textarea>
										</div>
										<button class="submit-btn" type="button"
														style="height: 30px; padding: 0;"
														@click="postCommentInVideo(postComment)">Submit</button>
									</form>
								</div>
							</div>
							<!-- Post comment -->
							<!-- List comment -->
							<ul style="max-width: 100%; display: flex; flex-direction: column-reverse;">
								<li style="margin: 10px 0; width: 100%;"
										v-for="(commentParent, index) in comments" :key="index"
										v-show="commentParent.parentId == null">
									<div class="instructor-wrap hoverComment"
											style="border: none; margin: 0 0 10px 0; width: 100%; display: flex; align-items: flex-start; justify-content: start; flex-wrap: nowrap;">
										<div class="abt-instructor-img" style="flex: 0 0 50px;">
											<router-link to="/instructor/instructor-profile">
												<img src="@/assets/img/user/user1.jpg"
														alt="img"
														class="img-fluid"/>
											</router-link>
										</div>
										<div style="margin: 0; display: flex; justify-content: space-between; flex-wrap: nowrap; flex-grow: 1;">
											<div class="instructor-detail" style="width: 100%;">
												<h5>
													<router-link to="/instructor/instructor-profile">{{ commentParent.fullName }}</router-link>
												</h5>
												<p style="font-size: 16px; margin: 5px 0 0 0; white-space: normal; overflow-wrap: break-word; word-break: break-word;"
														v-if="!viewEditComment[commentParent.id]">
													{{ commentParent.commentText }}
												</p>
												<!-- Edit comment -->
												<div class="comment-sec" style="display: flex"
														v-if="viewEditComment[commentParent.id]">
													<form style="flex-grow: 1; margin: 10px 0 20px 0;">
														<div class="form-group" style="margin-bottom: 10px;">
                              <textarea rows="4"
																				class="form-control"
																				placeholder="Your Comments"
																				style="width: 100%;"
																				v-model="editCommentText[commentParent.id]"></textarea>
														</div>
														<div style="display: flex; gap: 10px; flex-wrap: wrap;">
															<button class="submit-btn" type="button"
																			style="height: 30px; padding: 0;"
																			@click="putComment(commentParent, editCommentText[commentParent.id], commentParent.idUserComment)">Edit</button>
															<button class="submit-btn" type="button"
																			style="height: 30px; padding: 0; border: none; background-clip: border-box;"
																			@click="viewEditCommentToggle(commentParent.id)">Cancel</button>
														</div>
													</form>
												</div>
												<!-- Edit comment -->

												<!-- Post reply -->
												<a href="javascript:;" style="font-size: 14px;"
														@click="viewPostReplyToggle(commentParent.id)"
														class="rev-info"
														v-if="!viewEditComment[commentParent.id]">
													<i class="feather-corner-up-left"></i>Reply
												</a>
												<div class="comment-sec" style="display: flex"
														v-if="viewPostReply[commentParent.id]">
													<form style="flex-grow: 1; margin: 10px 0 20px 0;">
														<div class="form-group" style="margin-bottom: 10px;">
                              <textarea rows="4"
																				class="form-control"
																				placeholder="Your Comments"
																				style="width: 100%;"
																				v-model="replyText[commentParent.id]"></textarea>
														</div>
														<div style="display: flex; gap: 10px; flex-wrap: wrap;">
															<button class="submit-btn" type="button"
																			style="height: 30px; padding: 0;"
																			@click="postReplyInVideo(replyText[commentParent.id], commentParent.id)">Reply</button>
															<button class="submit-btn" type="button"
																			style="height: 30px; padding: 0; border: none; background-clip: border-box;"
																			@click="viewPostReplyToggle(commentParent.id)">Cancel</button>
														</div>
													</form>
												</div>
												<!-- Post reply -->
											</div>
											<div class="hoverMenu" v-if="commentParent.idUserComment === user.id">
												<a href="javascript:;"
													class="listenComment"
												>
													<svg xmlns="http://www.w3.org/2000/svg"
															width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
														<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
													</svg>
												</a>
												<div class="popupStyle">
													<a href="javascript:;"
														@click="viewEditCommentToggle(commentParent.id, commentParent.commentText)">
														<p>Edit</p>
													</a>
													<a href="javascript:;"
                             @click="deleteComment(commentParent, commentParent.idUserComment)">
														<p>Delete</p>
													</a>
												</div>
											</div>
										</div>
									</div>
									<!-- List reply -->
									<ul style="margin: 15px 0 0 35px;">
										<li style="margin: 10px 0 0 0;"
												v-for="(commentChild, index) in getReplyOfComment(commentParent.id)" :key="index"
												v-show="index < (buttonNumberShowComment[commentParent.id] ? getReplyOfComment(commentParent.id).length : 2)">
											<div class="instructor-wrap hoverReply"
                           style="margin: 0; border: none; width: 100%; display: flex; align-items: flex-start; justify-content: start; flex-wrap: nowrap;">
												<div class="abt-instructor-img" style="flex: 0 0 40px;">
													<router-link to="/instructor/instructor-profile">
														<img src="@/assets/img/user/user1.jpg"
                                 style="width: 40px; height: 40px;"
                                 alt="img"
                                 class="img-fluid"/>
													</router-link>
												</div>
												<div style="margin: 0; display: flex; justify-content: space-between; flex-wrap: nowrap; flex-grow: 1;">
													<div class="instructor-detail" style="width: 100%;">
														<h5>
															<router-link to="/instructor/instructor-profile">{{ commentChild.fullName }}</router-link>
														</h5>
														<p style="color: gray;">@{{ commentChild.nameUserParent }}</p>
														<p style="font-size: 16px; margin: 5px 0 0 0; white-space: normal; overflow-wrap: break-word; word-break: break-word; padding-right: 20px;"
                               v-if="!viewEditComment[commentChild.id]">
															{{ commentChild.commentText }}
														</p>
														<!-- Edit reply -->
														<div class="comment-sec" style="display: flex"
                                 v-if="viewEditComment[commentChild.id]">
															<form style="flex-grow: 1; margin: 10px 0 20px 0;">
																<div class="form-group" style="margin-bottom: 10px;">
                                    <textarea rows="4"
																							class="form-control"
																							placeholder="Your Comments"
																							style="width: 100%;"
																							v-model="editCommentText[commentChild.id]"></textarea>
																</div>
																<div style="display: flex; gap: 10px; flex-wrap: wrap;">
																	<button class="submit-btn" type="button"
																					style="height: 30px; padding: 0;"
																					@click="putComment(commentChild, editCommentText[commentChild.id], commentChild.idUserComment)">Edit</button>
																	<button class="submit-btn" type="button"
																					style="height: 30px; padding: 0; border: none; background-clip: border-box;"
																					@click="viewEditCommentToggle(commentChild.id)">Cancel</button>
																</div>
															</form>
														</div>
														<!-- Edit reply -->
														<!-- Post reply to reply-->
														<a href="javascript:;" style="font-size: 14px;"
                               @click="viewPostReplyToggle(commentChild.id)"
                               class="rev-info"
                               v-if="!viewEditComment[commentChild.id]">
															<i class="feather-corner-up-left"></i>Reply
														</a>
														<div class="comment-sec" style="display: flex"
                                 v-if="viewPostReply[commentChild.id]">
															<form style="flex-grow: 1; margin: 10px 0 20px 0;">
																<div class="form-group" style="margin-bottom: 10px;">
                                    <textarea rows="4"
																							class="form-control"
																							placeholder="Your Comments"
																							style="width: 100%;"
																							v-model="replyText[commentChild.id]"></textarea>
																</div>
																<div style="display: flex; gap: 10px; flex-wrap: wrap;">
																	<button class="submit-btn" type="button"
																					style="height: 30px; padding: 0;"
																					@click="postReplyInVideo(replyText[commentChild.id], commentChild.id)">Reply</button>
																	<button class="submit-btn" type="button"
																					style="height: 30px; padding: 0; border: none; background-clip: border-box;"
																					@click="viewPostReplyToggle(commentChild.id)">Cancel</button>
																</div>
															</form>
														</div>
														<!-- Post reply to reply-->
													</div>
													<div class="hoverMenu" v-if="commentChild.idUserComment === user.id">
														<a href="javascript:;"
                               class="listenReply"
														>
															<svg xmlns="http://www.w3.org/2000/svg"
                                   width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
																<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
															</svg>
														</a>
														<div class="popupStyle">
															<a href="javascript:;"
                                 @click="viewEditCommentToggle(commentChild.id, commentChild.commentText)">
																<p>Edit</p>
															</a>
															<a href="javascript:;"
                                 @click="deleteComment(commentChild, commentChild.idUserComment)">
																<p>Delete</p>
															</a>
														</div>
													</div>
												</div>
											</div>
										</li>
									</ul>
									<div style="display: flex; justify-content: center; margin-top: 10px">
										<a href="javascript:;"
                       @click="buttonNumberShowCommentToggle(commentParent.id)"
                       v-if="getReplyOfComment(commentParent.id).length > 2">
											{{ buttonNumberShowComment[commentParent.id] ? 'Ẩn bớt' : 'Xem thêm'}}
										</a>
									</div>
									<!-- List reply -->
								</li>
							</ul>
							<!-- List comment -->
						</div>
					</div>
					<!-- Video and comment -->
				</div>
			</div>
		</div>
	</section>
	<!-- /Course Lesson -->
</template>
<script>
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref } from "vue";

export default {
	data(){
		const store = useStore();
		const user = ref(store.state.userInfo);
		return {
			user: {
				id: '21375627-9cca-49ea-87cf-17a975631988'
			},
			comment:{},
			comments: [],
			replyText:{},
			editCommentText:{},
			postComment:"",
			courses: {},
			lecture: {},
			viewPostReply:{},
			viewEditComment:{},
			viewSection: {},
			buttonNumberShowComment: {},
			stompClient: {}
		};
	},
	created(){
		this.getCourses(31)
		this.connectSocket()
	},
	methods:{
		connectSocket() {
			this.stompClient = new StompJs.Client({
				webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
				debug: (str) => { console.log("Thông tin gỡ lỗi", str); },
				onConnect: (frame) => {
					console.log("Kết nối socket thành công!", frame);
					this.stompClient.subscribe('/topic/comments', (message) => {
						try {
							const commentData = JSON.parse(message.body);
							console.log("Nhận bình luận:", commentData);

							const index = this.comments.findIndex(comment => comment.id === commentData.id)
							if (index !== -1) {
								// Nếu bình luận đã tồn tại, cập nhật nó
								this.comments[index].commentText = commentData.commentText;
							} else {
								// Nếu bình luận chưa tồn tại, thêm mới
								this.comments.push(commentData);
							}
						} catch (error) {
							console.error("Không thể phân tích JSON:", error);
							console.error("Nội dung nhận được:", message.body);
						}
					});
					this.stompClient.subscribe('/topic/idComment', (idComment) => {
						try {
							const id = JSON.parse(idComment.body);
							console.log("Xóa bình luận có id: ", id);

							const index = this.comments.findIndex(comment => comment.id === id)
							if (index !== -1) {
								// Nếu bình luận đã tồn tại, cập nhật nó
								this.comments.splice(index, 1);
							}
						} catch (error) {
							console.error("Không thể phân tích JSON:", error);
							console.error("Nội dung nhận được:", idComment.body);
						}
					});
				},
				onStompError: (frame) => {
					console.error('Broker reported error: ' + frame.headers['message']);
					console.error('Additional details: ' + frame.body);
				}
			});
			this.stompClient.activate();
		},
		getCourses(courseId) {
			baseApi.get(`/api/v1/courses/course/${courseId}`)
				.then(c => {
					this.courses = c.data
					this.viewLectureUser(this.courses.sections[0].lectures[0].id)
					this.resetForm()
					console.log("Tải lên các chương học thành công", this.courses)
					// console.log("Comment được tải lên: ", this.lecture.videoInlectureResponse.listComment)
				})
				.catch(error => {
					console.log("Tải lên các chương học thất bại", error)
				})
		},
		viewLectureUser(lectureId) {
			baseApi.get(`/lectures/${lectureId}`)
				.then(lecture => {
					this.lecture = lecture.data
					if (this.lecture.videoInlectureResponse != null) {
						this.comments = this.lecture.videoInlectureResponse.listComment
					} else {
						this.comments = []
					}
					console.log("Lecture tải lên: ", this.lecture)
				})
				.catch(error => {
					console.log("Lỗi tải lecture: ", error)
				})
		},
		getReplyOfComment(commentParentId) {
			const replys = [];
			if (this.lecture != null) {
				const getRepliesRecursively = (parentId) => {
					let childComments = this.findCommentChild(parentId)
					childComments.forEach(element => {
						replys.push(element)
						getRepliesRecursively(element.id)
					});
				}
				getRepliesRecursively(commentParentId)
			}
			return replys;
		},
		findCommentChild(parentId) {
			let commentChilds = []
			commentChilds = this.comments.filter(comment => comment.parentId === parentId)
			if (commentChilds.length > 0) {
				return commentChilds
			} else {
				return []
			}
		},
		postCommentInVideo(commentText) {
			if (commentText != '') {
				this.comment.commentText = commentText
				this.comment.videoId = this.lecture.videoInlectureResponse.idVideo
				this.postComment = ''
				if (this.stompClient && this.stompClient.connected) {
					this.stompClient.publish({
						destination: '/app/comments/post',
						body: JSON.stringify(this.comment),
					});
					console.log("Đã gửi bình luận qua WebSocket");
				} else {
					console.error("WebSocket chưa kết nối. Đang đợi kết nối trước khi gửi bình luận.");
				}
			}
		},
		postReplyInVideo(replyText, parentId) {
			if (replyText != '') {
				this.comment.parentId = parentId
				this.comment.commentText = replyText
				this.comment.videoId = this.lecture.videoInlectureResponse.idVideo
				this.replyText[parentId] = ''
				if (this.stompClient && this.stompClient.connected) {
					this.stompClient.publish({
						destination: '/app/comments/post',
						body: JSON.stringify(this.comment),
					});
					this.viewPostReply[parentId] = false;
					this.resetForm();
					console.log("Đã gửi bình luận qua WebSocket");
				} else {
					console.error("WebSocket chưa kết nối. Đang đợi kết nối trước khi gửi bình luận.");
				}
			}
		},
		deleteComment(comment, userComment) {
			if (userComment === this.user.id) {
				if (this.stompClient && this.stompClient.connected) {
					this.stompClient.publish({
						destination: `/app/comments/delete`,
						body: JSON.stringify(comment)
					});
					this.resetForm();
					console.log("Đã xóa bình luận qua WebSocket");
				} else {
					console.error("WebSocket chưa kết nối. Đang đợi kết nối trước khi gửi bình luận.");
				}
			} else {
				console.log("Không phải quyền người dùng")
			}
		},
		putComment(comment, editCommentText, userComment) {
			if (userComment === this.user.id) {
				this.comment.commentText = editCommentText
				this.comment.id = comment.id
				this.comment.parentId = comment.parentId
				if (this.stompClient && this.stompClient.connected) {
					this.stompClient.publish({
						destination: '/app/comments/update',
						body: JSON.stringify(this.comment),
					})
					this.viewEditComment[comment.id] = false;
					this.resetForm();
					console.log("Đã gửi bình luận qua WebSocket");
				} else {
					console.error("WebSocket chưa kết nối. Đang đợi kết nối trước khi gửi bình luận.");
				}
			} else {
				console.log("Không phải quyền người dùng")
			}
		},
		viewPostReplyToggle(commentId) {
			this.viewPostReply[commentId] = !this.viewPostReply[commentId]
			this.viewEditComment[commentId] = false
		},
		viewEditCommentToggle(commentId, textComment) {
			this.viewEditComment[commentId] = !this.viewEditComment[commentId]
			this.editCommentText[commentId] = textComment
			this.viewPostReply[commentId] = false
		},
		viewSectionToggle(sectionId) {
			this.viewSection[sectionId] = !this.viewSection[sectionId]
		},
		buttonNumberShowCommentToggle(commentId) {
			this.buttonNumberShowComment[commentId] = !this.buttonNumberShowComment[commentId]
		},
		resetForm() {
			this.comment = {
				id: null,
				commentText: "",
				userId: this.user.id,
				videoId: null,
				courseId: null,
				parentId: null,
				star: 0
			}
		}
	},
	beforeUnmount() {
		if (this.stompClient) {
			this.stompClient.deactivate();
			console.log("Ngắt kết nối WebSocket.");
		}
	}
}
</script>

<style>
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
	box-shadow: 0 0 1px gray;
	border-radius: 10px;
	padding: 5px 0;
	display: none;
}

.popupStyle a > p {
	margin: 0;
	padding: 5px 20px;
}

.hoverMenu:hover > .popupStyle {
	display: block;
}
</style>
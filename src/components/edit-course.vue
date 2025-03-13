<template>
    <div class="modal fade" id="dialogEditCourse" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="dialogEditCourseLabel" aria-hidden="true">
        <div class="modal-dialog custom-modal modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="title-purple" id="dialogEditCourseLabel">Edit course</h3>
                </div>
                <div class="modal-body row">
                    <div class="col-4">
                        <ul class="list">
                            <li class="item-callapse item-callapse-pink" 
                                v-for="(section, index) in sections" :key="index">
                                <button class="btn item-pink" @click="collapseSectionf(section.id)">{{ section.title }}</button>
                                <ul class="list" v-if="collapseSection[section.id]">
                                    <li class="item"
                                        v-for="(lecture, index) in section.lectures" :key="index">{{ lecture.title }}</li>
                                    <li class="item">+ New lecture</li>
                                </ul>
                            </li>
                            <li class="item-callapse item-callapse-pink"><button class="btn item-pink">+ New section</button></li>
                        </ul>
                    </div>
                    <div class="col-8">
                        <form action="">
                            <div>
                                <label class="form-control-label">Title lecture</label>
                                <input type="text" class="form-control input-pink">
                            </div>
                            <div>
                                <label class="form-control-label">Video url</label>
                                <input type="file" class="form-control input-pink">
                            </div>
                            <div style="min-height: 300px; width: 100%; background-color: #f1f1f1;">
                                <video 
                                    controls
                                    width="100%"
                                    src="">
                                </video>
                            </div>
                            <div>
                                <button type="button" class="btn btn-pink">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-pink" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-pink">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            sections: {
                type: Array,
                default: () => []
            }
        },
        data(){
            return {
                collapseSection: {}
            }
        },
        methods: {
            collapseSectionf(idSection){
            this.collapseSection[idSection] = !this.collapseSection[idSection]
            }
        }
    }
</script>
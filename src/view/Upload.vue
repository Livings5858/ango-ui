<script setup>
import request from '@/utils/request'
</script>

<template>
    <div>
        <span v-if="selectFile">
            <el-image style="width: 200px; height: 200px" :src="imgurl" :fit="fit"/>
        </span>
        <div>
            <input type="file" @change="fileSelect($event)" />
            <button @click="fileSubmit">上传</button>
        </div>
            <!-- 通过v-if判断是显示进度条还是成功或失败提示 -->
        <div class="progress-wrap" v-if="status === 'uploading'">            
            <p>上传进度</p>
            <p class="progress"><span :style="style"></span></p>
        </div>
        <div v-else-if="status === 'success'">上传成功</div>
        <div v-else-if="status === 'fail'">上传失败</div>
    </div>
</template>

<script>
export default {
    name: 'Upload',
    data() {
        return {
            file: {}, //上传的文件对象
            progressBar: 0, // 记录上传进度的变量
            status: 'idle', // 当前状态
            imgurl: '',
            fit: 'cover',
            selectFile: false
        }
    },
    computed: {
        style() { // 进度条样式
            return {
                width: this.progressBar + "%"
            }
        }
    },
    methods: {
        fileSelect(e) {
            this.file = e.target.files[0]
            this.imgurl = window.URL.createObjectURL(this.file)
            this.selectFile = true
        },
        async fileSubmit() {
            const formData = new FormData();
            formData.append('file', this.file);
            this.status = 'uploading'
            await request.post('/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.progressBar = percentCompleted
                }
            }).then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    // 上传成功
                    this.status = 'success'
                } else {
                    // 上传失败
                    this.status = 'fail'
                }
            })
        }
    }
}
</script>

<style>
.progress-wrap {
    width: 300px;
}

.progress-wrap p {
    width: 100%;
}

.progress {
    background-color: #c5c8ce;
    height: 20px;
}

.progress span {
    display: block;
    background-color: #19be6b;
    height: 100%;
    width: 0;
}</style>

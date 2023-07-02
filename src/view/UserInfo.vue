<script setup>
import Upload from '@/view/Upload.vue'
import '../assets/main.css'
</script>

<template>
    <!-- 登陆成功，用户信息展示 -->
    <header>
        <div class="userinfo">
            <div class="userinfo_content">
                <h1>欢迎来到用户信息页面</h1>
                <h2>这是一个基于Vue.js + Node.js + Mysql的全栈项目</h2>
                <h3>用户信息</h3>
                <h2 class="usershow">用户名：{{ username }}</h2>
            </div>
        </div>
    </header>

    <main>
        <el-link type="primary" style="font-size: large" href="rmbg">数字签名制作</el-link>
        <div class="upload">
            <Upload />
        </div>
    </main>
</template>

<script>
import request from '@/utils/request'
export default {
    name: 'UserInfo',
    data() {
        return {
            username: ''
        }
    },
    methods: {
        getUserInfo() {
            // 获取用户信息
            request.get('/userinfo').then(res => {
                console.log(res)
                if (res.status === 200) {
                    // 获取用户信息成功
                    this.username = res.data.username
                } else {
                    alert(res.data.message)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.getUserInfo()
    }
}

</script>

<style scoped>
.userinfo {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
}

.upload {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
}

.usershow {
    color: #1c992d;
}

</style>
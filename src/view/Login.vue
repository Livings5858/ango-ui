<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import request from '@/utils/request'
import '../assets/main.css'
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
        <div class="wrapper">
            <HelloWorld msg="Hello Ango!" />
        </div>
    </header>
    <main>
        <div v-if="is_message_on" :class="is_err ? 'err_msg' : 'success_msg'">
            <p>{{ message }}</p>
        </div>
        <div class="container">
            <h2 style="margin-bottom: 30px; text-align: center;">
                LOGIN ANGO
            </h2>
            <!-- 登陆界面 -->
            <div>
                <form @submit.prevent="login">
                    <input type="text" id="username" class="text_input" v-model="username" placeholder="用户名">
                    <input type="password" id="password" class="text_input" v-model="password" placeholder="密码">
                    <input type="submit" class="login_button" value="登陆">
                </form>
            </div>
        </div>
    </main>
</template>


<script>

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            message: '',
            is_message_on: false,
            is_err: false
        }
    },
    methods: {
        login() {
            console.log(this.username, this.password)
            // 使用axios发送post请求
            request.post('/login', {
                username: this.username,
                password: this.password
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.is_message_on = false
                    // 登陆成功，跳转到首页
                    console.log('登录成功：' + res.data.token)
                    // 获取token，保存到本地，拼接到请求头中
                    localStorage.setItem('token', res.data.token)
                    // 跳转到首页
                    this.$router.push('/userinfo')
                } else {
                    alert(res.data.message)
                }
            }).catch(err => {
                alert('登录失败')
                console.log(err)
                this.password = ''
                this.message = err
                this.is_message_on = true
                this.is_err = true
            })
        }
    }
}

</script>

<style scoped>
.text_input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.login_button {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login_button:hover {
    background-color: #45a049;
}

.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    width: 350px;
    margin: 0 auto;
}

.err_msg {
    color: red;
    text-align: center;
    margin-bottom: 20px;
}

.success_msg {
    color: green;
    text-align: center;
    margin-bottom: 20px;
}

header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
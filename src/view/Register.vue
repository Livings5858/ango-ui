<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import request from '@/utils/request'
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
        <div class="wrapper">
            <HelloWorld msg="Hello Ango!" />
        </div>
    </header>
    <main>
        <div class="err_msg">
            <p v-if="is_register_err">{{err_message}}</p>
        </div>
        <div class="container">
            <h2 style="margin-bottom: 30px; text-align: center;">
                REGISTER ANGO
            </h2>
            <!-- 登陆界面 -->
            <div>
                <form @submit.prevent="register">
                    <input type="text" id="username" class="text_input" v-model="username" placeholder="用户名">
                    <input type="password" id="password" class="text_input" v-model="password" placeholder="密码">
                    <input type="submit" class="register_button" value="注册">
                </form>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            err_message: '',
            is_register_err: false
        }
    },
    methods: {
        register() {
            console.log(this.username, this.password)
            // 使用axios发送post请求
            request.post('/register', {
                username: this.username,
                password: this.password
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.is_register_err = false
                    // 跳转到登录
                    console.log('注册成功')
                    this.$router.push('/login')
                    alert('注册成功,请登录')
                } else {
                    alert(res.data.message)
                }
            }).catch(err => {
                console.log(err)
                this.is_register_err = true
                this.err_message = err
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

.register_button {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register_button:hover {
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
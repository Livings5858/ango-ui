<script setup>
import '../assets/main.css'
</script>

<template>
    <!-- home 页面 -->
    <div class="home">
        <main>
            <div class="home_content">
                <h1>欢迎来到首页</h1>
                <h2>这是一个基于Vue.js + Node.js + Mysql的全栈项目</h2>
                <h3>
                    <router-link to="/login">登录</router-link>或
                    <router-link to="/register">注册</router-link>
                </h3>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>
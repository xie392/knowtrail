<script setup lang="ts"></script>

<template>
    <section class="mob:px-5">
        <div class="flex min-h-[calc(100vh-56px)] items-center gap-10 mob:flex-col mob:text-center">
            <div class="flex-1 pl-10 mob:pl-0">
                <h1
                    class="mb-5 text-3xl font-bold mob:text-2xl animate__animated animate__fadeInUp"
                >
                    快来构建自己的知识体系吧！
                </h1>
                <p class="mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                    在这里，您可以记录下自己的点滴思考、知识积累，也可以与他人分享交流。让我们一起，将那些零散的知识点点滴滴地汇聚，构建成属于我们自己的知识之书，探寻知识的奥秘，掌握智慧的脉络！
                </p>
                <div class="animate__animated animate__fadeInUp animate__delay-2s">
                    <router-link to="/workspace">
                        <t-button>开始使用</t-button>
                    </router-link>
                </div>
            </div>
            <div class="w-1/2 text-center mob:hidden">
                <figure class="flex-1">
                    <img
                        alt="Image placeholder"
                        src="@/assets/images/svg/illustrations/illustration-3.svg"
                        class="w-[80%] mob:w-full"
                    />
                </figure>
            </div>
        </div>
    </section>
</template>

<template>
    <header class="w-full grid-container py-4 relative">
        <div class="flex items-center justify-between gap-6">
            <NuxtLink to="/">
                <img src="/images/header/logo.png" alt="" class="w-16">
            </NuxtLink>
            <nav class="flex items-center gap-6 p-2 lg:px-6 rounded-2xl lg:rounded-full bg-gray-100 max-lg:absolute max-lg:left-0 max-lg:bg-white max-lg:py-6 max-lg:flex-col max-lg:w-full z-[4] duration-500 transition-all":class="isMenuShow ? 'max-lg:top-[calc(100%+20px)]' : 'max-lg:top-0 max-lg:-translate-y-full'">
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">Главная</NuxtLink>
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">Преподаватели</NuxtLink>
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">О нас</NuxtLink>
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">Контакты</NuxtLink>
                <div class="flex items-center gap-4">
                    <NuxtLink>
                        <Icon class="text-3xl text-[#673ab7]/70" name="material-symbols:shopping-cart-rounded"/>
                    </NuxtLink>
                    <NuxtLink>
                        <Icon class="text-3xl text-[#673ab7]/70" name="material-symbols:person"/>
                    </NuxtLink>
                </div>
            </nav>
            <button @click="isMenuShow = !isMenuShow" class="lg:hidden">
                <Icon class="text-3xl" name="ic:round-menu"/>
            </button>
        </div>
        <div class="w-full col-span-full absolute left-0 bottom-0 h-[2px] animate-text"></div>
        <div class="inset-0 bg-black/30 fixed lg:hidden max-lg:top-24 max-lg:left-0 z-[3]" :class="{'hidden' : !isMenuShow}"></div>
        <button type="button" @click="messageTitle = null" class="fixed top-10 right-10 z-[11] cursor-pointer flex items-center gap-4 px-6 py-2 rounded-2xl w-fit bg-white shadow-[0px_0px_13px_-7px_black]" :class="messageType ? ' text-[#673ab7]/70' : 'text-red-500'" v-if="messageTitle">
            <span>{{messageTitle}}</span>
        </button>
    </header>
</template>

<script setup>
    /* создание меню */
    const isMenuShow = ref(false)


    /* хук */
    const nuxtApp = useNuxtApp()
    nuxtApp.hook('page:start', () => {
        isMenuShow.value = false
    })


    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())
</script>
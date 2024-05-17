<template>
    <div class="flex items-center max-lg:flex-col gap-8">
       <div class="flex flex-col gap-6 lg:w-1/2">
            <p class="text-3xl font-Pacifico text-transparent !bg-clip-text animate-text">Влюбляйся в танец и в себя</p>
            <p class="opacity-70">Присоединяйтесь к нам, чтобы открыть для себя увлекательный мир танцев! Наш агрегатор предлагает широкий спектр курсов для всех возрастов и уровней подготовки. Независимо от того, вы начинающий или опытный танцор, у нас найдется что-то интересное для вас.</p>
            <CustomLink :title="'Присоединиться'" :link="authenticated ? '/reg' : '/teachers'"></CustomLink>
        </div>
        <img src="/images/hero/bg.jpg" alt="" class="lg:w-1/2 rounded-xl">
    </div>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:control-point-duplicate-rounded"/>
            <p>Преимущества</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="flex flex-col rounded-xl border border-[#f48fb1]/70 gap-4 p-4 transition-all duration-500 hover:shadow-[0px_0px_13px_-7px_black]">
                <div class="flex items-center gap-4">
                    <p class="text-xl tracking-wider">Разнообразие стилей</p>
                    <Icon class="text-2xl" name="material-symbols:diversity-2"/>
                </div>
                <p class="text-lg opacity-70">От сальсы до хип-хопа, от бальных танцев до современных танцевальных трендов, у нас есть что-то для каждого!</p>
            </div>
            <div class="flex flex-col rounded-xl border border-[#f48fb1]/70 gap-4 p-4 transition-all duration-500 hover:shadow-[0px_0px_13px_-7px_black]">
                <div class="flex items-center gap-4">
                    <p class="text-xl tracking-wider">Профессиональные инструкторы</p>
                    <Icon class="text-2xl" name="mdi:dance-ballroom"/>
                </div>
                <p class="text-lg opacity-70">Наши инструкторы - это настоящие профессионалы своего дела, готовые поделиться своими знаниями и опытом с вами.</p>
            </div>
            <div class="flex flex-col rounded-xl border border-[#f48fb1]/70 gap-4 p-4 transition-all duration-500 hover:shadow-[0px_0px_13px_-7px_black]">
                <div class="flex items-center gap-4">
                    <p class="text-xl tracking-wider">Подходит для всех</p>
                    <Icon class="text-2xl" name="icon-park-outline:every-user"/>
                </div>
                <p class="text-lg opacity-70">Независимо от вашего возраста, физической подготовки или опыта в танцах, у нас есть уроки, которые подходят именно вам.</p>
            </div>
        </div>
    </div>
    <JoinDance></JoinDance>
    <div class="flex flex-col gap-6">
        <div class="flex max-md:flex-col md:items-center md:justify-between gap-4">
            <div class="flex items-center gap-4 text-3xl font-Pacifico">
                <Icon class="text-3xl text-[#f48fb1]/70" name="ph:chalkboard-teacher"/>
                <p>Преподаватели</p>
            </div>
            <CustomLink :title="'Подробнее'" :link="'/teachers'"></CustomLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
            <NuxtLink :to="`/teachers/teacher-${teacher.id}`" class="relative rounded-xl overflow-hidden group" v-for="teacher in data">
                <img :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${teacher.avatar}`" alt="" class="aspect-[7/10] object-cover transition-all duration-500 group-hover:scale-110">
                <div class="flex flex-col absolute bottom-4 left-0 w-full px-4 text-white z-[2]">
                    <p class="text-sm">{{ teacher.styles.join(", ") }}</p>
                    <p class="text-lg">{{ teacher.name }} - {{ teacher.nickname }}</p>
                </div>
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[1]"></div>
            </NuxtLink>
        </div>
    </div>
    <FAQ></FAQ>
    <Gallery></Gallery>
    <Feedback></Feedback>
</template>

<script setup>
    /* проверка входа */
    const { authenticated } = storeToRefs(useUserStore())


    /* подключение БД */
    const supabase = useSupabaseClient() 

    const { data, error } = await supabase
    .from('users')
    .select('*')   
    .eq('role', 'Педагог')  
</script>
<template>
    <div class="flex items-center max-lg:flex-col gap-8">
       <div class="flex flex-col gap-6 lg:w-1/2">
            <p class="text-3xl font-Pacifico text-transparent !bg-clip-text animate-text">Влюбляйся в танец и в себя</p>
            <p class="opacity-70">Присоединяйтесь к нам, чтобы открыть для себя увлекательный мир танцев! Наш агрегатор предлагает широкий спектр курсов для всех возрастов и уровней подготовки. Независимо от того, вы начинающий или опытный танцор, у нас найдется что-то интересное для вас.</p>
            <CustomLink :title="'Присоединиться'" :link="'/'"></CustomLink>
        </div>
        <img src="/images/hero/bg.jpg" alt="" class="lg:w-1/2 rounded-xl">
    </div>
    <JoinDance></JoinDance>
    <div class="flex flex-col gap-6">
        <div class="flex max-md:flex-col md:items-center md:justify-between gap-4">
            <div class="flex items-center gap-4 text-3xl font-Pacifico">
                <Icon class="text-3xl text-[#673ab7]/70" name="ph:chalkboard-teacher"/>
                <p>Преподаватели</p>
            </div>
            <CustomLink :title="'Подробнее'" :link="'/'"></CustomLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
            <NuxtLink class="relative rounded-xl overflow-hidden group" v-for="n in 6">
                <img src="https://godance.tv/sites/default/files/imagecache/preview/teachers/666/about/IMG_4558.jpeg" alt="" class="aspect-[7/10] object-cover transition-all duration-500 group-hover:scale-110">
                <div class="flex flex-col absolute bottom-4 left-0 w-full px-4 text-white z-[2]">
                    <p class="text-sm">Choreo, Frame up strip, High-Heels, Hip-Hop</p>
                    <p class="text-lg">Алина</p>
                </div>
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[1]"></div>
            </NuxtLink>
        </div>
    </div>
    <FAQ></FAQ>
</template>

<script setup>

</script>
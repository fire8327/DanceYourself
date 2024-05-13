<template>
    <NuxtLink :to="link" class="flex items-center gap-4 w-fit rounded-full relative p-2 group">
        <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-lg z-10 text-white"/>
        <span class="uppercase text-sm tracking-widest z-10 transition-colors duration-500 group-hover:text-white">{{ props.title }}</span>
        <span class="absolute rounded-full bg-[#131313] h-full w-9 z-0 left-0 top-0 transition-all duration-500 group-hover:w-full"></span>
    </NuxtLink>
</template>

<script setup>
    /* пропсы для подгрузки данных */
    const props = defineProps({
        link: String,
        title: String
    }) 
</script>
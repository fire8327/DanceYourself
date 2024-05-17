<template>
    <div class="col-span-full w-full py-8 md:py-10 lg:py-12 bg-[#673ab7]/70 flex flex-col items-center text-center gap-8 h-fit text-white">
        <p class="text-3xl uppercase">Начать делать что-то <br><span class="font-Pacifico">крутое</span> вместе</p>
        <NuxtLink :to="authenticated ? '/teachers' : '/reg'" class="flex items-center gap-4 w-fit rounded-full relative p-2 group">
            <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-lg z-[2]"/>
            <span class="uppercase text-sm tracking-widest z-[2]">Приступить к обучению</span>
            <span class="absolute rounded-full bg-[#131313] h-full w-9 z-0 left-0 top-0 transition-all duration-500 group-hover:w-full"></span>
        </NuxtLink>
    </div>
</template>

<script setup>
    /* проверка входа */
    const { authenticated } = storeToRefs(useUserStore())
</script>
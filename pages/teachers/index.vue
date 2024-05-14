<template>
     <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-4 text-3xl font-Pacifico">
                <Icon class="text-3xl text-[#f48fb1]/70" name="ph:chalkboard-teacher"/>
                <p>Преподаватели</p>
            </div>
            <p class="opacity-70">Выбери своего преподавателя танцев и приступай к тренеровкам вместе с ним.</p>
        </div>
    </div>
    <FormKit type="form" :actions="false" messages-class="hidden"  form-class="flex justify-between max-lg:flex-col max-lg:items-center gap-6 w-full">
        <div class="flex gap-6 max-lg:flex-col w-full lg:w-1/2">
            <FormKit type="text" messages-class="text-[#E9556D] font-Pacifico" name="Никнейм" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Никнейм"/>
            <FormKit type="select" :options="['Все', 'Стиль 1', 'Стиль 2']" messages-class="text-[#E9556D] font-Pacifico" name="Стиль танца" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Стиль танца"/>
        </div>
        <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Применить</button>
    </FormKit>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <NuxtLink class="relative rounded-xl overflow-hidden group" v-for="n in 4">
            <img src="https://godance.tv/sites/default/files/imagecache/preview/teachers/666/about/IMG_4558.jpeg" alt="" class="aspect-[7/10] object-cover transition-all duration-500 group-hover:scale-110">
            <div class="flex flex-col absolute bottom-4 left-0 w-full px-4 text-white z-[2]">
                <p class="text-sm">Choreo, Frame up strip, High-Heels, Hip-Hop</p>
                <p class="text-lg">Алина</p>
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[1]"></div>
        </NuxtLink>
    </div>
    <Feedback></Feedback>
</template>

<script setup>

</script>
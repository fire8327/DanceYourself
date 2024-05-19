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
    <FormKit @submit="filterProducts" type="form" :actions="false" messages-class="hidden"  form-class="flex justify-between max-lg:flex-col max-lg:items-center gap-6 w-full">
        <div class="flex gap-6 max-lg:flex-col w-full lg:w-1/2">
            <FormKit v-model="filters.nickname" type="text" messages-class="text-[#E9556D] font-Pacifico" name="Никнейм" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Никнейм"/>
            <FormKit v-model="filters.style" type="select" :options="inputStyles" messages-class="text-[#E9556D] font-Pacifico" name="Стиль танца" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Стиль танца"/>
        </div>
        <div class="flex items-center gap-2 max-md:flex-col max-md:w-full">
            <button type="submit" class="w-full md:w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Применить</button>
            <button type="button" @click="cancelFilters" class="w-full md:w-[160px] text-center py-0.5 px-4 rounded-full hover:bg-[#673ab7]/70 border border-[#673ab7]/70 hover:text-white transition-all duration-500 text-[#673ab7]/70 bg-transparent">Отменить</button>
        </div>
    </FormKit>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <NuxtLink :to="`teachers/teacher-${teacher.id}`" class="relative rounded-xl overflow-hidden group" v-for="teacher in teachers">
            <img :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${teacher.avatar}`" alt="" class="aspect-[7/10] object-cover transition-all duration-500 group-hover:scale-110">
            <div class="flex flex-col absolute bottom-4 left-0 w-full px-4 text-white z-[2]">
                <p class="text-sm">{{ teacher.styles.join(', ') }}</p>
                <p class="text-lg">{{ teacher.name }} - {{ teacher.nickname }}</p>
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[1]"></div>
        </NuxtLink>
    </div>
    <Feedback></Feedback>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Педагоги',
        lang: 'ru'
    })


    /* подключение БД */
    const supabase = useSupabaseClient() 

    const { data, error } = await supabase
    .from('users')
    .select('*')   
    .eq('role', 'Педагог')  


    /* создание фильтров */
    const teachers = ref(data)
    const inputStyles = ref(["Все"])
    teachers.value.flatMap(teacher => teacher.styles).forEach(style => {
        if(!inputStyles.value.includes(style)) {
            inputStyles.value.push(style)
        }
    }) 

    const filters = ref({
        style: "Все",
        nickname: ""
    })

    const filterProducts = () => {
        teachers.value = data
        const filter = teachers.value.filter(el => {
            if ((filters.value.style != 'Все' && !el.styles.includes(filters.value.style)) ||
                (filters.value.nickname && !el.nickname.toLowerCase().includes(filters.value.nickname.toLowerCase()))) {
                return false
            }
            return true
        })     
        teachers.value = filter
    }  

    const cancelFilters = () => {
        teachers.value = data
        filters.value.nickname = ""
        filters.value.style = "Все"
    }
</script>
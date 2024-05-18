<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="ph:chalkboard-teacher"/>
            <p>{{ users[0].surname }} {{ users[0].name }}</p>
        </div>
        <div class="flex max-lg:flex-col gap-6">
            <img :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${users[0].avatar}`" alt="" class="rounded-xl lg:w-1/2 object-cover">
            <div class="flex flex-col gap-6 lg:w-1/2">
                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[#f48fb1]/70 font-Pacifico">Танцевальные стили</p>
                    <p class="text-xl">{{ users[0].styles.join(", ") }}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[#f48fb1]/70 font-Pacifico">Преподаватель о себе</p>
                    <p v-html="users[0].desc" class="text-xl"></p>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[#f48fb1]/70 font-Pacifico">Контакты</p>
                    <NuxtLink :to="`https://t.me/${users[0].nickname}`" target="_blank" class="flex items-center gap-2 transition-all duration-500 hover:opacity-60">
                        <Icon class="text-3xl" name="logos:telegram"/>
                        <span>{{ users[0].nickname }}</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:smart-display"/>
            <p>Видеоуроки преподавателя</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div class="flex flex-col gap-4" v-for="lesson in lessons">
                <div class="flex items-center justify-center rounded-xl bg-black overflow-hidden">
                    <video :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${lesson.preview}`" controls class="w-full aspect-video"></video>
                </div>
                <NuxtLink :to="`/teachers/teacher-${route.params.id}/lesson-${lesson.id}`" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Подробнее</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    /* подключение БД и проверка педагога */
    const supabase = useSupabaseClient() 
    const route = useRoute()

    const { data:users, error } = await supabase
    .from('users')
    .select('*')   
    .eq('id', route.params.id)  


    /* уроки */
    const { data:lessons, error:lessonsError } = await supabase
    .from('lessons')
    .select('*')   
    .eq('teacherId', route.params.id)  
</script>
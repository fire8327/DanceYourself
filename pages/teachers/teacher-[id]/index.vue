<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="ph:chalkboard-teacher"/>
            <p>{{ users[0].surname }} {{ users[0].name }}</p>
        </div>
        <div class="flex max-lg:flex-col gap-6">
            <img :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${users[0].avatar}`" alt="" class="rounded-xl lg:w-1/2 object-cover">
            <div class="flex flex-col gap-6 lg:w-1/2">
                <div class="flex flex-col">
                    <p class="text-2xl text-[#f48fb1]/70 font-Pacifico">Танцевальные стили</p>
                    <p class="text-lg">{{ users[0].styles.join(", ") }}</p>
                </div>
                <div class="flex flex-col">
                    <p class="text-2xl text-[#f48fb1]/70 font-Pacifico">Преподаватель о себе</p>
                    <p v-html="users[0].desc" class="text-lg"></p>
                </div>
                <div class="flex flex-col">
                    <p class="text-2xl text-[#f48fb1]/70 font-Pacifico">Контакты</p>
                    <NuxtLink :to="`https://t.me/${users[0].nickname}`" class="flex items-center gap-2 transition-all duration-500 hover:opacity-60">
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
            <div class="flex flex-col gap-4 items-center border border-gray-100 p-4 rounded-xl shadow-[0px_0px_13px_-7px_black]" v-for="lesson in lessons">
                <video :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${lesson.preview}`" controls class="w-full aspect-video object-cover rounded-xl"></video>
                <NuxtLink class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Подробнее</NuxtLink>
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
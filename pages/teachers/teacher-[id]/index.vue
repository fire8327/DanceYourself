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
</script>
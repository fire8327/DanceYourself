<template>
    <div class="flex flex-col gap-6">
        <video :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${lessons[0].preview}`" controls class="w-full aspect-video object-cover rounded-xl"></video>
        <div class="flex max-lg:flex-col gap-6">
            <div class="flex flex-col gap-4 border border-gray-100 p-4 rounded-xl shadow-[0px_0px_13px_-7px_black] text-xl lg:w-1/2">
                <div class="flex flex-col gap-2">
                    <p class="text-2xl font-Pacifico">Об уроке</p>
                    <p class="mt-2">{{ lessons[0].title }}</p>
                    <p v-html="lessons[0].desc"></p>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-2xl font-Pacifico">Стили</p>
                    <p>{{ lessons[0].style }}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-2xl font-Pacifico">Цена</p>
                    <p>{{ lessons[0].price.toLocaleString() }}₽</p>
                </div>
                <button @click="addCart" v-if="authenticated && role == 'Ученик'" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">В корзину</button>
            </div>
            <div class="flex flex-col gap-4 border border-gray-100 p-4 rounded-xl shadow-[0px_0px_13px_-7px_black] text-xl lg:w-1/2">
                <p class="text-2xl font-Pacifico">О преподавателе</p>
                <NuxtLink :to="`/teachers/teacher-${lessons[0].users.id}`" class="flex items-center gap-2 transition-all duration-500 hover:opacity-60">
                    <img :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${lessons[0].users.avatar}`" alt="" class="rounded-full w-14 h-14">
                    <span>{{ lessons[0].users.surname }} {{ lessons[0].users.name }}</span>
                </NuxtLink>
                <NuxtLink :to="`https://t.me/${lessons[0].users.nickname}`" target="_blank" class="flex items-center gap-2 transition-all duration-500 hover:opacity-60">
                    <Icon class="text-4xl" name="logos:telegram"/>
                    <span>{{ lessons[0].users.nickname }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    /* подключение БД и проверка урока */
    const supabase = useSupabaseClient() 
    const route = useRoute()

    const { data:lessons, error } = await supabase
    .from('lessons')
    .select('*, users (*)')   
    .eq('id', route.params.id)  


    /* проверка входа */
    const { authenticated, role, id } = storeToRefs(useUserStore())


    /* создание сообщений */
    const showMessage = useMessagesStore().showMessage


    /* добавление в корзину */
    const addCart = async () => {
        const { data: carts } = await supabase
        .from('cart')
        .select(`*`)
        .eq('status', 'В корзине')
        .eq('userId', `${id.value}`)
        .eq('lessonId', `${route.params.id}`)

        if(carts && carts.length>0) {
            await supabase
            .from('cart')
            .update({ count: `${Number(carts[0].count)+1}` })
            .eq('status', 'В корзине')
            .eq('userId', `${id.value}`)
            .eq('lessonId', `${route.params.id}`)
            .select()      
        
            showMessage("Количество обновлено!", true)   
        } else {            
            const { data, error } = await supabase
            .from('cart')
            .insert([
                { userId: `${id.value}`, lessonId: `${route.params.id}`, status: 'В корзине', count: 1 },
            ])
            .select()       
            
            if(error) {
                showMessage("Произошла ошибка!", false)   
            } else {
                showMessage("Добавлено в корзину!", true)   
            }            
        }
    }
</script>
<template>
    <div class="flex flex-col gap-6">
        <div class="flex lg:items-center lg:justify-between max-lg:flex-col gap-4">
            <div class="flex items-center gap-4 text-3xl font-Pacifico">
                <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:edit-outline"/>
                <p>Редактирование урока</p>
            </div>
            <NuxtLink to="/profile" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Назад</NuxtLink>
        </div>
        <FormKit @submit="updLesson" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 items-center justify-center">               
            <FormKit type="text" v-model="lessonForm.title" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Название урока" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Название урока"/>
            <FormKit type="textarea" v-model="lessonForm.desc" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Описание урока" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Описание урока"/>
            <FormKit type="text" v-model="lessonForm.price" validation="required|number" messages-class="text-[#E9556D] font-Pacifico" name="Цена" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Цена"/>
            <FormKit type="text" v-model="lessonForm.style" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Стили танца" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Стили танца"/>
            <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Обновить</button>
        </FormKit>
    </div>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Редактирование урока',
        lang: 'ru'
    })


    /* подключение БД и проверка урока */
    const supabase = useSupabaseClient() 
    const route = useRoute()

    const { data:lessons, error } = await supabase
    .from('lessons')
    .select('*')   
    .eq('id', route.params.id)  


    /* создание формы */
    const lessonForm = ref({
        title: lessons[0].title,
        desc: lessons[0].desc.replace(/<br>/g, '\n'),
        price: lessons[0].price,
        style: lessons[0].style
    }) 


    /* создание сообщений и роутера */
    const showMessage = useMessagesStore().showMessage
    const router = useRouter()


    /* обновление урока */
    const updLesson = async () => {
        const { data, error } = await supabase
        .from('lessons')
        .update({
            title: lessonForm.value.title,
            desc: lessonForm.value.desc.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            price: lessonForm.value.price,
            style: lessonForm.value.style
        })
        .eq('id', route.params.id)
           
        if(error) {
            console.log(error)
            showMessage("Произошла ошибка!", false)   
        } else {            
            showMessage("Урок обновлен!", true)   
            router.push("/profile")
        }
    }
</script>
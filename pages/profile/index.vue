<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:contacts-rounded"/>
            <p>Контактные данные</p>
        </div>
        <FormKit @submit="updateUser" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 items-center justify-center">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col md:w-2/3 lg:w-1/2">
                <FormKit type="text" v-model="user.name" validation="required" messages-class="text-[#E9556D] font-Comfortaa" name="Фамилия" outer-class="w-full lg:w-1/3" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Фамилия"/>
                <FormKit type="text" v-model="user.surname" validation="required" messages-class="text-[#E9556D] font-Comfortaa" name="Имя" outer-class="w-full lg:w-1/3" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Имя"/>
                <FormKit type="text" v-model="user.patronymic" validation="required" messages-class="text-[#E9556D] font-Comfortaa" name="Отчество" outer-class="w-full lg:w-1/3" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Отчество"/>
            </div>
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col md:w-2/3 lg:w-1/2">
                <FormKit type="text" v-model="user.login" validation="required" messages-class="text-[#E9556D] font-Comfortaa" name="Логин" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Логин"/>
                <FormKit type="text" v-model="user.password" validation="required|length:6" messages-class="text-[#E9556D] font-Comfortaa" name="Пароль" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="••••••"/>
            </div>
            <div class="relative rounded-xl border border-[#673ab7]/70 overflow-hidden w-full md:w-2/3 lg:w-1/2 group">
                <img :src="formAvatar" alt="" class="w-full transition-all duration-500 group-hover:scale-125">
                <label class="cursor-pointer absolute inset-0 bg-black/30 opacity-0 transition-all duration-500 group-hover:opacity-100 flex items-center justify-center">
                    <Icon class="text-3xl text-white" name="material-symbols:edit-rounded"/>
                    <FormKit @change="loadImage" type="file" accept=".png,.jpg,.jpeg,.svg,.webp,.bmp" outer-class="hidden"/>
                </label>
            </div>  
            <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Обновить</button>
        </FormKit>
    </div>
    <div class="flex flex-col gap-6" v-if="user.role == 'Педагог'">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:contacts-rounded"/>
            <p>Оформление профиля педагога</p>
        </div>
        <FormKit @submit="updateProfile" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 items-center justify-center">               
            <FormKit type="text" v-model="teacher.nickname" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Никнейм" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Никнейм"/>
            <FormKit type="textarea" v-model="teacher.desc" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Описание" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full h-[200px]" placeholder="Расскажите о себе"/>
            <div class="flex flex-col gap-4 w-full md:w-2/3 lg:w-1/2">
                <div class="flex items-center gap-2 w-full" v-for="(characteristic, i) in teacher.styles">
                    <FormKit v-model="teacher.styles[i]" validation="required" outer-class="w-full" message-class="text-[#E9556D] font-Pacifico" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" :name="`Стиль ${i + 1}`" placeholder="Стиль танца" type="text"/>                    
                    <button @click="deleteCharacteristic(i)" type="button" class="px-4 py-2 rounded-xl text-white bg-[#673ab7]/70 w-fit self-end">
                        <Icon class="text-2xl" name="material-symbols:delete-forever"/>
                    </button>
                </div>
                <button @click="addCharacteristic" type="button" class="px-4 py-2 rounded-xl text-white bg-[#673ab7]/70 mx-auto">
                    <Icon class="text-2xl" name="material-symbols:exposure-plus-1"/>
                </button>
            </div>
            <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Обновить</button>
        </FormKit>
    </div>
    <div class="flex flex-col gap-6" v-if="user.role == 'Педагог'">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:delete-rounded"/>
            <p>Просмотр урока</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div class="rounded-xl flex flex-col gap-4 p-4 border border-[#673ab7]/70" v-for="lesson in lessons">
                <div class="flex items-center gap-4 self-end">
                    <NuxtLink :to="`/profile/edit-${lesson.id}`">
                        <Icon class="text-2xl text-amber-500" name="material-symbols:edit-outline"/>
                    </NuxtLink>
                    <button @click="deleteLesson(lesson.id, lessons.indexOf(lesson))">
                        <Icon class="text-2xl text-red-500" name="material-symbols:delete-rounded"/>
                    </button>
                </div>
                <p class="text-xl"><span class="font-Pacifico">Наименование</span> - {{ lesson.title }}</p>
                <p class="text-lg"><span class="font-Pacifico">Описание</span> - {{ lesson.desc }}</p>
                <p class="text-lg"><span class="font-Pacifico">Цена</span> - {{ lesson.price.toLocaleString() }}₽</p>
                <div class="flex items-center justify-center rounded-xl bg-black overflow-hidden w-full">
                    <video :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${lesson.video}`" controls class="w-full aspect-video"></video>
                </div>
            </div>
        </div>
    </div>  
    <div class="flex flex-col gap-6" v-if="user.role == 'Педагог'">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:contacts-rounded"/>
            <p>Добавление урока</p>
        </div>
        <FormKit @submit="addLesson" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 items-center justify-center">               
            <FormKit type="text" v-model="lesson.title" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Название урока" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Название урока"/>
            <FormKit type="textarea" v-model="lesson.desc" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Описание урока" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Описание урока"/>
            <FormKit type="text" v-model="lesson.price" validation="required|number" messages-class="text-[#E9556D] font-Pacifico" name="Цена" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Цена"/>
            <FormKit type="text" v-model="lesson.style" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Стили танца" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Стили танца"/>
            <FormKit type="file" @change="loadPreview" accept="video/*" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Превью" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" label-class="font-Pacifico" label="Превью"/>
            <FormKit type="file" @change="loadLesson" accept="video/*" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Видео" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" label-class="font-Pacifico" label="Видео"/>
            <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Добавить</button>
        </FormKit>
    </div>
    <div class="flex flex-col gap-6" v-if="user.role == 'Ученик'">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:contacts-rounded"/>
            <p>Приобретённые уроки</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-xl">
            <div class="flex flex-col gap-4 p-4 rounded-xl border border-[#673ab7]/70" v-for="lessonUser in lessonsUser">
                <p class="text-2xl font-Pacifico">{{ lessonUser.lessons.title }}</p>
                <div class="flex items-center justify-center rounded-xl bg-black overflow-hidden">
                    <video :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${lessonUser.lessons.video}`" controls class="w-full aspect-video"></video>
                </div>
                <p>{{ lessonUser.lessons.price.toLocaleString() }}₽</p>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-6" v-if="privateLessons && privateLessons.length > 0">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="streamline:class-lesson-solid"/>
            <p>Индивидуальные занятия</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-xl">
            <div class="flex flex-col gap-4 p-4 rounded-xl border border-[#673ab7]/70" v-for="privateLesson in privateLessons">
                <div class="flex items-center gap-4 self-end">
                    <button @click="completePrivateLesson(privateLesson.id), privateLesson.status == 'Подтверждена'" v-if="privateLesson.status = 'Новая' && role.value == 'Педагог'">
                        <Icon class="text-3xl text-green-500" name="material-symbols-light:check-circle"/>
                    </button>
                    <button @click="cancelPrivateLesson(privateLesson.id), privateLesson.status == 'Отменена'" v-if="privateLesson.status = 'Новая'">
                        <Icon class="text-3xl text-red-500" name="material-symbols:cancel"/>
                    </button>
                </div>
                <p v-if="user.role == 'Ученик'"><span class="font-Pacifico">Педагог</span> - {{ userOrTeacher[0].surname }} {{ userOrTeacher[0].name }}</p>
                <p v-if="user.role == 'Педагог'"><span class="font-Pacifico">Ученик</span> - {{ userOrTeacher[0].surname }} {{ userOrTeacher[0].name }}</p>
                <p><span class="font-Pacifico">Дата, время занятия</span> - {{ privateLesson.dateTime }}</p>
                <p><span class="font-Pacifico">Статус заявки</span> - {{ privateLesson.status }}</p>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:contacts-rounded"/>
            <p>Выход из аккаунта</p>
        </div>
        <button @click="logout" type="button" class="w-[160px] text-center py-0.5 px-4 rounded-full hover:bg-[#673ab7]/70 border border-[#673ab7]/70 hover:text-white transition-all duration-500 text-[#673ab7]/70 bg-transparent">Выйти</button>
    </div>
</template>

<script setup>
    /* подключение БД и проверка пользователя */
    const supabase = useSupabaseClient() 
    const { authenticated, role, id } = storeToRefs(useUserStore())

    const { data:users, error } = await supabase
    .from('users')
    .select('*')   
    .eq('id', id.value)  


    /* создание сообщений и роутера */
    const showMessage = useMessagesStore().showMessage
    const router = useRouter()


    /* создание формы пользователя и изображений */
    const user = ref({
        name: users[0].name,
        surname: users[0].surname,
        patronymic: users[0].patronymic,
        login: users[0].login,
        role: users[0].role,
        avatar: users[0].avatar,
        password: users[0].password
    }) 

    const formAvatar = ref()
    formAvatar.value = `https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${user.value.avatar}`


    /* добавление фото и превью */
    let images = []
    const loadImage = (el) => {
        images = el.target.files
        const reader  = new FileReader()
        reader.onload = (e) => {
            formAvatar.value = e.target.result
        }
        reader.readAsDataURL(images[0])
        console.log(images)
    }      


    /* обновление данных */
    const updateUser = async () => {    
        let updateData = {
            name: user.value.name, 
            surname: user.value.surname, 
            patronymic: user.value.patronymic, 
            login: user.value.login, 
            password: user.value.password
        }

        if(images.length > 0) {
            await supabase.storage.from('users').upload(`avatars/${images[0].name}`, images[0])           
            updateData.avatar = `avatars/${images[0].name}`
        }


        if (images.length > 0 && user.value.avatar) {
            const { data, error } = await supabase.storage.from('users').remove([user.value.avatar])
        }

        const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id.value)
           
        if(error) {
            console.log(error)
            showMessage("Произошла ошибка!", false)   
        } else {            
            showMessage("Данные обновлены!", true)   
        }
    }


    /* оформление профиля педагога и управление характеристиками */
    const teacher = ref({
        desc: users[0].desc.replace(/<br>/g, '\n'),
        nickname: users[0].nickname,
        styles: [""]
    }) 
    if(users[0].styles && users[0].styles.length>0) {
        teacher.value.styles = users[0].styles
    }

    const addCharacteristic = () => {
        teacher.value.styles.push("")
    }

    const deleteCharacteristic = (id) => {
        if(teacher.value.styles.length > 1) {
            teacher.value.styles.splice(id, 1)
        }
    }


    /* обновление профиля */
    const updateProfile = async () => {   
        const { data, error } = await supabase
        .from('users')
        .update({
            desc: teacher.value.desc.replace(/(?:\r\n|\r|\n)/g, '<br>'), 
            nickname: teacher.value.nickname, 
            styles: teacher.value.styles
        })
        .eq('id', id.value)
           
        if(error) {
            console.log(error)
            showMessage("Произошла ошибка!", false)   
        } else {            
            showMessage("Данные обновлены!", true)   
        }
    }


    /* добавление урока */
    const lesson = ref({
        title: "",
        desc: "",
        style: "",
        price: null
    })

    let lessonsVideo = []
    const loadLesson = (el) => {
        lessonsVideo = el.target.files
        console.log(lessonsVideo)
    }  

    let previews = []
    const loadPreview = (el) => {
        previews = el.target.files
        console.log(previews)
    }  

    const addLesson = async () => {
        await supabase.storage.from('users').upload(`lessons/${lessonsVideo[0].name}`, lessonsVideo[0])
        await supabase.storage.from('users').upload(`previews/${previews[0].name}`, previews[0])

        const { data, error } = await supabase
        .from('lessons')
        .insert({
            title: lesson.value.title, 
            desc: lesson.value.desc.replace(/(?:\r\n|\r|\n)/g, '<br>'), 
            price: lesson.value.price,
            video: `lessons/${lessonsVideo[0].name}`,
            preview: `previews/${previews[0].name}`,
            style: lesson.value.style,
            teacherId: id.value
        })
           
        if(error) {
            console.log(error)
            showMessage("Произошла ошибка!", false)   
        } else {            
            showMessage("Урок добавлен!", true)   
            lessons.value.push({
                title: lesson.value.title, 
                desc: lesson.value.desc.replace(/(?:\r\n|\r|\n)/g, '<br>'), 
                price: lesson.value.price,
                video: `lessons/${lessonsVideo[0].name}`,
                preview: `previews/${previews[0].name}`,
                style: lesson.value.style,
                teacherId: id.value
            })
        }
    }


    /* отображение и удаление урока */
    const { data:lessonsArray, error:lessonsError } = await supabase
    .from('lessons')
    .select('*')   
    .eq('teacherId', id.value)  
    .order('id', { ascending: true })

    const lessons = ref(lessonsArray)

    const deleteLesson = async (idBase, idArray) => {        
        const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', idBase)

        lessons.value.splice(idArray, 1)

        if(error) {
            console.log(error)
            showMessage("Произошла ошибка!", false)   
        } else {            
            showMessage("Урок удалён!", true)   
        }          
    }


    /* показ приобретенных уроков */
    const { data:lessonsUser, error:lessonsUserError } = await supabase
    .from('cart')
    .select('*, lessons (*)')
    .eq('status', 'Оформлен')
    .eq('userId', id.value)


    /* индивидуальные занятия */
    let query = supabase
    .from('privateLessons')
    .select('*')    
    
    if(role.value == "Ученик"){
        query = query.eq('userId', id.value)
    } else if(role.value == "Педагог"){
        query = query.eq('teacherId', id.value)
    }

    const { data:privateLessons, error:privateLessonsError } = await query    
    
    const relatedUserId = role.value == "Ученик" ? privateLessons[0].teacherId : privateLessons[0].userId

    const { data: userOrTeacher, error: userOrTeacherError } = await supabase
    .from('users')
    .select('*')
    .eq('id', relatedUserId)


    /* подтверждение и отмена заявок */
    const updatePrivateLesson = async (lessonId, newStatus, Message) => {
        const { data, error } = await supabase
        .from('privateLessons')
        .update({
            status: newStatus
        })
        .eq('id', lessonId)

        if(error) {
            console.log(error)
            showMessage("Произошла ошибка!", false)   
        } else {            
            showMessage(Message, true)   
        }
    }

    const completePrivateLesson = async (id) => {
       await updatePrivateLesson(id, "Подтверждена", "Заявка подтверждена!") 
    }

    const cancelPrivateLesson = async (id) => {
       await updatePrivateLesson(id, "Отменена", "Заявка отменена!")        
    }


    /* выход из аккаунта */
    const logout = () => {
        authenticated.value = false
        id.value = null
        role.value = ""
        showMessage("Успешный выход!", true) 
        router.push("/")
    }
</script>
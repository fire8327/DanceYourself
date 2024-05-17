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
                <div class="flex flex-col gap-2 rounded-xl border border-[#673ab7]/70 p-4 w-full" v-for="(characteristic, i) in teacher.styles">
                    <button @click="deleteCharacteristic(i)" type="button" class="px-4 py-2 rounded-xl text-white bg-[#673ab7]/70 w-fit self-end">
                        <Icon class="text-2xl" name="material-symbols:delete-forever"/>
                    </button>
                    <FormKit v-model="teacher.styles[i]" validation="required" outer-class="w-full" message-class="text-[#E9556D] font-Pacifico" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" :name="`Стиль ${i + 1}`" placeholder="Стиль танца" type="text"/>                    
                </div>
                <button @click="addCharacteristic" type="button" class="px-4 py-2 rounded-xl text-white bg-[#673ab7]/70 mx-auto">
                    <Icon class="text-2xl" name="material-symbols:exposure-plus-1"/>
                </button>
            </div>
            <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Обновить</button>
        </FormKit>
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

    /* let previews = []
    const loadPreview = (el) => {
        previews = el.target.files
        console.log(previews)
    }   */


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
    if(users[0].styles.length>0) {
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


    /* выход из аккаунта */
    const logout = () => {
        authenticated.value = false
        id.value = null
        role.value = ""
        showMessage("Успешный выход!", true) 
        router.push("/")
    }
</script>
<template>
    <FormKit @submit="userReg" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 items-center justify-center grow text-xl">
        <p class="text-3xl font-Pacifico text-[#673ab7]/70">Регистрация</p>
        <div class="flex items-center lg:items-start gap-4 max-lg:flex-col md:w-2/3 lg:w-1/2">
            <FormKit type="text" v-model="user.surname" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Фамилия" outer-class="w-full lg:w-1/3" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Фамилия"/>
            <FormKit type="text" v-model="user.name" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Имя" outer-class="w-full lg:w-1/3" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Имя"/>
            <FormKit type="text" v-model="user.patronymic" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Отчество" outer-class="w-full lg:w-1/3" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Отчество"/>
        </div>
        <div class="flex items-center lg:items-start gap-4 max-lg:flex-col md:w-2/3 lg:w-1/2">
            <FormKit type="text" v-model="user.login" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Логин" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Логин"/>
            <FormKit type="password" v-model="user.password" validation="required|length:6" messages-class="text-[#E9556D] font-Pacifico" name="Пароль" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="••••••"/>
        </div>
        <FormKit @change="loadImage" type="file" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Аватар" outer-class="w-full md:w-2/3 lg:w-1/2" accept=".png,.jpg,.jpeg,.svg,.webp,.bmp" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Аватар"/>
        <FormKit type="select" :options="['Ученик', 'Педагог']" v-model="user.role" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Роль" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Роль"/>
        <FormKit v-if="user.role == 'Педагог'" type="text" v-model="user.nickname" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Никнейм" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Никнейм"/>
        <FormKit v-if="user.role == 'Педагог'" type="textarea" v-model="user.desc" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Описание" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full h-[200px]" placeholder="Расскажите о себе"/>
        <div v-if="user.role == 'Педагог'" class="flex flex-col gap-4 w-full md:w-2/3 lg:w-1/2">
            <div class="flex items-center gap-2 w-full" v-for="(characteristic, i) in user.styles">
                <FormKit v-model="user.styles[i]" validation="required" outer-class="w-full" message-class="text-[#E9556D] font-Pacifico" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" :name="`Стиль ${i + 1}`" placeholder="Стиль танца" type="text"/>                    
                <button @click="deleteCharacteristic(i)" type="button" class="px-4 py-2 rounded-xl text-white bg-[#673ab7]/70 w-fit self-end">
                    <Icon class="text-2xl" name="material-symbols:delete-forever"/>
                </button>
            </div>
            <button @click="addCharacteristic" type="button" class="px-4 py-2 rounded-xl text-white bg-[#673ab7]/70 mx-auto">
                <Icon class="text-2xl" name="material-symbols:exposure-plus-1"/>
            </button>
        </div>
        <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Регистрация</button>
        <div class="flex items-center justify-center gap-4 w-full md:w-2/3 lg:w-1/2 my-10">
            <div class="w-1/3 h-px bg-[#673ab7]/70"></div>  
            <p class="font-Pacifico text-[#673ab7]/70">или</p>
            <div class="w-1/3 h-px bg-[#673ab7]/70"></div>  
        </div>
        <NuxtLink to="/auth" class="w-[160px] text-center py-0.5 px-4 rounded-full hover:bg-[#673ab7]/70 border border-[#673ab7]/70 hover:text-white transition-all duration-500 text-[#673ab7]/70 bg-transparent">Вход</NuxtLink>
    </FormKit>
</template>

<script setup>
    /* создание пользователя */
    const user = ref({
        name: "",
        surname: "",
        patronymic: "",
        login: "",
        password: "",
        role: "",
        desc: "",        
        nickname: "",
        styles: [""]
    })


    /* управление характеристиками */
    const addCharacteristic = () => {
        user.value.styles.push("")
    }

    const deleteCharacteristic = (id) => {
        if(user.value.styles.length > 1) {
            user.value.styles.splice(id, 1)
        }
    }


    /* создание сообщений */
    const showMessage = useMessagesStore().showMessage


    /* подключение БД и роутера */
    const supabase = useSupabaseClient()
    const router = useRouter()


    /* добавление фото */
    let files = []
    const loadImage = (el) => {
        files = el.target.files
        console.log(files)
    }  


    /* регистрация пользователя */
    const userReg = async () => {
        const { data: users, error: usersError } = await supabase
        .from('users')
        .select("*")
        .eq('login', user.value.login)

        if (users[0]) {
            user.value.login = ""
            return showMessage("Такой  логин уже используется!", false)              
        } 

        await supabase.storage.from('users').upload(`avatars/${files[0].name}`, files[0])

        let unsertUser = { 
            name: user.value.name,
            surname: user.value.surname,
            patronymic: user.value.patronymic, 
            login: user.value.login, 
            password: user.value.password, 
            role: user.value.role,
            avatar: `avatars/${files[0].name}`
        }

        if(user.value.role == 'Педагог') {
            unsertUser.desc = user.value.desc.replace(/(?:\r\n|\r|\n)/g, '<br>'), 
            unsertUser.nickname = user.value.nickname, 
            unsertUser.styles = user.value.styles
        }

        const { data, error } = await supabase
        .from('users')
        .insert(unsertUser)
        .select()

        if (data) {
            console.log(data)
            showMessage('Успешная регистрация!', true)
            router.push('/auth')
        } else {
            showMessage('Произошла ошибка!', false)
        }
    }

</script>
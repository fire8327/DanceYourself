<template>
    <div class="col-span-full w-full py-8 md:py-10 lg:py-12 bg-[#673ab7]/70 flex flex-col items-center text-center gap-8 h-fit text-white">
        <p class="font-Pacifico text-3xl uppercase">Остались вопросы?</p>
        <p class="text-xl max-w-2xl">Если у вас возникли вопросы относительно наших услуг, доступных дат или ценовой политики, пожалуйста, свяжитесь с нами. Мы всегда рады обсудить ваши потребности и предложить индивидуальные решения, соответствующие вашим ожиданиям.</p>
        <button @click="isFeedbackShow = true" class="flex items-center gap-4 w-fit rounded-full relative p-2 group">
            <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-lg z-[2]"/>
            <span class="uppercase text-sm tracking-widest z-[2]">Оставить заявку</span>
            <span class="absolute rounded-full bg-[#131313] h-full w-9 z-0 left-0 top-0 transition-all duration-500 group-hover:w-full"></span>
        </button>
    </div>
    <div @click="isFeedbackShow = false" class="fixed bg-black/70 inset-0 z-[5] transition-all duration-500" :class="{'-translate-x-full' : !isFeedbackShow}"></div>
    <button @click="isFeedbackShow = false" class="fixed top-8 right-8 z-[6]" :class="{'hidden' : !isFeedbackShow}">
        <Icon class="text-3xl text-white" name="ic:baseline-close"/>
    </button>
    <div class="fixed top-1/2 -translate-y-1/2 left-1/2 z-[6] transition-all duration-50 w-full px-[15px] flex items-center justify-center text-xl" :class="isFeedbackShow ? '-translate-x-1/2' : 'translate-x-[5000px]'">
        <FormKit @submit="feedback" type="form" :actions="false" form-class="p-4 bg-white flex flex-col gap-8 w-full max-w-[450px] rounded-xl" messages-class="hidden">
            <p class="text-2xl font-Pacifico text-[#673ab7]/70">Форма обратной связи</p>
            <div class="flex flex-col gap-4">
                <FormKit type="text" v-model="feedbackForm.name" name="Имя" validation="required" messages-class="text-[#E9556D] font-Pacifico" input-class="w-full rounded-xl bg-transparent focus:outline-none border border-[#673ab7]/70 py-2 px-4" placeholder="Ваше имя"></FormKit>
                <FormKit type="text" v-model="feedbackForm.email" name="Почта" validation="required|email" messages-class="text-[#E9556D] font-Pacifico" input-class="w-full rounded-xl bg-transparent focus:outline-none border border-[#673ab7]/70 py-2 px-4" placeholder="Ваша почта"></FormKit>
                <FormKit type="text" v-model="feedbackForm.phone" name="Номер телефона" validation="required|length:11" messages-class="text-[#E9556D] font-Pacifico" input-class="w-full rounded-xl bg-transparent focus:outline-none border border-[#673ab7]/70 py-2 px-4" placeholder="Ваш номер телефона"></FormKit>
            </div>
            <button type="submit" class="py-0.5 mx-auto px-4 rounded-full bg-[#673ab7]/70 text-white w-fit animate-pulse">Отправить</button>
        </FormKit>
    </div>
</template>

<script setup>
    /* открытие формы */
    const isFeedbackShow = ref(false)


    /* создание сообщений */
    const showMessage = useMessagesStore().showMessage


    /* отправка данных */
    const token = "7152747588:AAG3NWVvoF_XcTxiDfxDpwnHO0BmqCFi_4A"
    const chatId = "-4142115741"
    const URL = `https://api.telegram.org/bot${token}/sendMessage`

    const feedbackForm = ref({
        name: "",
        email: "",
        phone: ""
    })

    const feedback = async() =>{
        let msg = "<b>Заявка на обратную связь</b>\n"
        + `<b>Имя:</b> ${feedbackForm.value.name}\n`
        + `<b>Почта:</b> ${feedbackForm.value.email}\n`
        + `<b>Номер телефона:</b> ${feedbackForm.value.phone}\n`
        const {data, error} = await useFetch(URL,{
            body:{
                'chat_id': chatId,
                'parse_mode': 'html',
                'text': msg
            },
            method:'post'
        })

        if (error.value) return showMessage("При отправке произошла ошибка!", false)
        showMessage("Успешная отправка!", true)
        feedbackForm.value.name = ""
        feedbackForm.value.email = ""
        feedbackForm.value.phone = ""
        isFeedbackShow.value = false
        setTimeout(() => {
            messageTitle.value = null
        }, 3000);
    }
</script>
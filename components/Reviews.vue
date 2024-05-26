<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols-light:rate-review"/>
            <p>Отзывы</p>
        </div>
        <Swiper :loop="true" 
                :space-between="20" 
                :modules="[SwiperPagination, SwiperAutoplay]" 
                :pagination="{ clickable: true }" 
                :autoplay="{delay:3500}" 
                :breakpoints = "{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    }
                }"
                class="w-full text-xl !pb-10">
            <SwiperSlide class="!flex flex-col gap-4 rounded-xl border border-[#673ab7]/70 p-4" v-for="review in reviews">
                <div class="flex items-center gap-2">
                    <img :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${review.users.avatar}`" alt="" class="w-14 h-14 rounded-full">
                    <p class="text-2xl font-Pacifico">{{ review.users.surname }} {{ review.users.name }}</p>
                </div>
                <p class="opacity-80">{{ review.text }}</p>
            </SwiperSlide>
        </Swiper>
    </div>  
    <div class="flex flex-col gap-6" v-if="authenticated && role == 'Ученик'">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols-light:rate-review"/>
            <p>Оставить отзыв</p>
        </div>
        <FormKit @submit="addReview" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 items-center justify-center">
            <FormKit type="textarea" v-model="reviewText" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Отзыв" outer-class="w-full" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Ваш отзыв"/>
            <button type="submit" class="w-[160px] text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Отправить</button>
        </FormKit>
    </div>
</template>

<script setup>
    /* проверка входа и создание роутера */
    const { authenticated, role, id  } = storeToRefs(useUserStore())
    const router = useRouter()


    /* подключение БД и создание отзыва */
    const supabase = useSupabaseClient() 

    const { data, error } = await supabase
    .from('reviews')
    .select('*, users (*)')   
    .order('id', { ascending: true })

    const reviews = ref(data)


    /* создание сообщений */
    const showMessage = useMessagesStore().showMessage


    /* добавление отзыва */
    const reviewText = ref()
    const addReview = async () => {
        const { data, error } = await supabase
        .from('reviews')
        .insert({
            text: reviewText.value, 
            userId: id.value
        })

        if(error) {
            console.log(error)
            showMessage("Произошла ошибка!", false)   
        } else {            
            showMessage("Отзыв добавлен!", true)   
            router.go()
        }
    } 
</script>
<template>
    <div class="flex max-lg:flex-col gap-10" v-if="carts && carts.length>0">
        <div class="flex flex-col gap-6 lg:w-1/2">
            <div class="flex items-center gap-4 text-3xl font-Pacifico">
                <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:shopping-cart-rounded"/>
                <p>Список товаров</p>
            </div>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-4 rounded-xl p-4 border border-gray-200" v-for="cart in carts">
                    <p class="text-2xl font-Pacifico">{{ cart.lessons.title }}</p>
                    <video :src="`https://mnezrmcgjoxgghkosfmz.supabase.co/storage/v1/object/public/users/${cart.lessons.preview}`" controls class="w-full rounded-xl border border-gray-200"></video>
                    <div class="text-3xl">{{ cart.lessons.price.toLocaleString() }}₽</div>
                    <div class="flex items-center gap-2 md:w-1/2">
                        <div class="flex items-center justify-center gap-4 h-full px-4 rounded-xl border border-[#673ab7]/70 w-1/2">
                            <button :disabled="cart.count<2" @click="minusCard(cart.count, cart.id), cart.count--" :class="{'text-gray-300' : cart.count<2}" class="text-2xl">-</button>
                            <p>{{ cart.count }}</p>
                            <button @click="plusCard(cart.count, cart.id), cart.count++" class="text-2xl">+</button>
                        </div>  
                        <button @click="deleteProduct(cart.id, carts.indexOf(cart))" class="w-1/2 text-center py-0.5 px-4 rounded-full bg-[#673ab7]/70 border border-[#673ab7]/70 text-white transition-all duration-500 hover:text-[#673ab7]/70 hover:bg-transparent">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-6 lg:w-1/2">
            <div class="flex items-center gap-4 text-3xl font-Pacifico">
                <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:shopping-cart-rounded"/>
                <p>Оформление заказа</p>
            </div>
            <FormKit type="form" @submit="makeOrder" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 w-full items-center">
                <div class="flex items-start gap-2 w-full">
                    <FormKit type="text" validation="required|number" messages-class="text-[#E9556D] font-Pacifico" name="Номер карты" outer-class="max-md:w-full md:w-2/4" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="Номер карты"/>
                    <FormKit type="text" validation="required" messages-class="text-[#E9556D] font-Pacifico" name="Срок действия" outer-class="max-md:w-full md:w-1/4" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="YY/YY"/>
                    <FormKit type="text" validation="required|number" messages-class="text-[#E9556D] font-Pacifico" name="CVC" outer-class="max-md:w-full md:w-1/4" input-class="px-4 py-2 border border-[#673ab7]/70 rounded-xl focus:outline-none w-full" placeholder="CVC"/>
                </div>
                <button type="submit" class="px-4 py-2 bg-[#673ab7] text-white rounded-full shrink-0 w-[160px]">Оформить</button>
            </FormKit>
        </div>
    </div>
</template>

<script setup>
    /* проверка входа */
    const { id } = storeToRefs(useUserStore())


    /* создание сообщений */
    const showMessage = useMessagesStore().showMessage


    /* подключение к БД */
    const supabase = useSupabaseClient()     
    const { data:cart, error:cartError } = await supabase
    .from('cart')
    .select(`*, lessons (*)`)
    .eq('status', 'В корзине')
    .eq('userId', id.value)
    const carts = ref(cart)


    /* управление количеством */  
    const updateCount = async (newCount, id) => {
        const { data, error } = await supabase
        .from('cart')
        .update({ count: newCount })
        .eq('id', id)
        .select();

        if(error) {
            showMessage("Произошла ошибка!", false)             
        } else {
            showMessage("Количество обновлено!", true)  
        }
    }
    const plusCard = async (count, id) => {
        count++
        await updateCount(count, id)
    }
    const minusCard = async (count, id) => {
        if (count > 1) {
            count--
            await updateCount(count, id)
        }
    }


    /* удаление товара */
    const deleteProduct = async (idBase, idArray) => {
        const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', idBase)

        carts.value.splice(idArray, 1)

        if(error) {
            showMessage("Произошла ошибка!", false)             
        } else {
            showMessage("Удалено!", true)  
        }
    }


    /* оформление заказа и роутер */
    const router = useRouter()
    const makeOrder = async () => {
        const { data, error } = await supabase
        .from('cart')
        .update({ status: 'Оформлен' })
        .eq('status', 'В корзине')
        .eq('userId', id.value)
        .select() 

        if(error) {
            showMessage("Произошла ошибка!", false)             
        } else {
            showMessage("Заказ успешно оформлен!", true)  
            router.push("/")
        }     
    } 
</script>
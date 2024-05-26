<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="ri:contacts-book-3-fill"/>
            <p>Контакты</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-6">
            <NuxtLink to="tel:+7 981 947-56-56" class="flex items-center gap-4 transition-all duration-500 hover:text-[#673ab7]/70">
                <Icon class="text-3xl" name="material-symbols:call"/>
                <span>+7 981 947-56-56</span>
            </NuxtLink>
            <NuxtLink to="mailto:yulalatkina@icloud.com" class="flex items-center gap-4 transition-all duration-500 hover:text-[#673ab7]/70">
                <Icon class="text-3xl" name="material-symbols:stacked-email-rounded"/>
                <span>yulalatkina@icloud.com</span>
            </NuxtLink>
            <div class="flex items-center gap-4">
                <Icon class="text-3xl" name="material-symbols:add-location-alt"/>
                <span>Бизнес-центр "Бенуа", <br> офис 220</span>
            </div>
            <div class="flex items-center gap-4">
                <NuxtLink target="_blank" class="transition-all duration-500 hover:text-[#673ab7]/70">
                    <Icon class="text-3xl" name="mdi:vk"/>
                </NuxtLink>
                <NuxtLink target="_blank" class="transition-all duration-500 hover:text-[#673ab7]/70">
                    <Icon class="text-3xl" name="ic:baseline-telegram"/>
                </NuxtLink>
                <NuxtLink target="_blank" class="transition-all duration-500 hover:text-[#673ab7]/70">
                    <Icon class="text-3xl" name="mdi:instagram"/>
                </NuxtLink>
            </div>
        </div>
    </div>  
    <iframe class="w-full h-[400px] rounded-xl border border-gray-200" src="https://yandex.ru/map-widget/v1/?um=constructor%3A03d7dc9182026045d0630fdaa62e2d724ecf0ab261c34f10500793b0ae6fea07&amp;source=constructor" frameborder="0"></iframe>
    <Feedback></Feedback>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Контакты',
        lang: 'ru'
    })
</script>
<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="ri:contacts-book-3-fill"/>
            <p>Контакты</p>
        </div>
    </div>  
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-6">
        <NuxtLink to="tel:8-800-555-35-35" class="flex items-center gap-4 transition-all duration-500 hover:text-[#673ab7]/70">
            <Icon class="text-3xl" name="material-symbols:call"/>
            <span>8-800-555-35-35</span>
        </NuxtLink>
        <NuxtLink to="mailto:example@gmail.com" class="flex items-center gap-4 transition-all duration-500 hover:text-[#673ab7]/70">
            <Icon class="text-3xl" name="material-symbols:stacked-email-rounded"/>
            <span>example@gmail.com</span>
        </NuxtLink>
        <div class="flex items-center gap-4">
            <Icon class="text-3xl" name="material-symbols:add-location-alt"/>
            <span>ул. Пушкина, д. Колотшукина</span>
        </div>
        <div class="flex items-center gap-4">
            <NuxtLink class="transition-all duration-500 hover:text-[#673ab7]/70">
                <Icon class="text-3xl" name="mdi:vk"/>
            </NuxtLink>
            <NuxtLink class="transition-all duration-500 hover:text-[#673ab7]/70">
                <Icon class="text-3xl" name="ic:baseline-telegram"/>
            </NuxtLink>
            <NuxtLink class="transition-all duration-500 hover:text-[#673ab7]/70">
                <Icon class="text-3xl" name="mdi:instagram"/>
            </NuxtLink>
        </div>
    </div>
    <iframe class="w-full h-[400px] rounded-xl" src="https://yandex.ru/map-widget/v1/?um=constructor%3Af7e5b4db4d53a1a16ed44754ce3ac18ffb3919da84993d4d1abbf9595ca80ac1&amp;source=constructor" frameborder="0"></iframe>
    <Feedback></Feedback>
</template>

<script setup>

</script>
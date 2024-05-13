<template>
    <header class="w-full grid-container py-4 relative font-Pacifico">
        <div class="flex items-center justify-between gap-6">
            <NuxtLink to="/">
                <img src="/images/header/logo.png" alt="" class="w-16">
            </NuxtLink>
            <nav class="flex items-center gap-6 p-2 lg:px-6 rounded-full bg-gray-100">
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">Главная</NuxtLink>
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">Педагоги</NuxtLink>
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">О нас</NuxtLink>
                <NuxtLink class="flex flex-col after:w-0 after:h-px after:bg-[#292929] after:transition-all after:duration-500 hover:after:w-full">Контакты</NuxtLink>
                <div class="flex items-center gap-4">
                    <NuxtLink>
                        <Icon class="text-3xl text-[#f48fb1]" name="material-symbols:shopping-cart-rounded"/>
                    </NuxtLink>
                    <NuxtLink>
                        <Icon class="text-3xl text-[#f48fb1]" name="material-symbols:person"/>
                    </NuxtLink>
                </div>
            </nav>
        </div>
        <div class="w-full col-span-full absolute left-0 bottom-0 h-[2px] animate-text"></div>
    </header>
</template>

<script setup>

</script>
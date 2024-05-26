<template>
    <footer class="grid-container py-4 lg:py-6 relative">
        <div class="flex max-lg:flex-col items-center lg:justify-between gap-4 text-center">
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
            <NuxtLink to="/" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src="/images/header/logo.png" alt="" class="w-16">
            </NuxtLink>
            <div class="rounded-full px-6 py-1 bg-gray-100">
                Site by <NuxtLink to="https://t.me/juIiettee" target="_blank" class="font-Pacifico text-transparent !bg-clip-text animate-text">@juIiettee</NuxtLink>
            </div>
        </div>
    </footer>
</template>

<script setup>

</script>
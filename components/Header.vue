<template>
    <div class="w-full grid-container py-4 relative">
        <div class="flex items-center justify-between gap-6">
            <NuxtLink to="/">
                <img src="/images/header/logo.png" alt="" class="w-16">
            </NuxtLink>
            <nav class="flex items-center gap-6">
                <NuxtLink>Главная</NuxtLink>
                <NuxtLink>Педагоги</NuxtLink>
                <NuxtLink>О нас</NuxtLink>
                <NuxtLink>Контакты</NuxtLink>
                <NuxtLink class="rounded-2xl p-0.5 animate-text">
                    <span class="px-4 py-2 rounded-xl grow">Вход</span>
                </NuxtLink>
            </nav>
        </div>
    </div>
</template>

<script setup>

</script>
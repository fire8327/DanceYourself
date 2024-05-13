<template>
    <div class="rounded-xl flex flex-col px-5 py-10 bg-[#673ab7]/80 text-white overflow-hidden">
        <button @click="isQuestionShow = !isQuestionShow" class="flex items-center justify-between">
            <span class="text-2xl font-Pacifico">{{ props.question }}</span>
            <Icon name="material-symbols:arrow-circle-down-outline-rounded" class="transition-all duration-500 text-3xl" :class="{'rotate-180' : isQuestionShow}"/>
        </button>
        <p class="transition-all duration-500 overflow-hidden" :class="isQuestionShow ? 'h-fit mt-4' : 'h-0 -translate-y-full'">{{ props.answer }}</p>
    </div>
</template>

<script setup>
    /* показ вопроса */
    const isQuestionShow = ref(false)

    /* пропсы для подгрузки данных */
    const props = defineProps({
        question: String,
        answer: String
    }) 
</script>
<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="material-symbols:help-rounded"/>
            <p>Часто задаваемые вопросы</p>
        </div>
        <Question v-for="FAQ in FAQs" v-bind="FAQ"></Question>
    </div>
</template>

<script setup>
    /* вопросы */
    const FAQs = ref([
        {
            question: "Какие преимущества онлайн-танцев?",
            answer: "Вы можете выбирать удобное для себя время для занятий, а также получить доступ к урокам из любой точки мира, где есть подключение к интернету."
        },
        {
            question: "Могу ли я заниматься онлайн-танцами, если я новичок?",
            answer: "Да, конечно! Многие онлайн-платформы предлагают уроки для начинающих, которые помогут вам освоить основы выбранного стиля танца. "
        },
        {
            question: "Что мне потребуется для занятий онлайн-танцами?",
            answer: "Надежное подключение к интернету, пространство для танца, где вы сможете свободно двигаться без препятствий."
        },
        {
            question: "Как выбрать подходящий стиль танца для себя?",
            answer: "Попробуйте разные стили танцев, чтобы определить, что вам больше всего нравится. Вы можете также обратиться к рекомендациям инструкторов или просто выбрать стиль, который вас привлекает."
        },
        {
            question: "Могу ли я заниматься онлайн-танцами в одиночестве или вместе с партнером?",
            answer: "Вы можете выбрать любой вариант в зависимости от ваших предпочтений! Многие танцевальные уроки предназначены для занятий как в одиночку, так и с партнером."
        }
    ])
</script>
<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4 text-3xl font-Pacifico">
            <Icon class="text-3xl text-[#f48fb1]/70" name="carbon:location-company"/>
            <p>О нас</p>
        </div>
        <div class="flex flex-col gap-2 opacity-70">
            <p>Мы - команда энтузиастов, объединенных общей страстью к танцам. Наша миссия - сделать мир танцев доступным для каждого, вне зависимости от местоположения, опыта или возраста. Мы верим, что танец - это не только искусство самовыражения, но и мощный инструмент для поддержания здоровья и поднятия настроения.</p>
            <p>На нашем сайте вы найдете широкий выбор онлайн-уроков танцев от лучших инструкторов со всего мира. Независимо от того, являетесь ли вы начинающим или опытным танцором, у нас есть что-то для вас. Мы предлагаем уроки по различным стилям - от современного и хип-хопа до традиционных и этнических танцев.</p>
            <p class="font-Pacifico">
                С любовью, <br>
                Команда агрегатора
            </p>
        </div>
    </div>
    <Gallery></Gallery>
    <Reviews></Reviews>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'О нас',
        lang: 'ru'
    })
</script>
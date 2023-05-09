<template>
    <div :key="id" class="pr-5">
        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-emerald-900 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{title}}</h5>
            <p class="font-normal text-gray-700 dark:text-orange-300">Completed? {{ isCompleted }}. Score: {{ correctAnswerCount }}/{{ questionsCount }}.</p>
        </a>
    </div>
</template>

<script>
export default {
    name: 'QuizCard',
    props: {
        id: Number,
        title: String,
        questionsCount: Number,
        correctAnswerCount: Number,
        isCompleted: Boolean
    }
}
</script>
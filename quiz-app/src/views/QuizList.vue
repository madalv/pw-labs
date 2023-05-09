<template>
    <div class="flex p-20">
        <div v-for="quiz in quizStore.quizzes">
        <QuizCard 
        :title="quiz.title" 
        :questionsCount="quiz.questions_count" 
        :correctAnswerCount="quiz.correctAnswerCount"
        :isCompleted="quiz.isCompleted"
        :id="quiz.id" 
        />
    </div>
    </div>

</template>

<script>
import {quizStore} from '@/stores/quizStore.js'
import QuizCard from '@/components/QuizCard.vue'

export default {
    name: "QuizList",
    data() {
        return {
            quizStore
        };
    },
    mounted() {
        quizStore.setQuizzes();
    },
    components: { QuizCard }
}
</script>


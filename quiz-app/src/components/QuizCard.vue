<template>
  <router-link :to="/quiz/di">
    <div :key="id" class="pr-5">
      <div
        class="h-40 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-emerald-900 dark:border-gray-700"
      >
        <div class="flex justify-between">
          <h4
            @click="routeToQuiz()"
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ title }}
          </h4>
          <button
            @click="deleteQuiz()"
            type="button"
            class="ml-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>

        <p
          class="font-normal text-gray-700 dark:text-orange-300"
        >
          {{ questionsCount }} questions.
        </p>
        <p
          v-if="correctAnswerCount != -1"
          class="font-normal text-gray-700 dark:text-orange-300"
        >
          Score:
          {{ correctAnswerCount }}/{{ questionsCount }}.
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import router from '@/router'
import { quizStore } from '@/stores/quizStore.js'
import { QuizRequest } from '@/api/agent'

export default {
  name: 'QuizCard',
  props: {
    id: Number,
    title: String,
    questionsCount: Number,
  },
  data() {
    return {
      quizStore,
      correctAnswerCount: quizStore.scores[this.id]
        ? quizStore.scores[this.id].correctCnt
        : -1,
    }
  },
  methods: {
    routeToQuiz() {
      router.push(`/quiz/${this.id}`)
    },
    deleteQuiz() {
      QuizRequest.delete(this.id)
        .then((_) => {
          quizStore.setQuizzes()
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>

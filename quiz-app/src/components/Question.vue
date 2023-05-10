<template>
  <div
    class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ this.question }}
      </h5>
    </a>
    <div
      class="flex flex-col mb-3 font-normal text-gray-700 dark:text-gray-400"
    >
      <button
        v-for="answer in answers"
        @click="checkAnswer(answer)"
        class="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {{ answer }}
      </button>
    </div>

    <div
      v-if="error != ''"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-orange-100"
      role="alert"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
import { userStore } from '@/stores/userStore'
import { quizStore } from '@/stores/quizStore'
import { QuizRequest } from '@/api/agent'

export default {
  name: 'Question',
  props: {
    quizID: Number,
    questionID: Number,
    question: String,
    answers: Array,
  },
  data() {
    return {
      quizStore,
      correctAnswer: '',
      error: '',
    }
  },
  methods: {
    checkAnswer(answer) {
      this.error = ''

      QuizRequest.checkAnswer(
        this.quizID,
        this.questionID,
        answer,
        userStore.user.id
      )
        .then((res) => {
          console.log(JSON.stringify(res.data))
          if (res.data.correct)
            quizStore.addScore(this.quizID)
        })
        .catch((err) => {
          this.error = err.response.data.message[0]
        })
    },
  },
}
</script>

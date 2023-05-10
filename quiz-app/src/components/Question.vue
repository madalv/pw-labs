<template>
  <div
    class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ this.question }}
      </h5>
    </a>
    <div
      class="flex mb-3 font-normal text-gray-700 dark:text-gray-400"
    >
      <button
        v-for="answer in answers"
        @click="checkAnswer(answer)"
        class="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 border-b-4 border-orange-300 hover:border-orange-200 rounded"
      >
        {{ answer }}
      </button>
    </div>

    <div
      v-if="error != ''"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
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

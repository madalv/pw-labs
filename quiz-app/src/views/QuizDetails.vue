<template>
  <p v-if="!userStore.isUserSignedIn()">
    Please sign in to play. It ain't that hard.
  </p>
  <div
    class="flex flex-row justify-center items-start"
    v-else-if="
      quiz.questions != undefined &&
      currentQuestion != undefined
    "
  >
    <div
      class="flex flex-col justify-start items-center bg-gray-900 h-120 w-160 mt-20 p-10 rounded-lg bg-opacity-60 shadow-xl"
    >
      <h1
        class="text-orange-100 text-3xl font-bold mt-10 mb-10"
      >
        {{ this.quiz.title }}:
        {{ this.currentQuestion + 1 }} /
        {{ this.quiz.questions.length }}
      </h1>

      <Question
        :quiz-i-d="this.quiz.id"
        :question-i-d="
          this.quiz.questions[currentQuestion].id
        "
        :answers="
          this.quiz.questions[currentQuestion].answers
        "
        :question="
          this.quiz.questions[currentQuestion].question
        "
      ></Question>

      <button
        @click="nextQuestion()"
        class="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-blue-800"
      >
        Next
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { QuizRequest } from '@/api/agent'
import Question from '@/components/Question.vue'
import { userStore } from '@/stores/userStore'

export default {
  name: 'QuizDetails',
  props: ['id'],
  data() {
    return {
      userStore,
      questions: [],
      answers: [],
      currentQuestion: 0,
      quiz: {},
    }
  },
  created() {
    QuizRequest.getDetails(this.id).then((res) => {
      this.quiz = res.data

      console.log(JSON.stringify(this.quiz.questions))
    })
  },
  components: {
    Question,
  },
  methods: {
    nextQuestion() {
      this.currentQuestion =
        this.currentQuestion + 1 ==
        this.quiz.questions.length
          ? this.currentQuestion
          : this.currentQuestion + 1
    },
  },
}
</script>

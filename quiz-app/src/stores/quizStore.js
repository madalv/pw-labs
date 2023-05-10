import { QuizRequest } from '@/api/agent'
import { reactive } from 'vue'

export const quizStore = reactive({
  quizzes: [],
  scores: localStorage.getItem('scores')
    ? JSON.parse(localStorage.getItem('scores'))
    : {},

  getQuiz(id) {
    return this.quizzes.find((q) => q.id == id)
  },
  setQuizzes() {
    QuizRequest.getAll().then((res) => {
      this.quizzes = res.data
    })
  },
  addScore(quizID) {
    console.log(JSON.stringify(this.scores))

    if (this.scores[quizID]) {
      this.scores[quizID].correctCnt += 1
    } else this.scores[quizID] = { correctCnt: 1 }

    localStorage.setItem(
      'scores',
      JSON.stringify(this.scores)
    )
  },
})

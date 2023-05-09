import { QuizRequest } from "@/api/agent";
import { reactive } from "vue";

export const quizStore = reactive({
    quizzes: [],
    setQuizzes() {
        QuizRequest.getAll().then(res => {
            let x = res.data
            x.forEach(q => {
                q.correctAnswerCount = 0
                q.isCompleted = false
            })

            this.quizzes = x
        })
        }
    })
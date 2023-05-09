import axios from "axios"

const headers = {
    'X-Access-Token': process.env.VUE_APP_ACCESS_TOKEN
  }

export const UserRequest = {
    signIn:  (formData) => {
      return axios.post(
          `${process.env.VUE_APP_API}/users`, formData, { headers }
        )
  }
}

export const QuizRequest = {
  getAll: () => {
    return axios.get(`${process.env.VUE_APP_API}/quizzes`, {headers})
  }
}
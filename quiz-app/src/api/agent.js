import axios from 'axios'

const headers = {
  'X-Access-Token': process.env.VUE_APP_ACCESS_TOKEN,
}

export const UserRequest = {
  signIn: (formData) => {
    return axios.post(
      `${process.env.VUE_APP_API}/users`,
      formData,
      {
        headers,
      }
    )
  },
}

export const QuizRequest = {
  getAll: () => {
    return axios.get(`${process.env.VUE_APP_API}/quizzes`, {
      headers,
    })
  },
  getDetails: (id) => {
    return axios.get(
      `${process.env.VUE_APP_API}/quizzes/${id}`,
      { headers }
    )
  },
  checkAnswer: (quizID, questionID, answer, userID) => {
    return axios.post(
      `${process.env.VUE_APP_API}/quizzes/${quizID}/submit`,
      {
        data: {
          question_id: questionID,
          answer: answer,
          user_id: userID,
        },
      },
      { headers }
    )
  },
  delete: (id) => {
    return axios.delete(
      `${process.env.VUE_APP_API}/quizzes/${id}`,
      { headers }
    )
  },
}

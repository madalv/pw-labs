<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form v-on:submit.prevent="submitForm" class="space-y-6" action="" method="POST">
        <div>
          <div class="flex items-center justify-start">
            <label for="surname" class="block font-medium leading-6 text-gray-900">Name</label>
          </div>
          <div class="mt-2">
            <input v-model="form.data.name" id="name" name="name" type="text" required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-start">
            <label for="surname" class="block font-medium leading-6 text-gray-900">Surname</label>
          </div>
          <div class="mt-2">
            <input v-model="form.data.surname" id="surname" name="surname" type="text" required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div v-if="errorsExist" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400" role="alert">
          <span class="font-medium">Something went wrong!</span> {{ error }}
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
            in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { UserRequest } from '@/api/agent'
import { userStore } from '@/stores/userStore'

export default {
  name: 'SignInForm',
  mounted() {
    this.errorsExist = false
    this.error = ""
  },
  data() {
    return {
      userStore,
      errorsExist: false,
      error: "",
      form: {
        "data": {
          "name": '',
          "surname": ''
        }
      }

    }
  },
  methods: {
    submitForm() {
      UserRequest.signIn(this.form).then(res => {
        userStore.signIn(res.data)
      }).catch(error => {
        this.errorsExist = true
        this.error = error.response.data.message[0]
      })

    }

  }
}
</script>


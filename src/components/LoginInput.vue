<script >

import { defineComponent } from 'vue';
import users from '../helpers/authenticatedUsers'
import router from '@/index';

export default defineComponent({
  data() {
    return {
      status: false,
      token: '',
      form: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    validateForm(form) {
  
      const regTest = new RegExp(`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
      console.log('test...', regTest.test(form.email))
      if(form.email === '') {
        this.errors.email = "Email is required"
      }

      if(!regTest.test(form.email)) {
        this.errors.email = "Invalid email please try again"
      }

      if(form.password === '') {
        this.errors.password = "Password is required"
      }
      console.log(
        'errors are...', this.errors
      )
      // this.errors = {}
    },
    login(formInput) {
      this.validateForm(formInput)

      //TO-DO: Add Validation

      // let formData = new FormData()
      // console.log('what is the form input...', formInput)
      // formData.append('email', formInput.email)
      // formData.append('password', formInput.password)

     // mock backend verification
      this.verifyUser(formInput)
      if(this.status) {
        sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c') 
        this.token = sessionStorage.getItem('token')
        router.push('/form')
      } else {
        alert('invalid credentials, please try again')
      }
    // })

    }, 
    verifyUser(data) {
      this.status = users.some((user) => {
        return (user.email === data.email && user.password === data.password)
      })
      console.log('what is the status', this.status)
      // if(data.email === )
    }
  }
})
</script>

<template>
  <form class="form-group validate" novalidate @submit.prevent="login(form)">
    <label>Enter Email </label>
    <input class="form-control" v-model="form.email" type="email" />
    <span class="error" v-if="errors.email">{{ errors.email }}</span>
    <br>
    <label>Enter Password </label>
    <input class="form-control" v-model="form.password" type="password" />
    <span class="error" v-if="errors.password">{{ errors.password }}</span>
    <br>
    <button class="btn btn-info" type="submit">Login</button>
  </form>
</template>

<style>
.error {
  color: red;
}
</style>
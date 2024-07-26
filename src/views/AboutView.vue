<script>
import InputComponent from '@/components/InputComponent.vue'
import jsonData from '../form/form.json'

export default {
  components: {
    InputComponent
  },
  mounted() {
    console.log(jsonData.filter((q) => !q?.question_dependencies))
    console.log(jsonData.filter((q) => q?.question_dependencies))

    jsonData.forEach((question) => {
      this.structuredData[question.question_id] = question?.question_dependencies
    })
  },
  data() {
    return {
      errors: [],
      pageNumber: 0,
      size: 4,
      formItems: jsonData,
      structuredData: {},
      form: {
        Q1: '',
        Q2: '',
        Q3: '',
        Q4: '',
        Q5: '',
        Q6: '',
        Q7: '',
        Q8: '',
        Q9: '',
        Q10: '',
        Q11: '',
        Q12: '',
        Q13: ''
      }
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      this.pageNumber--
    },
    submitForm(formData) {
      this.validateData(formData)
    },
    validateData(data) {
      console.log('validating data', data)
      this.errors = []
      for (const [key, value] of Object.entries(data)) {
        key.toString()
        if (value === '') this.errors.push(key)
        // console.log('warning no val')
        // console.log(key, value)
      }
      // data.forEach((d) => {
      //   if (d === '') this.errors.push('invalid data in: ', d)
      // })
      setTimeout(() => {
        this.errors = []
      }, 5000)
    },
    checkForDependencies(q) {
      console.log('q', q.question_dependencies)
      return true
    }
  },
  computed: {
    pageCount() {
      let l = this.formItems.length
      let s = this.size
      return Math.ceil(l / s)
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size
      return this.formItems.slice(start, end)
    },
    structuringData() {
      console.log('structured data:', this.structuredData)
      return true
    }
  }
}
</script>

<template>
  <div class="container">
    <div v-if="errors.length" class="alert alert-danger">
      Please correct the following errors:
      <li>
        {{ errors }}
      </li>
    </div>
    <form @submit.prevent="submitForm(form)">
      <div class="form-group" v-for="(question, index) in paginatedData" v-bind:key="index">
        <InputComponent
          v-model="form[question.question_id]"
          :question="question.question_details"
          :inputType="question.type"
          :condition="true"
        />

        <!-- <label>{{ question.question_id }} {{ question.question_details }} </label>
      <input v-model="form_answers.Q[index]" class="form-control" :type="question.type" />
      <input
        v-if="question.question_dependencies"
        @change="checkForDependencies(question.question_dependencies, form_answers.Q[index], index)"
        v-model="form_answers.Q[index]"
        class="form-control"
        :type="question.type"
      /> -->
        <br />
      </div>

      <!-- <div class="form-group">
      <label>Q1. What is your full legal name?</label>
      <input v-model="form.q1" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q2. What is your birth year?</label>
      <input v-model="form.q2" class="form-control" />
    </div>
    <div class="form-group">
      <label
        >Q3. What is your marital status? (Single, Married, Divorced, Widowed, Domestic
        Partner)</label
      >
      <input v-model="form.q3" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q4.Do you have any children? (Yes, No) </label>
      <input v-model="form.q4" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q5. What is your partner's full legal name?</label>
      <input v-model="form.q5" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q6. What is your partner's birth year?</label>
      <input v-model="form.q6" class="form-control" />
    </div>
    <div v-if="form.q4 === 'yes'" class="form-group">
      <label>Q7. How many children do you have?</label>
      <input v-model="form.q7" class="form-control" />
    </div>
    <div class="form-group">
      <label
        >Q8. Do you or your partner (if not single) own your primary residence? (Yes, No)</label
      >
      <input v-model="form.q8" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q9. Is your primary residence also your preferred mailing address? (Yes, No)?</label>
      <input v-model="form.q9" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q10. What is the approximate value of your real estate?</label>
      <input v-model="form.q10" class="form-control" />
    </div>
    <div class="form-group">
      <label
        >Q11. Do you own any other type of real estate (e.g., vacation, rental, etc.)? (Yes,
        No)</label
      >
      <input v-model="form.q11" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q12.Do you want to buy real estate in the future? (Yes, No)</label>
      <input v-model="form.q12" class="form-control" />
    </div>
    <div class="form-group">
      <label>Q13. Do you have any financial goals already created? (Yes, No)</label>
      <input v-model="form.q13" class="form-control" />
    </div> -->

      <div style="text-align: right">
        <button class="btn btn-success" v-if="this.pageNumber == 3">Submit</button>
      </div>
    </form>
    <div class="button-container">
      <div style="flex: 1">
        <button class="btn btn-danger" v-if="this.pageNumber > 0" @click="prevPage">
          Previous
        </button>
      </div>
      <div style="justify-content: flex-end">
        <button class="btn btn-info" v-if="this.pageNumber < 3" @click="nextPage">Next</button>
      </div>
    </div>
  </div>
</template>

<style>
.button-container {
  display: flex;
  justify-content: space-between;
}

.container {
  justify-content: center;
  background-color: aliceblue;
  color: black;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 20%;
}
</style>

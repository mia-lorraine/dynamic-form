<script>
// import InputComponent from '@/components/InputComponent.vue'
import jsonData from '../form/form.json'

export default {
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
  <form>
    <div class="container">
      <div v-if="this.pageNumber === 0">
        <h1>Page 1: Personal Information</h1>
        <div class="form-group">
          <label>Q1. What is your full legal name?</label>
          <input v-model="form.Q1" class="form-control" />
        </div>
        <div class="form-group">
          <label>Q2. What is your birth year?</label>
          <input v-model="form.Q2" class="form-control" />
        </div>
        <div class="form-group">
          <label
            >Q3. What is your marital status? (Single, Married, Divorced, Widowed, Domestic
            Partner)</label
          >
          <input v-model="form.Q3" class="form-control" />
        </div>
        <div class="form-group">
          <label>Q4.Do you have any children? (Yes, No) </label>
          <input v-model="form.Q4" class="form-control" />
        </div>
      </div>

      <div v-if="this.pageNumber === 1">
        <div class="form-group">
          <label>Q5. What is your partner's full legal name?</label>
          <input v-model="form.Q5" class="form-control" />
        </div>
        <div class="form-group">
          <label>Q6. What is your partner's birth year?</label>
          <input v-model="form.Q6" class="form-control" />
        </div>
      </div>

      <div v-if="form.Q4 === 'yes' && this.pageNumber === 2">
        <div v-if="form.Q4 === 'yes'" class="form-group">
          <label>Q7. How many children do you have?</label>
          <input v-model="form.Q7" class="form-control" />
        </div>
      </div>

      <div v-if="this.pageNumber === 3">
        <h1>Page:4 Primary Residence Information</h1>
        <div class="form-group">
          <label
            >Q8. Do you or your partner (if not single) own your primary residence? (Yes, No)</label
          >
          <input v-model="form.Q8" class="form-control" />
        </div>
        <div class="form-group">
          <label
            >Q9. Is your primary residence also your preferred mailing address? (Yes, No)?</label
          >
          <input v-model="form.Q9" class="form-control" />
        </div>
        <div class="form-group">
          <label>Q10. What is the approximate value of your real estate?</label>
          <input v-model="form.Q10" class="form-control" />
        </div>
      </div>

      <div v-if="this.pageNumber === 4">
        <div class="form-group">
          <label
            >Q11. Do you own any other type of real estate (e.g., vacation, rental, etc.)? (Yes,
            No)</label
          >
          <input v-model="form.Q11" class="form-control" />
        </div>
        <div class="form-group">
          <label>Q10. What is the approximate value of your real estate?</label>
          <input v-model="form.Q10" class="form-control" />
        </div>
        <div class="form-group">
          <label>Q12.Do you want to buy real estate in the future? (Yes, No)</label>
          <input v-model="form.Q12" class="form-control" />
        </div>
        <div class="form-group">
          <label>Q13. Do you have any financial goals already created? (Yes, No)</label>
          <input v-model="form.Q13" class="form-control" />
        </div>
      </div>

      <br />

      <div style="text-align: right">
        <button class="btn btn-success" v-if="this.pageNumber == 3">Submit</button>
      </div>

      <div class="button-container">
        <div style="flex: 1">
          <button class="btn btn-danger" v-if="this.pageNumber > 0" @click.prevent="prevPage">
            Previous
          </button>
        </div>
        <div style="justify-content: flex-end">
          <button class="btn btn-info" v-if="this.pageNumber < 3" @click.prevent="nextPage">
            Next
          </button>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </form>
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

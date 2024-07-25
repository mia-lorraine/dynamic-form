<script>
import jsonData from '../form/form.json'
export default {
  mounted() {
    // console.log(jsonData.map((q) => q?.question_dependencies))
    console.log(jsonData.filter((q) => !q?.question_dependencies))
    console.log(jsonData.filter((q) => q?.question_dependencies))
  },
  data() {
    return {
      errors: [],
      pageNumber: 0,
      size: 4,
      formItems: jsonData,
      form_answers: {
        Q: []
      },
      conditions: [
        { question: 'Q4', value: 'Yes', render: 'Q7' },
        { question: 'Q8', value: 'Yes', render: 'Q9' },
        { question: 'Q8', value: 'No', render: 'Q11' },
        { question: 'Q9', value: 'Yes', render: 'Q10' },
        { question: 'Q11', value: 'Yes', render: 'Q10' },
        { question: 'Q11', value: 'no', render: 'Q12' }
      ]
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      if (this.pageNumber !== 0) this.pageNumber--
    },
    submitForm(formData) {
      console.log('what is the form data...', formData)
      this.validateData(formData)
    },
    checkForDependencies(dependencies, answer, i) {
      console.log(dependencies.yes, i, answer, dependencies.no)
    },
    validateData(data) {
      console.log('validating data', data.Q.length)
      for (let i = 0; i <= data.length - 1; i++) {
        if (data[i] === '') this.errors.push('Please fill out field')
      }
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
    dependencies() {
      for (let i = 0; i <= this.formItems.length - 1; i++) {
        console.log('computing...', this.formItems[i])
        if (!this.formItems[i].question_dependencies) return false
        else if (this.formItems[i].question_dependencies) {
          console.log('computiong...', this.formItems[i])
          return true
        } else {
          return false
        }
      }
      return true
    }
  }
}
</script>

<template>
  <!-- //can make component -->

  <form @submit.prevent="submitForm(form_answers)">
    <div class="form-group" v-for="(question, index) in paginatedData" v-bind:key="index">
      <label>{{ question.question_id }} {{ question.question_details }} </label>
      <input
        v-if="!question.question_dependencies"
        v-model="form_answers.Q[index]"
        class="form-control"
        :type="question.type"
      />
      <input
        v-if="question.question_dependencies"
        @change="checkForDependencies(question.question_dependencies, form_answers.Q[index], index)"
        v-model="form_answers.Q[index]"
        class="form-control"
        :type="question.type"
      />
      <!-- <input
        v-if="dependencies"
        @change="checkForDependencies(question.question_dependencies, form_answers.Q[index], index)"
        v-model="form_answers.Q[index]"
        class="form-control"
        :type="question.type"
      /> -->
      <!-- <input
        v-if="question.question_id === 'Q7' && this.form_answers.Q[3] === 'Yes'"
        @change="checkForDependencies(question.question_dependencies, form_answers.Q[index], index)"
        v-model="form_answers.Q[index]"
        class="form-control"
        :type="question.type"
      /> -->
      <br />
    </div>
    <br />
    <div class="button-container">
      <div style="flex: 1">
        <button class="btn btn-danger" v-if="this.pageNumber > 0" @click="prevPage">
          Previous
        </button>
      </div>
      <div style="justify-content: flex-end">
        <button class="btn btn-info" v-if="this.pageNumber < 3" @click="nextPage">Next</button>
        <button class="btn btn-success" v-if="this.pageNumber == 3">Submit</button>
      </div>
    </div>
    <div style="text-align: right"></div>
  </form>
</template>

<style>
.button-container {
  display: flex;
  justify-content: space-between;
}
</style>

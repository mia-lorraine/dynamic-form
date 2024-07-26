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
      answers: []
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
      console.log('meh data', data)
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
      console.log('sliced!!!', this.formItems.slice(start, end))
      return this.formItems.slice(start, end)
    },
    dependencies() {
      this.paginatedData.forEach((question) => {
        console.log('question has dependency', question.question_id, question.question_dependencies)
        if (question.question_dependencies) {
          question.question_dependencies
        }
      })
      return true
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm(form_answers)">
    <div class="form-group" v-for="(question, index) in paginatedData" v-bind:key="index">
      <label>{{ question.question_id }} {{ question.question_details }} </label>
      <input
        v-if="dependencies"
        v-model="this.answers[question.question_id]"
        class="form-control"
        :type="question.type"
      />
      <!-- <input
        v-if="question.question_dependencies"
        @change="checkForDependencies(question.question_dependencies, form_answers.Q[index], index)"
        v-model="this.answers[question.question_id]"
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

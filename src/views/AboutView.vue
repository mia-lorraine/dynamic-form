<script>
import jsonData from '../form/form.json'
export default {
  mounted() {
    // format the data and add a new object titled: dependsOn
    jsonData.forEach((question) => {
      this.formattedQuestions[question.question_id] = question
      this.answers[question.question_id] = question.answer
      // Key: Q1 Value {{all values}}
    })
    console.log('answers', this.answers)

    // jsonData.forEach((question) => {
    //   if (question?.question_dependencies) {
    //     Object.keys(question.question_dependencies).forEach((key) => {
    //       if (question.question_dependencies[key] !== '') {
    //         if (question.question_id.answer) {
    //           this.formattedQuestions[question.question_id] = { ...question, show: true }
    //           console.log('what is the new formatted question', this.formattedQuestions)
    //         }
    //         console.log('yuh', this.answers[question.question_id] == `${key}`)
    //         if (this.answers[question.question_id] === key) {
    //           console.log(
    //             ' if',
    //             question.question_id,
    //             ' answer is',
    //             key,
    //             'show ',
    //             question.question_dependencies[key]
    //           )
    //         }
    //         if (this.formattedQuestions[question.question_id].answer === key) {
    //           console.log('show', question.question_dependencies[key])
    //         }
    //       }
    //     })
    //   }
    // })

    jsonData.forEach((question) => {
      if (question?.question_dependencies) {
        Object.keys(question?.question_dependencies).forEach((key) => {
          if (question.question_dependencies[key] !== '') {
            // console.log('question', question.question_dependencies)
            this.dependencies[question.question_dependencies[key]] = question

            this.newQuestions.push({
              question_id: question.question_id,
              question: question.question_details,
              dependsOn: {
                answer: key,
                questionId: question.question_dependencies[key]
              }
            })
          }
        })
      } else {
        this.newQuestions.push({
          question_id: question.question_id,
          question: question.question_details,
          type: question.type,
          answer: question.answer
          // show: true
        })
      }
    })
    // console.log('depedencies', this.dependencies)
    // console.log('new questions', this.newQuestions)
  },
  data() {
    return {
      newQuestions: [],
      dependencies: [],
      formattedQuestions: {},
      answers: {},
      errors: [],
      pageNumber: 0,
      size: 4,
      formItems: jsonData
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
    validateData(data) {},
    updateAnswer(answer, q) {
      this.answer[q]
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
      return this.newQuestions.slice(start, end)
    },
    computeShow() {
      return this.paginatedData.forEach((question) => {
        console.log('comping..', this.answers[question.question_id] == question?.dependsOn?.answer)
        if (this.answers[question.question_id] == question?.dependsOn?.answer) {
          this.paginatedData[question.question_id] = { ...question, show: true }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm(this.answers)">
    <div class="form-group" v-for="(question, key, index) in paginatedData" v-bind:key="index">
      <label
        >{{ question.question_id }}. {{ question?.dependsOn?.questionId }}
        {{ this.answers[question.question_id] }}
        <!-- {{ question }} -->
      </label>

      <!-- <input
        v-if="!question.dependsOn"
        v-model="this.answers[quesiton?.question_id]"
        class="form-control"
      /> -->
      <input
        v-if="question.show"
        @change="updateAnswer(this.answers[question.question_id], question.quesiton_id)"
        v-model="this.answers[question.question_id]"
        class="form-control"
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

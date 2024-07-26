<script>
import InputComponent from '@/components/InputComponent.vue'
import jsonData from '../form/form.json'

export default {
  components: {
    InputComponent
  },
  mounted() {
    this.mountedCompleted = true
    jsonData.forEach((question) => {
      this.structuredData[question.question_id] = question
    })

    this.pageOneData = jsonData.slice(0, 4)
    this.pageTwoData = jsonData.slice(4, 6)
    this.page3Data = jsonData.slice(7, 6)
    this.page4Data = jsonData.slice(7, 9)
  },
  data() {
    return {
      mountedCompleted: false,
      errors: [],
      pageNumber: 0,
      size: 4,
      formItems: jsonData,
      pageOneData: [],
      pageTwoData: [],
      page3Data: [],
      page4Data: [],
      structuredData: {},
      displayModal: false,
      isFormSubmitted: false,
      submittedData: {},
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
        Q10a: '',
        Q10b: '',
        Q10c: '',
        Q11: '',
        Q12: '',
        Q13: ''
      },
      required: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q8']
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
        // console.log('what is the key value', [key, value])

        if (this.required.includes(key)) {
          if (value === '') this.errors.push(key)
        }
      }
      if (this.errors.length === 0) {
        this.displayModal = true
        this.submittedData = data
        console.log(this.submittedData)
      }
      this.displayModal = false
      console.log('errors are ', this.errors)
      // console.log(Object.keys(data))

      setTimeout(() => {
        this.errors = []
      }, 10000)
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
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm(form)">
    <div class="container">
      <div v-if="errors.length" class="alert alert-danger">
        Please correct the following errors:
        <li>
          {{ errors }}
        </li>
      </div>
      <div v-if="this.isFormSubmitted" class="alert alert-success">Form Submitted!</div>
      <div class="question-container" v-if="this.pageNumber == 0">
        <h2>Page 1: Personal Information</h2>
        <div v-bind:key="index" v-for="(question, index) in pageOneData">
          <InputComponent
            v-model="form[question.question_id]"
            :id="question.question_id"
            :question="question.question_details"
            :inputType="question.type"
            :condition="this.pageNumber == 0"
            :isRequired="true"
          />
        </div>
      </div>

      <div class="question-container" v-if="this.pageNumber == 1">
        <h2>Page 2: Partner Information</h2>
        <div v-bind:key="index" v-for="(question, index) in pageTwoData">
          <InputComponent
            v-model="form[question.question_id]"
            :id="question.question_id"
            :question="question.question_details"
            :inputType="question.type"
            :condition="this.pageNumber == 1"
            :isRequired="true"
          />
        </div>
      </div>

      <div class="question-container" v-if="form.Q4 === 'yes' && this.pageNumber === 2">
        <h1>Page 3: Children Information</h1>
        <div v-if="form.Q4 === 'yes'" class="form-group">
          <label>Q7. How many children do you have?</label>
          <input v-model="form.Q7" class="form-control" />
        </div>
      </div>
      <div
        class="question-container"
        v-else-if="
          (form.Q4 !== 'yes' && this.pageNumber === 2) ||
          (form.Q4 === undefined && this.pageNumber === 2)
        "
      >
        <h1>Page 3: Children Information</h1>
        <p>Not applicable to you, press next</p>
      </div>

      <div class="question-container" v-if="this.pageNumber === 3">
        <h1>Page 4: Primary Residence Information</h1>
        <div v-bind:key="index" v-for="(question, index) in page4Data">
          {{ question.question_id }}. {{ question.question_details }}
          <div class="radio-button">
            <input type="radio" id="one" value="yes" v-model="form[question.question_id]" />
            <label for="yes">Yes</label>
            <br />
            <input type="radio" id="two" value="no" v-model="form[question.question_id]" />
            <label for="no">No</label>
          </div>
          <!-- <InputComponent
            v-model="form[question.question_id]"
            :id="question.question_id"
            :question="question.question_details"
            :inputType="question.type"
            :condition="this.pageNumber == 3"
            :isRequired="true"
            :type="radio"
          /> -->
        </div>

        <div v-if="form.Q9 === 'yes'" class="form-group">
          <label>Q10. What is the approximate value of your real estate?</label>
          <input v-model="form.Q10a" class="form-control" />
        </div>
      </div>

      <div class="question-container" v-if="this.pageNumber === 4">
        <h1>Page 5: Other Real Estate Information</h1>
        <div v-if="form.Q8 === 'no'" class="form-group">
          <label
            >Q11. Do you own any other type of real estate (e.g., vacation, rental, etc.)? (Yes,
            No)</label
          >
          <!-- <input v-model="form.Q11" class="form-control" /> -->
          <div class="radio-button">
            <input type="radio" id="one" value="yes" v-model="form.Q11" />
            <label for="yes">Yes</label>
            <br />
            <input type="radio" id="two" value="no" v-model="form.Q11" />
            <label for="no">No</label>
          </div>
        </div>

        <div v-if="form.Q11 === 'yes'" class="form-group">
          <label>Q10. What is the approximate value of your real estate?</label>
          <input v-model="form.Q10a" class="form-control" />
        </div>

        <div v-if="form.Q11 === 'no'" class="form-group">
          <label>Q12.Do you want to buy real estate in the future? (Yes, No)</label>
          <!-- <input v-model="form.Q12" class="form-control" /> -->
          <div class="radio-button">
            <input type="radio" id="one" value="yes" v-model="form.Q12" />
            <label for="yes">Yes</label>
            <br />
            <input type="radio" id="two" value="no" v-model="form.Q12" />
            <label for="no">No</label>
          </div>
        </div>
        <div v-if="form.Q12 === 'yes'" class="form-group">
          <label>Q13. Do you have any financial goals already created? (Yes, No)</label>
          <!-- <input v-model="form.Q13" class="form-control" /> -->
          <div class="radio-button">
            <input type="radio" id="one" value="yes" v-model="form.Q13" />
            <label for="yes">Yes</label>
            <br />
            <input type="radio" id="two" value="no" v-model="form.Q13" />
            <label for="no">No</label>
          </div>
        </div>
        <div
          v-if="
            (form.Q8 == '' && form.Q11 == '' && form.Q12 == '' && form.Q13 == '') ||
            (form.Q8 == 'yes' && form.Q11 == '' && form.Q12 == '' && form.Q13 == '')
          "
        >
          <p>Not applicable to you</p>
        </div>
      </div>

      <div class="question-container" v-if="this.pageNumber === 5">
        <h1>Page 6: Real Estate Value</h1>
        <div class="form-group">
          <label
            >Q10. What is the approximate value of your primary residence or other real
            estate?</label
          >
          <input v-model="form.Q10c" class="form-control" />
        </div>
      </div>
      <br />

      <div class="button-container">
        <div style="flex: 1">
          <button class="btn btn-danger" v-if="this.pageNumber > 0" @click.prevent="prevPage">
            Previous
          </button>
        </div>
        <div style="justify-content: flex-end">
          <div style="text-align: right">
            <button
              class="btn btn-success"
              v-if="this.pageNumber == 5"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Submit
            </button>
          </div>
          <button class="btn btn-info" v-if="this.pageNumber < 5" @click.prevent="nextPage">
            Next
          </button>
        </div>
      </div>
    </div>
  </form>

  <!-- TO-DO: Make a modal component -->

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Responses</h1>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p v-if="errors.length" style="color: red">
            Please fix the following errors: <br />{{ errors }}
          </p>
          <div v-bind:key="index" v-for="(value, name, index) in submittedData">
            <p style="font-weight: 600" v-if="value !== ''">
              {{ name }}. {{ structuredData[name]?.question_details }}
            </p>
            <p v-if="value !== ''">{{ value }}</p>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="
              () => {
                this.isFormSubmitted = true
              }
            "
            data-bs-dismiss="modal"
          >
            Save changes
          </button>
        </div>
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
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: aliceblue;
  color: black;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 20%;
}
.question-container {
  flex: 1;
}
.radio-button {
  padding: 15px;
}
.modal {
  color: black;
}
</style>

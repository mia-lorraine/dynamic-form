<script>
import jsonData from '../form/form.json'
export default {
  mounted() {
    console.log(jsonData)
  },
    data() {
      return {
        formItems: jsonData
      }
    }, 
    methods: {
    
    }
  }
// import { defineProps } from 'vue';

// export default defineProps({
//   mounted() {
//     this.fetchFormData()
//   },
//   methods: {
//     fetchFormData() {
//       fetch('../form/form.json')
//       .then((response) => response.json())
//       .then((json) => console.log(json))
//     }
//   }
// })

</script>


<template>
  <div>
    <p> get form data here</p>
  </div>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>

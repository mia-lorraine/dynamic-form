<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup(props) {
    // console.log(props)
  },
  props: {
    id: String,
    header: String,
    inputType: String,
    condition: Boolean,
    question: String,
    modelValue: String,
    isRequired: Boolean
  },
  data() {
    return {}
  }
})
</script>

<template>
  <div v-if="condition">
    <label>{{ id }}. {{ question }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
      type="text"
      required="isRequired"
      autocapitalize="words"
    />
  </div>
</template>

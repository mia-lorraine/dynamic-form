<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup(props) {
    console.log(props)
  },
  props: {
    inputType: String,
    condition: Boolean,
    question: String,
    modelValue: String
  },
  data() {
    return {}
  }
})
</script>

<template>
  <div>
    <label>{{ question }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
      type="text"
      v-if="condition"
    />
  </div>
</template>

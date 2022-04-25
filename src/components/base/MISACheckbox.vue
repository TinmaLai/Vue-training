<template>
  <!-- Nếu true thì nhận giá trị css -->
  <div
    class="m-checkbox"
    :class="{
      'm-checkbox-selected': isChecked,
    }"
    @click="isChecked = !isChecked"
  ></div>
</template>
<script>
export default {
  name: "the-checkbox",

  data() {
    return {
      isChecked: false,
    };
  },
};
</script>
<style>
@import url(../../css/mainDemo.css);
</style>
<template>
  <div>
    <editor
      api-key="no-api-key"
      initialValue="<p>This is the initial content of the editor</p>"
      :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
    ></editor>
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
console.log(Editor)
export default {
  name: 'info',
  components: {
    'editor': Editor
  },
  data() {
    return {

    }
  }
}
</script>

<template>
  <div class="wangeditor">
    <div ref="editor"></div>
  </div>
</template>

<script>
import {onMounted, onBeforeUnmount, reactive, ref, toRefs} from 'vue'
import WangEditor from 'wangeditor'

export default {
  props: {
    contentHtml: String,
  },
  setup(props, content) {
    const editor = ref()
    const state = reactive({
      html: '',
      text: '',
    })

    let instance
    onMounted(() => {
      instance = new WangEditor(editor.value)
      Object.assign(instance.config, {
        onchange() {
          state.html = instance.txt.html()
          // 设置富文本编辑器的页面内容，父组件传递的
          content.emit('getWangEditorValue', instance.txt.html());
        }
      })
      instance.config.uploadImgServer = '/api/upload/editorFile';
      instance.config.uploadFileName = 'file';
      instance.config.uploadImgMaxSize = 2 * 1024 * 1024;
      instance.create()
      // 设置富文本编辑器的页面内容，父组件传递的
      instance.txt.html(props.contentHtml)
    })

    onBeforeUnmount(() => {
      instance.destroy()
      instance = null;
    })

    return {
      state,
      editor
    }
  }
}
</script>

<style>
.wangeditor {
  margin-top: -1px;
  border: 1px solid #ccc;
  min-height: 400px;
  height: auto;
}
</style>
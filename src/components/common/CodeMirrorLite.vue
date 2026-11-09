<template>
  <div style="height:100%">
    <textarea style="width:100%;height:100%"></textarea>
  </div>
</template>

<script>
  var CodeMirror = require('codemirror/lib/codemirror.js')
  require('codemirror/theme/dracula.css')
  require('codemirror/theme/idea.css')
  require('codemirror/theme/twilight.css')
  require('codemirror/theme/ayu-dark.css')
  require('codemirror/theme/ayu-mirage.css')
  require('codemirror/theme/blackboard.css')
  require('codemirror/theme/base16-dark.css')
  require('codemirror/theme/duotone-dark.css')
  require('codemirror/theme/material-darker.css')
  require('codemirror/theme/paraiso-dark.css')
  require('codemirror/theme/shadowfox.css')
  require('codemirror/theme/mdn-like.css')
  require('codemirror/theme/the-matrix.css')
  require('codemirror/theme/xq-dark.css')
  require('codemirror/theme/gruvbox-dark.css')
  require('codemirror/theme/yeti.css')
  require('codemirror/theme/solarized.css')
  require('codemirror/theme/ambiance.css')
  require('codemirror/theme/colorforth.css')
  require('codemirror/theme/lesser-dark.css')
  require('codemirror/lib/codemirror.css')
  require('codemirror/mode/vue/vue.js')
  // 选 gruvbox-dark
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: function () {
          return {
            mode: 'text/javascript',
            lineNumbers: true,
            lineWrapping: true
          }
        }
      },
    },
    data: function () {
      return {
          editor:{}
      }
    },
    mounted: function () {
      var self = this
      this.editor = CodeMirror.fromTextArea(this.$el.querySelector('textarea'), this.options)
      this.editor.setValue(this.value)
      this.editor.on('change', function(cm) {
        if (!!self.$emit) {
          self.$emit('change', cm.getValue())
          self.$emit('input', cm.getValue())
        }
      })
    },
    watch: {
      'value': function (newVal, oldVal) {
        let self = this
        let editorValue = self.editor.getValue()
        if (newVal !== editorValue) {
          let scrollInfo = self.editor.getScrollInfo()
          self.editor.setValue(newVal)
          self.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
      },
      'options': function (newOptions, oldVal) {
        if (typeof newOptions === 'object') {
          for (var optionName in newOptions) {
            if (newOptions.hasOwnProperty(optionName)) {
              this.editor.setOption(optionName, newOptions[optionName])
            }
          }
        }
      }
    },
    beforeDestroy: function () {
      if (this.editor) {
        this.editor.toTextArea()
      }
    }
  }
</script>

<style>
.CodeMirror{
    height:100% !important;
}
.CodeMirror-code {
    font-size:14px;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
</style>
<template>
  <div>
    <mu-appbar style="width: 100%;" color="#5B4588">
       <span style="display: inline-block;line-height:64px;margin-right: 10px;">
         <img :src="iconUrl" style="width:28px;height:27px;vertical-align: sub;">
       </span>
       Nüwa
      <mu-button class="bar-btn" round small color="success" slot="right">保存</mu-button>
    </mu-appbar>

    <mu-row>
      <mu-col span="2">
        <mu-paper :z-depth="1" class="paper">
          <mu-appbar class="bar" :z-depth="1" color="#4B8BF4">
            <span class="title">目录</span>
          </mu-appbar>
          <div class="edit-box">
            <FileTree />
          </div>
        </mu-paper>
      </mu-col>
      <mu-col span="2">
        <mu-paper :z-depth="1" class="paper">
          <mu-appbar class="bar" :z-depth="1"  color="#DD5044" >
            <span class="title">组件列表</span>
          </mu-appbar>
          <div class="edit-box">
              <div v-if="$store.state.currentPage">
                <ElementUIList />
              </div>
              <div v-else style="padding:10px;text-align:center;line-height:200px;">请新建或选择一个文件！</div>
          </div>
        </mu-paper>
      </mu-col>
      <mu-col span="8">
        <mu-paper :z-depth="1" class="paper">
          <mu-appbar class="bar" :z-depth="2" color="#FFCD43">
            <mu-button class="btn" small color="primary" slot="left" @click="currentEditView = 'xView'">视图</mu-button> 
            <mu-button class="btn" small color="secondary" slot="left" @click="currentEditView = 'xLayout'">代码</mu-button> 
            <mu-button class="btn" small color="success" slot="left"  @click="currentEditView = 'xScript'">脚本</mu-button> 
            <mu-button class="btn" small color="orange" slot="left"  @click="currentEditView = 'xStyle'" >样式</mu-button> 
            <mu-button class="btn" small color="red" slot="right" @click="clearItems" v-show="currentEditView == 'xView'">清空</mu-button>
            <mu-button class="btn" small color="cyan" slot="right" @click="preview">预览</mu-button>
          </mu-appbar>
          <div class="edit-box" style="background:#1E1E1E">
            <transition name="component-fade" mode="out-in">
              <keep-alive :include="['xView']">
                <component v-bind:is="currentEditView"></component>
              </keep-alive>
            </transition>
          </div>
        </mu-paper>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import iconUrl from '@/assets/images/nvwa.png'
import ElementUIList from '@/components/elementui/index.vue'

import Message from 'muse-ui-message';
import FileTree from './FileTree'
import xView from './xView'
import xLayout from './xLayout'
import xScript from './xScript'
import xStyle from './xStyle'

export default {
  data(){
    return{
      iconUrl:iconUrl,
      currentEditView:'xView'
    }
  },
  created () {
      
  },
  watch:{
  },
  methods:{
    clearItems(){
      Message.confirm(`确认要清空当前布局吗?`, '警告', {
        width:'300',
        type: 'error'
      }).then(({ result }) => {
        if(result){
          this.$store.dispatch('clearCurrentPageLayout')
        } else {
          this.$toast.message('取消清空');
        }
      }).catch(() => {
        this.$toast.error('操作异常');
      })
    },
    preview(){
      let routeData = this.$router.resolve({
        path: "/preview",
        query: {}
      });
      window.open(routeData.href, '_blank');
    }
  },
  components:{
      ElementUIList,
      FileTree,
      xView,
      xLayout,
      xScript,
      xStyle
  }
}
</script>

<style>
.float-panel-file{
  z-index: 999;
  position: fixed !important;
  left: 20px;
  bottom: 200px;
}
.float-panel-comp{
  z-index: 999;
  position: fixed !important;
  left: 20px;
  bottom: 150px;
}
.float-panel-setting{
  z-index: 999;
  position: fixed !important;
  left: 20px;
  bottom: 100px;
}
.paper{
  height: calc(100vh - 64px);
}
.drawer{
  margin-top:64px;
  height: calc(100vh - 64px);
}
.edit-box{
  height: calc(100vh - 64px - 48px);
	overflow: auto;
}
.bar{
  height:48px !important;
}
.title{
  font-size:15px;
}
.btn{
    min-width:20px !important;
    width: 60px;
    margin-right:3px !important;
}
.bar-btn{
    min-width:20px !important;
    width: 65px;
    margin-right:15px !important;
}
@media (min-width: 960px){
  .mu-tab{
    min-width: 20px !important; 
  }
}
/* .mu-input{
  font-size: 14px !important;
} */
.mu-item-action{
  min-width: 30px !important;
}
.mu-input{
  width:100% !important;
}

.prop-var-box {
    margin-bottom: 10px;
}
.slide-fade-left-enter-active {
  transition: all .5s ease;
}
.slide-fade-left-leave-active {
  transition: all .3s cubic-bezier(0, 0.3, 0.5, 1.0);
}
.slide-fade-left-enter, .slide-fade-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-120px);
  opacity: 0;
}

.slide-fade-right-enter-active {
  transition: all .5s ease;
}
.slide-fade-right-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.3, 0.5, 1.0);
}
.slide-fade-right-enter, .slide-fade-right-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(120px);
  opacity: 0;
}
</style>
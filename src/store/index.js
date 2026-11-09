import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contextCompAst:{},
    currentPage:'',
    pages: localStorage.pages ? JSON.parse(localStorage.pages) : [],
    fileTree: localStorage.fileTree ? JSON.parse(localStorage.fileTree) : []
  },
  mutations: {
    setPageSetting(state, page) {
      if(!state.currentPage){
        return
      }
      if(!state.pages[state.currentPage]){
        state.pages[state.currentPage] = {}
      }
      state.pages[state.currentPage].layout = page.layout
      state.pages[state.currentPage].code = page.code
      state.pages[state.currentPage].script = page.script
      state.pages[state.currentPage].style = page.style
      state.pages[state.currentPage].rowHeight = page.rowHeight
      state.pages[state.currentPage].draggable = page.draggable
      state.pages[state.currentPage].resizable = page.resizable
      state.pages[state.currentPage].checkCollision = page.checkCollision
      state.pages[state.currentPage].verticalCompact = page.verticalCompact
      localStorage.pages = JSON.stringify(Object.assign({},state.pages))
      state.currentPage = new String(state.currentPage)
    },
    setCurrentPage(state, page) {
      state.currentPage = page
      localStorage.currentPage = page
    },
    setFileTree(state, fileTree) {
      state.fileTree = fileTree
      localStorage.fileTree = JSON.stringify(fileTree)
    },
    delPageSetting(state, pageName){
      delete state.pages[pageName]
      localStorage.pages = JSON.stringify(Object.assign({},state.pages))
    },
    clearCurrentPageLayout(state){
      if(state.currentPage && state.pages[state.currentPage]){
        state.pages[state.currentPage].layout = []
        state.pages[state.currentPage].code = '' 
        state.pages[state.currentPage].script = '' 
        state.pages[state.currentPage].style = '' 
        localStorage.pages = JSON.stringify(Object.assign({},state.pages))
        state.currentPage = new String(state.currentPage)
      }
    },
    renamePageSetting(state, args){
      if(state.pages[args.oldLabel]){
        state.pages[args.newLabel] = {}
        state.pages[args.newLabel].layout = state.pages[args.oldLabel].layout
        state.pages[args.newLabel].code = state.pages[args.oldLabel].code
        state.pages[args.newLabel].script = state.pages[args.oldLabel].script
        state.pages[args.newLabel].style = state.pages[args.oldLabel].style
        state.pages[args.newLabel].rowHeight = state.pages[args.oldLabel].rowHeight
        state.pages[args.newLabel].draggable = state.pages[args.oldLabel].draggable
        state.pages[args.newLabel].resizable = state.pages[args.oldLabel].resizable
        state.pages[args.newLabel].checkCollision = state.pages[args.oldLabel].checkCollision
        state.pages[args.newLabel].verticalCompact = state.pages[args.oldLabel].verticalCompact
        delete state.pages[args.oldLabel]
        localStorage.pages = JSON.stringify(Object.assign({},state.pages))
      }
    },
    updateContextCompAst(state, ast){
      state.contextCompAst = Object.assign({},ast)
      localStorage.contextCompAst = JSON.stringify(Object.assign({},ast))
    }
  },
  actions: {
    updatePageSetting(context, page){
      context.commit('setPageSetting', page)
    },
    updateCurrentPage(context, page){
      context.commit('setCurrentPage', page)
    },
    updateFileTree(context, fileTree){
      context.commit('setFileTree', fileTree)
    },
    delPageSetting(context, pageName){
      context.commit('delPageSetting', pageName)
    },
    clearCurrentPageLayout(context){
      context.commit('clearCurrentPageLayout')
    },
    renamePageSetting(context, args){
      context.commit('renamePageSetting', args)
    },
    updateContextCompAst(context, ast){
      context.commit('updateContextCompAst', ast)
    }
  },
  modules: {
  }
})

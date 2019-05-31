import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import data from './modules/data'
import menu from './modules/menu'

const store = new vuex.Store({
    modules: {
        data: data,
        menu: menu
    }
})

export default store
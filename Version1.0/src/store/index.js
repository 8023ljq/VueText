import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import data from './modules/data'
import menu from './modules/menu'
import iframe from './modules/iframe'

const store = new vuex.Store({
    modules: {
        data: data,
        menu: menu,
        iframe: iframe
    }
})

export default store
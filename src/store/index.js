import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import data from './modules/data'

const store = new vuex.Store({
    modules: {
        data: data,
    }
})

export default store
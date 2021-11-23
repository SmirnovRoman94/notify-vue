import Vue from 'vue'
import Vuex from 'vuex'

import  notify from './notify'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notify
    }
})
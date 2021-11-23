import loadMore from '../js/loadMore'
import axios from 'axios'

export default {
	state: {
		loading: false,
		error: null,
		success: null,
		messages: [],
		messageMain: [],
		selectValue: 3
	},
	mutations: {
		setMessage (state, messages) {
			state.messages = messages
		},
		setMessageMain (state, messagesMain) {
			state.messageMain = messagesMain
		},
		loadMessages (state, resLoadMore) {
			state.messageMain = [...state.messageMain, ...resLoadMore]
		},
		setLoading (state, loading) {
			state.loading = loading
		},
		setErorr (state, setErorr) {
			state.error = setErorr
		},
		setSuccess (state, success) {
			state.success = success
		},
		setChange (state, value) {
			state.selectValue = value
		}
	},
	actions: {
		setChange ({ commit }, value) {
			commit('setChange', value)
		},
		getNotifyLazy ({ commit, dispatch }) {
			commit('setLoading', true)
			commit('setSuccess', 'Данные загружаются')
			setTimeout(() => {
				dispatch('getNotify')
			}, 1800);
		},
		getNotify ({ commit }) {
			commit('setLoading', true)
			axios
				.get('https://tocode.ru/static/_secret/courses/1/notifyApi.php')
				.then(response => {
					let res = response.data.notify
					// filter
					let messagesMain = res.filter(mes => mes.main)
					let messages = res.filter(mes => !mes.main)
					commit('setMessage', messages)
					commit('setMessageMain', messagesMain)
				})
				.catch(error => {
					commit('setErorr', error.message)
				})
				.finally(() => {
					commit('setLoading', false)
					commit('setSuccess', null)
				})
		},
		loadMessages ({ commit, getters, state }) {
			let res = getters.getMessageFilter

			commit('loadMessages', loadMore(res, state.selectValue))
		}
	},
	getters: {
		getMessageFilter (state) {
			return state.messages.filter(mes => {
				return mes.main === false
			})
		},
		getMessageMain (state) {
			return state.messageMain
		}
	}
}
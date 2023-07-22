import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            count: '我的口袋',
            youkonwme : true
        }
    },
    getters: {
    },
    actions: {
        increment(item) {
            this.count = item
        },
        increments() {
            this.youkonwme = !this.youkonwme
        },
        correct(){
            this.youkonwme = true

        }
    }
})
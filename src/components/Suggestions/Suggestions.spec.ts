import { mount } from '@vue/test-utils'
import Suggestions from './Suggestions.vue'

describe('Suggestions', () => {
  describe('suggestions', () => {
    describe('without `cost`', () => {
      it('is empty', () => {
        const wrapper = mount(Suggestions)
        expect(wrapper.find('button').exists()).toBe(false)
      })
    })

    describe('given `cost`', () => {
      it('6297 -> ["8000", "7000", "6500", "6300", "6297"]', () => {
        const wrapper = mount(Suggestions, { props: { cost: 6297 } })
        expect(wrapper.findAll('button').map(b => b.text())).toEqual(["8000", "7000", "6500", "6300", "6297"])
      })

      it('8990 ->  ["20000", "10000", "9000", "8990"]', () => {
        const wrapper = mount(Suggestions, { props: { cost: 8990} })
        expect(wrapper.findAll('button').map(b => b.text())).toEqual(["20000", "10000", "9000", "8990"])
      })
    })

    describe('@click', () => {
      it('$emits `update:given`', async () => {
        const wrapper = mount(Suggestions, { props: { cost: 6297} })
        const [ button ] = wrapper.findAll('button')
        await button.trigger('click')
        expect(wrapper.emitted('update:given')).toEqual([[8000]])
      })
    })
  })
})

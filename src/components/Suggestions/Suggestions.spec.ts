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
      it("6297 -> [ '80,00 €', '70,00 €', '65,00 €', '63,00 €', '62,97 €' ]", () => {
        const wrapper = mount(Suggestions, { props: { cost: 6297 } })
        expect(wrapper.findAll('button').map(b => b.text())).toEqual([ '80,00 €', '70,00 €', '65,00 €', '63,00 €', '62,97 €' ])
      })

      it("8990 -> [ '200,00 €', '100,00 €', '90,00 €', '89,90 €' ]", () => {
        const wrapper = mount(Suggestions, { props: { cost: 8990} })
        expect(wrapper.findAll('button').map(b => b.text())).toEqual([ '200,00 €', '100,00 €', '90,00 €', '89,90 €' ])
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

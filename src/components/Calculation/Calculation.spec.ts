import { mount } from '@vue/test-utils'
import Calculation from './Calculation.vue'

let props: { given?: number; cost?: number; }

describe('Calculation', () => {
  describe('costs', () => {
    describe('@input', () => {
      it('$emits `update:costs`', async () => {
        const wrapper = mount(Calculation)
        const input = wrapper.get('input:first-child')
        await input.setValue(123)
        expect(wrapper.emitted('update:cost')).toEqual([[123]])
      })
    })
  })

  describe('change', () => {
    beforeEach(() => {
      props = {}
    })

    describe('with `cost`', () => {
      beforeEach(() => {
        props.cost = 4571
      })

      it('change is hidden', () => {
        const wrapper =mount(Calculation, { props })
        expect(wrapper.text()).not.toContain('Wechselgeld')
      })

      describe('with `given`', () => {
        beforeEach(() => {
          props.given = 5000
        })

        it('displays change', async () => {
          const wrapper = await mount(Calculation, { props })
          expect(wrapper.text()).toContain('Wechselgeld')
        })

        it('change == given - cost', () => {
          const wrapper = mount(Calculation, { props })
          expect(wrapper.text()).toContain('Wechselgeld: 4,29 €')
        })
      })
    })
  })
})

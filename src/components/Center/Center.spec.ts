import { mount } from '@vue/test-utils'
import Center from './Center.vue'

let props: { given?: number; cost?: number, change?: number; }

describe('Center', () => {
  describe('costs', () => {
    describe('@input', () => {
      it('$emits `update:costs`', async () => {
        const wrapper = mount(Center)
        const input = wrapper.get('input:first-child')
        await input.setValue(123)
        expect(wrapper.emitted('update:cost')).toEqual([[123]])
      })
    })
  })

  describe('section.cost', () => {
    describe('without `change`', () => {
      beforeEach(() => {
        props = {}
      })

      it('displays <input>', () => {
        const wrapper = mount(Center, { props })
        expect(wrapper.get('section.cost').find('input').exists()).toBe(true)
      })
    })

    describe('given `change`', () => {
      beforeEach(() => {
        props = { change: 34 }
      })

      it('replaces <input> with <span>', () => {
        const wrapper = mount(Center, { props })
        expect(wrapper.find('input').exists()).toBe(false)
        expect(wrapper.get('section.cost').find('span').exists()).toBe(true)
      })
    })
  })

  describe('section.change', () => {
    describe('without `change`', () => {
      beforeEach(() => {
        props = {}
      })

      it('is empty', () => {
        const wrapper = mount(Center, { props })
        expect(wrapper.text()).not.toContain('Wechselgeld')
      })
    })

    describe('given `change`', () => {
      beforeEach(() => {
        props = {change: 34}
      })

      it('displays change', () => {
        const wrapper = mount(Center, { props })
        expect(wrapper.text()).toContain('Wechselgeld: 0,34 €')
      })
    })
  })
})

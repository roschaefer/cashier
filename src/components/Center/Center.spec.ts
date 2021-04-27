import { mount } from '@vue/test-utils'
import Center from './Center.vue'

let props: { given?: number; cost?: number, change?: number; }

describe('Center', () => {
  describe('costs', () => {
    describe('@submit', () => {
      it('$emits `update:costs`', async () => {
        const wrapper = mount(Center)
        const form = wrapper.get('form')
        form.get('input').setValue('1,23')
        await form.trigger('submit')
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

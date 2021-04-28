import { mount } from '@vue/test-utils'
import Center from './Center.vue'

let props: { given?: number; cost?: number, change?: number; selected?: string }

describe('Center', () => {
  describe('label.cost', () => {
    it('displays <input>', () => {
      const wrapper = mount(Center, { props })
      expect(wrapper.get('label.cost').find('input').exists()).toBe(true)
    })

    describe("when selected === 'cost'", () => {
      it('highlights label.cost', () => {
        props = { selected: 'cost' }
        const wrapper = mount(Center, { props })
        expect(wrapper.get('label.cost').attributes('class')).toContain('border-double')
        expect(wrapper.get('label.given').attributes('class')).not.toContain('border-double')
      })
    })

    describe("when selected === 'given'", () => {
      it('highlights label.given', () => {
        props = { selected: 'given' }
        const wrapper = mount(Center, { props })
        expect(wrapper.get('label.cost').attributes('class')).not.toContain('border-double')
        expect(wrapper.get('label.given').attributes('class')).toContain('border-double')
      })
    })
  })

  describe('label.change', () => {
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
        props = { change: 34 }
      })

      it('displays change', () => {
        const wrapper = mount(Center, { props })
        expect(wrapper.text()).toContain('Wechselgeld:')
      })

      it('set change as input[value]', () => {
        const wrapper = mount(Center, { props })
        expect((wrapper.find('label.change input').element as HTMLInputElement).value).toEqual('0,34 €')
      })
    })

    describe('edge case `change` === 0', () => {
      beforeEach(() => {
        props = { change: 0 }
      })
      it('displays change', () => {
        const wrapper = mount(Center, { props })
        expect(wrapper.text()).toContain('Wechselgeld:')
      })

      it('set change as input[value]', () => {
        const wrapper = mount(Center, { props })
        expect((wrapper.find('label.change input').element as HTMLInputElement).value).toEqual('0,00 €')
      })
    })
  })
})

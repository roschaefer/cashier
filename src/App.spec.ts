import { mount, VueWrapper } from '@vue/test-utils'
import App from './App.vue'
import NumPad from './components/NumPad/NumPad.vue'
import { ref } from 'vue'

let props: { initialData?: { cost?: number, given?: number, change?: number, selected?: string } }

beforeEach(() => {
  props = {}
})

describe('App', () => {
  it('should display header text', () => {
    const wrapper = mount(App, { props })
    expect(wrapper.text()).toContain('Cashier')
  })

  describe('Pay <button>', () => {
    it('is disabled', async () => {
      const wrapper = mount(App, { props })
      expect(wrapper.get('button.pay').attributes()).toMatchObject({disabled: ''})
    })

    it('does not hide NumPad', async () => {
      const wrapper = mount(App, { props })
      await wrapper.get('button.pay').trigger('click')
      expect(wrapper.findComponent(NumPad).exists()).toBe(true)
    })

    describe('`cost` > `given`', () => {
      beforeEach(() => {
        props = {
          initialData: {
            cost:765,
            given: 876,
            change: undefined,
            selected: "cost",
          }
        }
      })

      it('is enabled', async () => {
        const wrapper = mount(App, { props })
        expect(wrapper.get('button.pay').attributes('disabled')).toBeUndefined
      })

      describe('@click', () => {
        it('hides NumPad', async () => {
          const wrapper = mount(App, { props })
          await wrapper.get('button.pay').trigger('click')
          expect(wrapper.findComponent(NumPad).exists()).toBe(false)
        })
      })
    })
  })

  describe('`change` == 0', () => {
    it('displays back and next buttons', () => {
      const wrapper = mount(App, { props: { initialData: { change: 0 } } })
      expect(wrapper.find('button.back').exists()).toBe(true)
      expect(wrapper.find('button.next').exists()).toBe(true)
    })
  })

  describe('`cost`, `given` and `change` is set', () => {
    beforeEach(() => {
      props = {
        initialData: {
          cost:765,
          given: 876,
          change: 876 - 765,
          selected: "cost",
        }
      }
    })
    let wrapper: VueWrapper<any>

    describe('@click button.back', () => {
      beforeEach(async () => {
        wrapper = mount(App, { props })
        await wrapper.find('button.back').trigger('click')
      })

      it('renders <input> with previous `cost`', () => {
        expect((wrapper.find('label.cost input').element as HTMLInputElement).value).toEqual('7,65 €')
      })

      it('renders label.given with previous `given`', async () => {
        expect((wrapper.find('label.given input').element as HTMLInputElement).value).toEqual('8,76 €')
      })
    })

    describe('@click button.next', () => {
      beforeEach(async () => {
        wrapper = mount(App, { props })
        await wrapper.find('button.next').trigger('click')
      })

      it('resets `cost`', async () => {
        expect((wrapper.find('label.cost input').element as HTMLInputElement).value).toEqual('')
      })

      it('resets `given`', async () => {
        expect(wrapper.get('label.given').text()).toEqual('Gegeben:')
      })
    })
  })
})

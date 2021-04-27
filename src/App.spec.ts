import { mount, VueWrapper } from '@vue/test-utils'
import App from './App.vue'
import NumPad from './components/NumPad/NumPad.vue'
import { ref } from 'vue'

let props: { initialData?: { cost?: number, given?: number, change?: number } }

beforeEach(() => {
  props = {}
})

describe('App', () => {
  it('should display header text', () => {
    const wrapper = mount(App, { props })
    expect(wrapper.text()).toContain('Cashier')
  })

  describe('@click Pay <button>', () => {
    it('is disabled', async () => {
      const wrapper = mount(App, { props })
      expect(wrapper.get('button.pay').attributes()).toMatchObject({disabled: ''})
    })

    it('does not hide NumPad', async () => {
      const wrapper = mount(App, { props })
      await wrapper.get('button.pay').trigger('click')
      expect(wrapper.findComponent(NumPad).exists()).toBe(true)
    })

    describe('`cost` and `given` is set', () => {
      beforeEach(() => {
        props = {
          initialData: {
            cost:765,
            given: 876,
            change: undefined,
          }
        }
      })

      it('hides NumPad', async () => {
        const wrapper = mount(App, { props })
        await wrapper.get('button.pay').trigger('click')
        expect(wrapper.findComponent(NumPad).exists()).toBe(false)
      })
    })
  })

  describe('`cost`, `given` and `change` is set', () => {
    beforeEach(() => {
      props = {
        initialData: {
          cost:765,
          given: 876,
          change: 876 - 765
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
        expect((wrapper.find('section.cost input').element as HTMLInputElement).value).toEqual('7,65 €')
      })

      it('renders section.given with previous `given`', async () => {
        expect(wrapper.get('section.given').text()).toContain('Gegeben: 8,76 €')
      })
    })

    describe('@click button.next', () => {
      beforeEach(async () => {
        wrapper = mount(App, { props })
        await wrapper.find('button.next').trigger('click')
      })

      it('resets `cost`', async () => {
        expect((wrapper.find('section.cost input').element as HTMLInputElement).value).toEqual('')
      })

      it('resets `given`', async () => {
        expect(wrapper.get('section.given').text()).toEqual('Gegeben:')
      })
    })
  })
})

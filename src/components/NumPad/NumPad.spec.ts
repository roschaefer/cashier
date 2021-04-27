import { mount } from '@vue/test-utils'
import NumPad from './NumPad.vue'

let props: { given?: Number }

describe('NumPad', () => {
  beforeEach(() => {
    props = {}
  })

  describe('@click', () => {
    describe('digit buttons', () => {
      describe('push given << digit', () => {
        it('1 << 7 == 17', async () => {
          const wrapper = mount(NumPad, { props: { given: 1 } })
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[17]])
        })

        it('-1 << 7 == -17', async () => {
          const wrapper = mount(NumPad, { props: { given: -1 } })
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[-17]])
        })

        it('0 << 7 == 7', async () => {
          const wrapper = mount(NumPad, { props: { given: 0 } })
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[7]])
        })

        it('undefined << 7 == 7', async () => {
          const wrapper = mount(NumPad)
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[7]])
        })
      })
    })
    describe('delete button', () => {
      describe('remove last digit from given', () => {
        it('pop(7) == 0', async () => {
          const wrapper = mount(NumPad, { props: { given: 7 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[0]])
        })

        it('pop(17) == 1', async () => {
          const wrapper = mount(NumPad, { props: { given: 17 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[1]])
        })

        it('pop(-7) == 0', async () => {
          const wrapper = mount(NumPad, { props: { given: -7 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[0]])
        })

        it('pop(-77) == 0', async () => {
          const wrapper = mount(NumPad, { props: { given: -77 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update:given')).toEqual([[-7]])
        })
      })
    })
  })
})

import { mount } from '@vue/test-utils'
import NumPad from './NumPad.vue'

describe('NumPad', () => {
  describe('@click', () => {
    describe('digit buttons', () => {
      describe('push value << digit', () => {
        it('1 << 7 == 17', async () => {
          const wrapper = mount(NumPad, { props: { value: 1 } })
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[17]])
        })

        it('-1 << 7 == -17', async () => {
          const wrapper = mount(NumPad, { props: { value: -1 } })
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[-17]])
        })

        it('0 << 7 == 7', async () => {
          const wrapper = mount(NumPad, { props: { value: 0 } })
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[7]])
        })

        it('undefined << 7 == 7', async () => {
          const wrapper = mount(NumPad)
          await wrapper.get('button:first-child').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[7]])
        })
      })
    })
    describe('delete button', () => {
      describe('remove last digit from value', () => {
        it('pop(7) == 0', async () => {
          const wrapper = mount(NumPad, { props: { value: 7 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[0]])
        })

        it('pop(17) == 1', async () => {
          const wrapper = mount(NumPad, { props: { value: 17 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[1]])
        })

        it('pop(-7) == 0', async () => {
          const wrapper = mount(NumPad, { props: { value: -7 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[0]])
        })

        it('pop(-77) == 0', async () => {
          const wrapper = mount(NumPad, { props: { value: -77 } })
          await wrapper.get('.delete').trigger('click')
          expect(wrapper.emitted('update')).toEqual([[-7]])
        })
      })
    })
  })
})

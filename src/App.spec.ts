import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App', () => {
  it('should display header text', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Cashier')
  })
})

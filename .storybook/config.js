import { configure } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'

function loadStories() {
  // require('../src/.stories/index.js')
  // You can require as many stories as you need.
  require('../src/.stories/page-header.js')
  require('../src/.stories/page-footer.js')
}

// Entry Point
configure(loadStories, module)

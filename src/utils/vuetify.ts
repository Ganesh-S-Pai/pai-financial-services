import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'

const vuetify = createVuetify({
  components: { ...components, VDateInput },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

export default vuetify

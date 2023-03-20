// Styles
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

import {
  aliases as iconAliases,
  mdi as mdiSvg,
} from "vuetify/iconsets/mdi-svg";

import {
  theme,
  icons,
  aliases as componentAliases,
  defaults,
} from "@/config/vuetify";

export default createVuetify({
  aliases: {
    ...componentAliases,
  },
  icons: {
    defaultSet: "mdiSvg",
    aliases: {
      ...icons,
      ...iconAliases,
    },
    sets: {
      mdiSvg,
    },
  },
  theme,
  defaults,
});

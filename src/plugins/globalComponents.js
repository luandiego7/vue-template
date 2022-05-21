import Badge from "../components/Badge.vue";
import BaseAlert from "../components/BaseAlert.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseCheckbox from "../components/BaseCheckbox.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
import BaseHeader from "../components/BaseHeader.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseNav from "../components/BaseNav.vue";
import BasePagination from "../components/BasePagination.vue";
import BaseProgress from "../components/BaseProgress.vue";
import BaseSwitch from "../components/BaseSwitch.vue";
import BaseRadio from "../components/BaseRadio.vue";
import BaseTable from "../components/BaseTable.vue";
import Card from "../components/Card.vue";
import Modal from "../components/Modal.vue";
import StatsCard from "../components/StatsCard.vue";
import TabPane from "../components/Tabs/TabPane.vue";
import Tabs from "../components/Tabs/Tabs.vue";

import { ElTooltip, ElPopover } from "element-plus";

const GlobalComponents = {
  install(app) {
    app.component("badge", Badge);
    app.component("base-alert", BaseAlert);
    app.component("base-button", BaseButton);
    app.component("base-checkbox", BaseCheckbox);
    app.component("base-dropdown", BaseDropdown);
    app.component("base-header", BaseHeader);
    app.component("base-input", BaseInput);
    app.component("base-nav", BaseNav);
    app.component("base-pagination", BasePagination);
    app.component("base-progress", BaseProgress);
    app.component("base-switch", BaseSwitch);
    app.component("base-radio", BaseRadio);
    app.component("base-table", BaseTable);
    app.component("card", Card);
    app.component("modal", Modal);
    app.component("stats-card", StatsCard);
    app.component("tab-pane", TabPane);
    app.component("tabs", Tabs);
    app.use(ElTooltip);
    app.use(ElPopover);
  },
};

export default GlobalComponents;

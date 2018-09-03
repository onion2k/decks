import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import UI from "./index.js";

storiesOf("UI", module).add("Basic", () => <UI />);

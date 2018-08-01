import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Playlist from "./index.js";

const tracks = [];

storiesOf("Playlist", module).add("Basic", () => <Playlist playlist={tracks} />);

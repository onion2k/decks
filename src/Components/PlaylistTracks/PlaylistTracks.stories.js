import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import PlaylistTracks from "./index.js";

const tracks = [];

storiesOf("PlaylistTracks", module).add("Basic", () => (
  <PlaylistTracks playlist={tracks} />
));

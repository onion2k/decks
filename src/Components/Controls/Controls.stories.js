import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import StoryRouter from "storybook-react-router";
import { linkTo } from "@storybook/addon-links";

import Controls from "./index.js";

const onPlayVideo = action("play video");
const onPauseVideo = action("pause video");
const onStopVideo = action("stop video");
const onChangeVideo = action("change video");
const onToggle = action("toggle");

storiesOf("Controls", module)
  .addDecorator(withKnobs)
  .addDecorator(
    StoryRouter(
      {
        "/playlists": linkTo("playlists", "Basic")
      },
      { initialEntries: ["/playlists"] }
    )
  )
  .add("about", () => {
    // const shuffle = boolean("Shuffle", false, "toggle");

    return (
      <Controls
        onStopVideo={onStopVideo}
        onPlayVideo={onPlayVideo}
        onPauseVideo={onPauseVideo}
        onChangeVideo={onChangeVideo}
        onToggle={onToggle}
        repeat={boolean("Repeat", false, "toggle")}
        shuffle={boolean("Shuffle", false, "toggle")}
        crackle={boolean("Crackle", false, "toggle")}
        video={boolean("Video", false, "toggle")}
      />
    );
  });

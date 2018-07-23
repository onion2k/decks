import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import Record from './index.js';

const story = storiesOf('Record', module);
story.addDecorator(withKnobs);

story.add('Basic', () => {

  const defaultPlaying = false;
  const groupId = "RecordPlayerPlaying";
  const playing = boolean("Playing", defaultPlaying, groupId);
  const vData = { videoId: "iJiMCkAPHI0", title: "Title" };
  const tonearmPos = 1;

    return (
      <Record playing={playing} vData={vData} tonearmPos={tonearmPos} />
    );
  });

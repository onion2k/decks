import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlaylistTracks from '../Components/PlaylistTracks';

storiesOf('PlaylistTracks', module)
  .add('Basic', () => (
    <PlaylistTracks />
  ));
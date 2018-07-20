import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Playlist from '../Components/Playlist';

storiesOf('Playlist', module)
  .add('Basic', () => (
    <Playlist />
  ));
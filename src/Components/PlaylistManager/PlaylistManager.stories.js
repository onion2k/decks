import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlaylistManager from '../Components/PlaylistManager';

storiesOf('PlaylistManager', module)
  .add('Basic', () => (
    <PlaylistManager />
  ));

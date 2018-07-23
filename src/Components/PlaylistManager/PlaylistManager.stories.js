import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlaylistManager from './index.js';

storiesOf('PlaylistManager', module)
  .add('Basic', () => (
    <PlaylistManager />
  ));

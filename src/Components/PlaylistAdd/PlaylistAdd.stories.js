import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlaylistAdd from './index.js';

storiesOf('PlaylistAdd', module)
  .add('Basic', () => (
    <PlaylistAdd />
  ));

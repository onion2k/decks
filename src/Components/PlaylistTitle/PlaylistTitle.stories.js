import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlaylistTitle from '../Components/PlaylistTitle';

storiesOf('PlaylistTitle', module)
  .add('Basic', () => (
    <PlaylistTitle />
  ));

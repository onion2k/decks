import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlaylistManager from './index.js';

import StoryRouter from 'storybook-react-router';
import { linkTo } from '@storybook/addon-links';

const playlists = [];
const addList = action('add-list')

storiesOf('PlaylistManager', module)
  .addDecorator(
    StoryRouter(
      {
        '/': linkTo('Linked stories', 'home'),
        '/articles/*': linkTo('Linked stories', 'article'),
      },
      { initialEntries: ['/about'] }
    )
  )
  .add('Basic', () => <PlaylistManager playlists={playlists} addList={addList} />);

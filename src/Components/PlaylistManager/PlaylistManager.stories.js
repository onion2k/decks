import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlaylistManager from './index.js';

import StoryRouter from 'storybook-react-router';
import { linkTo } from '@storybook/addon-links';

const playlists = [];
const playlistsWithLists = [{ title: 'Playlist 1', playlistId: 'pl1', length: 6 }, { title: 'Playlist 2', playlistId: 'pl2', length: 6 }, { title: 'Playlist 3', playlistId: 'pl3', length: 6 }];
const addList = action('add list');
const playList = action('play list');
const deleteList = action('delete list');

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
  .add('Basic', () => <PlaylistManager playlists={playlists} addList={addList} />)
  .add('With lists', () => <PlaylistManager playlists={playlistsWithLists} addList={addList} playList={playList} deleteList={deleteList} />);

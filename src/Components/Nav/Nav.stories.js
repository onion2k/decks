import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StoryRouter from 'storybook-react-router';
import { linkTo } from '@storybook/addon-links';

import Nav from './index.js';

storiesOf('Nav', module)
  .addDecorator(
    StoryRouter(
      {
        '/': linkTo('Linked stories', 'home'),
        '/articles/*': linkTo('Linked stories', 'article'),
      },
      { initialEntries: ['/about'] }
    )
  )
  .add('Basic', () => <Nav />);

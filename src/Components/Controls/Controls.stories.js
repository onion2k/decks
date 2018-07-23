import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StoryRouter from 'storybook-react-router';
import { linkTo } from '@storybook/addon-links';

import Controls from './index.js';

storiesOf('Controls', module)
  .addDecorator(
    StoryRouter(
      {
        '/': linkTo('Linked stories', 'home'),
        '/articles/*': linkTo('Linked stories', 'article'),
      },
      { initialEntries: ['/about'] }
    )
  )
  .add('about', () => <Controls />);

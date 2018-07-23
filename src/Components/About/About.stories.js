import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import About from './index.js';

storiesOf('About', module)
  .add('Basic', () => (
    <About />
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Nav from '../Components/Nav';

storiesOf('Nav', module)
  .add('Basic', () => (
    <Nav />
  ));

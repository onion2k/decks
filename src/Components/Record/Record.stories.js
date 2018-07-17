import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Record from '../Components/Record';

storiesOf('Record', module)
  .add('Basic', () => (
    <Record />
  ));

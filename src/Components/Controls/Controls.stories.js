import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Controls from '../Components/Controls';

storiesOf('Controls', module)
  .add('Basic', () => (
    <Controls />
  ));

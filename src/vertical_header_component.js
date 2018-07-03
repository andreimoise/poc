import React from 'react';
import { VerticalHeader } from 'metro-ui-components';

const VerticalHead = () => (
  <VerticalHeader logoVariant="metro-united">
    <VerticalHeader.Button
      iconType="search"
      htmlTitle="Search"
      onClick={ () => {return this;}}
      push
    />
    <VerticalHeader.Button iconType="profile" htmlTitle="Your profile" onClick={ () => {return this;}} />
    <VerticalHeader.Button iconType="launch" htmlTitle="Launch" onClick={ () => {return this;}} />
    <VerticalHeader.Button iconType="lock" htmlTitle="Privacy Settings" onClick={ () => {return this;}} />
    <VerticalHeader.Button iconType="trash" htmlTitle="Trash bin" onClick={ () => {return this;}} />
  </VerticalHeader>
)

export default VerticalHead
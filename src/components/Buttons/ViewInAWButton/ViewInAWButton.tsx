import React from 'react';

import Button from '@material-ui/core/Button';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function ViewInAWButton(props: { disabled?: boolean; className?: string }) {
  const { room } = useVideoContext();

  let awUrl = 'https://app.agentwalrus.com/#/app/sessions';

  if (room) {
    awUrl += '?user_name=' + room.localParticipant.identity;
  }

  return (
    <a href={awUrl} target="_blank" rel="noreferrer">
      <Button className={props.className} data-cy-audio-toggle>
        View in Agent Walrus
      </Button>
    </a>
  );
}

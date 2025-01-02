

"use client"

import { CallControls, CallingState, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, User } from '@stream-io/video-react-sdk';
import { ParticipantView, StreamVideoParticipant } from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0FkbWlyYWxfVGhyYXduIiwidXNlcl9pZCI6IkFkbWlyYWxfVGhyYXduIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzU4MDI0NzQsImV4cCI6MTczNjQwNzI3NH0.-hU8mlMAjytX9LgeZ9ylkO3dw7UwpVYinD_IRttt-XI';
const userId = 'Admiral_Thrawn';
const callId = 'KEWck4fWSjKr';

// set up the user object
const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function vidView() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}



const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};

const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};

export const MyUILayout = () => {
  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
    // ... other hooks
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (

    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};
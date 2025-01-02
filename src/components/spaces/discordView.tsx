

"use client"

import React, {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, LoadingIndicator, ChannelList} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css';

function DiscordApp() {

  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {

    async function initChat() {

      /*
        // disable auth checks, allows dev token usage
        await client.updateAppSettings({
        disable_auth_checks: true,
      });

      // re-enable auth checks
      await client.updateAppSettings({
      disable_auth_checks: false,
      });

      */ 

      const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
      const chatClient = StreamChat.getInstance(apiKey!, {timeout: 6000});

      // await client.setGuestUser({ id: "tommaso" });
      // const connectResponse = await client.connectAnonymousUser();

      // const set = await chatClient.connectUser({ id: userID }, token);

      await chatClient.connectUser({
        id: 'tswix',
        name: 'Tswix',
        image: 'default-avatar.png',
        privacy_settings: {
          typing_indicators: {
            enabled: true,
          },
          read_receipts: {enabled: true
          },
        },
      },
        chatClient.devToken('tswix')
      );

      // const user_2 = await chatClient.connectUser({
      //   id: 'breezy',
      //   name: 'Breezy',
      //   image: 'default-avatar.png',
      //   privacy_settings: {
      //     typing_indicators: {
      //       enabled: true,
      //     },
      //     read_receipts: {enabled: true
      //     },
      //   },
      // },
      //   chatClient.devToken('breezy')
      // );

      /*
       // Define values.
    const api_key = "{{ api_key }}";
    const api_secret = "{{ api_secret }}";
    const user_id = "john";

    // Initialize a Server Client
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    // Create User Token
    const token = serverClient.createToken(user_id);

    // creates a token that expires in 1 hour using moment.js
    const timestamp = Number(moment().add("1h").format("X"));
    const token1 = client.createToken("john", timestamp);

    // the same can be done with plain javascript
    const token2 = client.createToken(
    "john",
    Math.floor(Date.now() / 1000) + 60 * 60,
    );
    
    const client = new StreamChat("api_key");
    const userID = "vishal";

    client.connectUser({ id: userID }, async () => {
    // make a request to your own backend to get the token
    const response = await httpBackend.post("/chat-token/", { userID });
    return response.token;
    });

    */ 

      /*
      const result = await channel.addMembers([{ user_id: "james_bond" }]);
      console.log(result.members[0].channel_role); // "channel_member"
      */ 


      /*
      Stream Chat has a soft cap of 3000 channel memberships per user.
      If your use case requires >3000 channel memberships per user,
      consider removing users from channels or using elevated permissions
      to allow a user to access channels without membership if your use 
      case allows
      */

      // const newChannel = chatClient.channel("messaging", "dev", {
      //   name: "Dev network",
      //   memebers: ['tswix', 'breezy'],
      // });
      const newChannel = chatClient.channel('messaging', 'Discord', {
        name: "Discord Clone",
      });
      
      /*
          typing_events : Controls if typing indicators are shown.
          reactions : Controls if users are allowed to add reactions to messages.
          replies : Enables message threads and replies.
          uploads : Allows image and file uploads within messages.
          url_enrichment : When enabled, messages containing URLs will be enriched automatically with image and text related to the message.
          commands : Enable a set of commands for this channel.
          max_message_length : The max message length.
          blocklist : A list of words you can define to moderate chat messages. More information can be found here.
          blocklist_behavior : set as block or flag to determine what happens to a message containing blocked words.
          grants : Allows to modify channel-type permission grants for particular channel. More information can be found here
      */  

      // await discord.updatePartial({
      //   set: {
      //     // default if set is empty
      //     // config_overrides: {
      //     //   blocklist: "medical_blocklist",
      //     //   blocklist_behavior: "block",
      //     // },
      //   },
      // });

      /*

      Channel Types:
      
      Livestream: Sensible defaults in case you want to build chat like YouTube or Twitch.
      Messaging: Configured for apps such as WhatsApp or Facebook Messenger.
      Team: If you want to build your own version of Slack or something similar, start here.
      Commerce: Good defaults for building something like your own version of Intercom or Drift.
      Gaming: Defaults for adding chat to video games.

      */

      // const channel_2 = chatClient.channel('messaging', {
      //   members: ["tswix", "breez"],
      //   name: "Dev network",
      // });

      // first let’s create a filter to make messaging channels that include a specific user
      // const filter = { type: "messaging", members: { $in: ["tswix"] } };
      // we can also define a sort order of most recent messages first
      // const sort = { last_message_at: -1 };

      // finally, we can query for those channels, automatically watching them for the
      // currently connected user
      // const channels = await chatClient.queryChannels(filter, { last_message_at: -1 } as const, { watch: true });

      /*
      const channel = client.channel("livestream", "watch-this-channel", {});

      channel.watch();

      channel.on("user.watching.start", (event) => {
      // handle watch started event
      console.log(`${event.user.id} started watching`);
      });
      channel.on("user.watching.stop", (event) => {
      // handle watch stopped event
      console.log(`${event.user.id} stopped watching`);
      });

      */ 

      // const text = "I'm moving the air Randy, I'm moving the air.";
      // const messageResponse = await newChannel.sendMessage({text, customField: 123});

      // chatClient.on('message.new', (event: any) => {
      //   console.log("Received an event on client - ", event);
      // });
      setClient(chatClient);
      setChannel(newChannel);
      // setResponse(messageResponse);
    }

    initChat();

    return () => {
      if(client) {
        client.disconnectUser();
      }
    }
  }, []);

  // useEffect(() => {
  //   if (response) {
  //     setMessages(prev => [...prev, response.message]);
  //   }
  // }, [response]);

  if(!client || !channel) {
    return <LoadingIndicator />;
  }

  return (
    <div className="h-[calc(100vh-3.75rem)]">
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default DiscordApp;
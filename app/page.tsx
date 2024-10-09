"use client";
import { AllApps } from "@/components/all-apps";
import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import { Windows } from "@/components/windows";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuContentOptions } from "@/components/context-menu-content";
import { MusicPlayer } from "@/components/music-player";
import { PromotionWidget } from "@/components/promotion-widget";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
  getRandomColor,
  getRandomColors,
  getRandomUniqueColor,
  sendLog,
} from "@/lib/utils";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Coordinates, User, Payload } from "@/types";
import {
  REALTIME_LISTEN_TYPES,
  REALTIME_PRESENCE_LISTEN_EVENTS,
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimeChannelSendResponse,
} from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/client";
import cloneDeep from "lodash.clonedeep";
import throttle from "lodash.throttle";
import { Loader2 } from "lucide-react";
import Cursor from "@/components/cursor";

const userId = nanoid();

const LATENCY_THRESHOLD = 400;
const MAX_ROOM_USERS = 50;
const MAX_DISPLAY_MESSAGES = 50;
const MAX_EVENTS_PER_SECOND = 10;
const X_THRESHOLD = 25;
const Y_THRESHOLD = 35;

export default function Home({ params }: any) {
  const router = useRouter();
  const localColorBackup = getRandomColor();

  // These states will be managed via ref as they're mutated within event listeners
  const usersRef = useRef<{ [key: string]: User }>({});
  const mousePositionRef = useRef<Coordinates>();

  const joinTimestampRef = useRef<number>();

  const [mousePosition, _setMousePosition] = useState<Coordinates>();
  const [latency, setLatency] = useState<number>(0);
  const [roomId, setRoomId] = useState<undefined | string>(undefined);
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  const [isInitialStateSynced, setIsInitialStateSynced] =
    useState<boolean>(false);

  const setMousePosition = (coordinates: Coordinates) => {
    mousePositionRef.current = coordinates;
    _setMousePosition(coordinates);
  };

  const mapInitialUsers = (userChannel: RealtimeChannel, roomId: string) => {
    const state = userChannel.presenceState();
    const _users = state[roomId];

    if (!_users) return;

    // Deconflict duplicate colours at the beginning of the browser session
    const colors =
      Object.keys(usersRef.current).length === 0
        ? getRandomColors(_users.length)
        : [];

    if (_users) {
      setUsers((existingUsers) => {
        const updatedUsers = _users.reduce(
          (
            acc: { [key: string]: User },
            { user_id: userId }: any,
            index: number,
          ) => {
            const userColors = Object.values(usersRef.current).map(
              (user: any) => user.color,
            );
            // Deconflict duplicate colors for incoming clients during the browser session
            const color =
              colors.length > 0
                ? colors[index]
                : getRandomUniqueColor(userColors);

            acc[userId] = existingUsers[userId] || {
              x: 0,
              y: 0,
              color: color.bg,
              hue: color.hue,
            };
            return acc;
          },
          {},
        );
        usersRef.current = updatedUsers;
        return updatedUsers;
      });
    }
  };

  useEffect(() => {
    let roomChannel: RealtimeChannel;
    // const { slug } = params;
    // // const { slug } = router.query
    const slug = "3iQI5sgx_DMsW1f0hQOkG";
    const slugRoomId = Array.isArray(slug) ? slug[0] : undefined;

    if (!roomId) {
      // roomId is undefined when user first attempts to join a room

      joinTimestampRef.current = performance.now();

      /* 
        Client is joining 'rooms' channel to examine existing rooms and their users
        and then the channel is removed once a room is selected
      */
      roomChannel = supabaseClient.channel("rooms");

      roomChannel
        .on(
          REALTIME_LISTEN_TYPES.PRESENCE,
          { event: REALTIME_PRESENCE_LISTEN_EVENTS.SYNC },
          () => {
            let newRoomId;
            const state = roomChannel.presenceState();

            // User attempting to navigate directly to an existing room with users
            if (
              slugRoomId &&
              slugRoomId in state &&
              state[slugRoomId].length < MAX_ROOM_USERS
            ) {
              newRoomId = slugRoomId;
            }

            // User will be assigned an existing room with the fewest users
            if (!newRoomId) {
              const [mostVacantRoomId, users] =
                Object.entries(state).sort(
                  ([, a], [, b]) => a.length - b.length,
                )[0] ?? [];

              if (users && users.length < MAX_ROOM_USERS) {
                newRoomId = mostVacantRoomId;
              }
            }

            // Generate an id if no existing rooms are available
            setRoomId(newRoomId ?? nanoid());
          },
        )
        .subscribe();
    } else {
      // When user has been placed in a room

      joinTimestampRef.current &&
        sendLog(
          `User ${userId} joined Room ${roomId} in ${(
            performance.now() - joinTimestampRef.current
          ).toFixed(1)} ms`,
        );

      /* 
        Client is re-joining 'rooms' channel and the user's id will be tracked with Presence.

        Note: Realtime enforces unique channel names per client so the previous 'rooms' channel
        has already been removed in the cleanup function.
      */
      roomChannel = supabaseClient.channel("rooms", {
        config: { presence: { key: roomId } },
      });
      roomChannel.on(
        REALTIME_LISTEN_TYPES.PRESENCE,
        { event: REALTIME_PRESENCE_LISTEN_EVENTS.SYNC },
        () => {
          setIsInitialStateSynced(true);
          mapInitialUsers(roomChannel, roomId);
        },
      );
      roomChannel.subscribe(async (status: `${REALTIME_SUBSCRIBE_STATES}`) => {
        if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          const resp: RealtimeChannelSendResponse = await roomChannel.track({
            user_id: userId,
          });

          // if (resp === "ok") {
          //   router.push(`/${roomId}`);
          // } else {
          //   router.push(`/`);
          // }
        }
      });

      // 🍎 Get the room's existing messages that were saved to database
    }

    // Must properly remove subscribed channel
    return () => {
      roomChannel && supabaseClient.removeChannel(roomChannel);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !isInitialStateSynced) return;

    let pingIntervalId: ReturnType<typeof setInterval> | undefined;
    let messageChannel: RealtimeChannel, pingChannel: RealtimeChannel;
    let setMouseEvent: (e: MouseEvent) => void = () => {},
      onKeyDown: (e: KeyboardEvent) => void = () => {};

    // Ping channel is used to calculate roundtrip time from client to server to client
    pingChannel = supabaseClient.channel(`ping:${userId}`, {
      config: { broadcast: { ack: true } },
    });
    pingChannel.subscribe((status: `${REALTIME_SUBSCRIBE_STATES}`) => {
      if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        pingIntervalId = setInterval(async () => {
          const start = performance.now();
          const resp = await pingChannel.send({
            type: "broadcast",
            event: "PING",
            payload: {},
          });

          if (resp !== "ok") {
            console.log("pingChannel broadcast error");
            setLatency(-1);
          } else {
            const end = performance.now();
            const newLatency = end - start;

            if (newLatency >= LATENCY_THRESHOLD) {
              sendLog(
                `Roundtrip Latency for User ${userId} surpassed ${LATENCY_THRESHOLD} ms at ${newLatency.toFixed(
                  1,
                )} ms`,
              );
            }

            setLatency(newLatency);
          }
        }, 1000);
      }
    });

    messageChannel = supabaseClient.channel(`chat_messages:${roomId}`);

    // Listen for messages inserted into the database
    // ...

    // Listen for cursor positions from other users in the room
    messageChannel.on(
      REALTIME_LISTEN_TYPES.BROADCAST,
      { event: "POS" },
      (payload: Payload<{ user_id: string } & Coordinates>) => {
        setUsers((users) => {
          const userId = payload!.payload!.user_id;
          const existingUser = users[userId];

          if (existingUser) {
            const x =
              (payload?.payload?.x ?? 0) - X_THRESHOLD > window.innerWidth
                ? window.innerWidth - X_THRESHOLD
                : payload?.payload?.x;
            const y =
              (payload?.payload?.y ?? 0 - Y_THRESHOLD) > window.innerHeight
                ? window.innerHeight - Y_THRESHOLD
                : payload?.payload?.y;

            users[userId] = { ...existingUser, ...{ x, y } };
            users = cloneDeep(users);
          }

          return users;
        });
      },
    );

    // Listen for messages sent by other users directly via Broadcast
    // ...

    messageChannel.subscribe((status: `${REALTIME_SUBSCRIBE_STATES}`) => {
      if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        // Lodash throttle will be removed once realtime-js client throttles on the channel level
        const sendMouseBroadcast = throttle(({ x, y }) => {
          messageChannel
            .send({
              type: "broadcast",
              event: "POS",
              payload: { user_id: userId, x, y },
            })
            .catch(() => {});
        }, 1000 / MAX_EVENTS_PER_SECOND);

        setMouseEvent = (e: MouseEvent) => {
          const [x, y] = [e.clientX, e.clientY];
          sendMouseBroadcast({ x, y });
          setMousePosition({ x, y });
        };

        onKeyDown = async (e: KeyboardEvent) => {
          if (document.activeElement?.id === "email") return;

          // Start typing session
          // ..

          // End typing session without sending
          // ...
        };

        window.addEventListener("mousemove", setMouseEvent);
        window.addEventListener("keydown", onKeyDown);
      }
    });

    return () => {
      pingIntervalId && clearInterval(pingIntervalId);

      window.removeEventListener("mousemove", setMouseEvent);
      window.removeEventListener("keydown", onKeyDown);

      pingChannel && supabaseClient.removeChannel(pingChannel);
      messageChannel && supabaseClient.removeChannel(messageChannel);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, isInitialStateSynced]);

  if (!roomId) {
    return <Loader2 size={50} className="animate-spin" />;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ContextMenuContentOptions />
        <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-dot-black/[0.2] dark:bg-dot-white/[0.2] md:overflow-hidden">
          {/* <Wallpaper /> */}
          <Windows />
          <Header />
          <section className="flex h-full w-full flex-col items-start justify-between gap-10 overflow-y-auto pb-72 md:max-h-[calc(100vh-40px)] md:flex-row md:overflow-y-hidden md:pb-0">
            <AllApps />
            <button onClick={() => {
              console.log(users)
              console.log(roomId)
            }}>log </button>

            {/* 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎*/}
            <Users users={users} />
            {Object.entries(users).reduce((acc, [userId, data]) => {
              const { x, y, color, hue } = data;
              if (x && y) {
                acc.push(
                  <Cursor
                    key={userId}
                    x={x}
                    y={y}
                    color={color}
                    hue={hue}
                    message=""
                    isTyping={false}
                  />,
                );
              }
              return acc;
            }, [] as ReactElement[])}

            {/* Cursor for local client: Shouldn't show the cursor itself, only the text bubble */}
            {Number.isInteger(mousePosition?.x) &&
              Number.isInteger(mousePosition?.y) && (
                <Cursor
                  isLocalClient
                  x={mousePosition?.x}
                  y={mousePosition?.y}
                  color={users[userId]?.color ?? localColorBackup.bg}
                  hue={users[userId]?.hue ?? localColorBackup.hue}
                  isTyping={false}
                  isCancelled={false}
                  message={"Hello"}
                  onUpdateMessage={(e) => alert(e)}
                />
              )}
            {/* 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎*/}

            <div className="mx-auto flex h-full w-[90%] flex-col items-start justify-start gap-10 md:mx-0 md:max-w-sm md:p-2 lg:max-w-md lg:flex-col-reverse lg:justify-between lg:gap-0 lg:p-4">
              <MusicPlayer />
              <PromotionWidget />
            </div>
            <Dock />
          </section>
        </main>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}

interface Props {
  users: Record<string, User>;
}

const Users: React.FC<Props> = ({ users }) => {
  return (
    <div className="relative">
      {Object.entries(users).map(([userId, userData], idx) => {
        return (
          <div key={userId} className="relative">
            <div
              key={userId}
              className={[
                "bg-scale-1200 absolute right-0 h-8 w-8 rounded-full bg-[length:50%_50%] bg-center transition-all",
                "flex items-center justify-center bg-no-repeat shadow-md",
              ].join(" ")}
              style={{
                border: `1px solid ${userData.hue}`,
                background: userData.color,
                transform: `translateX(${Math.abs(idx - (Object.keys(users).length - 1)) * -20}px)`,
              }}
            >
              <div
                style={{ background: userData.color }}
                className="animate-ping-once h-7 w-7 rounded-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

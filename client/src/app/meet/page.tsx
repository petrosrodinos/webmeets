'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
// import Daily from '@daily-co/daily-js';
// import { DailyProvider, DailyVideo } from '@daily-co/daily-react';
import DailyIframe from '@daily-co/daily-js';

const CALL_OPTIONS: any = {
  showLeaveButton: true,
  iframeStyle: {
    height: '100%',
    width: '100%',
    aspectRatio: 16 / 9,
    border: '0',
    borderRadius: '12px',
  },
};

const Meet = () => {
  const [room, setRoom] = useState<any>('https://webmeets.daily.co/qa07ZiVavtneCcffCux7');
  const [callFrame, setCallFrame] = useState<any>(null);
  const callRef = useRef<any>(null);
  const createdRef = useRef<any>(false);

  const createAndJoinCall = useCallback(() => {
    const newCallFrame: any = DailyIframe.createFrame(callRef?.current, CALL_OPTIONS);

    setCallFrame(newCallFrame);
    createdRef.current = true;

    newCallFrame.join({ url: room });

    const leaveCall = () => {
      setRoom(null);
      setCallFrame(null);

      callFrame.destroy();
    };

    newCallFrame.on('left-meeting', leaveCall);
  }, []);

  useEffect(() => {
    if (callFrame || createdRef.current) return;

    createAndJoinCall();
  }, []);

  return (
    <div>
      <div ref={callRef} className="call" />
    </div>
  );
};

export default Meet;

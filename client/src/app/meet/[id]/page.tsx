'use client';
import { useEffect, FC, useRef, useState, useCallback } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { joinBooking } from '@/services/booking';
import { useQuery } from 'react-query';

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

interface MeetProps {
  params: {
    id: string;
  };
}

const Meet: FC<MeetProps> = ({ params }) => {
  const { id } = params;
  const [room, setRoom] = useState<any>(id);
  const [callFrame, setCallFrame] = useState<any>(null);
  const callRef = useRef<any>(null);
  const createdRef = useRef<any>(false);

  useQuery(['joinBooking', id], () => joinBooking({ bookingId: id }), {
    onSuccess: (data) => {
      createAndJoinCall(data.room.url);
    },
  });

  const createAndJoinCall = useCallback((roomId: string) => {
    if (callFrame || createdRef.current) return;
    const newCallFrame: any = DailyIframe.createFrame(callRef?.current, CALL_OPTIONS);

    setCallFrame(newCallFrame);
    createdRef.current = true;

    newCallFrame.join({ url: roomId });

    const leaveCall = () => {
      setRoom(null);
      setCallFrame(null);

      callFrame.destroy();
    };

    newCallFrame.on('left-meeting', leaveCall);
  }, []);

  //   useEffect(() => {
  //     if (callFrame || createdRef.current) return;

  //     createAndJoinCall();
  //   }, []);

  return (
    <div>
      <div ref={callRef} className="call" />
    </div>
  );
};

export default Meet;

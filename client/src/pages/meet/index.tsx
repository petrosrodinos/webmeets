import { useEffect, FC, useRef, useState, useCallback } from "react";
import DailyIframe from "@daily-co/daily-js";
import { joinBooking } from "services/booking";
import { useQuery } from "react-query";
import Spinner from "components/ui/Spinner";
import { useParams } from "react-router-dom";
import { Alert, AlertIcon } from "@chakra-ui/react";

const CALL_OPTIONS: any = {
  showLeaveButton: true,
  iframeStyle: {
    height: "100%",
    width: "100%",
    aspectRatio: 16 / 9,
    border: "0",
    borderRadius: "12px",
  },
};

const Meet: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [callFrame, setCallFrame] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const callRef = useRef<any>(null);
  const createdRef = useRef<any>(false);

  const { isLoading } = useQuery(
    ["join-booking", id],
    () => joinBooking({ bookingId: id as string }),
    {
      onSuccess: (data) => {
        if (data?.room?.url) {
          createAndJoinCall(data.room.url);
        } else {
          setError("Waiting for the host to start the meeting. Please try again later.");
        }
      },
      onError: (error) => {
        setError(error);
      },
    }
  );

  const createAndJoinCall = useCallback((roomId: string) => {
    if (callFrame || createdRef.current) return;
    const newCallFrame: any = DailyIframe.createFrame(callRef?.current, CALL_OPTIONS);

    setCallFrame(newCallFrame);
    createdRef.current = true;

    newCallFrame.join({ url: roomId });

    const leaveCall = () => {
      setCallFrame(null);

      callFrame.destroy();
    };

    newCallFrame.on("left-meeting", leaveCall);
  }, []);

  useEffect(() => {
    return () => {
      if (callFrame) {
        callFrame.leave();
        callFrame.destroy();
        setCallFrame(null);
      }
    };
  }, []);

  return (
    <div>
      <Spinner loading={isLoading} />
      {error && (
        <Alert status="warning">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <div ref={callRef} className="call" />
    </div>
  );
};

export default Meet;

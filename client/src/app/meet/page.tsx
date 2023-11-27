'use client';
import { useEffect, useRef, useState } from 'react';
import Daily from '@daily-co/daily-js';
import { DailyProvider, DailyVideo } from '@daily-co/daily-react';

const Meet = () => {
  // const co = Daily.createCallObject({
  //   url: 'https://webmeets.daily.co/tbvAWCw5PsRw0Ff7ATnk',
  // });

  return (
    <DailyProvider url="https://webmeets.daily.co/tbvAWCw5PsRw0Ff7ATnk">
      {/* <DailyVideo automirror sessionId={''} type={'video'} /> */}
    </DailyProvider>
  );
};

export default Meet;

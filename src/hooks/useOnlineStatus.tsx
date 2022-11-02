import React, { createContext, useContext, useEffect, useState } from "react";

export const OnlineStatusContext = createContext(true);

interface Props {
  children: React.ReactNode;
}

const PING_RESOURCE = "/ping.txt";
const TIMEOUT_TIME_MS = 3000;
const ONLINE_POLLING_INTERVAL = 10000;

/**
 * Promisified-Timeout that throws an error after 3 seconds in.
 */
function timeout(time: number, promise: Promise<Response>): Promise<unknown> {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, time);
    promise.then(resolve, reject);
  });
}

async function checkOnlineStatus(): Promise<boolean> {
  const controller = new AbortController();

  const { signal } = controller;

  // If the browser has no network connection, return offline
  if (!navigator.onLine) {
    return navigator.onLine;
  }

  let status = false;

  try {
    await timeout(
      TIMEOUT_TIME_MS,
      fetch(PING_RESOURCE, {
        method: "GET",
        signal,
      })
    );

    status = true;
  } catch (error) {
    // Error Log
    console.error(error);

    // This can be because of request timed out
    // so we abort the request for any case
    controller.abort();
  }

  return status;
}

/**
 * Online Status Context Provider
 */
export function OnlineStatusProvider({ children }: Props): JSX.Element {
  const [onlineStatus, setOnlineStatus] = useState(true);

  const checkStatus = async () => {
    const online = await checkOnlineStatus();

    setOnlineStatus(online);
  };

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });

    const intervalId = setInterval(() => {
      checkStatus();
    }, ONLINE_POLLING_INTERVAL);

    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false);
      });

      clearInterval(intervalId);
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>{children}</OnlineStatusContext.Provider>
  );
}

/**
 * React hook that enables any component to tell if the user is online or offline.
 */
function useOnlineStatus() {
  const store = useContext(OnlineStatusContext);

  return store;
}

export default useOnlineStatus;

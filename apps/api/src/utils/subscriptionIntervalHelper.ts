import { pubSub } from "./pubSub";
import { withStaticFields } from "./withObservable";

export const subscriptionInterval = async <D>(
  dataFn: () => Promise<D>,
  key: string,
  timeout = 1000
) => {
  let prevValue: D = await dataFn();

  pubSub.publish(key, {
    [key]: prevValue,
  });

  const interval = setInterval(async () => {
    const data = await dataFn();

    if (JSON.stringify(prevValue) !== JSON.stringify(data)) {
      prevValue = data;
      pubSub.publish(key, {
        [key]: data,
      });
    }
  }, timeout);

  return withStaticFields(pubSub.asyncIterator(key), () => {
    clearInterval(interval);
  });
};

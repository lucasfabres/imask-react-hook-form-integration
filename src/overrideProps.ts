type OverrideCallback<T, R> = (
  event: R,
  props: T,
  original?: (event: R) => void
) => void;

type PickMatching<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export function override<T>(props: T) {
  type OverrideEventName = keyof PickMatching<T, CallableFunction | undefined>;

  // remove read-only restriction from props
  const _props = Object.assign({}, { ...props });

  const end = () => _props;

  const hook = <R>(
    name: OverrideEventName,
    callback: OverrideCallback<T, R>
  ) => {
    const original = _props[name];

    type EventType = Parameters<typeof callback>["0"];

    (_props[name] as unknown) = (event: EventType) => {
      callback(event, _props, original as (event: EventType) => void);
    };

    return next();
  };

  const next = () => ({
    hook,
    end,
  });

  return next();
}

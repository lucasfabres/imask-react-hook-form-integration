/* eslint-disable @typescript-eslint/no-non-null-assertion */
import IMask from "imask";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";

type Props = {
  mask: string | RegExp;
  pipeMaskedValues?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Masked = forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const Mask = useMemo(() => IMask.createMask(props.mask), [props.mask]);

    useImperativeHandle(ref, () =>
      Object.assign(inputRef.current!, {
        get value() {
          Mask.resolve(inputRef.current!.value);
          return Mask.unmaskedValue;
        },
      })
    );

    const applyMask = (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.FocusEvent<HTMLInputElement>
    ) => {
      Mask.resolve(event.target.value);
      event.target.value = Mask.displayValue;
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      applyMask(event);

      return props.onChange?.(event);
    };

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      applyMask(event);

      return props.onBlur?.(event);
    };

    return (
      <input {...props} ref={inputRef} onChange={onChange} onBlur={onBlur} />
    );
  }
);

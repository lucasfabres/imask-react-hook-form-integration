import IMask from "imask";
import React, { forwardRef } from "react";
import { override } from "./overrideProps";

type Props = {
  mask: string;
  pipeMaskedValues?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function onChange(
  event: React.ChangeEvent<HTMLInputElement>,
  props: Props,
  original?: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  const mask = IMask.createMask(props.mask);

  // Apply mask
  mask.resolve(event.target.value);

  // Pipe unmasked value
  event.target.value = mask.unmaskedValue;
  original?.(event);

  // Visualize masked value
  event.target.value = mask.displayValue;
}

export const Masked = forwardRef(
  (_props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    // Install masking hooks
    const props = override(_props)
      .hook("onChange", onChange)
      .hook("onBlur", onChange)
      .end();

    return <input ref={ref} {...props} />;
  }
);

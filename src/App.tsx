import { useForm } from "react-hook-form";

import { Masked } from "./Masked";

import "./App.css";
import React from "react";

function App() {
  const { register, handleSubmit } = useForm();
  const renderCount = React.useRef(0);

  React.useEffect(() => {
    renderCount.current++;
  });

  const onSubmit = (values: object) => {
    window.alert(JSON.stringify(values, null, 2));
  };

  return (
    <main onSubmit={handleSubmit(onSubmit)}>
      <h1>iMaskJS + react-hook-form integration</h1>

      <form>
        <span>Renders: {renderCount.current}</span>
        <Masked mask="0000-0000-0000-0000" {...register("phone")} />
        <button>submit</button>
      </form>
    </main>
  );
}

export default App;

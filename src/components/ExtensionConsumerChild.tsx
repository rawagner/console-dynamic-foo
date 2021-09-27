import * as React from "react";
import { usePlansQuery } from "./plans";

const ExtensionConsumerChild: React.FC = () => {
  const plansQuery = usePlansQuery();
  console.log("plansQuery", plansQuery);
  // const [data, loaded] = useK8sWatchResource<K8sResourceCommon[]>({
  //   kind: 'Pod',
  //   isList: true,
  // });
  return (
    <div>
      {/* {loaded ? data.map((d) => <div key={d.metadata.uid}>{d.metadata.name}</div>) : 'loading'} */}

      {/* <div>The WebSocket is currently {connectionStatus}</div>
      {lastJsonMessage ? <span>Last message: {lastJsonMessage?.data?.kind}</span> : null}
      <ul></ul> */}
    </div>
  );
};

export default ExtensionConsumerChild;

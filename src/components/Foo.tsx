import * as React from "react";
import {
  K8sResourceCommon,
  // useK8sWatchResource,
  // useK8sModel,
  useK8sWatchResource,
} from "@openshift-console/dynamic-plugin-sdk";

const Foo: React.FC = () => {
  // useK8sModel()
  // const [model] = useK8sModel(kind);
  // const [data, loaded] = useK8sModel<y>({
  //   kind: "Pod",
  //   isList: true,
  // });
  const [data, loaded] = useK8sWatchResource<K8sResourceCommon[]>({
    kind: "MigCluster",
    namespace: "openshift-migration",
    isList: true,
  });
  const [podData, podsLoaded] = useK8sWatchResource<K8sResourceCommon[]>({
    kind: "Pod",
    isList: true,
  });

  return (
    <>
      <div>
        {loaded
          ? data.map((d) => <div key={d.metadata.uid}>{d.metadata.name}</div>)
          : "loading"}
      </div>
      <div>
        {podsLoaded
          ? podData.map((d) => (
              <div key={d.metadata.uid}>{d.metadata.name}</div>
            ))
          : "loading"}
      </div>
    </>
  );
};
export default Foo;

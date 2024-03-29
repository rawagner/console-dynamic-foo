import * as React from 'react';
import { K8sResourceCommon, useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';

const Foo: React.FC = () => {
  const [data, loaded] = useK8sWatchResource<K8sResourceCommon[]>({
    kind: 'Pod',
    isList: true,
  });
 
  return (
    <div>
      {loaded ? data.map((d) => <div key={d.metadata.uid}>{d.metadata.name}</div>) : 'loading'}
    </div>
  );
};
export default Foo;

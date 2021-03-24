import * as React from 'react';
// import { apis } from '@openshift-console/dynamic-plugin-sdk';

const Foo: React.FC = () => {
    const { useK8sWatchResource } = (window as any).apis;
    const [data, loaded, loadError] = useK8sWatchResource({
      kind: 'Pod',
      isList: true,
      namespaced: true,
    })

    if (!loaded) {
      return (
        <div>loading</div>
      )
    }

    if (loadError) {
      return (
        <div>error</div>
      )
    }

    return <>{(data as any[]).map((d) => <div key={d.metadata.uid}>{d.metadata.name}</div>)}</>
}

export default Foo;

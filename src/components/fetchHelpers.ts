import { QueryFunction, MutateFunction } from "react-query/types/core/types";
import { useHistory } from "react-router-dom";
import { History, LocationState } from "history";
import { KubeResource } from "@konveyor/lib-ui";
import {
  ClusterClient,
  ClientFactory,
  // NamespacedResource,
  // CoreNamespacedResourceKind,
  // CoreNamespacedResource,
} from "@konveyor/lib-ui";

interface IFetchContext {
  history: History<LocationState>;
  checkExpiry: any;
  currentUser: any;
}
export interface IKubeResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  config: Record<string, unknown>;
  headers: Record<string, unknown>;
  request: XMLHttpRequest;
  state?: string;
  reason?: string;
}

// export interface IKubeStatus extends IMetaTypeMeta {
//   status: string;
//   details: {
//     group: string;
//     kind: string;
//     name: string;
//     uid: string;
//   };
//   metadata: Partial<IMetaObjectMeta>;
// }
export const useFetchContext = (): IFetchContext => {
  // const { checkExpiry, currentUser } = useNetworkContext();

  let checkExpiry;
  let currentUser = {
    access_token: "sha256~M4BIv5YWNAUWniqLPONXS2KdW2_x2Ay3VTaMMTNCON0",
    expiry_time: 8333,
  };
  return { history: useHistory(), checkExpiry, currentUser };
};

export const authorizedFetch = async <T>(
  url: string,
  fetchContext: IFetchContext,
  extraHeaders: RequestInit["headers"] = {}
): Promise<T> => {
  // const { history, checkExpiry } = fetchContext;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${fetchContext.currentUser.access_token}`,
        ...extraHeaders,
      },
    });
    if (response.ok && response.json) {
      return response.json();
    } else {
      throw response;
    }
  } catch (error) {
    console.log("error", error);
    // checkExpiry(error, history);
    throw error;
  }
};

export const useAuthorizedFetch = <T>(url: string): QueryFunction<T> => {
  const fetchContext = useFetchContext();
  return () => authorizedFetch(url, fetchContext);
};

export const authorizedPost = async <T, TData>(
  url: string,
  fetchContext: IFetchContext,
  data?: TData
): Promise<T> =>
  authorizedFetch(url, fetchContext, { body: JSON.stringify(data) });

export const useAuthorizedPost = <T, TData>(
  url: string,
  data: TData
): MutateFunction<T, TData> => {
  const fetchContext = useFetchContext();
  return () => authorizedPost(url, fetchContext, data);
};

export const authorizedK8sRequest = async <T>(
  fetchContext: IFetchContext,
  requestFn: () => Promise<IKubeResponse<T>>
): Promise<IKubeResponse<T>> => {
  // const { history, checkExpiry } = fetchContext;

  try {
    const response = await requestFn();
    if (response && response.data) {
      return response;
    } else {
      throw response;
    }
  } catch (error) {
    console.log("error", error);
    // checkExpiry(error, history);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthorizedK8sClient = () => {
  const fetchContext = useFetchContext();
  const client = useClientInstance();
  /* eslint-disable @typescript-eslint/ban-types */
  return {
    get: <T>(resource: KubeResource, name: string, params?: object) =>
      authorizedK8sRequest<T>(fetchContext, () =>
        client.get(resource, name, params)
      ),
    list: <T>(resource: KubeResource, params?: object) =>
      authorizedK8sRequest<T>(fetchContext, () =>
        client.list(resource, params)
      ),
    create: <T>(resource: KubeResource, newObject: object, params?: object) =>
      authorizedK8sRequest<T>(fetchContext, () =>
        client.create(resource, newObject, params)
      ),
    delete: <T = any>(resource: KubeResource, name: string, params?: object) =>
      authorizedK8sRequest<T>(fetchContext, () =>
        client.delete(resource, name, params)
      ),
    patch: <T>(
      resource: KubeResource,
      name: string,
      patch: object,
      params?: object
    ) =>
      authorizedK8sRequest<T>(fetchContext, () =>
        client.patch(resource, name, patch, params)
      ),
    put: <T>(
      resource: KubeResource,
      name: string,
      object: object,
      params?: object
    ) =>
      authorizedK8sRequest<T>(fetchContext, () =>
        client.put(resource, name, object, params)
      ),
  };
  /* eslint-enable @typescript-eslint/ban-types */
};

export const useClientInstance = (): ClusterClient => {
  // const { currentUser } = useNetworkContext();
  let currentUser = {
    access_token: "sha256~M4BIv5YWNAUWniqLPONXS2KdW2_x2Ay3VTaMMTNCON0",
    expiry_time: 86400,
  };
  const user = {
    access_token: currentUser.access_token || "",
    expiry_time: currentUser.expiry_time || 0,
  };
  return ClientFactory.cluster(
    user,
    "/api/plugins/console-dynamic-foo/mig-api"
  );
};

export type AuthorizedClusterClient = ReturnType<typeof useAuthorizedK8sClient>;

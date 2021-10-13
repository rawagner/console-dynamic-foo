import * as React from "react";
import { useEffect } from "react";

const RedirectToLogin: React.FunctionComponent<{}> = () => {
  useEffect(() => {
    // window.location.href = "/k8s/login"
    window.location.href = "/api/plugins/console-dynamic-foo/login";
  }, []);
  return null;
};

export default RedirectToLogin;

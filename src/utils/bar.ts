import { FeatureFlagHandler } from '@openshift-console/dynamic-plugin-sdk';

export default (label: string) => `Hello ${label} Function!`;

export const testHandler: FeatureFlagHandler = function() {
  // eslint-disable-next-line no-console
  console.log('testHandler called', arguments);
};

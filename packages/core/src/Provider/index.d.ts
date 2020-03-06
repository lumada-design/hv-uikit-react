declare module '@hv/uikit-react-core/dist/Provider' {
  import React from 'react'

  class HvProvider extends React.Component<HvProviderProps, any> {}

  export default HvProvider

  export interface HvProviderProps extends React.HTMLAttributes<HvProvider> {}
}

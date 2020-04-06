declare module '@hv/uikit-react-lab/dist/Footer' {
  import React from 'react'
  
  class HvFooter extends React.Component<HvFooterProps, any> {}

  export default HvFooter

  export interface HvFooterProps extends React.HTMLAttributes<HvFooter> {
    classes?: {
      root?: string
      labelRight?: string
      labelLeft?: string
    }
    labelLeftName?: string
  }
}

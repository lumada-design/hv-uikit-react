declare module '@hv/uikit-react-lab/dist' {
  export class HvFooter extends React.Component<HvFooterProps, any> {}

  export interface HvFooterProps extends React.HTMLAttributes<HvFooter> {
    classes?: {
      root?: string
      labelRight?: string
      labelLeft?: string
    }
    labelLeftName?: string
  }
}

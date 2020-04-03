declare module '@hv/uikit-react-core/dist/Badge' {
  import React from 'react'

  class HvBadge extends React.Component<HvBadgeProps> {}

  export default HvBadge

  export interface HvBadgeProps extends React.HTMLAttributes<HvBadge> {
    /**
     *   A Jss Object used to override or extend the styles applied to the badge.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string

      /**
       * Styles applied to the component badge position.
       */
      badgePosition?: string

      /**
       * Styles applied to the component badge.
       */
      badge?: string

      /**
       * Styles applied to the component badge count.
       */
      count?: string

      /**
       * Styles applied to the component badge when count greater than 9.
       */
      badgeTwoDigits?: string
    }

    /**
     * Count is the number of unread notifications
     */
    count?: number

    /**
     * True if count should be displayed.
     */
    showCount?: boolean

    /**
     * The maximum number of unread notifications to be displayed
     */
    maxCount?: number

    /**
     * Icon which the notification will be attached.
     */
    icon?: React.ReactNode

    /**
     * Text which the notification will be attached.
     */
    text?: string

    /**
     * Text variant.
     */
    textVariant?: string
  }
}

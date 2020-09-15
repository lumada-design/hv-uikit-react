const styles = theme => ({
  root: {
    margin: 0,
    fontFamily: theme.hv.typography.fontFamily
  },
  "5xlTitle": theme.hv.typography["5xlTitle"],
  "4xlTitle": theme.hv.typography["4xlTitle"],
  "3xlTitle": theme.hv.typography["3xlTitle"],
  xxlTitle: theme.hv.typography.xxlTitle,
  xlTitle: theme.hv.typography.xlTitle,
  lTitle: theme.hv.typography.lTitle,
  mTitle: theme.hv.typography.mTitle,
  sTitle: theme.hv.typography.sTitle,
  xsTitle: theme.hv.typography.xsTitle,
  xxsTitle: theme.hv.typography.xxsTitle,
  sectionTitle: theme.hv.typography.sectionTitle,
  highlightText: theme.hv.typography.highlightText,
  normalText: theme.hv.typography.normalText,
  placeholderText: theme.hv.typography.placeholderText,
  link: theme.hv.typography.link,
  disabledText: theme.hv.typography.disabledText,
  selectedNavText: theme.hv.typography.selectedNavText,
  vizText: theme.hv.typography.vizText,
  vizTextDisabled: theme.hv.typography.vizTextDisabled,
  xsInlineLink: theme.hv.typography.xsInlineLink,
  noWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

export default styles;

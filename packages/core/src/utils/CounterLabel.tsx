interface CounterLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected: React.ReactNode;
  total: React.ReactNode;
  conjunctionLabel?: React.ReactNode;
}

/** A utility counter component (eg. X / Y) @private */
export const CounterLabel = ({
  selected,
  total,
  conjunctionLabel = "/",
  ...others
}: CounterLabelProps) => {
  return (
    <span {...others}>
      <b>{selected}</b> {` ${conjunctionLabel} ${total}`}
    </span>
  );
};

type PopupLayoutPreviewProps = {
  children: React.ReactNode;
};

export const PopupLayoutPreview = ({ children }: PopupLayoutPreviewProps) => (
  <div className="relative flex flex-col gap-xs border-border border-1 border-t-0 -ml-px h-full p-md p-r-lg [&>span]:font-size-14px">
    {children}
  </div>
);

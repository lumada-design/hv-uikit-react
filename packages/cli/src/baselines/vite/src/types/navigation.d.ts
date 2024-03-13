interface NavigationData {
  id: string;
  label: string;
  path?: string;
  data?: NavigationData[];
}

interface NavigationContextValue {
  navigation?: NavigationData[];
  activePath: NavigationData | undefined;
}

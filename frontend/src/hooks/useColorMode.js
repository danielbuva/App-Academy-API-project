import { useTheme } from "./useTheme";

export function useColorMode(light, dark) {
  const { isNightMode } = useTheme();
  return isNightMode ? dark : light;
}

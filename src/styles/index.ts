import { theme } from "../lib";
import { initializeThemes } from "./root";

// Initialize all themes
initializeThemes();

// Export for direct usage
export const css = theme.generate();

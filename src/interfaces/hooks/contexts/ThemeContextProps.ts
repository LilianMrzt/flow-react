import { themes } from '@constants/Themes'
import { ThemeType } from '@interfaces/types/ThemeType'

export interface ThemeContextProps {
    themeName: ThemeType
    theme: typeof themes.default
    setNewTheme: (newThemeName: ThemeType) => void
}

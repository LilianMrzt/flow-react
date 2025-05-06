import React, { createContext, useContext, useState, useEffect, type FC } from 'react'
import { themes } from '@constants/Themes'
import { ThemeContextProps } from '@interfaces/hooks/contexts/ThemeContextProps'
import { ThemeProviderProps } from '@interfaces/hooks/contexts/ThemeProviderProps'
import { ThemeType } from '@interfaces/types/ThemeType'

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: FC<ThemeProviderProps> = ({
    children
}) => {
    const [themeName, setThemeName] = useState<ThemeType>('default')

    const theme = themes[themeName]

    /**
     * Fonction pour affecter le nouveau theme de l'application
     * @param newThemeName
     */
    const setNewTheme = (newThemeName: ThemeType): void => {
        document.body.classList.add('theme-changing')
        setTimeout(() => {
            document.body.classList.remove('theme-changing')
        }, 50)

        setThemeName(newThemeName)
    }

    /**
     * UseEffect pour affecter les couleurs du theme au root dans le index.css
     */
    useEffect(() => {
        const root = document.documentElement
        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value)
        })
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{
                themeName,
                theme,
                setNewTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider')
    }
    return context
}

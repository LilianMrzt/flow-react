import React, { type FC, type ReactNode } from 'react'
import './sub-title.css'
import { SubTitleProps } from '@interfaces/ui/components/text/SubTitleProps'
import { useTheme } from '@hooks/contexts/ThemeContext'

const SubTitle: FC<SubTitleProps> = ({
    children,
    fontSize,
    color
}): ReactNode => {
    const { theme } = useTheme()

    const colorValue = color ?? theme.text

    return (
        <h2
            className={'sub-title'}
            style={{
                fontSize: fontSize ?? 24,
                color: colorValue
            }}
        >
            {children}
        </h2>
    )
}

export default SubTitle

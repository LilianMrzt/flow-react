import React, { FC, ReactNode } from 'react'
import './separator.css'
import { SeparatorProps } from '@interfaces/ui/components/layout/SeparatorProps'
import { useTheme } from '@hooks/contexts/ThemeContext'

const Separator: FC<SeparatorProps> = ({
    backgroundColor
}): ReactNode => {
    const { theme } = useTheme()

    return (
        <div
            className={'separator'}
            style={{
                backgroundColor: backgroundColor ?? theme.outline
            }}
        />
    )
}

export default Separator

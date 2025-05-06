import React, { FC, ReactNode } from 'react'
import Column from '@components/layout/Column'
import { ScreenProps } from '@interfaces/ui/components/layout/ScreenProps'
import './screen.css'
import SubTitle from '@components/text/SubTitle'
import Text from '@components/text/Text'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'

const Screen: FC<ScreenProps> = ({
    children,
    label,
    description
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <Column
            className={'screen'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
        >
            <Column
                alignItems={'flex-start'}
                height={'fit-content'}
            >
                <Row
                    justifyContent={'space-between'}
                    height={32}
                >
                    <SubTitle>
                        {label}
                    </SubTitle>
                </Row>
                <Text
                    color={theme.textSecondary}
                >
                    {description}
                </Text>
            </Column>
            {children}
        </Column>
    )
}

export default Screen

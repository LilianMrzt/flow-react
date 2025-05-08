import React, { FC, ReactNode } from 'react'
import Column from '@components/layout/Column'
import { ScreenProps } from '@interfaces/ui/components/layout/ScreenProps'
import './screen.css'
import SubTitle from '@components/text/SubTitle'
import Text from '@components/text/Text'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Button from '@components/buttons/Button'

const Screen: FC<ScreenProps> = ({
    children,
    label,
    description,
    buttonContent,
    className
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <Column
            className={'screen'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            gap={24}
        >
            <Column
                alignItems={'flex-start'}
                height={'fit-content'}
                gap={0}
                className={'screen-header'}
            >
                <Row
                    justifyContent={'space-between'}
                    height={40}
                >
                    <SubTitle>
                        {label}
                    </SubTitle>
                    {buttonContent && (
                        <Button
                            label={buttonContent.label}
                            onClick={buttonContent.onClick}
                            icon={buttonContent.icon}
                        />
                    )}
                </Row>
                <Text
                    color={theme.textSecondary}
                >
                    {description}
                </Text>
            </Column>
            <div
                className={`screen-content ${className ? className : ''}`}
            >
                {children}
            </div>
        </Column>
    )
}

export default Screen

import React, { FC, ReactNode } from 'react'
import Card from '@components/layout/Card'
import Text from '@components/text/Text'
import { DashboardCardProps } from '@interfaces/ui/blocs/views/dashboard-screen/DashboardCardProps'
import Column from '@components/layout/Column'
import Icon from '@components/resources/Icon'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'

const DashboardCard: FC<DashboardCardProps> = ({
    label,
    value,
    icon,
    iconColor
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <Card
            width={'100%'}
            padding={16}
        >
            <Row>
                <Column
                    alignItems={'start'}
                    width={'calc(100% - 52px)'}
                >
                    <Text
                        maxLines={1}
                        textAlign={'start'}
                        width={'100%'}
                        color={theme.textSecondary}
                        fontSize={14}
                    >
                        {label}
                    </Text>
                    <Text
                        fontSize={20}
                    >
                        {value.toString()}
                    </Text>
                </Column>
                <Icon
                    color={iconColor}
                    size={20}
                    padding={12}
                    backgroundColor={theme.tertiary}
                    borderRadius={'50%'}
                >
                    {icon}
                </Icon>
            </Row>
        </Card>
    )
}

export default DashboardCard

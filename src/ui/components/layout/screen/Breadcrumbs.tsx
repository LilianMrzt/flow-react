import React, { FC, ReactNode } from 'react'
import Text from '@components/text/Text'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Icon from '@components/resources/Icon'
import { ArrowRightIcon } from '@resources/Icons'
import Row from '@components/layout/Row'
import Button from '@components/buttons/Button'
import { BreadCrumbsProps } from '@interfaces/ui/components/layout/screen/BreadCrumbsProps'

const Breadcrumbs: FC<BreadCrumbsProps> = ({
    breadCrumbsRoutes
}): ReactNode => {
    const navigate = useNavigate()

    const {
        theme
    } = useTheme()

    return (
        <Row
            width={'fit-content'}
            height={30}
            gap={4}
        >
            <Icon
                size={16}
            >
                <ArrowRightIcon/>
            </Icon>
            {breadCrumbsRoutes.map((route, index) => {
                return (
                    <Row
                        key={index}
                        width={'fit-content'}
                        height={30}
                        gap={4}
                    >
                        <Button
                            onClick={() => {
                                navigate(route.path)
                            }}
                            label={route.label}
                            backgroundColor={theme.background}
                            hoverBackgroundColor={theme.secondary}
                            color={theme.text}
                            borderColor={theme.background}
                            hoverColor={theme.primary}
                            padding={'6px 12px'}
                        />
                        {index < breadCrumbsRoutes.length - 1 && (
                            <Text
                                isSelectable={false}
                            >
                                /
                            </Text>
                        )}
                    </Row>
                )
            })}
        </Row>
    )
}

export default Breadcrumbs

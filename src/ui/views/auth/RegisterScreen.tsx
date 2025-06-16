import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import Card from '@components/layout/Card'
import Text from '@components/text/Text'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'
import SubTitle from '@components/text/SubTitle'
import Column from '@components/layout/Column'
import Icon from '@components/resources/Icon'
import { RegisterImage } from '@resources/Images'
import BackgroundPlaceholderScreen from '@components/layout/background-placeholder-screen/BackgroundPlaceholderScreen'
import ManualAccountCreationSection from '@ui/blocs/views/auth/register-screen/ManualAccountCreationSection'
import AccountCreationLandingSection from '@ui/blocs/views/auth/register-screen/AccountCreationLandingSection'

const RegisterScreen = (): ReactNode => {
    const navigate = useNavigate()
    const { theme } = useTheme()

    const [email, setEmail] = useState('')

    const [isManualAccountCreationInformationsVisible, setIsManualAccountCreationInformationsVisible] = useState(false)

    return (
        <BackgroundPlaceholderScreen>
            <Card
                maxWidth={800}
                padding={24}
                width={'100%'}
            >
                <Row>
                    <Column
                        alignItems={'start'}
                        gap={16}
                    >
                        <SubTitle>
                            Create an account
                        </SubTitle>
                        <Column
                            gap={16}
                            height={'fit-content'}
                        >
                            {isManualAccountCreationInformationsVisible ? (
                                <ManualAccountCreationSection
                                    email={email}
                                    setIsManualAccountCreationInformationsVisible={setIsManualAccountCreationInformationsVisible}
                                />
                            ) : (
                                <AccountCreationLandingSection
                                    email={email}
                                    setEmail={setEmail}
                                    setIsManualAccountCreationInformationsVisible={setIsManualAccountCreationInformationsVisible}
                                />
                            )}
                        </Column>
                        <Row>
                            <Text
                                fontSize={14}
                                color={theme.textSecondary}
                            >
                                Already have an account?
                            </Text>
                            <Button
                                fontSize={14}
                                onClick={() => {
                                    navigate(AuthRoutes.signIn.path)
                                }}
                                label={'Log in'}
                                backgroundColor={theme.surface}
                                color={theme.primary}
                                hoverBackgroundColor={theme.secondary}
                                borderColor={theme.surface}
                            />
                        </Row>
                    </Column>
                    <Icon
                        size={400}
                    >
                        <RegisterImage/>
                    </Icon>
                </Row>
            </Card>
        </BackgroundPlaceholderScreen>
    )
}

export default RegisterScreen

import React, { ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Column from '@components/layout/Column'
import TextArea from '@components/inputs/TextArea'

const ProjectCreationModalContent = (): ReactNode => {
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    return (
        <Column
            alignItems={'flex-start'}
            gap={16}
        >
            <TextField
                label={'Name'}
                inputValue={projectName}
                setInputValue={setProjectName}
                placeholder={'Project name'}
            />
            <TextArea
                inputValue={projectDescription}
                setInputValue={setProjectDescription}
                label={'Description'}
                placeholder={'Project description'}
            />
        </Column>
    )
}

export default ProjectCreationModalContent

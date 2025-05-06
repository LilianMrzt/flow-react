import React, { ReactNode, useState } from 'react'
import './drawer.css'
import Button from '@components/buttons/Button'

const Drawer = (): ReactNode => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <div
            className={'drawer'}
            style={{
                width: isDrawerOpen ? 300 : 60
            }}
        >
            <Button
                onClick={() => {
                    setIsDrawerOpen(!isDrawerOpen)
                }}
                label={'Click'}
            />
        </div>
    )
}

export default Drawer

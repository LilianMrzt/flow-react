import React, { type ReactNode } from 'react'

const BacklogTableColumns = (): ReactNode => {
    return (
        <colgroup>
            <col
                style={{
                    width: '100px',
                    textAlign: 'center'
                }}
            />
            <col
                style={{
                    width: '70%'
                }}
            />
            <col
                style={{
                    width: '30%'
                }}
            />
            <col
                style={{
                    width: '100px'
                }}
            />
        </colgroup>
    )
}

export default BacklogTableColumns

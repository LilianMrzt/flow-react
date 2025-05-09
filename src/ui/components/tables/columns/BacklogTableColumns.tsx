import React, { type ReactNode } from 'react'

const BacklogTableColumns = (): ReactNode => {
    return (
        <colgroup>
            <col
                style={{
                    width: '20%'
                }}
            />
            <col
                style={{
                    width: '60%'
                }}
            />
            <col
                style={{
                    width: '20%'
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

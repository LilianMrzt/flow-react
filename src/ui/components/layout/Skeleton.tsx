import React, { FC } from 'react'
import './skeleton.css'
import { SkeletonProps } from '@interfaces/ui/components/layout/SkeletonProps'

const Skeleton: FC<SkeletonProps> = ({
    width,
    height,
    borderRadius
}) => {
    return (
        <div
            className={'skeleton'}
            style={{
                width,
                height,
                borderRadius: borderRadius ?? 8
            }}
        />
    )
}

export default Skeleton

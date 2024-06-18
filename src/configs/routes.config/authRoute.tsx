import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'candiatureForm',
        path: `/candiature-form`,
        component: lazy(() => import('@/views/candiature-form')),
        authority: [],
    }
    
]

export default authRoute

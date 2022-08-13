import React, { PropsWithChildren } from 'react'
import { Lens } from '../../../data/RootLens'

interface ConditionalElementProps {
  condition: boolean | Lens<boolean>
  reversed?: boolean
}

const ConditionalElement: React.FC<PropsWithChildren<ConditionalElementProps>> = ({ children, condition, reversed }) => {
  const cond = typeof condition === 'boolean' ? condition : condition.select()

  if ((!reversed && cond) || (reversed && !cond)) return <>{children}</>

  return <></>
}

export default ConditionalElement

import React, { ReactNode } from 'react'
import Box from '../components/LayoutElements/Box'
import Flex from '../components/LayoutElements/Flex'

interface ContentWithSidebarProps {
  content: ReactNode
  sidebar: ReactNode
}

const ContentWithSidebar: React.FC<ContentWithSidebarProps> = ({ content, sidebar }) => {
  return (
    <Flex width='100%'>
      <Box width='80%'>
        {content}
      </Box>
      <Flex style={{ marginLeft: 'auto' }} width='300px' flexDirection='column'>
        {sidebar}
      </Flex>
    </Flex>
  )
}

export default ContentWithSidebar

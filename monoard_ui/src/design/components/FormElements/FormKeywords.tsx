import { Alert, IconButton, Snackbar, TextField } from '@mui/material'
import React, { useMemo, useState } from 'react'
import Flex from '../LayoutElements/Flex'
import { FormInputElement } from './FormTypes'
import AddIcon from '@mui/icons-material/Add'
import styled from '@emotion/styled'
import { Bold } from '../Typography/Typography'
import colors from '../../variables/colors'
import Box from '../LayoutElements/Box'
import CloseIcon from '@mui/icons-material/Close'

interface FormTextInputProps extends FormInputElement<string> {
  header: string
  placeholder?: string
}

const AddKeywordButton = styled(IconButton)`
  min-width: 56px;
`

const StyledKeywordItem = styled.span`
  color: ${colors.white};
  background-color: ${colors.darkGrey};
  padding: 0 4px 0 7px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
`

const DeleteKeywordButton = styled.button`
  border: none;
  padding: 0;
  margin-left: 5px;
  background-color: transparent;
  color: ${colors.white};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const KeywordItem: React.FC<{ keyword: string, onDelete: () => void }> = ({ keyword, onDelete }) => {
  return (
    <StyledKeywordItem>
      {keyword}
      <DeleteKeywordButton onClick={onDelete}>
        <CloseIcon style={{ fontSize: 14 }} />
      </DeleteKeywordButton>
    </StyledKeywordItem>
  )
}

const FormKeywords: React.FC<FormTextInputProps> = (props) => {
  const { header, lens, label, placeholder, onChangeSideEffect, disabled, variant = 'outlined', setDirty } = props

  const value = lens.select()

  const keywords = useMemo(() => {
    if (!value) return []
    return value.split(',').filter(e => e !== '')
  }, [value])

  const [newKeyword, setNewKeyword] = useState('')
  const [errorToast, setErrorToast] = useState(false)

  const handleKeywordDelete = (keyword: string) => lens.set(keywords.filter(k => k !== keyword).join(','))

  return (
    <>
      <Box>
        <Bold>{header}</Bold>
        
        <Flex flexWrap='wrap' gap='xs'>
          {keywords.map(keyword => <KeywordItem key={keyword} keyword={keyword} onDelete={() => handleKeywordDelete(keyword)} />)}
        </Flex>
      </Box>
      
      <Flex>
        <TextField 
          value={newKeyword}
          onChange={e => {
            setNewKeyword(e.target.value.replaceAll(',', ''))
          }}
          variant={variant}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
        />
        
        <AddKeywordButton
          onClick={() => {
            if (!keywords.includes(newKeyword)) {
              lens.set([...keywords, newKeyword].join(','))
              setNewKeyword('')
            } else {
              setErrorToast(true)
            }
            if (setDirty) setDirty.set(true)
            if (onChangeSideEffect) onChangeSideEffect(newKeyword)
          }}
        >
          <AddIcon />
        </AddKeywordButton>
      </Flex>

      <Snackbar open={errorToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={6000} onClose={() => setErrorToast(false)}>
        <Alert onClose={() => setErrorToast(false)} severity='warning'>
          Dieses Keyword existiert bereits.
        </Alert>
      </Snackbar>
    </>
  )
}

export default FormKeywords

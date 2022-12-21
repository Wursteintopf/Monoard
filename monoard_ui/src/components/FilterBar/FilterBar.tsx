import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useOutsideClick } from '../../design/hooks/useOutsideClick'
import colors from '../../design/variables/colors'
import CloseIcon from '@mui/icons-material/Close'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'

interface FilterBarProps<Type extends string> {
  filterList: Type[]
  setFilterList: (newList: Type[]) => void
  options?: Record<Type, string>
  hideDropdown?: boolean
}

const StyledFilterBar = styled.div`
  margin-top: 10px;
  position: relative;
`

const FilterDropDown = styled.div`
  position: absolute;
  z-index: 1000;
  top: 32px;
  left: 0px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  padding: 10px 10px 10px 20px;
`

const StyledFilterItem = styled.span`
  color: ${colors.veryDarkGrey};
  background-color: ${colors.lightGrey};
  padding: 4px 8px 5px 11px;
  margin-right: 10px;
  text-transform: uppercase;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
`

const DeleteFilterButton = styled.button`
  border: none;
  padding: 0;
  margin-left: 5px;
  background-color: transparent;
  color: ${colors.veryDarkGrey};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const FilterItem: React.FC<{ filter: string, onDelete: () => void }> = ({ filter, onDelete }) => {
  return (
    <StyledFilterItem>
      {filter}
      <DeleteFilterButton onClick={onDelete}>
        <CloseIcon style={{ fontSize: 14 }} />
      </DeleteFilterButton>
    </StyledFilterItem>
  )
}

export const FilterBar = <T extends string>({
  filterList,
  setFilterList,
  options,
  hideDropdown = false,
}: FilterBarProps<T>) => {
  const [filterDropDownOpen, setFilterDropDownOpen] = useState(false)
  const ref = useOutsideClick(() => setFilterDropDownOpen(false))
  
  const toggleFilter = (toggleFilter: T) => {
    if (filterList.includes(toggleFilter)) setFilterList(filterList.filter(f => f !== toggleFilter))
    else setFilterList([...filterList, toggleFilter])
  }

  return (
    <StyledFilterBar>
      {filterList.map(filter => (
        <FilterItem
          key={filter}
          filter={options ? options[filter] : filter}
          onDelete={() => toggleFilter(filter)}
        />
      ))}
      {!hideDropdown && (
        <>
          <Button
            ref={ref}
            size='small'
            variant='outlined'
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setFilterDropDownOpen(!filterDropDownOpen)}
          >
            Filter
          </Button>
          {filterDropDownOpen && options && (
            <FilterDropDown>
              <FormGroup>
                {Object.keys(options).map((key) => (
                  <FormControlLabel
                    key={key}
                    checked={filterList.includes(key as T)}
                    onChange={() => toggleFilter(key as T)}
                    control={<Checkbox />}
                    label={options[key as T]}
                  />
                ))}
              </FormGroup>
            </FilterDropDown>
          )}
        </>
      )}
      
    </StyledFilterBar>
  )
}

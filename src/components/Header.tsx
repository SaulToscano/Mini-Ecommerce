import { Input } from '@mantine/core';
import { IconSearch } from "@tabler/icons-react"
import {searchClass} from '../interfaces/interface'

export default function ({searchInput, searchHandle}: searchClass) {

  return (
    <div id="Header_Main_Div">
      <Input
        icon={<IconSearch />}
        placeholder="Search Product"
        style={{width: '25%'}}
        value={searchInput || ''}
        onChange={(e) => searchHandle(e)}
      />
    </div>
  )
}
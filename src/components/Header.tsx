import { Input } from '@mantine/core';
import { IconSearch } from "@tabler/icons-react"

export default function () {

  return (
    <div id="Header_Main_Div">
      <Input
        icon={<IconSearch />}
        placeholder="Search Product"
        style={{width: '25%'}}
      />
    </div>
  )
}
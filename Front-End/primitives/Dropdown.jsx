import tw, { css } from "twin.macro"
import { Fragment } from "react"
import { Menu } from "@headlessui/react"
import Icons from "./Icons"
import Transition from "./Transition"

//라이브러리를 이용한 드롭다운 구현
// items: 드롭다운 메뉴의 항목들을 담고 있는 배열
// menuProps: Menu 컴포넌트에 전달되는 props
// menuItemsProps: Menu.Items 컴포넌트에 전달되는 props
// menuItemProps: Menu.Item 컴포넌트에 전달되는 props
// children: 드롭다운 메뉴의 레이블로 표시될 컨텐츠
export default function Dropdown({
  items,
  menuProps,
  menuItemsProps,
  menuItemProps,
  children,
}) {
  if (items.length === 0) return null
  return (
    <Menu as="div" tw="relative inline-block text-left focus-within:z-10" {...menuProps}>
      {({ open }) => (
        <Fragment>
          <Label children={children} open={open} />
          <Transition {...transitionProps}>
            <Menu.Items
              tw="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              {...menuItemsProps}
            >
              <Fragment>
                {items.map((group, index) => (
                  <ItemGroup key={index} group={group} menuItemProps={menuItemProps} />
                ))}
              </Fragment>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  )
}
function ItemGroup({ group, menuItemProps }) {
  return (
    <div tw="p-1">
      {group.map((item, index) => (
        <Item {...item} key={index} menuItemProps={menuItemProps} />
      ))}
    </div>
  )
}
function Item({ label, menuItemProps, ...rest }) {
  const Icon = Icons[label] || Icons["Edit"]
  return (
    <Menu.Item key={label} {...menuItemProps}>
      {({ active }) => (
        <button
          css={[
            active ? tw`bg-indigo-500 text-white` : tw`text-gray-900`,
            tw`flex rounded-md items-center w-full p-2 text-sm`,
          ]}
          {...rest}
        >
          {Icon({ active, css: tw`w-5 h-5 mr-2` })}
          {label}
        </button>
      )}
    </Menu.Item>
  )
}
function Label({ children, open }) {
  return (
    <Menu.Button tw="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)">
      {children}
      <Icons.ChevronDown css={open && tw`rotate-180`} />
    </Menu.Button>
  )
}
const transitionProps = {
  enter: tw`ease-out duration-100`,
  enterFrom: tw`opacity-0 scale-75`,
  enterTo: tw`opacity-100 scale-100`,
  leave: tw`ease-in duration-75`,
  leaveFrom: tw`opacity-100 scale-100`,
  leaveTo: tw`opacity-0 scale-95`,
}

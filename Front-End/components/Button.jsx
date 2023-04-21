import tw, { styled } from "twin.macro"

const Button = styled.button(({ variant, isSmall, isLarge, isBold }) => [
  // 버튼 기본 색상, 호버 상태 색상 변경
  tw`   p-3 rounded-brand w-full
        text-white font-medium tracking-tight
        transform duration-200 ease-in-out
        bg-dguMain
        text-center
        outline-none
        ring-0
        hocus:(bg-dguLight ring-0 outline-none appearance-none)
        disabled:(
          cursor-not-allowed opacity-60 
          appearance-none ring-0 outline-none
          text-neutral-8 bg-base border-2 border-neutral-3)
        `,

  variant === "primary" &&
    tw` bg-dguMain text-neutral-1 hocus:(bg-neutral-8)
        disabled:hocus:(bg-base text-neutral-8)
      `,

  variant === "secondary" &&
    tw`hocus:( bg-neutral-9 text-brand)
         disabled:hocus:(bg-base text-neutral-8)`,

  variant === "outline" &&
    tw`border border-neutral-9 bg-transparent text-neutral-8
      hocus:(bg-neutral-1) disabled:hocus:(bg-base text-neutral-8)`,

  variant === "inverted" &&
    tw`border border-neutral-9 bg-transparent text-neutral-8
      hocus:(bg-neutral-9 text-neutral-1) disabled:hocus:(bg-base text-neutral-8)`,

  variant === "gray" &&
    tw`bg-neutral-2 text-neutral-9 hocus:(bg-neutral-3)
        disabled:hocus:(bg-base text-neutral-8)
      `,

  isSmall && tw`text-sm`,
  isLarge && tw`text-lg`,
  isBold && tw`font-semibold`,
])

export default Button
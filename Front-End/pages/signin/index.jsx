import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import tw, { styled, css } from "twin.macro"
import Link from "next/link"
import MarketingContainer from "../layouts/MarketingContainer"
import { Img, Input, Button, LoadingCircle, StyledLink } from "../components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const SmallDiv = styled.div(() => [
  tw`relative w-full text-center text-neutral-5 after:(right-0) before:(left-0)`,
  css`
    &:before,
    &:after {
      ${tw`inline-block absolute 
      top-1/2 [content:""] 
      [border-bottom:1px solid rgba(var(--neutral-4))]
      width[calc(50% - 5em)]
      `};
    }
    ,
    > small {
      ${tw`inline-block`}
    }
  `,
])

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please enter a valid email address")
//     .required("Email is required!")
//     .min(6, "Email should be between 5 and 50 characters")
//     .max(50),
// })
const studentIDSchema = yup.object().shape({
  studentID: yup
    .string()
    .matches(/^[0-9]{8}$/, "Please enter a valid student ID") // 정규표현식에 맞지 않는 경우 에러 메시지 출력
    .required("Student ID is required!"),
})

const passwordSchema = yup.object().shape({
  password: yup.string().required("Password is required!"),
})

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //폼 데이터 유효성 검사와 상태 관리 수행
    mode: "onBlur",
    resolver: yupResolver(studentIDSchema),
    resolver: yupResolver(passwordSchema),
  })
  const onSubmit = (data) => {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <MarketingContainer title="Log in" footer noHeaderNav>
      <main
        tw="min-h-screen max-w-screen-sm w-full
          mx-auto px-4 pb-28 md:(px-8) flex
          flex-col items-center justify-center"
      >
        <h1 tw="text-3xl sm:(text-5xl)  text-center pt-10 pb-0">Log in</h1>
        <div tw="px-2 sm:px-16 space-y-5">
          <div tw="mt-8 w-full">Dongguk University Room Reservation</div>

          <SmallDiv>
            <small> use your udrims id and password</small>
          </SmallDiv>
        </div>

        <form
          tw="space-y-5 text-left
              px-2 sm:px-16
              pt-5 pb-16
              w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              type="text"
              placeholder="Student ID"
              aria-label="Student ID"
              autoComplete="off"
              autoCapitalize="none"
              maxLength="10"
              {...register("studentID")}
              error={!!errors?.studentID}
              noLabel
              required
            />
            <small tw="text-red-700">{errors?.studentID?.message}</small>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Password"
              aria-label="Password"
              autoComplete="off"
              autoCapitalize="none"
              maxLength="30"
              {...register("Password")}
              error={!!errors?.password}
              noLabel
              required
            />
            <small tw="text-red-700">{errors?.password?.message}</small>
          </div>
          <Button
            type="button"
            onClick={() => router.push("/buildings")}
            // type="submit"
            tw="flex items-center justify-center"
            disabled={!!isLoading}
            variant="primary"
            isLarge
          >
            {isLoading ? <LoadingCircle /> : "Continue"}
          </Button>
        </form>
      </main>
    </MarketingContainer>
  )
}

Login.theme = "light"

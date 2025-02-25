import { Link, router } from "expo-router"
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import { Text, TouchableWithoutFeedback, View } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { KeyboardController } from "react-native-keyboard-controller"
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import * as ContextMenu from "zeego/context-menu"

import { Logo } from "@/src/components/ui/logo"
import {
  LoginTermsCheckedContext,
  LoginTermsCheckGuardContext,
} from "@/src/contexts/LoginTermsContext"
import { isIOS } from "@/src/lib/platform"
import { toast } from "@/src/lib/toast"
import { TermsMarkdown } from "@/src/screens/(headless)/terms"

import { EmailLogin } from "./email"
import { SocialLogin } from "./social"

export function Login() {
  const [isChecked, setIsChecked] = useState(false)

  const termsCheckBoxRef = useRef<{ shake: () => void }>(null)
  return (
    <LoginTermsCheckedContext.Provider value={isChecked}>
      <LoginTermsCheckGuardContext.Provider
        value={useCallback(
          (callback: () => void) => {
            if (isChecked) {
              callback()
            } else {
              toast.info("Please accept the Terms of Service and Privacy Policy")

              termsCheckBoxRef.current?.shake()
            }
          },
          [isChecked],
        )}
      >
        <View className="flex-1 p-safe">
          <TouchableWithoutFeedback
            onPress={() => {
              KeyboardController.dismiss()
            }}
            accessible={false}
          >
            <View className="flex-1 items-center gap-8 pt-20">
              <Logo style={{ width: 80, height: 80 }} />
              <Text className="text-label text-2xl font-bold">Login to Follow</Text>
              <EmailLogin />
            </View>
          </TouchableWithoutFeedback>
          <TermsCheckBox ref={termsCheckBoxRef} isChecked={isChecked} setIsChecked={setIsChecked} />
          <View className="border-t-opaque-separator border-t-hairline mx-28" />
          <View className="mt-2 items-center">
            <View className="mb-4 flex w-full max-w-sm flex-row items-center gap-4">
              <View className="bg-separator my-4 h-[0.5px] flex-1" />
              <Text className="text-secondary-label text-lg">or</Text>
              <View className="bg-separator my-4 h-[0.5px] flex-1" />
            </View>
            <SocialLogin />
          </View>
        </View>
      </LoginTermsCheckGuardContext.Provider>
    </LoginTermsCheckedContext.Provider>
  )
}

const TermsCheckBox = forwardRef<
  { shake: () => void },
  {
    isChecked: boolean
    setIsChecked: (isChecked: boolean) => void
  }
>(({ isChecked, setIsChecked }, ref) => {
  const shakeSharedValue = useSharedValue(0)
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeSharedValue.value }],
  }))
  useImperativeHandle(ref, () => ({
    shake: () => {
      const animations = [-10, 10, -8, 8, -6, 6, 0]

      runOnUI(() => {
        "worklet"
        shakeSharedValue.value = 0

        const runAnimation = (index: number) => {
          "worklet"
          if (index < animations.length) {
            shakeSharedValue.value = withTiming(animations[index]!, { duration: 100 }, () => {
              runAnimation(index + 1)
            })
          }
        }

        runAnimation(0)
      })()
    },
  }))
  return (
    <Animated.View className="mb-4 flex-row items-center gap-2 px-8" style={shakeStyle}>
      <BouncyCheckbox
        className="gap-2"
        isChecked={isChecked}
        onPress={setIsChecked}
        size={14}
        textComponent={<TermsText />}
        onLongPress={() => {
          if (!isIOS) {
            router.push("/terms")
          }
        }}
      />
    </Animated.View>
  )
})

const TermsText = () => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="overflow-hidden rounded-full">
        <Text className="text-secondary-label text-sm">
          I agree to the{" "}
          <Link href="/terms" className="text-primary-label">
            Terms of Service
          </Link>{" "}
          and Privacy Policy
        </Text>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Preview
          size="STRETCH"
          onPress={useCallback(() => {
            router.push("/terms")
          }, [])}
        >
          {() => (
            <View className="bg-system-background flex-1">
              <TermsMarkdown />
            </View>
          )}
        </ContextMenu.Preview>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

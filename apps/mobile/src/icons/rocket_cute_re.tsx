import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface RocketCuteReIconProps {
  width?: number
  height?: number
  color?: string
}

export const RocketCuteReIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: RocketCuteReIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.022 14.982c-1.133-1.132-3.509-1.898-4.997-2.289-.657-.172-1.027-.9-.743-1.518l.475-1.037a1.922 1.922 0 0 1 2.018-1.101v0c.719.102 1.43-.218 1.882-.786 3.953-4.968 8.474-5.131 10.84-4.78a2.426 2.426 0 0 1 2.057 2.032c.39 2.39.289 6.98-4.793 10.868-.573.438-.908 1.137-.824 1.854v0a1.92 1.92 0 0 1-1.062 1.948l-1.029.503c-.62.304-1.368-.064-1.544-.732-.394-1.49-1.157-3.838-2.28-4.962m0 0a2.095 2.095 0 0 0-2.963 0c-.47.47-.888 1.861-1.159 2.964a.948.948 0 0 0 1.158 1.158c1.103-.271 2.495-.69 2.964-1.158a2.095 2.095 0 0 0 0-2.964m5.925-4.443a1.048 1.048 0 1 1-1.482-1.481 1.048 1.048 0 0 1 1.482 1.481"
      />
    </Svg>
  )
}

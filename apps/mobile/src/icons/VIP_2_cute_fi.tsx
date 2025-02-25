import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface VIP2CuteFiIconProps {
  width?: number
  height?: number
  color?: string
}

export const VIP2CuteFiIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: VIP2CuteFiIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M10 4a2 2 0 1 1 2.987 1.74c.275.548.585 1.08.916 1.596.526.818 1.172 1.813 2.06 2.278 1.14.596 2.717.474 4.043.256a1.5 1.5 0 1 1 1.768 1.605l-1.51 3.902c-.449 1.156-.813 2.098-1.193 2.833-.396.767-.847 1.391-1.513 1.864-.719.512-1.562.744-2.43.838-.886.095-1.78.092-2.671.089L12 21l-.457.001c-.89.003-1.785.006-2.67-.09-.869-.093-1.712-.325-2.43-.837-.667-.473-1.118-1.098-1.514-1.864-.38-.735-.744-1.677-1.192-2.833l-1.511-3.902A1.5 1.5 0 1 1 3.994 9.87c1.326.218 2.902.34 4.043-.256.889-.465 1.534-1.46 2.06-2.278.332-.516.641-1.048.916-1.596A2 2 0 0 1 10 4"
        clipRule="evenodd"
      />
    </Svg>
  )
}

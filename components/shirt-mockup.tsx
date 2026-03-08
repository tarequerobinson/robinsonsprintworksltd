"use client"

interface ShirtMockupProps {
  color: string
  designImage: string | null
  designText: string
}

export function ShirtMockup({ color, designImage, designText }: ShirtMockupProps) {
  const isDark = isColorDark(color)
  const textColor = isDark ? "#ffffff" : "#111827"

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square">
      {/* Color layer - sits behind the shirt */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{ backgroundColor: color }}
      />

      {/* T-shirt image with multiply blend mode */}
      <img
        src="/images/blank-tshirt.jpg"
        alt="T-shirt mockup"
        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
        draggable={false}
      />

      {/* Design overlay area - positioned on chest */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[30%] aspect-square flex items-center justify-center -mt-[5%]"
        >
          {designImage ? (
            <img
              src={designImage}
              alt="Design"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
          ) : designText ? (
            <div
              className="w-full h-full flex items-center justify-center text-center font-bold text-xs leading-tight break-words p-1"
              style={{ color: textColor }}
            >
              {designText}
            </div>
          ) : (
            <div
              className="w-full h-full border-2 border-dashed rounded flex items-center justify-center"
              style={{ borderColor: textColor, opacity: 0.3 }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: textColor }}
              >
                Your Design
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function isColorDark(hex: string): boolean {
  const c = hex.replace("#", "")
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

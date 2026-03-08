"use client"

import { useState, useRef } from "react"
import { Upload, ShoppingCart, Check, ChevronLeft, X, Sparkles, RotateCcw } from "lucide-react"
import Link from "next/link"

// ─── Constants ────────────────────────────────────────────────────────────────

const SHIRT_COLORS = [
  { label: "White",    value: "#ffffff",  dark: false },
  { label: "Ivory",    value: "#f5f0e8",  dark: false },
  { label: "Ash",      value: "#d1d5db",  dark: false },
  { label: "Sage",     value: "#86a98a",  dark: false },
  { label: "Charcoal", value: "#374151",  dark: true  },
  { label: "Navy",     value: "#1b2a4a",  dark: true  },
  { label: "Burgundy", value: "#6b1f2a",  dark: true  },
  { label: "Black",    value: "#111827",  dark: true  },
]

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"]
const UNIT_PRICE = 24.99

// ─── Shirt SVG Mockup ─────────────────────────────────────────────────────────

function ShirtMockup({
  color,
  designImage,
  designText,
}: {
  color: string
  designImage: string | null
  designText: string
}) {
  const isDark = SHIRT_COLORS.find((c) => c.value === color)?.dark ?? false
  const shadow = isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)"
  const fold   = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"

  return (
    <svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto drop-shadow-2xl">
      <defs>
        <filter id="shirt-shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor={shadow} />
        </filter>
        <clipPath id="design-clip">
          <rect x="130" y="130" width="140" height="140" rx="4" />
        </clipPath>
      </defs>

      {/* Body */}
      <path
        d="M80 100 L30 160 L80 185 L80 380 L320 380 L320 185 L370 160 L320 100
           C300 95 270 85 245 75 C235 110 215 125 200 125 C185 125 165 110 155 75
           C130 85 100 95 80 100Z"
        fill={color}
        stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}
        strokeWidth="1"
        filter="url(#shirt-shadow)"
      />

      {/* Collar shadow */}
      <path
        d="M155 75 C165 110 185 125 200 125 C215 125 235 110 245 75"
        fill="none"
        stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}
        strokeWidth="2"
      />

      {/* Subtle fold highlight */}
      <path
        d="M200 125 L200 380"
        stroke={fold}
        strokeWidth="18"
      />

      {/* Sleeve shading */}
      <path d="M80 100 L30 160 L80 185" fill={fold} />
      <path d="M320 100 L370 160 L320 185" fill={fold} />

      {/* Design area */}
      {designImage ? (
        <image
          href={designImage}
          x="130" y="130" width="140" height="140"
          clipPath="url(#design-clip)"
          preserveAspectRatio="xMidYMid meet"
        />
      ) : designText ? (
        <text
          x="200" y="210"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontSize="22"
          fontWeight="900"
          fill={isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)"}
          letterSpacing="2"
        >
          {designText.length > 18 ? designText.slice(0, 18) + "…" : designText}
        </text>
      ) : (
        <g opacity="0.18">
          <rect x="148" y="148" width="104" height="104" rx="6"
            fill="none" stroke={isDark ? "#fff" : "#000"} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="200" y="196" textAnchor="middle" fontSize="10"
            fill={isDark ? "#fff" : "#000"} fontFamily="system-ui">YOUR</text>
          <text x="200" y="210" textAnchor="middle" fontSize="10"
            fill={isDark ? "#fff" : "#000"} fontFamily="system-ui">DESIGN</text>
          <text x="200" y="224" textAnchor="middle" fontSize="10"
            fill={isDark ? "#fff" : "#000"} fontFamily="system-ui">HERE</text>
        </g>
      )}
    </svg>
  )
}

// ─── Step badge ───────────────────────────────────────────────────────────────

function Step({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 transition-opacity ${active ? "opacity-100" : "opacity-35"}`}>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border
        ${active ? "bg-black text-white border-black" : "bg-transparent text-black border-black/30"}`}>
        {n}
      </span>
      <span className={`text-xs font-semibold tracking-wider uppercase ${active ? "text-black" : "text-black/40"}`}>
        {label}
      </span>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomizePage() {
  const [shirtColor, setShirtColor]     = useState(SHIRT_COLORS[0].value)
  const [designText, setDesignText]     = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity]         = useState(1)
  const [addedToCart, setAddedToCart]   = useState(false)
  const [activeStep, setActiveStep]     = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const total       = (UNIT_PRICE * quantity).toFixed(2)
  const hasDesign   = !!uploadedImage || designText.trim().length > 0
  const selectedColorMeta = SHIRT_COLORS.find((c) => c.value === shirtColor)!

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setUploadedImage(ev.target?.result as string)
      setDesignText("")
      setActiveStep(2)
    }
    reader.readAsDataURL(file)
  }

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2800)
  }

  return (
    <main
      className="min-h-screen font-sans"
      style={{ background: "#fafaf8", fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* ── Nav bar ── */}
      <header
        style={{ borderBottom: "1px solid #e8e6e1", background: "#fafaf8" }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-6">
            <Step n={1} label="Design"   active={activeStep >= 1} />
            <div className="w-8 h-px bg-stone-200" />
            <Step n={2} label="Fit"      active={activeStep >= 2} />
            <div className="w-8 h-px bg-stone-200" />
            <Step n={3} label="Checkout" active={activeStep >= 3} />
          </div>

          <span
            className="text-xs font-black tracking-[0.2em] uppercase"
            style={{ color: "#111" }}
          >
            Studio
          </span>
        </div>
      </header>

      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-start">

          {/* LEFT — preview */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Shirt canvas */}
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: "radial-gradient(ellipse at 50% 30%, #e9e4da 0%, #ddd8cd 100%)",
                minHeight: 420,
                boxShadow: "inset 0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Subtle dot grid texture */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dot" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#9a9080" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot)" />
              </svg>

              <div className="relative z-10 w-full px-8 py-10">
                <ShirtMockup
                  color={shirtColor}
                  designImage={uploadedImage}
                  designText={designText}
                />
              </div>

              {/* Color chip overlay */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.1)", color: "#555" }}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10 inline-block"
                  style={{ background: selectedColorMeta.value }}
                />
                {selectedColorMeta.label}
              </div>

              {/* Reset button */}
              {hasDesign && (
                <button
                  onClick={() => { setUploadedImage(null); setDesignText("") }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.1)" }}
                  title="Clear design"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                </button>
              )}
            </div>

            {/* Color swatches */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-3">Color</p>
              <div className="flex flex-wrap gap-2.5">
                {SHIRT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    title={c.label}
                    onClick={() => setShirtColor(c.value)}
                    className="relative w-9 h-9 rounded-full transition-transform hover:scale-110 focus:outline-none"
                    style={{
                      background: c.value,
                      border: "1.5px solid",
                      borderColor: c.value === "#ffffff" || c.value === "#f5f0e8" ? "#d4d0c8" : c.value,
                      boxShadow:
                        shirtColor === c.value
                          ? `0 0 0 3px #fafaf8, 0 0 0 5px ${c.value === "#ffffff" ? "#aaa" : c.value}`
                          : "none",
                    }}
                  >
                    {shirtColor === c.value && (
                      <Check
                        className="absolute inset-0 m-auto w-4 h-4"
                        style={{ color: c.dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.45)" }}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — controls */}
          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">
                Custom Tee · ${UNIT_PRICE}/unit
              </p>
              <h1
                className="text-3xl font-black leading-tight"
                style={{ letterSpacing: "-0.03em", color: "#111" }}
              >
                Make it yours.
              </h1>
              <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                Upload artwork or type a phrase. Printed & shipped within 5 days.
              </p>
            </div>

            {/* ── Design section ── */}
            <section>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-3">
                Your Design
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Upload zone */}
              {!uploadedImage ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-3 transition-all group hover:border-black"
                  style={{ borderColor: "#d4d0c8", background: "#f5f2ec" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-black"
                    style={{ background: "#e8e4dd" }}
                  >
                    <Upload className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-stone-700">Upload artwork</p>
                    <p className="text-xs text-stone-400 mt-0.5">PNG, JPG, SVG — up to 10 MB</p>
                  </div>
                </button>
              ) : (
                <div
                  className="rounded-xl p-4 flex items-center gap-4"
                  style={{ background: "#f0ede7", border: "1px solid #ddd9d0" }}
                >
                  <img
                    src={uploadedImage}
                    alt="Design preview"
                    className="w-14 h-14 rounded-lg object-contain bg-white border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-800 truncate">Artwork uploaded</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-stone-500 hover:text-stone-800 transition-colors underline underline-offset-2 mt-0.5"
                    >
                      Replace
                    </button>
                  </div>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                </div>
              )}

              {!uploadedImage && (
                <>
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px" style={{ background: "#e0dcd4" }} />
                    <span className="text-xs text-stone-400 font-medium">or type text</span>
                    <div className="flex-1 h-px" style={{ background: "#e0dcd4" }} />
                  </div>

                  <div className="relative">
                    <textarea
                      value={designText}
                      onChange={(e) => { setDesignText(e.target.value); if (e.target.value) setActiveStep(2) }}
                      placeholder="YOUR TEXT HERE"
                      rows={2}
                      maxLength={50}
                      className="w-full rounded-xl border px-4 py-3 text-sm resize-none focus:outline-none transition-all"
                      style={{
                        background: "#f5f2ec",
                        borderColor: designText ? "#111" : "#d4d0c8",
                        fontFamily: "'Arial Black', Impact, sans-serif",
                        letterSpacing: "0.05em",
                        fontSize: "13px",
                        color: "#111",
                        boxShadow: designText ? "0 0 0 3px rgba(0,0,0,0.06)" : "none",
                      }}
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-stone-300 pointer-events-none">
                      {designText.length}/50
                    </span>
                  </div>
                </>
              )}
            </section>

            {/* ── Size ── */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">Size</p>
                <button className="text-xs text-stone-400 underline underline-offset-2 hover:text-stone-700 transition-colors">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => { setSelectedSize(sz); setActiveStep(Math.max(activeStep, 2)) }}
                    className="h-10 px-4 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background:    selectedSize === sz ? "#111"    : "#f0ede7",
                      color:         selectedSize === sz ? "#fff"    : "#555",
                      border:        "1.5px solid",
                      borderColor:   selectedSize === sz ? "#111"    : "transparent",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </section>

            {/* ── Quantity ── */}
            <section>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-3">Quantity</p>
              <div
                className="inline-flex items-center rounded-xl overflow-hidden"
                style={{ border: "1.5px solid #d4d0c8", background: "#f5f2ec" }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-lg font-light text-stone-500 hover:bg-stone-200/60 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-sm" style={{ color: "#111" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-lg font-light text-stone-500 hover:bg-stone-200/60 transition-colors"
                >
                  +
                </button>
              </div>
              {quantity >= 5 && (
                <p className="text-xs mt-2 text-emerald-600 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Bulk discount available — contact us
                </p>
              )}
            </section>

            {/* ── Order summary & CTA ── */}
            <section
              className="rounded-2xl p-6 space-y-5"
              style={{ background: "#f0ede7", border: "1px solid #ddd9d0" }}
            >
              {/* Line items */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Shirt × {quantity}</span>
                  <span>${(UNIT_PRICE * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Printing</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="h-px" style={{ background: "#ddd9d0" }} />

              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-stone-600">Subtotal</span>
                <span className="text-2xl font-black" style={{ letterSpacing: "-0.04em", color: "#111" }}>
                  ${total}
                </span>
              </div>

              <button
                onClick={() => { handleAddToCart(); setActiveStep(3) }}
                className="w-full h-13 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
                style={{
                  height: 52,
                  background:    addedToCart ? "#16a34a" : "#111",
                  color:         "#fff",
                  letterSpacing: "0.02em",
                  boxShadow:     addedToCart
                    ? "0 4px 24px rgba(22,163,74,0.35)"
                    : "0 4px 24px rgba(0,0,0,0.25)",
                  transition:    "background 0.3s, box-shadow 0.3s",
                }}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={3} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <p className="text-center text-xs text-stone-400">
                Free returns · Printed in 2–3 days · Ships worldwide
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
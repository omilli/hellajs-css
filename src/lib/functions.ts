// ===== COLOR & OPACITY FUNCTIONS =====
export const rgb = (r: number, g: number, b: number): string =>
  `rgb(${r}, ${g}, ${b})`;

export const rgba = (r: number, g: number, b: number, a: number): string =>
  `rgba(${r}, ${g}, ${b}, ${a})`;

export const hsl = (h: number, s: number, l: number): string =>
  `hsl(${h}, ${s}%, ${l}%)`;

export const hsla = (h: number, s: number, l: number, a: number): string =>
  `hsla(${h}, ${s}%, ${l}%, ${a})`;

export const hwb = (h: number, w: number, b: number): string =>
  `hwb(${h} ${w}% ${b}%)`;

export const lab = (l: number, a: number, b: number): string =>
  `lab(${l}% ${a} ${b})`;

export const lch = (l: number, c: number, h: number): string =>
  `lch(${l}% ${c} ${h})`;

export const oklab = (l: number, a: number, b: number): string =>
  `oklab(${l} ${a} ${b})`;

export const oklch = (l: number, c: number, h: number): string =>
  `oklch(${l} ${c} ${h})`;

export const color = (colorSpace: string, values: string[]): string =>
  `color(${colorSpace} ${values.join(" ")})`;

export const colorMix = (
  method: string,
  color1: string,
  color2: string,
  percentage?: number
): string =>
  percentage !== undefined
    ? `color-mix(${method}, ${color1}, ${color2} ${percentage}%)`
    : `color-mix(${method}, ${color1}, ${color2})`;

export const colorContrast = (color: string, ...candidates: string[]): string =>
  `color-contrast(${color} vs ${candidates.join(", ")})`;

export const opacity = (amount: number): string => `opacity(${amount})`;

// ===== LAYOUT & SIZING FUNCTIONS =====
export const calc = (expression: string): string => `calc(${expression})`;

export const min = (...values: string[]): string => `min(${values.join(", ")})`;

export const max = (...values: string[]): string => `max(${values.join(", ")})`;

export const clamp = (min: string, preferred: string, max: string): string =>
  `clamp(${min}, ${preferred}, ${max})`;

export const minmax = (min: string, max: string): string =>
  `minmax(${min}, ${max})`;

export const fitContent = (dimension: string): string =>
  `fit-content(${dimension})`;

export const maxContent = (): string => "max-content";

export const minContent = (): string => "min-content";

// ===== TRANSFORM FUNCTIONS =====
export const translate = (x: string, y: string): string =>
  `translate(${x}, ${y})`;

export const translateX = (x: string): string => `translateX(${x})`;

export const translateY = (y: string): string => `translateY(${y})`;

export const translateZ = (z: string): string => `translateZ(${z})`;

export const translate3d = (x: string, y: string, z: string): string =>
  `translate3d(${x}, ${y}, ${z})`;

export const rotate = (angle: string): string => `rotate(${angle})`;

export const rotateX = (angle: string): string => `rotateX(${angle})`;

export const rotateY = (angle: string): string => `rotateY(${angle})`;

export const rotateZ = (angle: string): string => `rotateZ(${angle})`;

export const rotate3d = (
  x: number,
  y: number,
  z: number,
  angle: string
): string => `rotate3d(${x}, ${y}, ${z}, ${angle})`;

export const scale = (x: number, y?: number): string =>
  y !== undefined ? `scale(${x}, ${y})` : `scale(${x})`;

export const scaleX = (x: number): string => `scaleX(${x})`;

export const scaleY = (y: number): string => `scaleY(${y})`;

export const scaleZ = (z: number): string => `scaleZ(${z})`;

export const scale3d = (x: number, y: number, z: number): string =>
  `scale3d(${x}, ${y}, ${z})`;

export const skew = (x: string, y?: string): string =>
  y !== undefined ? `skew(${x}, ${y})` : `skew(${x})`;

export const skewX = (angle: string): string => `skewX(${angle})`;

export const skewY = (angle: string): string => `skewY(${angle})`;

export const matrix = (
  a: number,
  b: number,
  c: number,
  d: number,
  tx: number,
  ty: number
): string => `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;

export const matrix3d = (...values: number[]): string =>
  `matrix3d(${values.join(", ")})`;

export const perspective = (length: string): string => `perspective(${length})`;

// ===== FILTER FUNCTIONS =====
export const blur = (radius: string): string => `blur(${radius})`;

export const brightness = (amount: number): string => `brightness(${amount})`;

export const contrast = (amount: number): string => `contrast(${amount})`;

export const grayscale = (amount: number): string => `grayscale(${amount})`;

export const sepia = (amount: number): string => `sepia(${amount})`;

export const hueRotate = (angle: string): string => `hue-rotate(${angle})`;

export const invert = (amount: number): string => `invert(${amount})`;

export const saturate = (amount: number): string => `saturate(${amount})`;

export const dropShadow = (
  x: string,
  y: string,
  blur: string,
  color: string
): string => `drop-shadow(${x} ${y} ${blur} ${color})`;

export const backdropFilter = (filters: string): string =>
  `backdrop-filter(${filters})`;

// ===== GRADIENT & BACKGROUND FUNCTIONS =====
export const linearGradient = (
  direction: string,
  ...colorStops: string[]
): string => `linear-gradient(${direction}, ${colorStops.join(", ")})`;

export const radialGradient = (
  shape: string,
  ...colorStops: string[]
): string => `radial-gradient(${shape}, ${colorStops.join(", ")})`;

export const conicGradient = (
  position: string,
  ...colorStops: string[]
): string => `conic-gradient(from ${position}, ${colorStops.join(", ")})`;

export const repeatingLinearGradient = (
  direction: string,
  ...colorStops: string[]
): string =>
  `repeating-linear-gradient(${direction}, ${colorStops.join(", ")})`;

export const repeatingRadialGradient = (
  shape: string,
  ...colorStops: string[]
): string => `repeating-radial-gradient(${shape}, ${colorStops.join(", ")})`;

export const repeatingConicGradient = (
  position: string,
  ...colorStops: string[]
): string =>
  `repeating-conic-gradient(from ${position}, ${colorStops.join(", ")})`;

export const url = (path: string): string => `url(${path})`;

export const image = (value: string, ...fallbacks: string[]): string =>
  fallbacks.length
    ? `image(${value}, ${fallbacks.join(", ")})`
    : `image(${value})`;

// ===== ANIMATION & TIMING FUNCTIONS =====
export const cubic = (x1: number, y1: number, x2: number, y2: number): string =>
  `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

export const steps = (
  count: number,
  direction: "start" | "end" = "end"
): string => `steps(${count}, ${direction})`;

export const easeIn = (
  x1: number = 0.42,
  y1: number = 0,
  x2: number = 1,
  y2: number = 1
): string => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

export const easeOut = (
  x1: number = 0,
  y1: number = 0,
  x2: number = 0.58,
  y2: number = 1
): string => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

export const easeInOut = (
  x1: number = 0.42,
  y1: number = 0,
  x2: number = 0.58,
  y2: number = 1
): string => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

export const linear = (): string => "linear";

export const spring = (
  mass: number,
  stiffness: number,
  damping: number,
  velocity: number
): string => `spring(${mass} ${stiffness} ${damping} ${velocity})`;

// ===== SHAPE FUNCTIONS =====
export const circle = (radius?: string): string =>
  radius ? `circle(${radius})` : "circle()";

export const ellipse = (xRadius?: string, yRadius?: string): string =>
  xRadius && yRadius ? `ellipse(${xRadius} ${yRadius})` : "ellipse()";

export const inset = (
  top: string,
  right: string,
  bottom: string,
  left: string,
  round?: string
): string =>
  round
    ? `inset(${top} ${right} ${bottom} ${left} round ${round})`
    : `inset(${top} ${right} ${bottom} ${left})`;

export const polygon = (...points: string[]): string =>
  `polygon(${points.join(", ")})`;

export const path = (svgPath: string): string => `path('${svgPath}')`;

// ===== GRID & FLEXBOX FUNCTIONS =====
export const repeat = (count: number | string, pattern: string): string =>
  `repeat(${count}, ${pattern})`;

export const masonry = (): string => "masonry";

export const subgrid = (): string => "subgrid";

// ===== MATH FUNCTIONS =====
export const sin = (angle: string): string => `sin(${angle})`;
export const cos = (angle: string): string => `cos(${angle})`;
export const tan = (angle: string): string => `tan(${angle})`;
export const asin = (value: number): string => `asin(${value})`;
export const acos = (value: number): string => `acos(${value})`;
export const atan = (value: number): string => `atan(${value})`;
export const atan2 = (y: number, x: number): string => `atan2(${y}, ${x})`;
export const pow = (base: number, exponent: number): string =>
  `pow(${base}, ${exponent})`;
export const sqrt = (value: number): string => `sqrt(${value})`;
export const hypot = (...values: number[]): string =>
  `hypot(${values.join(", ")})`;
export const log = (value: number, base?: number): string =>
  base ? `log(${value}, ${base})` : `log(${value})`;
export const exp = (value: number): string => `exp(${value})`;
export const abs = (value: string): string => `abs(${value})`;
export const sign = (value: string): string => `sign(${value})`;
export const mod = (value: number, divisor: number): string =>
  `mod(${value}, ${divisor})`;
export const rem = (value: number, divisor: number): string =>
  `rem(${value}, ${divisor})`;
export const round = (value: string, strategy?: string): string =>
  strategy ? `round(${value}, ${strategy})` : `round(${value})`;
export const floor = (value: string): string => `floor(${value})`;
export const ceil = (value: string): string => `ceil(${value})`;

// ===== FONT & TYPOGRAPHY FUNCTIONS =====
export const format = (formatType: string): string => `format("${formatType}")`;
export const local = (fontName: string): string => `local("${fontName}")`;
export const fontFormat = (format: string): string =>
  `font-format("${format}")`;
export const fontTech = (tech: string): string => `font-tech("${tech}")`;
export const src = (...sources: string[]): string =>
  `src(${sources.join(", ")})`;
export const stylistic = (featureValue: string): string =>
  `stylistic(${featureValue})`;
export const styleset = (...featureValues: string[]): string =>
  `styleset(${featureValues.join(", ")})`;
export const characterVariant = (...featureValues: string[]): string =>
  `character-variant(${featureValues.join(", ")})`;
export const swash = (featureValue: string): string => `swash(${featureValue})`;
export const ornaments = (featureValue: string): string =>
  `ornaments(${featureValue})`;
export const annotation = (featureValue: string): string =>
  `annotation(${featureValue})`;

// ===== COUNTER & LIST FUNCTIONS =====
export const counter = (name: string, style?: string): string =>
  style ? `counter(${name}, ${style})` : `counter(${name})`;
export const counters = (
  name: string,
  string: string,
  style?: string
): string =>
  style
    ? `counters(${name}, "${string}", ${style})`
    : `counters(${name}, "${string}")`;
export const symbols = (type: string, ...symbols: string[]): string =>
  `symbols(${type} ${symbols.join(" ")})`;
export const markers = (): string => `markers`;

// ===== VARIABLE & ENVIRONMENT FUNCTIONS =====
export const var_ = (name: string, fallback?: string): string =>
  fallback ? `var(${name}, ${fallback})` : `var(${name})`;
export const env = (name: string, fallback?: string): string =>
  fallback ? `env(${name}, ${fallback})` : `env(${name})`;

// ===== CONTAINER QUERY FUNCTIONS =====
export const cqw = (value: string): string => `${value}cqw`;
export const cqh = (value: string): string => `${value}cqh`;
export const cqi = (value: string): string => `${value}cqi`;
export const cqb = (value: string): string => `${value}cqb`;
export const cqmin = (value: string): string => `${value}cqmin`;
export const cqmax = (value: string): string => `${value}cqmax`;

// ===== IMAGE PROCESSING FUNCTIONS =====
export const crossFade = (...images: string[]): string =>
  `cross-fade(${images.join(", ")})`;
export const imageSet = (...items: string[]): string =>
  `image-set(${items.join(", ")})`;
export const paint = (workletName: string, ...params: string[]): string =>
  params.length
    ? `paint(${workletName}, ${params.join(", ")})`
    : `paint(${workletName})`;
export const element = (id: string): string => `element(#${id})`;

// ===== MISCELLANEOUS FUNCTIONS =====
export const attr = (attributeName: string): string => `attr(${attributeName})`;
export const running = (elementName: string): string =>
  `running(${elementName})`;
export const toggle = (...values: string[]): string =>
  `toggle(${values.join(", ")})`;
export const targetCounter = (
  url: string,
  name: string,
  style?: string
): string =>
  style
    ? `target-counter(${url}, ${name}, ${style})`
    : `target-counter(${url}, ${name})`;
export const targetCounters = (
  url: string,
  name: string,
  separator: string,
  style?: string
): string =>
  style
    ? `target-counters(${url}, ${name}, "${separator}", ${style})`
    : `target-counters(${url}, ${name}, "${separator}")`;
export const targetText = (url: string, target?: string): string =>
  target ? `target-text(${url}, ${target})` : `target-text(${url})`;
export const leader = (style?: string): string =>
  style ? `leader(${style})` : `leader()`;

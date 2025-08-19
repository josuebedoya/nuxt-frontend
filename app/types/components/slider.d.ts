export interface classesApi {
    root?: string | string[] | Record<string, boolean>
    container?: string | string[] | Record<string, boolean>
    viewport?: string | string[] | Record<string, boolean>
} // Class to containers api

export interface configSlider {
    autoPlay?: boolean
    autoScroll?: boolean
    fade?: boolean
    delay?: number
    speed?: number
    pauseOnHover?: boolean
    loop?: boolean
    isVertical?: boolean
    reverse?: boolean
    centeredItems?: boolean
    itemsByTransition?: number
    moveWithWheel?: boolean
    dragFree?: boolean
    autoDimensioned?: boolean
} // Basic Slider Config

export interface configThumbs {
    sliderConfig?: Record<string, any>
    position?: string
    moveOnHover?: boolean
} // Thumbs

export interface configSlide {
    class?: string | object
    classActive?: string
    padding?: string
    actions?: Record<string, void>
} // Item

export interface sliderProps {
    activeContainer?: boolean,
    sizeContainer?: string,
    isActive?: boolean
    items: any[]
    classes?: classesApi
    breakPoint?: Record<string, string | number>
    config?: configSlider
    withNavs?: boolean
    withDots?: boolean
    navsConfig?: Record<string, string | string[] | Record<string, boolean>>
    dotsConfig?: Record<string, string | string[]>
    withThumbs?: boolean
    thumbsConfig?: configThumbs
    item?: configSlide
} // All props

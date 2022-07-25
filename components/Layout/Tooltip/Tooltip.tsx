import React from 'react'
import 'tippy.js/themes/translucent.css'
import { Placement, roundArrow } from 'tippy.js'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/dist/backdrop.css'

interface TooltipPropTypes {
    children: React.ReactElement,
    content: string,
    placement: Placement
}

const Tooltip = ({ content, children, placement }: TooltipPropTypes) => (
  <Tippy
    animation="shift-away"
    arrow={roundArrow}
    className="px-3 py-1 rounded text-gray-200 text-sm text-center"
    content={content}
    inertia
    interactive
    placement={placement}
    theme="translucent"
  >
    {children}
  </Tippy>
)

export default Tooltip

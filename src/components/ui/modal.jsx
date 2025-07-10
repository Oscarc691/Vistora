import React from "react"

import { X } from "lucide-react"

const Modal = ({
  // Core props
  isOpen = false,
  onClose = () => {},

  // Content props
  title = "",
  subtitle = "",
  children,

  // Header props
  showHeader = true,
  headerContent = null,
  headerBadge = null,

  // Footer props
  showFooter = false,
  footerContent = null,

  // Styling props
  size = "default", // "sm", "default", "lg", "xl", "full"
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  overlayClassName = "",

  // Behavior props
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,

  // Animation props
  animationType = "fade", // "fade", "slide", "scale"
}) => {
  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Handle body scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw]",
  }

  // Animation classes
  const animationClasses = {
    fade: "animate-fade-in",
    slide: "animate-slide-up",
    scale: "animate-scale-in",
  }

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] overflow-y-auto
          ${sizeClasses[size]}
          ${animationClasses[animationType]}
          ${className}
        `}
      >
        {/* Header */}
        {showHeader && (
          <div className={`p-6 border-b border-gray-200 ${headerClassName}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {headerContent ? (
                  headerContent
                ) : (
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
                      {headerBadge}
                    </div>
                    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                  </div>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 ml-4"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Body */}
        <div className={`p-6 ${bodyClassName}`}>{children}</div>

        {/* Footer */}
        {showFooter && footerContent && (
          <div className={`p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl ${footerClassName}`}>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal

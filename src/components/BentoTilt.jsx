import { useRef, useState } from "react";

/**
 * Wraps children in a container that tilts toward the cursor in 3D.
 * Reusable across any bento-style grid on the site.
 */
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`,
    );
  };

  const handleMouseLeave = () => {
    // Reset to identity (not empty/undefined) so the CSS transition
    // below actually has two real values to animate between — that's
    // what makes the snap-back smooth instead of instant.
    setTransformStyle(
      "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    );
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.3s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;

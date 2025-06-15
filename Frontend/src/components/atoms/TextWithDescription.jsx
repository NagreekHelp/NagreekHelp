// src/components/Text/TextWithDescription.tsx
import React from 'react';


const TextWithDescription = ({
  title,
  description,
  titleClassName = "font-medium text-gray-800",
  descriptionClassName = "text-sm text-gray-600"
}) => {
  return (
    <div>
      <h4 className={titleClassName}>{title}</h4>
      {description && <p className={descriptionClassName}>{description}</p>}
    </div>
  );
};

export default TextWithDescription;
const ImageWithOverlay = ({
  imageSrc,
  altText,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover rounded-xl shadow-md"
        loading="lazy"
      />
      <div className="absolute bottom-4 left-4 text-white text-[32px] font-semibold px-4 py-2">
        “The path to triumph is paved with the <span className="text-primary-green">strength to train hard</span> and the perseverance to <span className="text-primary-green">rise each time you fall</span>.”
      </div>
    </div>
  );
};

export default ImageWithOverlay;

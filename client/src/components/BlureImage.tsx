import React, { useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
type BlureImageType = {
  image: string;
  imageAlt: string;
  blureHash: string;
};
const BlureImage = (props: BlureImageType) => {
  const { image, blureHash, imageAlt } = props;
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className="relative w-full h-full">
      <img
        ref={imgRef}
        onLoad={() => {
          setImageLoaded(true);
        }}
        loading="lazy"
        className=" object-cover bg-center  w-full h-full "
        src={image}
        alt={imageAlt}
      />

      {
        (
          <div className={`absolute inset-0 left-0 right-0 ${imageLoaded && 'hidden'}`}>   
            <Blurhash
              hash={blureHash}
              width={"100%"}
              height={"100%"}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        )
      }
    </div>
  );
};

export default BlureImage;

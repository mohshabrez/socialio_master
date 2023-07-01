import { useState } from "react";
import "./HandleImages.css"
import { useNavigate } from "react-router-dom";

export function HandleImages({images}){
    const [img, setImg] = useState("")
    const [startIndex, setStartIndex] = useState(0);
    const navigate = useNavigate()

    const nextSlide = () => {
      const newIndex = Math.min(startIndex + 5, images.length - 1);
      setStartIndex(newIndex);
    };
  
    const prevSlide = () => {
      const newIndex = Math.max(startIndex - 5, 0);
      setStartIndex(newIndex);
    };
  
    const visibleImages = images.slice(startIndex, startIndex + 5);

    const handleImg = (image) => {
        setImg(image)
    }



  return (
    <div className="AvtarImgs">
    <a className="leftarrow"><span class="material-symbols-outlined" style={{fontSize:"300%", marginTop:"2rem", marginLeft:"-3rem"}} onClick={prevSlide} disabled={startIndex === 0}>keyboard_double_arrow_left</span></a>
      {visibleImages.map((image, index) => (
        <img key={index} src={image} onClick={(e) =>handleImg(image)} alt={`SliderImage ${index}`} />
      ))}
      <span class="material-symbols-outlined" style={{fontSize:"300%", marginTop:"2rem", marginRight:"-4rem"}} onClick={nextSlide} disabled={startIndex + 4 >= images.length}>keyboard_double_arrow_right</span>
    </div>
  );
};


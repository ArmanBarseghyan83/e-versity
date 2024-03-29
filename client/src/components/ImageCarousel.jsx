import { Carousel } from 'antd';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel  autoplay>
      {images?.map((image) => (
        <div  key={image?.filename}>
          <img src={image?.url} style={{ width: '100%' }} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;

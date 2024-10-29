import React, { useRef } from 'react';
import ImageModal from '../organisms/modal/ImageModal';



interface IImage {
    id: number;
    img: string;
    title: string;
}

interface IStatus {
    images: IImage[];
}

const StatusImg: React.FC<IStatus> = ({ images }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <div className='sm:w-[120px] w-[60px] sm:h-[160px] h-[60px] carousel-item relative'>
            <img 
                className='w-full h-full object-cover sm:rounded-lg rounded-full' 
                src={images[0].img}
                alt={images[0].title}
                onClick={() => dialogRef.current?.showModal()}
            />
            <ImageModal ref={dialogRef} images={images} />
            <p className='absolute bottom-0 text-center text-xs font-semibold'>{images[0].title}</p>
        </div>
    );
}

export default StatusImg;
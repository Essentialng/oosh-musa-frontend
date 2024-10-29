import React, { forwardRef, ForwardedRef, useState } from 'react';

interface IImage {
    id: number;
    img: string;
    title: string;
}

interface ImageModalProps {
    images: IImage[];
}

const ImageModal = forwardRef<HTMLDialogElement, ImageModalProps>(
    ({ images }, ref: ForwardedRef<HTMLDialogElement>) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        const nextSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        const prevSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        };

        return (
            <dialog ref={ref} className="modal">
                <div className="modal-box relative bg-transparent">
                    <div className="carousel w-full">
                        <div className="carousel-item relative w-full ">
                            <img
                                src={images[currentIndex].img}
                                className="w-full h-full"
                                alt={images[currentIndex].title}
                            />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <button onClick={prevSlide} className="btn btn-circle hidden sm:inline-block">❮</button>
                                <button onClick={nextSlide} className="btn btn-circle hidden sm:inline-block">❯</button>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs font-bold mt-4 absolute bottom-0 left-1 z-40 text-white">{images[currentIndex].title}</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        );
    }
);

export default ImageModal;
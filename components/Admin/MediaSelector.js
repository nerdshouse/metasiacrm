import { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsArrowDownRightSquare } from "react-icons/bs";

import Modal from "../Tailwind/Modal";
import Separator from "../Tailwind/Separator";

const MediaSelector = ({ onChange, value }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedModalMedia, setSelectedModalMedia] = useState({});

  const [activeValue, setActiveValue] = useState({});

  useEffect(() => {
    if (value) {
      const media = images.filter((image) => image._id === value)[0];
      setSelectedModalMedia(media);
      setActiveValue(media);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateImageInformation = () => {
    const { title, alternativeText, _id } = selectedModalMedia;
    // TODO: Call the update API here
    // console.log({ title, alternativeText, _id });
  };

  return (
    <>
      <Modal visible={showModal} setVisible={setShowModal} className="w-5/6 h-5/6 relative">
        <div className="absolute top-0 inset-x-0 px-6 pt-4 pb-0 bg-white">
          <div className="text-3xl flex justify-between items-center">
            <h2>Gallery</h2>{" "}
            <AiOutlineCloseCircle
              className="text-primary-300"
              onClick={() => setShowModal(false)}
            />
          </div>
          <Separator className="my-2" />
        </div>
        <div className="flex flex-1 pt-12 max-h-full">
          <div className="w-2/3 flex flex-wrap max-h-full overflow-auto">
            {images.map((image) => (
              <label
                key={image._id.toString()}
                className={`w-1/5 p-1 ${
                  selectedModalMedia._id === image._id ? "border-2 border-primary-500" : ""
                }`}
                htmlFor={image._id.toString()}
              >
                <div
                  style={{
                    backgroundImage: `url(${image.url})`,
                  }}
                  className="w-full aspect-square bg-cover bg-center"
                >
                  <input
                    type="radio"
                    name="imageGalleryItem"
                    id={image._id.toString()}
                    className="hidden"
                    onChange={(e) => setSelectedModalMedia(image)}
                    value={selectedModalMedia._id === image._id}
                  />
                </div>
              </label>
            ))}
          </div>
          <Separator vertical className="mx-2" />
          <div className="w-1/3 pl-1">
            {selectedModalMedia._id ? (
              <div className="max-h-full overflow-auto">
                <div className="flex w-full item-center justify-center">
                  <img
                    src={selectedModalMedia.url}
                    alt={selectedModalMedia.alternativeText}
                    title={selectedModalMedia.title}
                  />
                </div>
                <Separator className="my-2" />
                <label htmlFor="title" className="flex items-center justify-between pt-2">
                  Title:{" "}
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="text-input w-3/4"
                    value={selectedModalMedia.title}
                    onChange={(e) =>
                      setSelectedModalMedia((state) => ({ ...state, title: e.target.value }))
                    }
                  />
                </label>
                <label htmlFor="alt" className="flex items-center justify-between pt-2">
                  Alternative Text:{" "}
                  <input
                    type="text"
                    name="alt"
                    id="alt"
                    className="text-input w-3/4"
                    value={selectedModalMedia.alternativeText}
                    onChange={(e) =>
                      setSelectedModalMedia((state) => ({
                        ...state,
                        alternativeText: e.target.value,
                      }))
                    }
                  />
                </label>
                <label
                  htmlFor="imageUrl"
                  className="flex items-center justify-between mt-2"
                  onClick={() => navigator.clipboard.writeText(selectedModalMedia.url)}
                >
                  Image URL:{" "}
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    className="text-input w-3/4 text-gray-500"
                    disabled
                    value={selectedModalMedia.url}
                  />
                </label>
                <div className="flex mt-2">
                  <button
                    className="button-primary-300 flex-1 mr-1 mb-1"
                    onClick={() =>
                      navigator.clipboard.writeText(`<img src="${selectedModalMedia.url}" />`)
                    }
                  >
                    Copy for Editor
                  </button>
                  <button
                    className="button-primary-500 flex-1 ml-1 mb-1"
                    onClick={updateImageInformation}
                  >
                    Save
                  </button>
                </div>
                <div className="flex w-full">
                  <button
                    className="button-primary-500 flex-1"
                    onClick={() => {
                      setActiveValue(selectedModalMedia);
                      onChange(selectedModalMedia._id);
                      setShowModal(false);
                    }}
                  >
                    <BsArrowDownRightSquare className="mr-2" /> Insert
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <h4 className="text-center text-gray-500">Please select an Image</h4>
              </div>
            )}
          </div>
        </div>
      </Modal>
      {activeValue._id ? (
        <>
          <img src={activeValue.url} alt={activeValue.alternativeText} title={activeValue.title} />
          <span
            className="link text-xs underline mt-1"
            onClick={() => {
              setSelectedModalMedia({});
              setActiveValue({});
            }}
          >
            Remove Featured Image
          </span>
        </>
      ) : (
        <span className="text-xs text-gray-400">Open Gallery to set a featured Image</span>
      )}
      <button className="button-primary-500 mt-2" onClick={() => setShowModal((state) => !state)}>
        <BsImage className="mr-2" />
        Gallery
      </button>
    </>
  );
};
export default MediaSelector;

const images = [
  {
    _id: "asdfghjkl1230",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x900/",
  },
  {
    _id: "asdfghjkl1231",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1400x900/",
  },
  {
    _id: "asdfghjkl1232",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x900/",
  },
  {
    _id: "asdfghjkl1233",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1400x900/",
  },
  {
    _id: "asdfghjkl1234",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x900/",
  },
  {
    _id: "asdfghjkl1235",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1400x900/",
  },
  {
    _id: "asdfghjkl1236",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x900/",
  },
  {
    _id: "asdfghjkl1237",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1400x900/",
  },
  {
    _id: "asdfghjkl1238",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1200/",
  },
  {
    _id: "asdfghjkl1239",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1800x900/",
  },
  {
    _id: "asdfghjkl1240",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1200/",
  },
  {
    _id: "asdfghjkl1241",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1800x900/",
  },
  {
    _id: "asdfghjkl1242",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1200/",
  },
  {
    _id: "asdfghjkl1243",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1800x900/",
  },
  {
    _id: "asdfghjkl1244",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1200/",
  },
  {
    _id: "asdfghjkl1245",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1800x900/",
  },
  {
    _id: "asdfghjkl12346",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1600/",
  },
  {
    _id: "asdfghjkl12347",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1000x1800/",
  },
  {
    _id: "asdfghjkl1248",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1600/",
  },
  {
    _id: "asdfghjkl1249",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1000x1800/",
  },
  {
    _id: "asdfghjkl1250",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1600/",
  },
  {
    _id: "asdfghjkl1251",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1000x1800/",
  },
  {
    _id: "asdfghjkl1252",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x1600/",
  },
  {
    _id: "asdfghjkl1253",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1000x1800/",
  },
  {
    _id: "asdfghjkl1254",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1200x1000/",
  },
  {
    _id: "asdfghjkl1255",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x900/",
  },
  {
    _id: "asdfghjkl1256",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1200x1000/",
  },
  {
    _id: "asdfghjkl1257",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x900/",
  },
  {
    _id: "asdfghjkl1258",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1200x1000/",
  },
  {
    _id: "asdfghjkl1259",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1600x900/",
  },
  {
    _id: "asdfghjkl1260",
    title: "Hello World",
    alternativeText: "Hello World",
    url: "https://source.unsplash.com/1200x1000/",
  },
];

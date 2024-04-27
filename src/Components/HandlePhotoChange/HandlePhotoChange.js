import Image from "next/image";
import toast from "react-hot-toast";

const HandlePhotoChange = ({ link, setLink }) => {
  async function handlePhotoChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const photoData = new FormData();
      photoData.set("file", files[0]);
      const uploadingPromise = new Promise(async (resolve, reject) => {
        const resp = await fetch(`/api/upload`, {
          method: "POST",
          body: photoData,
        });
        if (resp.ok) {
          const newPhotoLink = await resp.json();
          setLink(newPhotoLink);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(uploadingPromise, {
        loading: "Uploading Image...",
        success: "Upload Complete..Click save to update Info",
        error: "error",
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          src={link}
          alt="profilePic"
          width={120}
          height={120}
          className="rounded-lg block m-auto mb-4"
        />
      )}
      {!link && <div className="mb-4 text-sm text-center">Add Image</div>}

      <label>
        <input type="file" className="hidden" onChange={handlePhotoChange} />
        <span className="style_learnbtn text-center block cursor-pointer hover:bg-green-600 transition-all ">
          Edit
        </span>
      </label>
    </>
  );
};

export default HandlePhotoChange;

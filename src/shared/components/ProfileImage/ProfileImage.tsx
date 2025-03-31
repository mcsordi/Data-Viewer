import { useContext, useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import { CgSpinnerAlt } from 'react-icons/cg';
import { TUser, userRequest } from '../../../api/UserRequests/request';
import { removePhoto } from '../../../contexts/RemovePhoto/context';

export const ProfileImage = () => {
  const accessEmail = localStorage.getItem('ACCESS_APPLICATION_EMAIL');
  const inputAccess = useRef({} as HTMLInputElement);
  const [imageUrl, setImageUrl] = useState<string>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>();
  const [userData, setUserData] = useState({} as TUser);
  const [userId, setUserId] = useState<''>();
  const [onHandleImage, setOnHandleImage] = useState<boolean>(false);
  const { onClickBtn } = useContext(removePhoto);

  const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const CLOUDINARY_UPLOAD_PRESETS = 'User_name';
    const CLOUDINARY_NAME = 'dyjsevpwu';

    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESETS);
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
        { method: 'POST', body: data },
      );
      const resJson = await response.json();
      setImageUrl(resJson.url);
      setOnHandleImage(true);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setError(
        (error as { message: string }).message ||
          'Erro ao atualizar foto de perfil',
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    const verifyImage = async () => {
      const res = await userRequest.getUserByEmailDataResponse(
        accessEmail as string,
      );
      if (res instanceof Error) {
        setFetchError(res.message);
      } else {
        onClickBtn ? setImageUrl(undefined) : setImageUrl(res[0].imagem);
        setUserId(res[0].id);
        setUserData(res);
      }
    };
    verifyImage();
  }, [accessEmail, onClickBtn]);

  useEffect(() => {
    const updateUser = async () => {
      const update = await userRequest.updateImageUser(
        userData[0]?.nome,
        userData[0]?.email,
        userData[0]?.senha,
        Number(userId),
        onClickBtn ? undefined : imageUrl,
      );
      return update;
    };
    onHandleImage && updateUser();
    onClickBtn && updateUser();

    setOnHandleImage(false);
  }, [userData, imageUrl, userId, onHandleImage, onClickBtn]);
  return (
    <>
      <div
        className="relative cursor-pointer w-20 h-20 border-0 rounded-full flex items-center justify-center bg-zinc-800 dark:bg-white"
        onClick={() => inputAccess.current.click()}
      >
        {imageUrl && !loading && (
          <img
            className="relative rounded-full cursor-pointer"
            alt="profile image"
            src={imageUrl}
          />
        )}
        {!imageUrl && !loading && (
          <>
            <FaUser className="text-5xl text-white dark:text-neutral-800" />
            <RiImageEditFill className="text-amber-300 text-2xl absolute bottom-0 -left-2 bg-zinc-800 rounded-sm" />
          </>
        )}
        {!imageUrl && loading && (
          <>
            <FaUser className="text-5xl text-white dark:text-neutral-800" />
            <CgSpinnerAlt className="text-3xl absolute animate-spin text-gray-500" />
            <RiImageEditFill className="text-amber-300 text-2xl absolute bottom-0 -left-2 bg-zinc-800 rounded-sm" />
          </>
        )}
      </div>

      <p className="dark:text-white font-semibold pt-3">{accessEmail}</p>

      <input
        ref={inputAccess}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleUpdateImage}
      />
      {error && !imageUrl && (
        <div className="w-full font-bold text-center text-red-600 text-sm">
          Erro ao atualizar foto de perfil
        </div>
      )}
    </>
  );
};

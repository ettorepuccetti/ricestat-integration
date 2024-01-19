import React, { useState } from "react";

export const Form = (): JSX.Element => {
  const [hotelId, setHotelId] = useState<string>("");
  const [hotelPassword, setHotelPassword] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

  function handleFileChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify({ hotelId, hotelPassword, file: file?.name }));

    if (!file) return;

    // useSendXml({ id: hotelId, password: hotelPassword, xmlFile: file });
  };

  return (
    <div className="flex justify-center h-[70vh] items-center">
      <form className="w-full max-w-sm" onSubmit={onSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Id
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              data-test="hotel-id"
              className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              onChange={(e) => setHotelId(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              data-test="hotel-password"
              className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700  focus:bg-white focus:border-blue-500"
              id="inline-password"
              type="password"
              onChange={(e) => setHotelPassword(e.target.value)}
              accept="file/xml"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Input File
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              data-test="input-file"
              id="image"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              data-test="submit-button"
              className="shadow bg-blue-400 hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={!hotelId || !hotelPassword || !file}
            >
              Invia
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

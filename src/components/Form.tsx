import React, { useState } from "react";
import { type XmlRequestInput } from "~/dataModel/request";

export const Form = ({
  onFormSumbit,
}: {
  onFormSumbit: (request: XmlRequestInput) => void;
}): JSX.Element => {
  const [hotelId, setHotelId] = useState<string>("");
  const [hotelPassword, setHotelPassword] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

  function handleFileChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify({ hotelId, hotelPassword, file: file?.name }));
    if (!file) return;
    onFormSumbit({
      hotelId: hotelId,
      hotelPassword: hotelPassword,
      xmlFile: file,
    });
  };

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <form className="w-full max-w-sm" onSubmit={onSubmit}>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
              Id
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              data-test="hotel-id"
              className="w-full rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-gray-700 focus:border-blue-500 focus:bg-white"
              id="inline-full-name"
              type="text"
              onChange={(e) => setHotelId(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              data-test="hotel-password"
              className="w-full rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-gray-700  focus:border-blue-500 focus:bg-white"
              id="inline-password"
              type="password"
              onChange={(e) => setHotelPassword(e.target.value)}
              accept="file/xml"
            />
          </div>
        </div>

        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
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
              className="rounded bg-blue-400 px-4 py-2 font-bold text-white shadow hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200"
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

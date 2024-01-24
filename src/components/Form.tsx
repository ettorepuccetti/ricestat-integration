import React, { useState } from "react";
import { type XmlRequestInput } from "~/dataModel/request";
import { InputFileDrop } from "./InputFileDrop";

export const Form = ({
  onFormSumbit,
}: {
  onFormSumbit: (request: XmlRequestInput) => void;
}): JSX.Element => {
  const [hotelId, setHotelId] = useState<string>("");
  const [hotelPassword, setHotelPassword] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

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
      <form className="flex w-full max-w-sm flex-col gap-6" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block pr-4 font-bold text-gray-500  ">
            Id
          </label>
          <input
            data-test="hotel-id"
            className="w-full rounded border-2 border-gray-200 bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 focus:border-blue-500 focus:bg-white"
            id="inline-full-name"
            type="text"
            onChange={(e) => setHotelId(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block pr-4 font-bold text-gray-500  ">
            Password
          </label>
          <input
            autoComplete="current-password"
            data-test="hotel-password"
            className="w-full rounded border-2 border-gray-200 bg-gray-100 px-4 py-2 text-gray-700  hover:bg-gray-200 focus:border-blue-500 focus:bg-white"
            id="inline-password"
            type="password"
            onChange={(e) => setHotelPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block pr-4 font-bold text-gray-500  ">
            Input File
          </label>
          <InputFileDrop file={file} setFile={setFile} />
        </div>

        <div className="flex justify-center ">
          <button
            data-test="submit-button"
            className="w-28 rounded bg-blue-400 px-4 py-2 font-bold text-white shadow hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200"
            type="submit"
            disabled={!hotelId || !hotelPassword || !file}
          >
            Invia
          </button>
        </div>
      </form>
    </div>
  );
};

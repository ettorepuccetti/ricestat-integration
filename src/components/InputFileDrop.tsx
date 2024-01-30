import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CiFileOn } from "react-icons/ci";
import { FaFolder } from "react-icons/fa6";

export const InputFileDrop = (props: {
  file: File | undefined;
  setFile: (file: File) => void;
}): JSX.Element => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const acceptedFile = acceptedFiles[0];
    if (!acceptedFile) return;
    props.setFile(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".xml"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className={`flex h-28 cursor-pointer justify-center rounded bg-gray-100 shadow-inner hover:bg-gray-200 ${
        isDragActive ? "border-2 border-dashed border-blue-300" : ""
      }`}
    >
      <input {...getInputProps()} data-test="input-file" />
      {!props.file ? (
        <div className="flex flex-col items-center justify-center gap-1">
          <FaFolder className="h-8 w-8 text-blue-300" />
          <p className="text-center text-xs font-light text-gray-500">
            Trascina il file qui o clicca per selezionarlo
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1">
          <CiFileOn className="h-8 w-8 text-sky-700" />
          <div className="text-center text-xs text-gray-600">
            {props.file.name}
          </div>
        </div>
      )}
    </div>
  );
};

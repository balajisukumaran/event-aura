/**
 * Author : Nikita Davies
 */
import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropzoneComponent({ onFilesSelected }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles, "acceptedfiles");
      onFilesSelected(acceptedFiles);
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    },
    [onFilesSelected]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    multiple: true,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div className="row" key={file.path}>
      <div className="col-md-10">
        {file.path} - {file.size} bytes{" "}
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-sm btn-danger mt-1"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const newFiles = [...files];
            newFiles.splice(newFiles.indexOf(file), 1);
            setFiles(newFiles);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Drag and drop your images here, or click to select files.</div>
      </div>
      <aside>{thumbs}</aside>
    </section>
  );
}

export default DropzoneComponent;

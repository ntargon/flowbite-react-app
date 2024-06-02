"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileInput, Label, Button } from "flowbite-react";

export default function Home() {
  const [post, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, []);

  const [fileContentText, setFileContentText] = useState("");
  const [fileContentBinary, setFileContentBinary] = useState("");

  // ファイルが選択されたときのハンドラー
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const text = await readFileContentText(file);
      setFileContentText(text);
      const binary = await readFileContentBinary(file);
      setFileContentBinary(binary);
    }
  };

  // ファイルの中身を読み取る関数
  const readFileContentText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  const readFileContentBinary = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const buf: ArrayBuffer = event.target.result;
        const array = [...new Uint8Array(buf)].map((x) =>
          x.toString(16).padStart(2, "0"),
        );
        console.log(array);
        const str = array.join(" ");
        resolve(str);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  //クリップボードにコピー関数
  const copyToClipboard = async (text: string) => {
    await global.navigator.clipboard.writeText(text);
  };

  return (
    <>
      <h1 className="text-2xl dark:text-white">Home</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload file" />
        </div>
        <FileInput
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileContentText && (
          <div>
            <h2>ファイルの中身:</h2>
            <pre>{fileContentText}</pre>
          </div>
        )}
        {fileContentBinary && (
          <div>
            <h2>ファイルの中身:</h2>
            <Button onClick={() => copyToClipboard(fileContentBinary)}>
              COPY
            </Button>
            <pre>{fileContentBinary}</pre>
          </div>
        )}
      </div>
      {/* <MyDropzone /> */}
      <div>
        {post.map((val) => {
          return <div key={val.id}>{val.id}</div>;
        })}
      </div>
    </>
  );
}

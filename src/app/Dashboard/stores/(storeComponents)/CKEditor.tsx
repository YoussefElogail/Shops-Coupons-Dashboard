"use client"
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
interface CKEditorProps {
  value: string;
  onChange: (event: any, editor: any) => void;
  placeholder: string;
}

const CKEditorComponent: React.FC<CKEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: placeholder,
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "imageUpload",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
            ],
          },
          mediaEmbed: {
            previewsInData: true,
          }
        }}
        data={value}
        onChange={onChange}
       
      />
    </div>
  );
};

export default CKEditorComponent;

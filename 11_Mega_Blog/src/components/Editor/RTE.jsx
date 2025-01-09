import React, { lazy, Suspense } from "react";
import { Controller } from "react-hook-form";
import config from "../../config/config";

const Editor = lazy(() =>
  import("@tinymce/tinymce-react").then((module) => ({
    default: module.Editor,
  }))
);

export default function RTE({
  name,
  control,
  label,
  defaultValue = "",
  height = 500,
  toolbarOptions = "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
  rules = {},
}) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        rules={rules}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <Suspense fallback={<div>Loading Editor...</div>}>
              <Editor
                apiKey={config.apiKey}
                initialValue={defaultValue}
                init={{
                  height,
                  menubar: true,
                  plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar: toolbarOptions,
                  content_style:
                    "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; margin: 8px; padding: 8px; }",
                }}
                onEditorChange={onChange}
              />
            </Suspense>
            {error && (
              <p className="text-red-500 text-center mt-2">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}

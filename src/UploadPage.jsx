import { useState, useRef, useEffect } from 'react'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const handleFile = (f) => {
    if (f && f.type.startsWith('image/')) setFile(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  return (
    <div className="bg-pink-200 min-h-screen p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-[#742e40] mb-8">Polaroid Maker!</h1>

      <div className="relative w-128 h-150">
        <div className="absolute inset-0 rounded-2xl bg-pink-300 border-2 border-[#742e40] flex flex-col justify-end items-center">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files[0])
              e.target.value = ''
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="mb-5 font-bold text-white bg-[#742e40] border border-pink-900 rounded-full h-10 w-64 hover:bg-pink-200 hover:text-[#742e40] cursor-pointer"
          >
            {file ? 'Choose a different photo' : 'Or click here to choose one'}
          </button>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragging(false)}
          className={`absolute inset-4 bottom-20 rounded-2xl overflow-hidden border-2 border-[#742e40] flex flex-col justify-center items-center gap-6 transition-colors ${
            dragging ? 'bg-pink-50 border-dashed' : 'bg-pink-100'
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Your upload"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <p className="text-2xl text-pink-800 font-bold">Drag your image here...</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}